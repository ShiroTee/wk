package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "ESB_ROUTE_LOG")
@Entity
public class UserInvokedService extends ServiceSimpleBean{
	@Id
	@Column(name="LOG_ID")
	private String logId;
	
	@Column(name="ROUTE_ID")
	private String serviceId;
	
	@Column(name="USER_ID")
	private String userId;
	
	@Column(name="ACCESS_DATE")
	private Date invokeDate;
	
	@Column(name="AUTH_ID")
	private String invokeKey;

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Date getInvokeDate() {
		return invokeDate;
	}

	public void setInvokeDate(Date invokeDate) {
		this.invokeDate = invokeDate;
	}

	public String getInvokeKey() {
		return invokeKey;
	}

	public void setInvokeKey(String invokeKey) {
		this.invokeKey = invokeKey;
	}
}
