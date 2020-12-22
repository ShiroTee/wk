package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;
import java.util.UUID;

import plugin.performance_monitor.util.StringUtils;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="RAMINFO")
public class RamInfoBean implements java.io.Serializable
{
	@Column(name="ID")
	private String id;// ID
	@Column(name="TOTALSIZE")
	private float size;// 内存总大小
	@Column(name="USESIZE")
	private float useSize;// 内存已使用大小
	@SuppressWarnings("unused")
	@Column(name="USAGE")
	private float usage;// 使用率
	@Column(name="PROJECTID")
	private String projectId;// 主机ID
	@Column(name="COLLECTDATE")
	private Date collectDate;// 采集时间
	@Column(name="WARNINGSTATUS")
	private String warningStatus; // Y正常，N不正常
	@Column(name="ERRORMSG")
	private String errorMsg; // 告警消息
	public RamInfoBean()
	{
		this.id=UUID.randomUUID().toString();
		this.collectDate=new Date();
	}
	public String getWarningStatus()
	{
		return warningStatus;
	}

	public void setWarningStatus(String warningStatus)
	{
		this.warningStatus = warningStatus;
	}

	public String getErrorMsg()
	{
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg)
	{
		this.errorMsg = errorMsg;
	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public float getSize()
	{
		String result = String.format("%.2f", size/1024/1024/1024);
		return StringUtils.toFloat(result);
	
	}

	public void setSize(float size)
	{
		this.size = size;
	}

	public float getUseSize()
	{
		String result = String.format("%.2f", useSize/1024/1024/1024);
		return StringUtils.toFloat(result);
		
	}

	public void setUseSize(float useSize)
	{
		this.useSize = useSize;
	}

	public float getUsage()
	{
		String result = String.format("%.2f", this.useSize/this.size);
		return StringUtils.toFloat(result);
	}

	public void setUsage(float usage)
	{
		this.usage = usage;
	}

	public Date getCollectDate()
	{
		return collectDate;
	}

	public void setCollectDate(Date collectDate)
	{
		this.collectDate = collectDate;
	}

	public String getProjectId()
	{
		return projectId;
	}

	public void setProjectId(String projectId)
	{
		this.projectId = projectId;
	}
}
