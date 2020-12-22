package com.jeecms.resourceCategory.dao;

import com.jeecms.resourceCategory.bean.FileBean;
import com.jeecms.resourceCategory.bean.FtpInfoBean;

import java.io.File;
import java.util.Map;


/**
* 类描述：程序控制器类，包含视图需要调用的方法
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/

public interface FtpDao {

    public boolean ExtensionFilter(String name, String[] fileFilter);

    public String getNewFileName(String oldFileName);

    public FileBean fileToFileBean(File file);

    //上传文件，成功返回true.如果未连接或上传失败，返回false
    public String uploadLocalFile(FileBean fb, FtpInfoBean ftpInfoBean,String path,String newFileName);

    //初始化服务器侧 JList
    public Map<String,Object> initRemoteFiles();

    //登陆ftp服务器，获得服务器文件列表
    public Map<String,Object> loginRemoteServer(FtpInfoBean ftpInfoBean) ;

    //刷新服务器文件列表
    public Map<String,Object> refreshRemoteFiles(FtpInfoBean ftpInfoBean, String path) ;


    //下载文件到本地
    public boolean downloadRemoteFile(FileBean fb, FtpInfoBean ftpInfoBean, String localPath);

    //打开服务器文件夹
    public Map<String,Object>  openRemoteFolder(FileBean fb, FtpInfoBean ftpInfoBean);

    //服务器文件路径向上
    public Map<String,Object> remoteUpper(FtpInfoBean ftpInfoBean, String remotePath);

    //断开连接
    public void remoteDisconnect() ;

    //删除服务器端文件
    public Boolean deleteRemoteFile(FileBean fb, FtpInfoBean ftpInfoBean);
}
