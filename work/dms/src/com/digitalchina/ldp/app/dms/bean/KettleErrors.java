package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;
import java.sql.Clob;
import java.util.Date;
import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

/**
 * 
 * @author jhl 用于记录kettle中作业(job)、转化(transformation)异常信息的bean
 * 
 */

@SuppressWarnings("serial")
@Table(name = "K_ERRS")
public class KettleErrors implements Serializable {
	@Column(name = "ID")
	private String id;
	@Column(name = "name")
	private String name;
	@Column(name = "CHANNEL_ID")
	private String channelId;
	@Column(name = "ERR_TYPE")
	private String errType;
	@Column(name = "START_DATE")
	private String startDate;// 流程的开始时间
	@Column(name = "END_DATE")
	private String endDate;// 流程的结束时间
	@Column(name = "LOG_DATE")
	private String logDate;// 记录日志时间
	@Column(name = "LOG_FIELD")
	private Clob logField;
	@Column(name = "CLRY")
	private String clpy;// 处理人员
	@Column(name = "CLRQ")
	private Date clrq;// 处理日期
	@Column(name = "ERR_REASON")
	private String erroReason;// 错误简述
	@Column(name = "CLFF")
	private String clff;// 处理方法
	@Column(name = "CLBZ")
	private String clbz;// 处理标志,T-表示已处理，F-表示未处理
	@Column(name="SOLVEACCESSORYNAME")
	private String solveAccessoryName;//解决附件名称
	@Column(name="SOLVEACCESSORYPATH")
	private String solveAccessoryPath;//解决附件路径
	@Column(name="MARK")
	private String mark;//备注
	@Column(name="ISKNOWLEDGE")
	private String isKnowledge;
	
	public KettleErrors() {
	}

	public KettleErrors(String id, String name, String channelId, String errType, String startDate, String endDate, String logDate, Clob logField, String clpy, Date clrq, String erroReason, String clff,
			String clbz, String solveAccessoryName, String solveAccessoryPath, String mark, String isKnowledge) {
		super();
		this.id = id;
		this.name = name;
		this.channelId = channelId;
		this.errType = errType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.logDate = logDate;
		this.logField = logField;
		this.clpy = clpy;
		this.clrq = clrq;
		this.erroReason = erroReason;
		this.clff = clff;
		this.clbz = clbz;
		this.solveAccessoryName = solveAccessoryName;
		this.solveAccessoryPath = solveAccessoryPath;
		this.mark = mark;
		this.isKnowledge = isKnowledge;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getLogDate() {
		return logDate;
	}

	public void setLogDate(String logDate) {
		this.logDate = logDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getErrType() {
		return errType;
	}

	public void setErrType(String errType) {
		this.errType = errType;
	}

	

	public Clob getLogField() {
		return logField;
	}

	public void setLogField(Clob logField) {
		this.logField = logField;
	}

	public String getClpy() {
		return clpy;
	}

	public void setClpy(String clpy) {
		this.clpy = clpy;
	}

	public Date getClrq() {
		return clrq;
	}

	public void setClrq(Date clrq) {
		this.clrq = clrq;
	}

	public String getErroReason() {
		return erroReason;
	}

	public void setErroReason(String erroReason) {
		this.erroReason = erroReason;
	}

	public String getClff() {
		return clff;
	}

	public void setClff(String clff) {
		this.clff = clff;
	}

	public String getClbz() {
		return clbz;
	}

	public void setClbz(String clbz) {
		this.clbz = clbz;
	}

	public String getSolveAccessoryName() {
		return solveAccessoryName;
	}

	public void setSolveAccessoryName(String solveAccessoryName) {
		this.solveAccessoryName = solveAccessoryName;
	}

	public String getSolveAccessoryPath() {
		return solveAccessoryPath;
	}

	public void setSolveAccessoryPath(String solveAccessoryPath) {
		this.solveAccessoryPath = solveAccessoryPath;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public String getIsKnowledge() {
		return isKnowledge;
	}

	public void setIsKnowledge(String isKnowledge) {
		this.isKnowledge = isKnowledge;
	}


	
}
