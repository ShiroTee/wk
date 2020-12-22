package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "DMP_WBJ_TABLE")
public class DmpWbjBean implements java.io.Serializable{
	@Column(name = "WBJBM")
	private String wbjbm;// 委办局编码
	@Column(name = "WBJJC")
	private String wbjjc;// 委办局名称
	@Column(name = "BM")
	private String bm;// 表名
	@Column(name = "BHZMC")
	private String bhzmc;// 表名称
	@Column(name = "ZDZJ")
	private Integer zdzj;//字段总计
	public DmpWbjBean() {
		super();
	}

	public DmpWbjBean(String wbjbm, String wbjjc, String bm, String bhzmc,Integer zdzj ) {
		super();
		this.wbjbm = wbjbm;
		this.wbjjc = wbjjc;
		this.bm = bm;
		this.bhzmc = bhzmc;
		this.zdzj = zdzj;
	}

	public String getWbjbm() {
		return wbjbm;
	}

	public void setWbjbm(String wbjbm) {
		this.wbjbm = wbjbm;
	}

	public String getWbjjc() {
		return wbjjc;
	}

	public void setWbjjc(String wbjjc) {
		this.wbjjc = wbjjc;
	}

	public String getBm() {
		return bm;
	}

	public void setBm(String bm) {
		this.bm = bm;
	}

	public String getBhzmc() {
		return bhzmc;
	}

	public void setBhzmc(String bhzmc) {
		this.bhzmc = bhzmc;
	}
	public Integer getZdzj() {
		return zdzj;
	}

	public void setZdzj(Integer zdzj) {
		this.zdzj = zdzj;
	}

}
