package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;
import java.util.UUID;

import plugin.performance_monitor.util.StringUtils;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="DISKINFO")
public class DiskInfoBean implements java.io.Serializable
{
	@Column(name="ID")
	private String id;// ID
	@Column(name="NAME")
	private String name;// 名称
	@Column(name="TOTALSIZE")
	private float size;// 磁盘大小
	@Column(name="USESIZE")
	private float useSize;// 已使用
	@SuppressWarnings("unused")
	@Column(name="USEAGE")
	private float useage;// 使用率
	@Column(name="PROJECTID")
	private String projectId;// 主机ID
	@Column(name="COLLECTDATE")
	private Date collectDate;// 采集时间
	@Column(name="WARNINGSTATUS")
	private String warningStatus; // Y正常，N不正常
	@Column(name="ERRORMSG")
	private String errorMsg; // 告警消息
	public DiskInfoBean()
	{
		this.id=UUID.randomUUID().toString();
		this.collectDate=new Date();
		this.errorMsg="";
	}
	public Date getCollectDate()
	{
		return collectDate;
	}

	public void setCollectDate(Date collectDate)
	{
		this.collectDate = collectDate;
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
		return errorMsg.replace("\\", "/");
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

	public String getName()
	{
		
		return name.replace("\\", "/");
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public float getSize()
	{
		String result = String.format("%.2f",this.size/1024/1024/1024);
		return StringUtils.toFloat(result);
		
	}

	public void setSize(float size)
	{
		this.size = size;
	}

	public float getUseSize()
	{
		String result = String.format("%.2f",this.useSize/1024/1024/1024);
		return StringUtils.toFloat(result);
		
	}

	public void setUseSize(float useSize)
	{
		this.useSize = useSize;
	}

	public float getUseage()
	{
		String result = String.format("%.2f", this.useSize/this.size);
		return StringUtils.toFloat(result);
	}

	public void setUseage(float useage)
	{
		this.useage = useage;
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
