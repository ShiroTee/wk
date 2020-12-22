package com.digitalchina.ftpclient.view.explorer;

import com.digitalchina.common.util.PropertiesUtil;
import com.digitalchina.ftpclient.model.bean.FileBean;
import com.digitalchina.ftpclient.model.bean.FtpInfoBean;
import com.digitalchina.ftpclient.view.components.MyListCellRender;

import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.event.ListSelectionListener;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.filechooser.FileSystemView;
import javax.swing.table.TableColumn;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreePath;
import java.awt.*;
import java.awt.event.*;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import static java.lang.System.getProperty;
import static javax.swing.JOptionPane.showMessageDialog;

/**
 * A basic File Browser.  Requires 1.6+ for the Desktop & SwingWorker
 * classes, amongst other minor things.
 * <p>
 * Includes support classes FileTableModel & FileTreeCellRenderer.
 *
 * @author Andrew Thompson
 * @version 2011-06-08
 * @TODO Bugs
 * <li>Fix keyboard focus issues - especially when functions like
 * rename/delete etc. are called that update nodes & file lists.
 * <li>Needs more testing in general.
 * @TODO Functionality
 * <li>Double clicking a directory in the table, should update the tree
 * <li>Move progress bar?
 * <li>Add other file display modes (besides table) in CardLayout?
 * <li>Menus + other cruft?
 * <li>Implement history/back
 * <li>Allow multiple selection
 * <li>Add file search
 * @ see http://codereview.stackexchange.com/q/4446/7784
 */
public class FileBrowser {

    /**标题*/
    public static final String APP_TITLE = "ftp上传工具";
    private Desktop desktop;//用于打开文件
    private FileSystemView fileSystemView;//获得文件图标和名称
    private JPanel gui;//主要的容器
    private JTree tree;//本地文件系统库
    private DefaultTreeModel treeModel;
    private JTable table;//本地文件列表
    private JProgressBar progressBar;//加载文件进度条
    private FileTableModel fileTableModel;//文件表格模型
    private ListSelectionListener listSelectionListener;//列表监听事件
    private boolean cellSizesSet = false;
    private int rowIconPadding = 6;

     //ftp-toolbar按钮
    private JButton loginFtpButton;//链接
    private JButton logoutFtpButton;//断开
    private JButton refreshFtpFileButton;//刷新
    private JButton deleteFtpFileButton;//删除

    private JButton pathButton; //打开本地路径按钮
    private JComboBox pathComboBox;//本地路径下拉框

    private JButton ftpPathButton;//打开ftp路劲按钮
    private JComboBox ftpPathComboBox;//ftp路径下拉框

    private JList FtpFileList;//ftp文件列表
    private JLabel  ftpLabel;//ftp模块标题
    private JSplitPane splitRight;//右边模块：本地文件列表+ftp模块
    private JSplitPane splitPane;//文件树+右边模块
    private JDialog loginDialog;//登录框

    private JTextArea showMessage;
    private static JFrame f;
    private Controller controller;
    private Model model;
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd H:m:s");

    FileBrowser( Model model,Controller controller){
        this.controller=controller;
        this.model=model;
        String path = getProperty("user.dir")+PropertiesUtil.getValueBykey("logFile");
        FileBrowser.writeDataToFile(path,format.format(new Date())+"打开软件");
    }

