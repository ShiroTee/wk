package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;
import java.util.UUID;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "DATABASEINFO")
public class DataBaseInfoBean implements java.io.Serializable
{
	@Column(name = "ID")
	private String id;// ID
	@Column(name = "PROJECTID")
	private String projectId;// 主机ID
	@Column(name = "MAXCOLLECTION")
	private Integer maxCollection; // 最大连接数
	@Column(name = "CURRENTCOLLECTION")
	private Integer currentCollection; // 当前连接数
	@Column(name = "STATUS")
	private String status; // 状态
	@Column(name = "COLLECTDATE")
	private Date collectDate;// 采集时间
	@Column(name = "WARNINGSTATUS")
	private String warningStatus; // Y正常，N不正常
	@Column(name = "ERRORMSG")
	private String errorMsg; // 告警消息

	public DataBaseInfoBean()
	{
		this.id = UUID.randomUUID().toString();
		this.collectDate = new Date();
	}

	public Date getCollectDate()
	{
		return collectDate;
	}

	public String getProjectId()
	{
		return projectId;
	}

	public void setProjectId(String projectId)
	{
		this.projectId = projectId;
	}

	public void setCollectDate(Date collectDate)
	{
		this.collectDate = collectDate;
	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public Integer getMaxCollection()
	{
		return maxCollection;
	}

	public void setMaxCollection(Integer maxCollection)
	{
		this.maxCollection = maxCollection;
	}

	public Integer getCurrentCollection()
	{
		return currentCollection;
	}

	public void setCurrentCollection(Integer currentCollection)
	{
		this.currentCollection = currentCollection;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status;
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

}
