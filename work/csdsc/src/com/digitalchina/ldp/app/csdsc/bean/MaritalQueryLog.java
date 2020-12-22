package com.digitalchina.ldp.app.csdsc.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * @author 陈超
 * 2014-8-7 上午10:34:58
 * RZID	VARCHAR2(32)	N			日志ID
DLRXM	VARCHAR2(20)	Y			代理人姓名
DLRZJLX	VARCHAR2(50)	Y			代理人证件类型
DLRZJHM	VARCHAR2(20)	Y			代理人证件号码
CZNR	VARCHAR2(1000)	Y			操作内容
CZR	VARCHAR2(20)	Y			操作人
CZSJ	DATE	Y			操作时间
CZRIP	VARCHAR2(16)	Y			操作人IP
 */
@Table(name="RK_HYCCJLB")
public class MaritalQueryLog {
	@Column(name="RZID")
	private String id;
	@Column(name="DLRXM")
	private String proxyName;
	@Column(name="DLRZJLX")
	private String proxyPapersType;
	@Column(name="DLRZJHM")
	private String proxyPapersNum;
	@Column(name="CZNR")
	private String operateContent;
	@Column(name="CZR")
	private String operatePeople;
	@Column(name="CZSJ")
	private Date operateTime;
	@Column(name="CZRIP")
	private String operateIp;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProxyName() {
		return proxyName;
	}
	public void setProxyName(String proxyName) {
		this.proxyName = proxyName;
	}
	public String getProxyPapersType() {
		return proxyPapersType;
	}
	public void setProxyPapersType(String proxyPapersType) {
		this.proxyPapersType = proxyPapersType;
	}
	public String getProxyPapersNum() {
		return proxyPapersNum;
	}
	public void setProxyPapersNum(String proxyPapersNum) {
		this.proxyPapersNum = proxyPapersNum;
	}
	public String getOperateContent() {
		return operateContent;
	}
	public void setOperateContent(String operateContent) {
		this.operateContent = operateContent;
	}
	public String getOperatePeople() {
		return operatePeople;
	}
	public void setOperatePeople(String operatePeople) {
		this.operatePeople = operatePeople;
	}
	public Date getOperateTime() {
		return operateTime;
	}
	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}
	public String getOperateIp() {
		return operateIp;
	}
	public void setOperateIp(String operateIp) {
		this.operateIp = operateIp;
	}
	
	

}

