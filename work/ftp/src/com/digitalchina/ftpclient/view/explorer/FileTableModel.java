package com.digitalchina.ftpclient.view.explorer;

import com.digitalchina.common.util.PropertiesUtil;

import javax.swing.*;
import javax.swing.filechooser.FileSystemView;
import javax.swing.table.AbstractTableModel;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * A TableModel to hold File[].
 */
class FileTableModel extends AbstractTableModel {

    private File[] files;
    private FileSystemView fileSystemView = FileSystemView.getFileSystemView();
    private String[] columns = {
            "图标",
            "文件",
            "路径/名称",
            "大小"
    };

    FileTableModel() {
        this(new File[0]);
    }

    FileTableModel(File[] files) {
        this.files = files;
    }

    public Object getValueAt(int row, int column) {
        File file = files[row];
        switch (column) {
            case 0:
                return fileSystemView.getSystemIcon(file);
            case 1:
                return fileSystemView.getSystemDisplayName(file);
            case 2:
                String path = file.getPath();
                if (path.startsWith("::")) {
                    path = "";
                }
                return path;
            case 3:
                String len = "";
                if (file.isFile()) {
                    len = file.length() / 1024 + "KB";
                }
                return len;
            default:
                System.err.println("Logic Error");
        }
        return "";
    }

    public int getColumnCount() {
        return columns.length;
    }

    public Class<?> getColumnClass(int column) {
        switch (column) {
            case 0:
                return ImageIcon.class;
            case 3:
                return Long.class;
        }
        return String.class;
    }

    public String getColumnName(int column) {
        return columns[column];
    }

    public int getRowCount() {
        return files.length;
    }

    public File getFile(int row) {
        return files[row];
    }

    public void setFiles(File[] files) {
        this.files = fileFilter(files);
        fireTableDataChanged();
    }

    //过滤文件和文件夹
    public File[] fileFilter(File[] files){
        ArrayList<File> listFile = new ArrayList<File>();
        List<File> list = Arrays.asList(files);
        for (Iterator<File> iter = list.iterator(); iter.hasNext();) {
            File file = iter.next();
            if(file.isFile()){
                String fileType= PropertiesUtil.getValueBykey("fileType");
                if(!"".equals(fileType)){
                    String name =file.getName().toLowerCase();
                    String fileFilter[]=fileType.toLowerCase().split(",");
                    if(fileFilter.length>0 ){
                        if(ExtensionFilter(name,fileFilter)){
                            listFile.add(file);
                        }
                    }else{
                        listFile.add(file);
                    }
                }else{
                    listFile.add(file);
                }
            }else{
                if(!file.getAbsolutePath().contains("::")){
                    listFile.add(file);
                }
            }
        }

        int len = listFile.size();
        return listFile.toArray(new File[len]);
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
}
