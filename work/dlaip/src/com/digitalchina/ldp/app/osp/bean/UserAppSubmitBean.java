package com.digitalchina.ldp.app.osp.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Table(name = "USER_APP_SUBMIT")
@Entity
public class UserAppSubmitBean extends ApplicationSimpleBean implements Serializable {

    @Id
    @Column(name = "SUB_ID", length = 36, nullable = false)
    private String subId;//提交id
    @Column(name = "USER_ID", length = 36)
    private String userId;//用户id
    @Column(name = "APP_ID", length = 36)
    private String appId;//应用id
    @Column(name = "SUB_TIME")
    private Date subTime;//提交时间
    @Column(name = "SUB_STATUS", length = 1)
    private String subStatus;//提交状态
    
    
	public String getSubId() {
		return subId;
	}
	public void setSubId(String subId) {
		this.subId = subId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public Date getSubTime() {
		return subTime;
	}
	public void setSubTime(Date subTime) {
		this.subTime = subTime;
	}
	public String getSubStatus() {
		return subStatus;
	}
	public void setSubStatus(String subStatus) {
		this.subStatus = subStatus;
	}
       
}
