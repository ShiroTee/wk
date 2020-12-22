package com.digitalchina.ldp.app.dms.service.impl.bean;

import java.util.Date;

/**
 * 
 * 类描述：查询的告警信息
 * 
 * @author: xiaojun
 * @date： 日期：2013-4-9 时间：下午02:26:44
 * @version 1.0
 */
public class AlarmInfo implements java.io.Serializable
{
	private String ID;// ID
	private String PROJECTID;// 主机ID
	private String HOSTNAME;// 主机名称
	private String IPADDRESS; // IP地址
	private String ALARMTYPE; // 告警的类型
	private String COLLECTDATE;// 采集时间
	private String ERRORMSG; // 告警消息

	public String getID()
	{
		return ID;
	}

	public void setID(String iD)
	{
		ID = iD;
	}

	public String getPROJECTID()
	{
		return PROJECTID;
	}

	public void setPROJECTID(String pROJECTID)
	{
		PROJECTID = pROJECTID;
	}

	public String getHOSTNAME()
	{
		return HOSTNAME;
	}

	public void setHOSTNAME(String hOSTNAME)
	{
		HOSTNAME = hOSTNAME;
	}

	public String getIPADDRESS()
	{
		return IPADDRESS;
	}

	public void setIPADDRESS(String iPADDRESS)
	{
		IPADDRESS = iPADDRESS;
	}

	public String getALARMTYPE()
	{
		return ALARMTYPE;
	}

	public void setALARMTYPE(String aLARMTYPE)
	{
		ALARMTYPE = aLARMTYPE;
	}

	public String getCOLLECTDATE()
	{
		return COLLECTDATE;
	}

	public void setCOLLECTDATE(String cOLLECTDATE)
	{
		COLLECTDATE = cOLLECTDATE;
	}

	public String getERRORMSG()
	{
		return ERRORMSG;
	}

	public void setERRORMSG(String eRRORMSG)
	{
		ERRORMSG = eRRORMSG;
	}
	public static void main(String[] args)
	{
		System.out.println(new Date().getTime());
	}
}
