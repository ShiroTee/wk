package com.digitalchina.ldp.app.csdsc.bean;

import java.io.Serializable;

import javax.persistence.Column;

/**
 *
 */
public class PerInfoBean implements Serializable{

	private static final long serialVersionUID = -6945081305662270954L;
	@Column(name="USER_ID")
	private String userId;             //证件类型：
	@Column(name="USER_LOGIN_NAME")
	private String loginName;              //登陆名：
	@Column(name="USER_NAME")
	private String userName;               //姓名
	@Column(name="USER_PHONE")
	private String userPhone;            //原始密码：
	@Column(name="ORG_NM")
	private String orgName;//机构名：
	@Column(name="USER_ADDRESS")
	private  String userAddress;       //用户所在地址
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}
}
