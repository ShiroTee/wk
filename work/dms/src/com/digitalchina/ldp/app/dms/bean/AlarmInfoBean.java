package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;
import java.util.UUID;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "ALARMINFO")
public class AlarmInfoBean implements java.io.Serializable
{
	@Column(name = "ID")
	private String id;
	@Column(name = "PROJECTID")
	private String projectId;
	private String alarmType;// 告警类型

	public AlarmInfoBean()
	{
		this.id = UUID.randomUUID().toString();
		this.alarmDate = new Date();

	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public String getProjectId()
	{
		return projectId;
	}

	public void setProjectId(String projectId)
	{
		this.projectId = projectId;
	}

	public String getAlarmType()
	{
		return alarmType;
	}

	public void setAlarmType(String alarmType)
	{
		this.alarmType = alarmType;
	}

	public Date getAlarmDate()
	{
		return alarmDate;
	}

	public void setAlarmDate(Date alarmDate)
	{
		this.alarmDate = alarmDate;
	}

	public String getErrorMsg()
	{
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg)
	{
		this.errorMsg = errorMsg;
	}

	@Column(name = "COLLECTDATE")
	private Date alarmDate;// 告警时间
	@Column(name = "ERRORMSG")
	private String errorMsg;// 告警消息
}
