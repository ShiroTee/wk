package com.digitalchina.common.util;

import com.enterprisedt.net.ftp.FTPConnectMode;
import com.enterprisedt.net.ftp.FTPException;
import com.enterprisedt.net.ftp.FTPFile;
import com.enterprisedt.net.ftp.FTPTransferType;
import com.enterprisedt.net.ftp.FileTransferClient;
import com.enterprisedt.util.debug.Level;
import com.enterprisedt.util.debug.Logger;
import com.digitalchina.ftpclient.model.bean.FileBean;
import com.digitalchina.ftpclient.model.bean.FtpInfoBean;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.Vector;

/**
* 类描述：Ftp 工具类
* 创建人：luo
* 创建时间：2014-7-3
* @version    
*/
 
public class FtpUtil {

    private static final Logger log = Logger.getLogger(FtpUtil.class);
    private static FileTransferClient ftp = null;
    private static String currentPath;

    //连接服务器，如果连接成功返回true
    public static boolean connectToServer(FtpInfoBean ftpInfoBean) {
        Logger.setLevel(Level.INFO);
        try {
          
            log.info("Creating FTP client");
            ftp = new FileTransferClient();
            log.info("Setting remote host");
            ftp.setRemoteHost(ftpInfoBean.getIp());//Ip
            ftp.setUserName(ftpInfoBean.getUsername());//用户名
            ftp.setPassword(ftpInfoBean.getPassword());//密码
            if(ftpInfoBean.getPort()>0)
               ftp.setRemotePort(ftpInfoBean.getPort());//设置端口
            ftp.setContentType(FTPTransferType.BINARY);//
            ftp.getAdvancedFTPSettings().setConnectMode(FTPConnectMode.PASV);//被动模式            
            ftp.getAdvancedSettings().setControlEncoding("gb2312");//设置编码
               
            log.info("Connecting to server " + ftpInfoBean.getIp());
            ftp.connect();
            log.info("Connected and logged in to server " + ftpInfoBean.getIp());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    //立即断开服务器连接
    public static void disconnectFromServer() {
        if (ftp.isConnected()) {
            try {
                ftp.disconnect(true);
            } catch (FTPException ex) {
                java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
            } catch (IOException ex) {
                java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
            }
        }
    }

    //获得 ftp 服务器文件列表
    public static FTPFile[] getFileList(FtpInfoBean ftpInfoBean, String remotePath) {
        Logger.setLevel(Level.INFO);
        FTPFile[] files = null;
        try {
            boolean isConnected = true;
            //如果连接为空或者断开，则重新连接
            if (ftp == null || !ftp.isConnected()) {
                isConnected = connectToServer(ftpInfoBean);
            }
            //连接正常后获取文件列表
            if (isConnected) {
                log.info("Getting current directory listing");
                if (StringUtil.isEmpty(remotePath)) {
                    files = ftp.directoryList(".");
                    currentPath = "/";
                } else {
                    currentPath = remotePath;
                    files = ftp.directoryList(remotePath);

                }
                // Shut down client
                log.info("Quitting client");
                ftp.disconnect();
                log.info("Example1SimpleMenu complete");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return files;
    }

    //去除不可操作类型，根据FTPFile[] 返回 List<FileBean>
    public static Vector<FileBean> trim(FTPFile[] files) {
        Vector<FileBean> listData = new Vector<FileBean>();
        Vector<FileBean> folderData = new Vector<FileBean>();
        Vector<FileBean> fileData = new Vector<FileBean>();
        for (int i = 0; i < files.length; i++) {
            FileBean fileBean = new FileBean();
            FTPFile ftpFile = files[i];
            if (isOperable(ftpFile)) {
                fileBean.setName(ftpFile.getName());
                fileBean.setPath(currentPath);
                fileBean.setSize(ftpFile.size());
                if (ftpFile.isDir()) {
                    fileBean.setType(FileBean.FileType.folder);
                    folderData.add(fileBean);
                } else {
                    fileBean.setType(FileBean.FileType.file);
                    fileData.add(fileBean);
                }
                fileBean.setLastModified(ftpFile.lastModified());

            }
        }
        listData.addAll(folderData);//按先文件夹，后文件的顺序排序
        listData.addAll(fileData);
        return listData;
    }

    //根据用户信息和文件路径，直接获得经过转换后的FileBean集合
    public static Vector<FileBean> getTrimedFileList(FtpInfoBean ftpInfoBean, String remotePath) {
        return trim(getFileList(ftpInfoBean, remotePath));
    }

    //判断文件是否能被用户进行简单操作
    private static boolean isOperable(FTPFile ftpFile) {
        String filename = ftpFile.getName();
        if (filename.equals(".") || filename.equals("..")) {
            return false;
        }
        return true;
    }

    //判断用户登录信息是否有效
    public static boolean isValid(FtpInfoBean ftpInfoBean) {
        return connectToServer(ftpInfoBean);
    }

    //上传文件到服务器
    public static void uploadFile(FtpInfoBean ftpInfoBean, FileBean fileBean,
            String localFileName, String remoteFileName) {
        Logger.setLevel(Level.INFO);
        boolean isConnected = true;
        //如果连接为空或者断开，则重新连接
        try {
            if (ftp == null || !ftp.isConnected()) {
                isConnected = connectToServer(ftpInfoBean);
            }
            //连接正常后上传文件
            if (isConnected) {
                log.info("Uploading file");
                ftp.changeDirectory(currentPath);
                ftp.uploadFile(localFileName, remoteFileName);
                log.info("File uploaded");
            }
        } catch (FTPException ex) {
            java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
    }

    //删除文件或文件夹
    public static void deleteFile(FtpInfoBean ftpInfoBean, FileBean fileBean) {
        Logger.setLevel(Level.INFO);
        boolean isConnected = true;
        try {
            if (ftp == null || !ftp.isConnected()) {
                isConnected = connectToServer(ftpInfoBean);
            }
            if (isConnected) {
                if (fileBean.getType().equals(FileBean.FileType.file)) {
                    ftp.changeDirectory(currentPath);
                    ftp.deleteFile(fileBean.getName());
                } else if (fileBean.getType().equals(FileBean.FileType.folder)) {
                    String relatePath = currentPath + "/" + fileBean.getName();
                    FTPFile[] data = ftp.directoryList(relatePath);
                    if (trim(data).isEmpty()) {
                        ftp.changeDirectory(currentPath);
                        ftp.deleteDirectory(fileBean.getName());
                    };
                }
            }
        } catch (FTPException ex) {
            java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            java.util.logging.Logger.getLogger(FtpUtil.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
    }

    public static void downloadFile(FtpInfoBean ftpInfoBean, String localPath, FileBean fileBean) {
        Logger.setLevel(Level.INFO);
        boolean isConnected = true;
        try {
            if (ftp == null || !ftp.isConnected()) {
                isConnected = connectToServer(ftpInfoBean);
            }
            if (isConnected) {
            	
            	ftp.downloadFile(localPath+"/"+fileBean.getName(),currentPath+"/"+fileBean.getName());
            	
            }
        } catch (Exception ex) {
            
        } 
    }
}
