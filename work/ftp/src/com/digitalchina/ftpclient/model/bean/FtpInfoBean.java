package com.digitalchina.ftpclient.model.bean;

/**
* 类描述：Ftp 登陆信息 bean
* 创建人：luo
* 创建时间：2014-7-8
* @version    
*/
 
public class FtpInfoBean {
    
    private String ip;// IP地址
    private String username; // 用户名
    private String password; // 密码
    private int port; // 密码
    //构造1
    public FtpInfoBean() {
    }

    //构造2
    public FtpInfoBean(String ip, String username, String password) {
        this.ip = ip;
        this.username = username;
        this.password = password;
    }        
    //构造3
    public FtpInfoBean(String ip, String username, String password,int port) {
        this.ip = ip;
        this.username = username;
        this.password = password;
        this.port=port;
        System.out.println("ip:"+ip+"---port:"+port+"---username:"+username+"--password:"+password);
    } 
    public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	//getter & setter
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }        
    
}
