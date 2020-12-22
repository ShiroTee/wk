package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "PROJECTINFO")
public class ProjectInfo implements Cloneable
{
	@Column(name = "ID")
	private String id;// ID
	@Column(name = "NAME")
	private String name;// 主机名称
	@Column(name = "TYPE")
	private String type; // 监控类型数据库,Windows,Linux
	@Column(name = "SYSDESC")
	private String sysDesc; // 系统描述
	@Column(name = "IPADDRESS")
	private String ipAddress; // ip地址
	@Column(name = "USERNAME")
	private String userName; // 用户名,如果监控类型为服务器则user为snmp用户名,如果为数据库则为数据库用户名
	@Column(name = "PASSWORD")
	private String password;// 密码
	@Column(name = "HOSTPORT")
	private Integer hostPort;// 主机端口
	@Column(name = "DATABASENAME")
	private String dataBaseName; // 数据库名称
	@Column(name = "STATUS")
	private String status; // 监控状态.Y为正在监控,N为停止监控
	@Column(name = "COLLECTDATE")
	private Date collectDate;// 采集时间
	@Column(name = "WARNINGSTATUS")
	private String warningStatus; // Y为正在告警,N为正常状态
	@Column(name = "ERRORMSG")
	private String errorMsg; // 告警消息
	@Column(name = "FREQUENCY")
	private Integer frequency; // 监控频率
	@Column(name = "NETSTATUS")
	private String netStatus; // Y为正常,N为异常
	@Column(name = "DATABASEPORT")
	private Integer dataBasePort; // 数据库端口
	@Column(name = "DBSTATUS")
	private String dbStatus; // 数据库连接状况：Y为正常,N为异常

	public Integer getDataBasePort()
	{
		return dataBasePort;
	}

	public void setDataBasePort(Integer dataBasePort)
	{
		this.dataBasePort = dataBasePort;
	}

	public String getDbStatus()
	{
		return dbStatus;
	}

	public void setDbStatus(String dbStatus)
	{
		this.dbStatus = dbStatus;
	}

	public String getNetStatus()
	{
		return netStatus;
	}

	public void setNetStatus(String netStatus)
	{
		this.netStatus = netStatus;
	}

	public Date getCollectDate()
	{
		return collectDate;
	}

	public void setCollectDate(Date collectDate)
	{
		this.collectDate = collectDate;
	}

	public String getErrorMsg()
	{
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg)
	{
		this.errorMsg = errorMsg;
	}

	public Integer getFrequency()
	{
		return frequency;
	}

	public void setFrequency(Integer frequency)
	{
		this.frequency = frequency;
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
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

	public String getSysDesc()
	{
		return sysDesc;
	}

	public void setSysDesc(String sysDesc)
	{
		this.sysDesc = sysDesc;
	}

	public String getIpAddress()
	{
		return ipAddress;
	}

	public void setIpAddress(String ipAddress)
	{
		this.ipAddress = ipAddress;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public Integer getHostPort()
	{
		return hostPort;
	}

	public void setHostPort(Integer hostPort)
	{
		this.hostPort = hostPort;
	}

	public String getDataBaseName()
	{
		return dataBaseName;
	}

	public void setDataBaseName(String dataBaseName)
	{
		this.dataBaseName = dataBaseName;
	}

	@Override
	public Object clone()
	{
		Object o = null;
		try
		{
			o = super.clone();
		}
		catch (CloneNotSupportedException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return o;
	}

}
