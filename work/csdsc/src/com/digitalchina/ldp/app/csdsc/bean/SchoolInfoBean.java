package com.digitalchina.ldp.app.csdsc.bean;


import javax.persistence.Column;

/**
 * @author 张锋
 * 2015-7-17 下午03:57:03
 */
/*
 * x学校基本信息
 */
public class SchoolInfoBean {
	@Column(name="XXMC")
	private String xxmc;                   //学校名称
	@Column(name="XXBSM")
	private String xxbsm;               //学校标识码
	@Column(name="XXDM")
	private String xxdm;                    //学校代码：
	@Column(name="ZGBM")
	private String zgbm;                 //主管部门：
	@Column(name="JXNY")
	private String jxny;             //建校年月：
	@Column(name="DWLB")
	private String dwlb;              //单位类别：
	@Column(name="XJ")
	private String xj;               //星级
	@Column(name="XC")
	private String xz;        //校长
	@Column(name="LXDH")
	private String lxdh;          //联系电话
	@Column(name="WZ")
	private String wz;         //网址
	@Column(name="DZ")
	private String dz;            //地址
	@Column(name="YB")
	private String yb;                //邮政
	public String getXxmc() {
		return xxmc;
	}
	public void setXxmc(String xxmc) {
		this.xxmc = xxmc;
	}
	public String getXxbsm() {
		return xxbsm;
	}
	public void setXxbsm(String xxbsm) {
		this.xxbsm = xxbsm;
	}
	public String getXxdm() {
		return xxdm;
	}
	public void setXxdm(String xxdm) {
		this.xxdm = xxdm;
	}
	public String getZgbm() {
		return zgbm;
	}
	public void setZgbm(String zgbm) {
		this.zgbm = zgbm;
	}
	public String getJxny() {
		return jxny;
	}
	public void setJxny(String jxny) {
		this.jxny = jxny;
	}
	public String getDwlb() {
		return dwlb;
	}
	public void setDwlb(String dwlb) {
		this.dwlb = dwlb;
	}
	public String getXj() {
		return xj;
	}
	public void setXj(String xj) {
		this.xj = xj;
	}
	public String getXz() {
		return xz;
	}
	public void setXz(String xz) {
		this.xz = xz;
	}
	public String getLxdh() {
		return lxdh;
	}
	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}
	public String getWz() {
		return wz;
	}
	public void setWz(String wz) {
		this.wz = wz;
	}
	public String getDz() {
		return dz;
	}
	public void setDz(String dz) {
		this.dz = dz;
	}
	public String getYb() {
		return yb;
	}
	public void setYb(String yb) {
		this.yb = yb;
	}

}