package com.digitalchina.ldp.app.csdsc.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * @author 陈超
 * 2014-8-8 上午11:20:49
 * DYJLBH	VARCHAR2(36)	N			打印记录编号
RZID	VARCHAR2(32)	N			日志ID
DYZH	VARCHAR2(16)	Y			打印字号
DYNR	VARCHAR2(500)	Y			打印内容
DYRQ	DATE	Y			打印日期
 */
@Table(name="RK_HYDYJLB")
public class PrintLogBean {
	@Column(name="DYJLBH")
	private String id;
	@Column(name="RZID")
	private String queryLogId;
	@Column(name="DYZH")
	private String printNum;
	@Column(name="DYNR")
	private String printContent;
	@Column(name="DYRQ")
	private Date printTime;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getQueryLogId() {
		return queryLogId;
	}
	public void setQueryLogId(String queryLogId) {
		this.queryLogId = queryLogId;
	}
	public String getPrintNum() {
		return printNum;
	}
	public void setPrintNum(String printNum) {
		this.printNum = printNum;
	}
	public String getPrintContent() {
		return printContent;
	}
	public void setPrintContent(String printContent) {
		this.printContent = printContent;
	}
	public Date getPrintTime() {
		return printTime;
	}
	public void setPrintTime(Date printTime) {
		this.printTime = printTime;
	}
	

}

