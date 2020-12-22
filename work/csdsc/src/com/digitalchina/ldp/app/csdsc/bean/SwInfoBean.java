package com.digitalchina.ldp.app.csdsc.bean;


import java.util.Date;

import javax.persistence.Column;

/**
 * @author 张锋
 * 2015-7-17 下午03:57:03
 */
/*
 * x学校基本信息
 */
public class SwInfoBean {
	@Column(name="NSRMC")
	private String NSRMC;                   //纳税人名称
	@Column(name="NSRSBH")
	private String NSRSBH;                   //纳税人识别号
	@Column(name="ZGSWJG")
	private String ZGSWJG;                   //主管税务机关
	@Column(name="GDGHLX")
	private String GDGHLX;                   //国地管户类型
	@Column(name="NSRZT")
	private String NSRZT;                   //纳税人状态
	@Column(name="DJRQ")
	private Date DJRQ;                   //登记日期
	public String getNSRMC() {
		return NSRMC;
	}
	public void setNSRMC(String nSRMC) {
		NSRMC = nSRMC;
	}
	public String getNSRSBH() {
		return NSRSBH;
	}
	public void setNSRSBH(String nSRSBH) {
		NSRSBH = nSRSBH;
	}
	public String getZGSWJG() {
		return ZGSWJG;
	}
	public void setZGSWJG(String zGSWJG) {
		ZGSWJG = zGSWJG;
	}
	public String getGDGHLX() {
		return GDGHLX;
	}
	public void setGDGHLX(String gDGHLX) {
		GDGHLX = gDGHLX;
	}
	public String getNSRZT() {
		return NSRZT;
	}
	public void setNSRZT(String nSRZT) {
		NSRZT = nSRZT;
	}
	public Date getDJRQ() {
		return DJRQ;
	}
	public void setDJRQ(Date dJRQ) {
		DJRQ = dJRQ;
	}
	
	
	
}
