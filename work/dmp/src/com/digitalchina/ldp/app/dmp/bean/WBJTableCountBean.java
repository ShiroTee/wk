package com.digitalchina.ldp.app.dmp.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "OLAP_WBJ_TABLE_COUNT")
public class WBJTableCountBean implements java.io.Serializable {
	@Column(name = "WBJBM")
	private String wbjbm; // 委办局别名
	@Column(name = "BM")
	private String bm; // 表名
	@Column(name = "ADDCOUNT")
	private Integer addcount; // 新增数据量
	@Column(name = "ADDDATE")
	private Date adddate; // 新增数据日期

	public String getWbjbm() {
		return wbjbm;
	}

	public void setWbjbm(String wbjbm) {
		this.wbjbm = wbjbm;
	}

	public String getBm() {
		return bm;
	}

	public void setBm(String bm) {
		this.bm = bm;
	}

	public Integer getAddcount() {
		return addcount;
	}

	public void setAddcount(Integer addcount) {
		this.addcount = addcount;
	}

	public Date getAdddate() {
		return adddate;
	}

	public void setAdddate(Date adddate) {
		this.adddate = adddate;
	}

	public WBJTableCountBean() {
		super();
	}
}
