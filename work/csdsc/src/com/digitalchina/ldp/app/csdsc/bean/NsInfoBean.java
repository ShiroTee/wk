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
public class NsInfoBean {
	@Column(name="NSRMC")
	private String NSRMC;                   //纳税人名称
	@Column(name="NSRSBH")
	private String NSRSBH;                   //纳税人识别号
	@Column(name="ZSXM")
	private String ZSXM;                   //征收项目
	@Column(name="ZSPM")
	private String ZSPM;                   //征收品目
	@Column(name="SJJE")
	private String SJJE;                   //实缴金额
	@Column(name="SKSSQQ")
	private Date SKSSQQ;                   //税款所属期起
	@Column(name="SKSSQZ")
	private Date SKSSQZ;                   //税款所属期止
	@Column(name="JKRQ")
	private String JKRQ;                   //缴款日期
	@Column(name="ZSSWJG")
	private String ZSSWJG;                   //征收税务机关
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
	public String getZSXM() {
		return ZSXM;
	}
	public void setZSXM(String zSXM) {
		ZSXM = zSXM;
	}
	public String getZSPM() {
		return ZSPM;
	}
	public void setZSPM(String zSPM) {
		ZSPM = zSPM;
	}
	public String getSJJE() {
		return SJJE;
	}
	public void setSJJE(String sJJE) {
		SJJE = sJJE;
	}
	public Date getSKSSQQ() {
		return SKSSQQ;
	}
	public void setSKSSQQ(Date sKSSQQ) {
		SKSSQQ = sKSSQQ;
	}
	public Date getSKSSQZ() {
		return SKSSQZ;
	}
	public void setSKSSQZ(Date sKSSQZ) {
		SKSSQZ = sKSSQZ;
	}
	public String getJKRQ() {
		return JKRQ;
	}
	public void setJKRQ(String jKRQ) {
		JKRQ = jKRQ;
	}
	public String getZSSWJG() {
		return ZSSWJG;
	}
	public void setZSSWJG(String zSSWJG) {
		ZSSWJG = zSSWJG;
	}
	
}
