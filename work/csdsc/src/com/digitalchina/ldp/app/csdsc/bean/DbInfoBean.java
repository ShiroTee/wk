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
public class DbInfoBean {
	@Column(name="HZXM")
	private String HZXM;                   //姓名
	@Column(name="HZSFZHM")
	private String HZSFZHM;               //身份证号码
	@Column(name="DBZL")
	private String DBZL;                    //低保种类
	@Column(name="YHZH")
	private String YHZH;					//银行账号
	@Column(name="DJSJ")
	private Date DJSJ;					//登记时间
	@Column(name="JTZZ")
	private String JTZZ;                   //家庭住址
	@Column(name="LXDH")
	private String LXDH;					//联系电话
	@Column(name="XSBZRS")
	private int XSBZRS;						//享受保障人数
	@Column(name="HYBZJE")
	private String HYBZJE;					//户月保障金额
	@Column(name="JTRKZSRY")
	private String JTRKZSRY;					//家庭人口总收入/月
	@Column(name="ZDSHBZBZ")
	private String ZDSHBZBZ;					//最低生活保障标准
	@Column(name="KHYH")
	private String KHYH;					//开户银行
	@Column(name="DBZJHM")
	private String DBZJHM;					//低保证件号码
	public String getHZXM() {
		return HZXM;
	}
	public void setHZXM(String hZXM) {
		HZXM = hZXM;
	}
	public String getHZSFZHM() {
		return HZSFZHM;
	}
	public void setHZSFZHM(String hZSFZHM) {
		HZSFZHM = hZSFZHM;
	}
	public String getDBZL() {
		return DBZL;
	}
	public void setDBZL(String dBZL) {
		DBZL = dBZL;
	}
	public String getYHZH() {
		return YHZH;
	}
	public void setYHZH(String yHZH) {
		YHZH = yHZH;
	}
	public Date getDJSJ() {
		return DJSJ;
	}
	public void setDJSJ(Date dJSJ) {
		DJSJ = dJSJ;
	}
	public String getJTZZ() {
		return JTZZ;
	}
	public void setJTZZ(String jTZZ) {
		JTZZ = jTZZ;
	}
	public String getLXDH() {
		return LXDH;
	}
	public void setLXDH(String lXDH) {
		LXDH = lXDH;
	}
	public int getXSBZRS() {
		return XSBZRS;
	}
	public void setXSBZRS(int xSBZRS) {
		XSBZRS = xSBZRS;
	}
	public String getHYBZJE() {
		return HYBZJE;
	}
	public void setHYBZJE(String hYBZJE) {
		HYBZJE = hYBZJE;
	}
	public String getJTRKZSRY() {
		return JTRKZSRY;
	}
	public void setJTRKZSRY(String jTRKZSRY) {
		JTRKZSRY = jTRKZSRY;
	}
	public String getZDSHBZBZ() {
		return ZDSHBZBZ;
	}
	public void setZDSHBZBZ(String zDSHBZBZ) {
		ZDSHBZBZ = zDSHBZBZ;
	}
	public String getKHYH() {
		return KHYH;
	}
	public void setKHYH(String kHYH) {
		KHYH = kHYH;
	}
	public String getDBZJHM() {
		return DBZJHM;
	}
	public void setDBZJHM(String dBZJHM) {
		DBZJHM = dBZJHM;
	}
	
	
	
	

}
