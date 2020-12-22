package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Table(name="RES_ACCESS_LOG")
@Entity
public class AccessLogBean {

	@Id
	@Column(name="LOG_ID")
	private String logId;
	
	@Column(name="RES_TYPE")
	private String resType;
	
	@Column(name="RES_ID")
	private String resId;
	
	@Column(name="USER_ID")
	private String userId;
	
	@Column(name="ACCESS_TIME")
	private Date accessTime;

	
	
	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getResType() {
		return resType;
	}

	public void setResType(String resType) {
		this.resType = resType;
	}

	public String getResId() {
		return resId;
	}

	public void setResId(String resId) {
		this.resId = resId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Date getAccessTime() {
		return accessTime;
	}

	public void setAccessTime(Date accessTime) {
		this.accessTime = accessTime;
	}
}
