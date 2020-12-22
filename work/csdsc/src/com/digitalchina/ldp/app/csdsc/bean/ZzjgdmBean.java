package com.digitalchina.ldp.app.csdsc.bean;


import java.util.Date;

import javax.persistence.Column;

/**
 * @author 张锋
 * 2015-7-16 下午03:57:03
 */
/*
 * 人口基本信息
 */
public class ZzjgdmBean {
	@Column(name="JGMC")
	private String jgmc;                   //机构名称：
	@Column(name="JGDM")
	private String jgdm;               //组织机构代码
	@Column(name="FBDW")
	private String fbdw;                    //组织机构代码颁发单位：
	@Column(name="GLJG")
	private String gljg;                 //组织机构代码管理机关：
	@Column(name="BZRQ")
	private Date bzrq;             //组织机构代码证办证日期：
	@Column(name="BZJGMC")
	private String bzjgmc;              //组织机构代码证颁证机构名称：
	@Column(name="JGDZ")
	private String jgdz;               //机构地址
	@Column(name="FDDBRMC")
	private String fddbrmc;        //法定代表人名称
	@Column(name="FDDBRSFZHM")
	private String fddbrsfzhm;          //法定代表人身份证照号码
	@Column(name="JGLX")
	private String jglx;         //机构类型
	@Column(name="FZRQ")
	private Date fzrq;            //发证日期：
	@Column(name="ZFRQ")
	private Date zfrq;                //作废日期：
	
	public String getJgmc() {
		return jgmc;
	}
	public void setJgmc(String jgmc) {
		this.jgmc = jgmc;
	}
	public String getJgdm() {
		return jgdm;
	}
	public void setJgdm(String jgdm) {
		this.jgdm = jgdm;
	}
	public String getFbdw() {
		return fbdw;
	}
	public void setFbdw(String fbdw) {
		this.fbdw = fbdw;
	}
	public String getGljg() {
		return gljg;
	}
	public void setGljg(String gljg) {
		this.gljg = gljg;
	}
	public Date getBzrq() {
		return bzrq;
	}
	public void setBzrq(Date bzrq) {
		this.bzrq = bzrq;
	}
	public String getBzjgmc() {
		return bzjgmc;
	}
	public void setBzjgmc(String bzjgmc) {
		this.bzjgmc = bzjgmc;
	}
	public String getJgdz() {
		return jgdz;
	}
	public void setJgdz(String jgdz) {
		this.jgdz = jgdz;
	}
	public String getFddbrmc() {
		return fddbrmc;
	}
	public void setFddbrmc(String fddbrmc) {
		this.fddbrmc = fddbrmc;
	}
	public String getFddbrsfzhm() {
		return fddbrsfzhm;
	}
	public void setFddbrsfzhm(String fddbrsfzhm) {
		this.fddbrsfzhm = fddbrsfzhm;
	}
	public String getJglx() {
		return jglx;
	}
	public void setJglx(String jglx) {
		this.jglx = jglx;
	}
	public Date getFzrq() {
		return fzrq;
	}
	public void setFzrq(Date fzrq) {
		this.fzrq = fzrq;
	}
	public Date getZfrq() {
		return zfrq;
	}
	public void setZfrq(Date zfrq) {
		this.zfrq = zfrq;
	}
	
	
}
