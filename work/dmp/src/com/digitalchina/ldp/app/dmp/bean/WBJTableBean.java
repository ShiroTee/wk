package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="dmp_wbj_table")
public class WBJTableBean implements java.io.Serializable{
	
	@Column(name="WBJBM")
	private String WBJBm; //委办局编码
	@Column(name="WBJJC")
	private String WBJJc; //委办局简称
	@Column(name="BM")
	private String tableNameEn; //表名
	@Column(name="BHZMC")
	private String tableNameZh; //表的中文名
	@Column(name="EXCEPTIONBM")
	private String exceptionBm; //异常表表名
	public WBJTableBean() {
	}
	public WBJTableBean(String wBJBm, String wBJJc, String tableNameEn, String tableNameZh) {
		super();
		WBJBm = wBJBm;
		WBJJc = wBJJc;
		this.tableNameEn = tableNameEn;
		this.tableNameZh = tableNameZh;
	}
	public String getWBJBm() {
		return WBJBm;
	}
	public void setWBJBm(String wBJBm) {
		WBJBm = wBJBm;
	}
	public String getWBJJc() {
		return WBJJc;
	}
	public void setWBJJc(String wBJJc) {
		WBJJc = wBJJc;
	}
	public String getTableNameEn() {
		return tableNameEn;
	}
	public void setTableNameEn(String tableNameEn) {
		this.tableNameEn = tableNameEn;
	}
	public String getTableNameZh() {
		return tableNameZh;
	}
	public void setTableNameZh(String tableNameZh) {
		this.tableNameZh = tableNameZh;
	}
	public String getExceptionBm() {
		return exceptionBm;
	}
	public void setExceptionBm(String exceptionBm) {
		this.exceptionBm = exceptionBm;
	}

	
}
