package com.digitalchina.ldp.app.csdsc.bean;

import java.util.Date;

import javax.persistence.Column;

/**
 * @author 陈超
 * 2014-7-16 上午09:55:05
 */
/*
 * 法人信息
 * Name	Code	Data Type	Length	Precision	Primary	Foreign Key	Mandatory
法人标识	FRBS	CHAR(32)	32		FALSE	FALSE	FALSE
法人名称	FRMC	VARCHAR2(100)	100		FALSE	FALSE	FALSE
工商注册号	GSZCH	VARCHAR2(20)	20		FALSE	FALSE	FALSE
组织机构代码	ZZJGDM	VARCHAR2(20)	20		FALSE	FALSE	FALSE
成立日期	CLRQ	DATE			FALSE	FALSE	FALSE
营业期限起	YYQXQ	DATE			FALSE	FALSE	FALSE
营业期限止	YYQXZ	DATE			FALSE	FALSE	FALSE
法人类型	FRLX	VARCHAR2(20)	20		FALSE	FALSE	FALSE
法人住所	FRZS	VARCHAR2(200)	200		FALSE	FALSE	FALSE
隶属单位	LSDW	VARCHAR2(100)	100		FALSE	FALSE	FALSE
行政区划	XZQH	VARCHAR2(50)	50		FALSE	FALSE	FALSE
注册资本	ZCZB	VARCHAR2(20)	20		FALSE	FALSE	FALSE
所属行业	SSXY	VARCHAR2(50)	50		FALSE	FALSE	FALSE
经济类型	JJLX	VARCHAR2(50)	50		FALSE	FALSE	FALSE
发照机关	FZJG	VARCHAR2(100)	100		FALSE	FALSE	FALSE
发照日期	FZRQ	DATE			FALSE	FALSE	FALSE
 * 、、、、、、、、、、、
 */
public class LegalPersonInfoBean {  
	@Column(name="FRMC")
	private String orgName;            //机构名称
	@Column(name="FRGM")
	private String regOrgName;         //注册或者登记机构名称-- 法人规模
	@Column(name="ZZJGDM")
	private String orgCode;            //组织机构代码
	@Column(name="GSZCH")
	private String regNumber;          //注册或登记号
	@Column(name="CLRQ")
	private Date registerDate;       //成立日期
	@Column(name="YYQXQ")
	private Date startDate;			//营业期限起
	@Column(name="YYQXZ")
	private Date endDate;			//营业期限至
	@Column(name="FRZT")
	private String busnissTime;        //营业期限 --法人状态
	@Column(name="FDDBR")
	private String buildWay;           //设立方式--法定代表人
	@Column(name="FRDBZJHM")
	private String unit;               //隶属单位--法定代表人身份证号
	@Column(name="FRLXMC")
	private String legalPersonType;    //法人类型
	@Column(name="FRLXMC")
	private String orgType;            //机构类型
	@Column(name="ZXRQ")
	private Date logoutDate;         //注销日期
	@Column(name="FRZS")
	private String orgAddress;         //机构住所
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getRegOrgName() {
		return regOrgName;
	}
	public void setRegOrgName(String regOrgName) {
		this.regOrgName = regOrgName;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getRegNumber() {
		return regNumber;
	}
	public void setRegNumber(String regNumber) {
		this.regNumber = regNumber;
	}
	 
	public String getBusnissTime() {
		return busnissTime;
	}
	public void setBusnissTime(String busnissTime) {
		this.busnissTime = busnissTime;
	}
	public String getBuildWay() {
		return buildWay;
	}
	public void setBuildWay(String buildWay) {
		this.buildWay = buildWay;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getLegalPersonType() {
		return legalPersonType;
	}
	public void setLegalPersonType(String legalPersonType) {
		this.legalPersonType = legalPersonType;
	}
	public String getOrgType() {
		return orgType;
	}
	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}
	 
	public String getOrgAddress() {
		return orgAddress;
	}
	public void setOrgAddress(String orgAddress) {
		this.orgAddress = orgAddress;
	}
	public Date getRegisterDate() {
		return registerDate;
	}
	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}
	public Date getLogoutDate() {
		return logoutDate;
	}
	public void setLogoutDate(Date logoutDate) {
		this.logoutDate = logoutDate;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	
	
	

}

