package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Transient;

/**
 * 此类主要用于服务列表的基本信息的展示，在服务列表中，不需要将服务详情全部传递给列表
 * 
 * 只需要传递基本的服务名称和服务描述即可
 * 
 * */

public class ServiceSimpleBean {

	@Transient
	private String serviceName;
	
	@Transient
	private String serviceDesc;
	
	@Transient
	private Integer invokeCount;
	
	@Transient
	private Date lastInvoteDate;

	public Integer getInvokeCount() {
		return invokeCount;
	}

	public void setInvokeCount(Integer invokeCount) {
		this.invokeCount = invokeCount;
	}

	public Date getLastInvoteDate() {
		return lastInvoteDate;
	}

	public void setLastInvoteDate(Date lastInvoteDate) {
		this.lastInvoteDate = lastInvoteDate;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServiceDesc() {
		return serviceDesc;
	}

	public void setServiceDesc(String serviceDesc) {
		this.serviceDesc = serviceDesc;
	}
}
