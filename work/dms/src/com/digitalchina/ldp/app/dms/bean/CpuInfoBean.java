package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;
import java.util.UUID;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="CPUINFO")
public class CpuInfoBean implements java.io.Serializable
{
	@Column(name="ID")
	private String id;// ID
	@Column(name="CPUUSAGE")
	private float cpuUsage; // CPU使用率
	@Column(name="PROJECTID")
	private String projectId;// 主机ID
	@Column(name="COLLECTDATE")
	private Date collectDate;// 采集时间
	@Column(name="WARNINGSTATUS")
	private String warningStatus; // Y正常，N不正常
	@Column(name="ERRORMSG")
	private String errorMsg; // 告警消息
	public CpuInfoBean()
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

	public float getCpuUsage()
	{
		return cpuUsage;
	}

	public void setCpuUsage(float cpuUsage)
	{
		this.cpuUsage = cpuUsage;
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
