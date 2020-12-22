package com.digitalchina.ftpclient.model;

import com.digitalchina.ftpclient.model.bean.FileBean;
import com.digitalchina.ftpclient.model.bean.FtpInfoBean;

import javax.swing.filechooser.FileSystemView;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.io.File;
import java.util.Vector;

/**
* 类描述：程序模型类，用于保存和更新程序中的数据
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/

public class Model {

    //模型成员变量
    private String localPath;//本地文件路径
    private Vector<FileBean> localFiles; //本地文件列表
    private String remotePath;//服务器文件路径
    private Vector<FileBean> remoteFiles; //服务器文件列表
    private FtpInfoBean ftpInfoBean;//存放一个有效的Ftp用户信息
    private String lastLogInfo;//最近一次操作文件的记录
    
    
    private String dataType;//上传数据类型
    private String orgName;//委办局
    
    private String orgInitial;//委办局首字母
    private String orgID;//委办局组织机构代码
  
    //操作参数
    private boolean uploadNeedConfirm =true;//上传是否需要确认，true需要，false不需要
    
    private PropertyChangeSupport pcSupport = new PropertyChangeSupport(this); //属性变更支持，用于更新视图层数据
    
    //构造方法
    public Model() {
    }

    
    
    //getter & setter
    public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

    public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getOrgInitial() {
		return orgInitial;
	}

	public void setOrgInitial(String orgInitial) {
		this.orgInitial = orgInitial;
	}

	public String getOrgID() {
		return orgID;
	}

	public void setOrgID(String orgID) {
		this.orgID = orgID;
	}

    public Vector<FileBean> getLocalFiles() {
        return localFiles;
    }

    public void setLocalFiles(Vector<FileBean> localFiles) {
        Vector<FileBean> oldValue = this.localFiles;
        this.localFiles = localFiles;
        pcSupport.firePropertyChange("localFiles" , oldValue , localFiles);
    }

    //如果没有获取路径则获取桌面
    public String getLocalPath() {
        FileSystemView fsv = FileSystemView.getFileSystemView();
        File desk=fsv.getHomeDirectory();
        return "".equals(localPath)?desk.getPath():localPath;
    }

    public void setLocalPath(String localPath) {
        String oldValue = this.localPath;
        this.localPath = localPath;
        pcSupport.firePropertyChange("localPath", oldValue, localPath);        
    }

    public Vector<FileBean> getRemoteFiles() {
        return remoteFiles;
    }

    public void setRemoteFiles(Vector<FileBean> remoteFiles) {
        Vector<FileBean> oldValue = this.remoteFiles;
        this.remoteFiles = remoteFiles;       
        pcSupport.firePropertyChange("remoteFiles", oldValue, remoteFiles);            
    }

    public String getRemotePath() {
        return remotePath;
    }

    public void setRemotePath(String remotePath) {
        String oldValue = this.remotePath;
        this.remotePath = remotePath;
        pcSupport.firePropertyChange("remotePath", oldValue, remotePath);
    }

    public FtpInfoBean getFtpInfoBean() {
        return ftpInfoBean;
    }

    public void setFtpInfoBean(FtpInfoBean ftpInfoBean) {
        this.ftpInfoBean = ftpInfoBean;
    }

    public String getLastLogInfo() {
        return lastLogInfo;
    }

    public void setLastLogInfo(String lastLogInfo) {
        String oldValue = this.lastLogInfo;        
        this.lastLogInfo = lastLogInfo;
        pcSupport.firePropertyChange("lastLogInfo", oldValue, lastLogInfo);
    }

    public boolean isUploadNeedConfirm() {
        return uploadNeedConfirm;
    }

    public void setUploadNeedConfirm(boolean uploadNeedConfirm) {
        this.uploadNeedConfirm = uploadNeedConfirm;
    }        

    //提供 public 方法用来给其他类添加 PropertyChangeListener
    public void addPropertyChangeListener(PropertyChangeListener listener) {
        pcSupport.addPropertyChangeListener(listener);        
    }        
    
}

