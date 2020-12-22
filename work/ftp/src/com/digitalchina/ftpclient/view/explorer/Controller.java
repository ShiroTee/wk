package com.digitalchina.ftpclient.view.explorer;

import com.digitalchina.common.util.*;
import com.digitalchina.ftpclient.model.bean.FileBean;
import com.digitalchina.ftpclient.model.bean.FtpInfoBean;

import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Vector;

/**
* 类描述：程序控制器类，包含视图需要调用的方法
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/

public class Controller {

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    private Model model; //程序模型实例

    //构造方法
    public Controller(Model model) {
        this.model = model;
    }

    //刷新本地文件列表
    public void refreshLocalFiles(String path) {
        FileSystemView fileSystemView = FileSystemView.getFileSystemView();
        //如果path为空，就初始化
        if (StringUtil.isEmpty(path)) {
        	if(!"".equals(PropertiesUtil.getValueBykey("localUploadPath")))
        		path=PropertiesUtil.getValueBykey("localUploadPath");
        	else
                path = fileSystemView.getDefaultDirectory().getPath();  // 我的文档默认路径
        }

        File[] files = fileSystemView.getFiles(new File(path+File.separator), true);

        //设置模型中的本地文件数据   
        model.setLocalFiles(files);
        model.setLocalPath(path);
    }
    
    public boolean ExtensionFilter(String name,String [] fileFilter )
    {
    	for(int j = 0; j < fileFilter.length; j++){
           if(name.endsWith(fileFilter[j])){
        	   return true;
            }
        }
    	 return false;
    }
    
    //本地文件夹向上按钮事件处理
    public void localUpperButtonClickHandler() {
        String currentPath = model.getLocalPath();
        String separator = File.separator;
        int pos = currentPath.lastIndexOf(separator);
        if (pos > 0 && pos != currentPath.length()) {
            currentPath = currentPath.substring(0, pos);
            refreshLocalFiles(currentPath);
        } else {

            File[] roots = File.listRoots();
            model.setLocalFiles(roots);//设置list数据
            model.setLocalPath("/");//更新路径 localPathText                          
        }
    }

    public String getNewFileName(String oldFileName){
    	
    	 SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");//设置日期格式
         String sysdate=df.format(new Date());
         String fileType=oldFileName.substring(oldFileName.lastIndexOf("."),oldFileName.length());
         
         String tempfilename=oldFileName.substring(0,oldFileName.lastIndexOf("."));
       //  String dateType=model.getDataType();
       //  if("".equals(dateType)||null==dateType)
       // 	 dateType="全部";
      //   String newFileName =model.getOrgInitial()+"_"+model.getOrgID()+"_"+sysdate+"_"+dateType+fileType;
         String newFileName =tempfilename+"_"+sysdate+fileType;
    	 return newFileName;
    }

    public FileBean fileToFileBean(File file){
        FileBean fb=new FileBean();
        fb.setName(file.getName());
        fb.setPath(file.getAbsolutePath());
        fb.setSize(file.length());
        fb.setLastModified(new Date(file.lastModified()));
        if(file.isFile()){
            fb.setType(FileBean.FileType.file);
        }else{
            fb.setType(FileBean.FileType.folder);
        }

        return fb;
    }

    //上传文件，成功返回true.如果未连接或上传失败，返回false
    public String uploadLocalFile(FileBean fb){
        if (model.getFtpInfoBean() == null) {
            return "尚未连接服务器!";
        }
        try {
	        FtpInfoBean ftpInfoBean = model.getFtpInfoBean();
	        String localFileName = fb.getPath();
	        
	       //以前上传目录
	       //  String remoteFileName = model.getRemotePath();
	       // FtpUtil.uploadFile(ftpInfoBean, fb, localFileName, fb.getName());//直接覆盖
	         
	         String newFileName=fb.getName();
	         String  tempFile = PropertiesUtil.USER_DIR+newFileName;
	         
	         if(newFileName.length()>0)
	         {
	        	 newFileName=getNewFileName(fb.getName());
	         }
	         
	        //加密文件到临时文件夹 
			// byte[] readFile=FileUtil.readFile(new File(localFileName));
			// byte[] res=SecurityHelper.encrypt(readFile);
			// FileUtil.writeBytes(new File(tempFile), res);
	         SecurityHelper.encryptFile(new File(localFileName), new File(tempFile));
	         
			 FtpUtil.uploadFile(ftpInfoBean, fb, tempFile, newFileName);//直接覆盖
			 FileUtil.delFile(tempFile);
			 model.setLastLogInfo("信息: 文件已由[" + fb.getPath() + "]上传到[" +model.getRemotePath()+"/"+newFileName+"]，大小["+ fb.getSize() + "]字节");
	         refreshRemoteFiles();
	         return "OK";
		} catch (Exception e) {
			return  "上传发生错误";
		}
      }
    //打开文件夹

    public void openLocalFolder(FileBean fb) {
        refreshLocalFiles(fb.getPath());
    }
    //刷新本地文件

    public void refreshLocalButtonClickHandler() {
        refreshLocalFiles(model.getLocalPath());
    }
    //初始化服务器侧 JList 

    public void initRemoteFiles() {
        Vector<FileBean> listData = new Vector<FileBean>();
        FileBean fb = new FileBean();
        fb.setName("请连接FTP服务器...");
        fb.setType(FileBean.FileType.info);
        listData.add(fb);
        model.setRemoteFiles(listData);//设置list数据
        model.setRemotePath(".");
    }
    //登陆ftp服务器，获得服务器文件列表

    public void loginRemoteServer(FtpInfoBean ftpInfoBean) {
        //如果测试连接成功
        if (FtpUtil.isValid(ftpInfoBean)) {
            model.setFtpInfoBean(ftpInfoBean);//保存ftp登录信息到模型中
            Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpInfoBean, null);//服务器文件列表
            model.setLastLogInfo("信息: 连接服务器[" + ftpInfoBean.getIp() + "]完成");
            model.setRemoteFiles(listData);//更新模型数据  
            model.setRemotePath(".");
        } //如果测试连接不成功，更新JList数据
        else {
            Vector<FileBean> listData = new Vector<FileBean>();
            FileBean fb = new FileBean();
            fb.setName("连接失败...");
            fb.setType(FileBean.FileType.info);
            listData.add(fb);
            model.setRemoteFiles(listData);
        }
    }
    //刷新服务器文件列表

    public void refreshRemoteFiles() {
        if (model.getFtpInfoBean() != null) {
            String remotePath = model.getRemotePath();
            Vector<FileBean> listData = FtpUtil.getTrimedFileList(model.getFtpInfoBean(), remotePath);
            model.setRemoteFiles(listData);
        }
    }
    //服务器 JList 鼠标双击的事件处理方法

    public void remoteFileDoubleClickedHandler(FileBean fb) {
        if (fb.getType().equals(FileBean.FileType.file)) {
        	 
            downloadRemoteFile(fb);//下载文件到本地            
        } else if (fb.getType().equals(FileBean.FileType.folder)) {
            openRemoteFolder(fb);//打开文件夹
        }
    }
    //下载文件到本地

    private void downloadRemoteFile(FileBean fb) {
        FtpInfoBean ftpInfoBean = model.getFtpInfoBean();
        String localPath = model.getLocalPath();
        System.out.println(localPath);
        FtpUtil.downloadFile(ftpInfoBean, localPath, fb);
        model.setLastLogInfo("信息: 文件已由[" + fb.getName() + "]下载到["+localPath+"\\"+fb.getName()+"]，大小[" + fb.getSize() + "]字节");
        refreshLocalFiles(localPath);
    }

    //打开服务器文件夹
    private void openRemoteFolder(FileBean fb) {
        String separator = "/";
        String remotePath = fb.getPath();
        if (remotePath.equals(separator)) {
            remotePath = remotePath + fb.getName();
        } else {
            remotePath = fb.getPath() + separator + fb.getName();
        }
        Vector<FileBean> listData = FtpUtil.getTrimedFileList(model.getFtpInfoBean(), remotePath);
        model.setLastLogInfo("信息：打开ftp服务器的["+remotePath+"]目录。");
        model.setRemoteFiles(listData);
        model.setRemotePath(remotePath);
    }
    //服务器文件路径向上

    public void remoteUpperButtonClickHandler() {
        String remotePath = model.getRemotePath();
        String separator = "/";
        int pos = remotePath.lastIndexOf(separator);
        if (pos > 0) {
            remotePath = remotePath.substring(0, pos);
        } else {
            remotePath = remotePath.substring(0, pos + 1);
        }
        Vector<FileBean> listData = FtpUtil.getTrimedFileList(model.getFtpInfoBean(), remotePath);
        model.setRemoteFiles(listData);
        model.setRemotePath(remotePath);
        refreshRemoteFiles();
    }

    public void enterRemoteDir(String remotePath) {
        Vector<FileBean> listData = FtpUtil.getTrimedFileList(model.getFtpInfoBean(), remotePath);
        model.setLastLogInfo("信息：进入ftp服务器的["+remotePath+"]目录。");
        model.setRemoteFiles(listData);
        model.setRemotePath(remotePath);
        refreshRemoteFiles();
    }

    //断开连接
    public void remoteDisconnectButtonClickHandler() {
        if (model.getFtpInfoBean() != null) {
            FtpUtil.disconnectFromServer();
            model.setLastLogInfo("信息: 断开服务器[" + model.getFtpInfoBean().getIp() + "]完成");
            model.setFtpInfoBean(null);
            initRemoteFiles();
        }
    }
    //删除服务器端文件

    public void deleteSeletedRemoteFile(FileBean fb) {
        if (model.getFtpInfoBean() != null) {
            FtpInfoBean ftpInfoBean = model.getFtpInfoBean();
            FtpUtil.deleteFile(ftpInfoBean, fb);
            model.setLastLogInfo("信息: 删除服务器文件["+model.getRemotePath()+"/"+fb.getName()+"]完成，大小["+fb.getSize()+"]字节");
            refreshRemoteFiles();
            refreshRemoteFiles();
        }

    }
}