    public static void main(String[] args) {

        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                try {
                    // Significantly improves the look of the output in
                    // terms of the file names returned by FileSystemView!
                    UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
                } catch (Exception weTried) {
                }
                f = new JFrame(APP_TITLE);
                f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                Model model = new Model();//模型初始化
                Controller controller = new Controller(model);//控制器初始化
                FileBrowser FileBrowser = new FileBrowser(model,controller);
                Container container = FileBrowser.getGui();
                f.setContentPane(container);

                try {
                    URL urlBig = FileBrowser.getClass().getResource("fb-icon-32x32.png");
                    URL urlSmall = FileBrowser.getClass().getResource("fb-icon-16x16.png");
                    ArrayList<Image> images = new ArrayList<Image>();
                    images.add(ImageIO.read(urlBig));
                    images.add(ImageIO.read(urlSmall));
                    f.setIconImages(images);
                } catch (Exception weTried){
                }

                f.pack();
                f.setLocationByPlatform(true);
                f.setMinimumSize(f.getSize());
                f.setVisible(true);

                FileBrowser.showRootFile();
            }
        });
    }

    public Container getGui() {
        if (gui == null) {
            gui = new JPanel(new BorderLayout(3, 3));
            gui.setBorder(new EmptyBorder(5, 5, 5, 5));

            JScrollPane  treeScroll = createLocalFileTree();

            JPanel localTable = createLocalFileTable();
            JPanel ftpPanel = createFtpPanel();
            splitRight = new JSplitPane(JSplitPane.VERTICAL_SPLIT, localTable, ftpPanel);
            splitRight.setDividerSize(16);
            splitRight.setDividerLocation(0.5);
            splitRight.setResizeWeight(0.5);
            splitRight.setOneTouchExpandable(true);

            splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, treeScroll, splitRight);
            splitPane.setDividerSize(16);
            splitPane.setOneTouchExpandable(true);

            JPanel messagePanel =createMessagePanel();

            JSplitPane splitBottom = new JSplitPane(JSplitPane.VERTICAL_SPLIT, splitPane, messagePanel);
            splitBottom.setDividerSize(16);
            splitBottom.setDividerLocation(0.7);
            splitBottom.setResizeWeight(0.7);
            splitBottom.setOneTouchExpandable(true);

            gui.add(splitBottom, BorderLayout.CENTER);

            AddListener();

            JPanel simpleOutput = new JPanel(new BorderLayout(3, 3));
            progressBar = new JProgressBar();
            simpleOutput.add(progressBar, BorderLayout.EAST);
            progressBar.setVisible(false);
            loginDialog=createLoginDialog();
            gui.add(simpleOutput,BorderLayout.SOUTH);
        }
        return gui;
    }

    /**
     * 创建本地文件目录树
     * @return
     */
    private JScrollPane createLocalFileTree(){
        fileSystemView = FileSystemView.getFileSystemView();
        desktop = Desktop.getDesktop();

        //文件树
        DefaultMutableTreeNode root = new DefaultMutableTreeNode();
        treeModel = new DefaultTreeModel(root);

        TreeSelectionListener treeSelectionListener = new TreeSelectionListener() {
            public void valueChanged(TreeSelectionEvent tse) {
                DefaultMutableTreeNode node =
                        (DefaultMutableTreeNode) tse.getPath().getLastPathComponent();
                showChildren(node);
            }
        };

        addDefualtFile(root);

        tree = new JTree(treeModel);
        tree.setRootVisible(false);
        tree.addTreeSelectionListener(treeSelectionListener);
        tree.setCellRenderer(new FileTreeCellRenderer());
        tree.expandRow(0);
        JScrollPane treeScroll = new JScrollPane(tree);

        // as per trashgod tip
        tree.setVisibleRowCount(15);

        Dimension preferredSize = treeScroll.getPreferredSize();
        Dimension widePreferred = new Dimension(
                200,
                (int) preferredSize.getHeight());
        treeScroll.setPreferredSize(widePreferred);

        return treeScroll;
    }

    /**
     * 创建本地文件显示表格
     * @return
     */
    private JPanel createLocalFileTable(){
        JPanel detailView = new JPanel(new BorderLayout(3, 3));
        table = new JTable();
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        table.setAutoCreateRowSorter(true);
        table.setShowVerticalLines(false);

        table.getSelectionModel().addListSelectionListener(listSelectionListener);
        JScrollPane tableScroll = new JScrollPane(table);
        Dimension d = tableScroll.getPreferredSize();
        tableScroll.setPreferredSize(new Dimension((int) d.getWidth(), (int)d.getHeight()/2));

        JPanel right = new JPanel(new BorderLayout(2, 2));
        JPanel url = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill=GridBagConstraints.BOTH;
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.weighty = 1;
        gbc.weightx = 1;
        gbc.gridwidth = 6;
        gbc.gridheight = 1;
        JPanel combo = new JPanel(new BorderLayout(3,3));
        pathComboBox = new JComboBox(new DefaultComboBoxModel());
        pathComboBox.setEditable(true);
        pathComboBox.getEditor().getEditorComponent().addKeyListener(new KeyListener() {
            @Override
            public void keyTyped(KeyEvent e) {}

            @Override
            public void keyPressed(KeyEvent e) {
                if( e.getKeyCode() == KeyEvent.VK_ENTER ){
                    String  filePath = pathComboBox.getEditor().getItem().toString();
                    model.setLocalPath(filePath);
                }
            }

            @Override
            public void keyReleased(KeyEvent e) {}
        });
        combo.add(pathComboBox);
        pathButton = new JButton("→");
        pathButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                String  filePath = pathComboBox.getEditor().getItem().toString();
                model.setLocalPath(filePath);
            }
        });
        GridBagConstraints gbc2 = new GridBagConstraints();
        gbc2.gridwidth = 1;

        url.add(combo,gbc);
        url.add(pathButton,gbc2);

        right.add(url,BorderLayout.NORTH);
        right.add(tableScroll,BorderLayout.CENTER);
        detailView.add(right, BorderLayout.CENTER);

        return detailView;
    }

    /**
     * 创建ftp操作区域
     * @return
     */
    private JPanel createFtpPanel(){
        //ftp
        JPanel ftpPanel = new JPanel(new BorderLayout(3,3));
        JPanel head = new JPanel(new BorderLayout(3,3));
        ftpLabel=new JLabel();
        ftpLabel.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        ftpLabel.setText("FTP服务器");
        ftpLabel.setFont(new Font("Dialog", 1,18));
        head.add(ftpLabel,BorderLayout.NORTH);

        JToolBar toolBar = new JToolBar();
        toolBar.setFloatable(false);
        loginFtpButton = new JButton("连接");
        loginFtpButton.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent ae) {
                loginDialog.setVisible(true);
            }
        });
        toolBar.add(loginFtpButton);
        toolBar.addSeparator();
        logoutFtpButton = new JButton("断开");
        logoutFtpButton.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent ae) {
                if(model.getFtpInfoBean()==null){
                    showMessage("FTP服务器已经断开，无需再次断开");
                    return;
                }
                controller.remoteDisconnectButtonClickHandler();
                FtpFileList.setListData(model.getRemoteFiles());
                showMessage("FTP服务器断开成功");
            }
        });
        toolBar.add(logoutFtpButton);
        toolBar.addSeparator();
        refreshFtpFileButton = new JButton("刷新");
        refreshFtpFileButton.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent ae) {
                if(model.getFtpInfoBean()==null){
                    showMessage("FTP服务器已经断开");
                    return;
                }
                controller.refreshRemoteFiles();
                FtpFileList.setListData(controller.getModel().getRemoteFiles());
            }
        });
        toolBar.add(refreshFtpFileButton);
        toolBar.addSeparator();
        deleteFtpFileButton = new JButton("删除");

        toolBar.add(deleteFtpFileButton);

        head.add(toolBar);

        JPanel url = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill=GridBagConstraints.BOTH;
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.weighty = 1;
        gbc.weightx = 1;
        gbc.gridwidth = 6;
        gbc.gridheight = 1;
        JPanel combo = new JPanel(new BorderLayout(3,3));
        ftpPathComboBox = new JComboBox(new DefaultComboBoxModel());
        ftpPathComboBox.setEditable(true);
        ftpPathComboBox.getEditor().getEditorComponent().addKeyListener(new KeyListener() {
            @Override
            public void keyTyped(KeyEvent e) {}

            @Override
            public void keyPressed(KeyEvent e) {
                if( e.getKeyCode() == KeyEvent.VK_ENTER ){
                    String  filePath = ftpPathComboBox.getEditor().getItem().toString();
                    controller.enterRemoteDir(filePath);
                }
            }

            @Override
            public void keyReleased(KeyEvent e) {}
        });
        combo.add(ftpPathComboBox);
        ftpPathButton = new JButton("→");
        ftpPathButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                String  filePath = ftpPathComboBox.getEditor().getItem().toString();
                controller.enterRemoteDir(filePath);
            }
        });
        GridBagConstraints gbc2 = new GridBagConstraints();
        gbc2.gridwidth = 1;

        url.add(combo,gbc);
        url.add(ftpPathButton,gbc2);
        head.add(url,BorderLayout.SOUTH);

        ftpPanel.add(head,BorderLayout.NORTH);

        FtpFileList=new JList();
        FtpFileList.setCellRenderer(new MyListCellRender());

        //服务器 JList 鼠标双击的事件处理方法
        FtpFileList.addMouseListener(
                new MouseAdapter() {

                    @Override
                    public void mouseClicked(MouseEvent e) {
                        if (e.getClickCount() == 2) {
                            FileBean fb = (FileBean) FtpFileList.getSelectedValue();
                            controller.remoteFileDoubleClickedHandler(fb);
                            FtpFileList.setListData(controller.getModel().getRemoteFiles());
                        }
                    }
                });
        JScrollPane listScroll = new JScrollPane(FtpFileList);
        Dimension d = listScroll.getPreferredSize();
        listScroll.setPreferredSize(new Dimension((int) d.getWidth(), (int) d.getHeight()/2));

        ftpPanel.add(listScroll,BorderLayout.CENTER);

        deleteFtpFileButton.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent ae) {
                if(model.getFtpInfoBean()==null){
                    showMessage("FTP服务器已经断开");
                    return;
                }
                FileBean file = (FileBean) FtpFileList.getSelectedValue();
                if(file ==null){
                    showMessage("请选择需要删除的文件！");
                    return;
                }
                //弹出框确认操作
                int result = JOptionPane.showConfirmDialog(null,
                        "确认要删除\n" + file.getName(), "提示",
                        JOptionPane.OK_CANCEL_OPTION);
                if (result == JOptionPane.OK_OPTION) {

                    //删除文件
                    controller.deleteSeletedRemoteFile(file);
                    FtpFileList.setListData(controller.getModel().getRemoteFiles());
                }
            }
        });

        return ftpPanel;
    }

    /**
     * 创建登录框
     * @return
     */
    private JDialog createLoginDialog(){

        JPanel fileMainDetails = new JPanel(new BorderLayout(3,2));
        fileMainDetails.setBorder(new EmptyBorder(0,6,0,6));

        JPanel fileDetailsLabels = new JPanel(new GridLayout(0,1,2,2));
        fileDetailsLabels.setBorder(new EmptyBorder(8,8,8,8));
        fileMainDetails.add(fileDetailsLabels, BorderLayout.WEST);

        JPanel fileDetailsValues = new JPanel(new GridLayout(0,1,2,2));
        fileDetailsValues.setBorder(new EmptyBorder(8,8,8,8));
        fileMainDetails.add(fileDetailsValues, BorderLayout.CENTER);

        JDialog  loginPanel = new JDialog(f,"FTP登录", true);//弹出的对话框
        loginPanel.setBounds(400, 200, 350, 150);//设置弹出对话框的位置和大小
        loginPanel.setLayout(new FlowLayout());//设置弹出对话框的布局为流式布局
        JLabel userNameLabel = new JLabel("用户名:");
        fileDetailsLabels.add(userNameLabel);
        final JTextField userName = new JTextField(38);
        fileDetailsValues.add(userName);
        JLabel passWordLabel = new JLabel("密码:");
        fileDetailsLabels.add(passWordLabel);
        final JPasswordField passWord = new JPasswordField(38);
        fileDetailsValues.add(passWord);

        userName.setText(PropertiesUtil.getValueBykey("ftpUser"));//用户名
        passWord.setText(PropertiesUtil.getValueBykey("ftpPassword"));//密码

        JPanel buttons = new JPanel(new GridBagLayout());
        buttons.setBorder(new EmptyBorder(8,8,8,8));
        fileMainDetails.add(buttons, BorderLayout.SOUTH);
         final JButton loginButton= new JButton("登录");
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String ip = PropertiesUtil.getValueBykey("ftpIP");//ip地址
                String ports = PropertiesUtil.getValueBykey("ftpPort");//端口
                String username = userName.getText().trim();//用户名
                String password = passWord.getText().trim();//密码

                int port = 21;
                if (!"".equals(ports))
                    port = Integer.parseInt(ports);

                FtpInfoBean ftpInfoBean = new FtpInfoBean(ip, username, password, port);//封装bean

                loginDialog.setVisible(false);
                controller.loginRemoteServer(ftpInfoBean);
                controller.refreshRemoteFiles();
                FtpFileList.setListData(controller.getModel().getRemoteFiles());
            }
        });
        passWord.addKeyListener(new KeyListener() {
            @Override
            public void keyTyped(KeyEvent e) {

            }

            @Override
            public void keyPressed(KeyEvent e) {
                if( e.getKeyCode() == KeyEvent.VK_ENTER ){
                    loginButton.doClick();
                }
            }

            @Override
            public void keyReleased(KeyEvent e) {

            }
        });
        buttons.add(loginButton);
        JButton cancelButton= new JButton("取消");
        cancelButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                loginDialog.setVisible(false);
            }
        });
        buttons.add(cancelButton);

        loginPanel.add(fileMainDetails);
        return loginPanel;
    }

    /**
     * 创建ftp操作区域
     * @return
     */
    private JPanel createMessagePanel(){
        //ftp
        JPanel messagePanel = new JPanel(new BorderLayout(3,3));
        JPanel head = new JPanel(new BorderLayout(3,3));
        ftpLabel=new JLabel();
        ftpLabel.setText("操作记录");
        ftpLabel.setFont(new Font("Dialog", 1,18));
        head.add(ftpLabel,BorderLayout.WEST);
        JButton clear = new JButton("清除记录");
        clear.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showMessage.setText("");
            }
        });
        head.add(clear,BorderLayout.EAST);

        showMessage = new JTextArea();
        JScrollPane scroll = new JScrollPane(showMessage);
        messagePanel.add(head,BorderLayout.NORTH);
        messagePanel.add(scroll,BorderLayout.CENTER);
        return messagePanel;
    }

    private void AddListener(){

        //监听模型类的属性变化，做相应视图更新
        this.model.addPropertyChangeListener(new PropertyChangeListener() {
            @Override
            public void propertyChange(PropertyChangeEvent evt) {
                if (evt.getPropertyName().equals("localFiles")) {
                    //更新本地文件列表
                    final File[] files = model.getLocalFiles();
                    setTableData(files);
                } else if (evt.getPropertyName().equals("localPath")) { //更新本地文件路径
                    System.out.println(model.getLocalPath());
                   if(model.getOnlyLocalPath()){
                       changeLocalPath(model.getLocalPath());
                   }else{
                       openObject(model.getLocalPath());
                   }

                } else if (evt.getPropertyName().equals("remoteFiles")) {
                    //更新服务器文件列表
                    FtpFileList.setListData(model.getRemoteFiles());
                } else if (evt.getPropertyName().equals("remotePath")) {
                    ftpPathComboBox.getEditor().setItem(model.getRemotePath());
                } else if (evt.getPropertyName().equals("lastLogInfo")) {
                    String log = format.format(new Date())+model.getLastLogInfo();
                    String path = getProperty("user.dir")+PropertiesUtil.getValueBykey("logFile");
                    writeDataToFile(path,log);
                    showMessage.append(model.getLastLogInfo()+ "\n");
                }
            }
        });

        //表格双击事件
        table.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                //实现双击
                if (e.getClickCount() == 2) {
                    int row = ((JTable) e.getSource()).rowAtPoint(e.getPoint()); //获得行位置
                    final String originPath = table.getValueAt(row, 2).toString();
                    openObject(originPath);

                } else return;
            }
        });

        f.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                controller.remoteDisconnectButtonClickHandler();
                String path = getProperty("user.dir")+PropertiesUtil.getValueBykey("logFile");
                writeDataToFile(path,format.format(new Date())+"软件退出");
                System.exit(0);
            }
        });

        controller.initRemoteFiles();
    }
    public void showRootFile() {
        // ensure the main files are displayed
        tree.setSelectionInterval(0, 0);
    }

    private TreePath findTreePath(File find) {
        for (int ii = 0; ii < tree.getRowCount(); ii++) {
            TreePath treePath = tree.getPathForRow(ii);
            Object object = treePath.getLastPathComponent();
            DefaultMutableTreeNode node = (DefaultMutableTreeNode) object;
            File nodeFile = (File) node.getUserObject();

            if (nodeFile == find) {
                return treePath;
            }
        }
        // not found!
        return null;
    }

    private void addDefualtFile(DefaultMutableTreeNode root){
        //显示根目录文件.
        File[] roots = fileSystemView.getRoots();
        for (File fileSystemRoot : roots) {
            DefaultMutableTreeNode node = new DefaultMutableTreeNode(fileSystemRoot);
            root.add(node);
            File[] files = fileSystemView.getFiles(fileSystemRoot, true);
            for (File file : files) {
                if (file.isDirectory()) {
                    node.add(new DefaultMutableTreeNode(file));
                }
            }
        }
    }

    private void showThrowable(Throwable t) {
        t.printStackTrace();
        showMessageDialog(
                gui,
                t.toString(),
                t.getMessage(),
                JOptionPane.ERROR_MESSAGE
        );
        gui.repaint();
    }

    /**
     * 设置table的值
     */
    private void setTableData(final File[] files) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                if (fileTableModel == null) {
                    fileTableModel = new FileTableModel();
                    table.setModel(fileTableModel);
                }
                table.getSelectionModel().removeListSelectionListener(listSelectionListener);
                fileTableModel.setFiles(files);
                table.getSelectionModel().addListSelectionListener(listSelectionListener);
                if (!cellSizesSet) {
                    Icon icon = fileSystemView.getSystemIcon(files[0]);

                    // size adjustment to better account for icons
                    table.setRowHeight(icon.getIconHeight() + rowIconPadding);

                    setColumnWidth(0, -1);
                    setColumnWidth(3, 60);
                    table.getColumnModel().getColumn(3).setMaxWidth(120);
//                    table.setAutoResizeMode(JTable.AUTO_RESIZE_OFF);
//                    table.getColumnModel().getColumn(2).setMinWidth(0);
//                    table.getColumnModel().getColumn(2).setResizable(false);
//                    table.getColumnModel().getColumn(2).setPreferredWidth(0);
                    cellSizesSet = true;
                }
            }
        });
    }

    //设置表格宽度
    private void setColumnWidth(int column, int width) {
        TableColumn tableColumn = table.getColumnModel().getColumn(column);
        if (width < 0) {
            // use the preferred width of the header..
            JLabel label = new JLabel((String) tableColumn.getHeaderValue());
            Dimension preferred = label.getPreferredSize();
            // altered 10->14 as per camickr comment.
            width = (int) preferred.getWidth() + 14;
        }
        tableColumn.setPreferredWidth(width);
        tableColumn.setMaxWidth(width);
        tableColumn.setMinWidth(width);
    }

    private void openObject(final String path){
        SwingWorker worker = new SwingWorker() {
            @Override
            public String doInBackground() {
                File file = new File(path);
                if (file.isDirectory()) {
                    pathComboBox.getEditor().setItem(path);
                    File[] files = fileSystemView.getFiles(file, true);
                    setTableData(files);
                }else{
                    if(path.contains("::")){
                        pathComboBox.getEditor().setItem(path);
                        File[] files = fileSystemView.getFiles(file, true);
                        setTableData(files);
                    }else {
                        int result = JOptionPane.showConfirmDialog(null,
                                "确认要上传文件\n" + path, "提示",
                                JOptionPane.OK_CANCEL_OPTION);
                        if (result == JOptionPane.OK_OPTION) {
                            String uploadResult = controller.uploadLocalFile(controller.fileToFileBean(file));//上传文件
                            if (uploadResult.equals("OK")) {
                                showMessage("上传文件成功：" + file.getName());
                            } else {
                                showThrowable(new Throwable(uploadResult));
                            }
                        }
                    }
                }
                return "done";
            }
        };
        worker.execute();
    }


    /**
     * Add the files that are contained within the directory of this node.
     * Thanks to Hovercraft Full Of Eels for the SwingWorker fix.
     */
    private void showChildren(final DefaultMutableTreeNode node) {
        tree.setEnabled(false);
        progressBar.setVisible(true);
        progressBar.setIndeterminate(true);

        SwingWorker worker = new SwingWorker() {
            @Override
            public String doInBackground() {
                tree.setEnabled(false);
                progressBar.setVisible(true);
                progressBar.setIndeterminate(true);
                File file = (File) node.getUserObject();
                if (file.isDirectory()) {
                    File[] files = fileSystemView.getFiles(file, true);
                    if (node.isLeaf()) {
                        for (File child : files) {
                            if (child.isDirectory()) {
                                node.add(new DefaultMutableTreeNode(child));
                            }
                        }
                    }
                    //setTableData(files);
                    String path =file.getAbsolutePath();
                    if(file.getAbsolutePath().contains("::")){
                        path=fileSystemView.getSystemDisplayName(file);
                    }
                    model.setOnlyLocalPath(true);
                    model.setLocalPath(path);

                    model.setLocalFiles(files);
                }
                progressBar.setIndeterminate(false);
                progressBar.setVisible(false);
                tree.setEnabled(true);
                return "done";
            }
        };
        worker.execute();
    }


    private void  changeLocalPath(String path){
        pathComboBox.getEditor().setItem(path);
        model.setOnlyLocalPath(false);
    }
    /**
      *显示消息
     */
    private void showMessage(String message) {

        showMessageDialog(
                gui,
                message,
                "消息",
                JOptionPane.INFORMATION_MESSAGE
        );
        gui.repaint();
    }

    //写入文件
    public static void writeDataToFile(String writePath,String content){
        BufferedWriter writer=null;
        try{
            writer = new BufferedWriter(new FileWriter(new File(writePath),true));
            writer.write(content);
            writer.newLine();
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
