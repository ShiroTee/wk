package com.digitalchina.ldp.app.dmp.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "OLAP_RECORD_SUM")
public class RecordBean implements java.io.Serializable{
	@Column(name = "SJKLX")
	private String sjklx;// 委办局编码
	@Column(name = "DATABASETYPE")
	private String databasetype;// 数据库类别
	@Column(name = "TABLENAME")
	private String tablename;// 表名
	@Column(name = "DATACOUNT")
	private String datacount;// 数据量
	@Column(name = "STARTDATE")
	private Date startDate;//开始日期
	public RecordBean() {
	}

	public RecordBean(String sjklx, String databasetype, String tablename, String datacount,Date startDate) {
		super();
		this.sjklx = sjklx;
		this.databasetype = databasetype;
		this.tablename = tablename;
		this.datacount = datacount;
		this.startDate = startDate;
	}

	public String getSjklx() {
		return sjklx;
	}

	public void setSjklx(String sjklx) {
		this.sjklx = sjklx;
	}

	public String getDatabasetype() {
		return databasetype;
	}

	public void setDatabasetype(String databasetype) {
		this.databasetype = databasetype;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public String getDatacount() {
		return datacount;
	}

	public void setDatacount(String datacount) {
		this.datacount = datacount;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}


}
