package com.jeecms.resourceCategory.dao;


import com.jeecms.resourceCategory.bean.FileBean;
import com.jeecms.resourceCategory.bean.FtpInfoBean;
import com.jeecms.resourceCategory.util.FileUtil;
import com.jeecms.resourceCategory.util.FtpUtil;
import com.jeecms.resourceCategory.util.PropertiesUtil;
import org.springframework.stereotype.Component;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;


/**
* 类描述：程序控制器类，包含视图需要调用的方法
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/
@Component
public class FtpDaoImpl implements FtpDao {

    @Override
    public boolean ExtensionFilter(String name,String [] fileFilter ){
    	for(int j = 0; j < fileFilter.length; j++){
           if(name.endsWith(fileFilter[j])){
        	   return true;
            }
        }
    	 return false;
    }
    @Override
    public String getNewFileName(String oldFileName){
    	
    	 SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");//设置日期格式
         String sysdate=df.format(new Date());
         String fileType=oldFileName.substring(oldFileName.lastIndexOf("."),oldFileName.length());
         
         String tempfilename=oldFileName.substring(0,oldFileName.lastIndexOf("."));
         String newFileName =tempfilename+"_"+sysdate+fileType;

    	 return newFileName;
    }
    @Override
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
    @Override
    public String uploadLocalFile(FileBean fb,FtpInfoBean ftpInfoBean,String path,String newFileName){

        try {
	         String  tempFile = PropertiesUtil.base+File.separator+fb.getName();
	         
			 FtpUtil.uploadFile(ftpInfoBean, fb, tempFile, newFileName,path);//直接覆盖
			 FileUtil.delFile(tempFile);
	         //refreshRemoteFiles(ftpInfoBean,fb.getPath());
	         return "OK";
		} catch (Exception e) {
			return  "上传发生错误";
		}
      }


    //初始化服务器侧 JList
    @Override
    public Map<String,Object> initRemoteFiles() {
        Map<String,Object> map =new HashMap<String, Object>();
        Vector<FileBean> listData = new Vector<FileBean>();
        FileBean fb = new FileBean();
        fb.setName("请连接FTP服务器...");
        fb.setType(FileBean.FileType.info);
        listData.add(fb);
        map.put("file",listData);
        map.put("path",".");
        //设置list数据
        return map;
    }


    //登陆ftp服务器，获得服务器文件列表
    @Override
    public Map<String,Object> loginRemoteServer(FtpInfoBean ftpInfoBean) {
        Map<String,Object> map =new HashMap<String, Object>();
        //如果测试连接成功
        if (FtpUtil.isValid(ftpInfoBean)) {
           //保存ftp登录信息到模型中
            Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpInfoBean, null);//服务器文件列表
            map.put("file",listData);
            map.put("path",".");

        } //如果测试连接不成功，更新JList数据
        else {
            Vector<FileBean> listData = new Vector<FileBean>();
            FileBean fb = new FileBean();
            fb.setName("连接失败...");
            fb.setType(FileBean.FileType.info);
            listData.add(fb);
            map.put("file",listData);
        }
        return map;
    }
    //刷新服务器文件列表
    @Override
    public Map<String,Object> refreshRemoteFiles(FtpInfoBean ftpInfoBean,String path) {
        Map<String,Object> map =new HashMap<String, Object>();
            Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpInfoBean, path);
        map.put("file",listData);
        map.put("path",path);

        return map;
    }

    //下载文件到本地
    @Override
    public boolean downloadRemoteFile(FileBean fb, FtpInfoBean ftpInfoBean ,String localPath) {

        System.out.println(localPath);
        FtpUtil.downloadFile(ftpInfoBean, localPath, fb);
        return true;
    }

    //打开服务器文件夹
    @Override
    public Map<String,Object> openRemoteFolder(FileBean fb,FtpInfoBean ftpInfoBean) {
        Map<String,Object> map =new HashMap<String, Object>();
        String separator = "/";
        String remotePath = fb.getPath();
        if (remotePath.equals(separator)) {
            remotePath = remotePath + fb.getName();
        } else {
            remotePath = fb.getPath() + separator + fb.getName();
        }
        Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpInfoBean, remotePath);
        map.put("file",listData);
        map.put("path",remotePath);

        return map;
    }

    //服务器文件路径向上
    @Override
    public Map<String,Object> remoteUpper(FtpInfoBean ftpInfoBean ,String remotePath) {
        Map<String,Object> map =new HashMap<String, Object>();
        String separator = "/";
        int pos = remotePath.lastIndexOf(separator);
        if (pos > 0) {
            remotePath = remotePath.substring(0, pos);
        } else {
            remotePath = remotePath.substring(0, pos + 1);
        }
        Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpInfoBean, remotePath);

        map.put("file",listData);
        map.put("path",remotePath);

        return map;
    }

    //断开连接
    @Override
    public void remoteDisconnect() {

        FtpUtil.disconnectFromServer();
    }

    //删除服务器端文件
    @Override
    public Boolean deleteRemoteFile(FileBean fb,FtpInfoBean ftpInfoBean) {
        if (ftpInfoBean != null) {
          return  FtpUtil.deleteFile(ftpInfoBean, fb);
        }

        return false;
    }
}
