package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Transient;

/**
 * 
 * 应用基本信息
 *
 */
public class ApplicationSimpleBean {
	
	@Transient
	private String appName;
	@Transient
	private String appType;
	
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getAppType() {
		return appType;
	}
	public void setAppType(String appType) {
		this.appType = appType;
	}
	
}
