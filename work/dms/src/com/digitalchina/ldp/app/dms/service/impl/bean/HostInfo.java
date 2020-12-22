package com.digitalchina.ldp.app.dms.service.impl.bean;

/**
 * 
 * 类描述：查询的主机信息
 * 
 * @author: xiaojun
 * @date： 日期：2013-4-9 时间：下午02:26:44
 * @version 1.0
 */
public class HostInfo implements java.io.Serializable
{
	private String ID;// ID
	private String NAME;// 主机名称
	private String TYPE; // 监控类型数据库,WINDOWS,LINUX
	private String SYSDESC; // 系统描述
	private String IPADDRESS; // IP地址
	private String USERNAME; // 用户名,如果监控类型为服务器则USER为SNMP用户名,如果为数据库则为数据库用户名
	private String PASSWORD;// 密码
	private String HOSTPORT;// 端口
	private String DATABASENAME; // 数据库名称
	private String STATUS; // 监控状态.Y为正在监控,N为停止监控
	private String COLLECTDATE;// 采集时间
	private String WARNINGSTATUS; // Y为正在告警,N为正常状态
	private String ERRORMSG; // 告警消息
	private String FREQUENCY; // 监控频率
	private String NETSTATUS; // 网络状况
	private String DATABASEPORT; // 数据库端口
	private String DBSTATUS; // 数据库连接状况

	public String getDATABASEPORT()
	{
		return DATABASEPORT;
	}

	public void setDATABASEPORT(String dATABASEPORT)
	{
		DATABASEPORT = dATABASEPORT;
	}

	public String getDBSTATUS()
	{
		return DBSTATUS;
	}

	public void setDBSTATUS(String dBSTATUS)
	{
		DBSTATUS = dBSTATUS;
	}

	public String getNETSTATUS()
	{
		return NETSTATUS;
	}

	public void setNETSTATUS(String nETSTATUS)
	{
		NETSTATUS = nETSTATUS;
	}

	public String getID()
	{
		return ID;
	}

	public void setID(String iD)
	{
		ID = iD;
	}

	public String getNAME()
	{
		return NAME;
	}

	public void setNAME(String nAME)
	{
		NAME = nAME;
	}

	public String getTYPE()
	{
		return TYPE;
	}

	public void setTYPE(String tYPE)
	{
		TYPE = tYPE;
	}

	public String getSYSDESC()
	{
		return SYSDESC;
	}

	public void setSYSDESC(String sYSDESC)
	{
		SYSDESC = sYSDESC;
	}

	public String getIPADDRESS()
	{
		return IPADDRESS;
	}

	public void setIPADDRESS(String iPADDRESS)
	{
		IPADDRESS = iPADDRESS;
	}

	public String getUSERNAME()
	{
		return USERNAME;
	}

	public void setUSERNAME(String uSERNAME)
	{
		USERNAME = uSERNAME;
	}

	public String getPASSWORD()
	{
		return PASSWORD;
	}

	public void setPASSWORD(String pASSWORD)
	{
		PASSWORD = pASSWORD;
	}

	public String getDATABASENAME()
	{
		return DATABASENAME;
	}

	public void setDATABASENAME(String dATABASENAME)
	{
		DATABASENAME = dATABASENAME;
	}

	public String getSTATUS()
	{
		return STATUS;
	}

	public void setSTATUS(String sTATUS)
	{
		STATUS = sTATUS;
	}

	public String getWARNINGSTATUS()
	{
		return WARNINGSTATUS;
	}

	public void setWARNINGSTATUS(String wARNINGSTATUS)
	{
		WARNINGSTATUS = wARNINGSTATUS;
	}

	public String getERRORMSG()
	{
		return ERRORMSG;
	}

	public void setERRORMSG(String eRRORMSG)
	{
		ERRORMSG = eRRORMSG;
	}

	public String getHOSTPORT()
	{
		return HOSTPORT;
	}

	public void setHOSTPORT(String hOSTPORT)
	{
		HOSTPORT = hOSTPORT;
	}

	public String getCOLLECTDATE()
	{
		return COLLECTDATE;
	}

	public void setCOLLECTDATE(String cOLLECTDATE)
	{
		COLLECTDATE = cOLLECTDATE;
	}

	public String getFREQUENCY()
	{
		return FREQUENCY;
	}

	public void setFREQUENCY(String fREQUENCY)
	{
		FREQUENCY = fREQUENCY;
	}

}
