package com.digitalchina.ldp.app.osp.bean;

public class ServiceTestingBean {

	private String aipUrl;

	public String getAipUrl() {
		return aipUrl;
	}

	public void setAipUrl(String aipUrl) {
		this.aipUrl = aipUrl;
	}
	
	public ServiceTestingBean(String aipUrl){
		this.aipUrl = aipUrl;
	}
}
