package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;
import java.sql.Clob;
import java.util.Date;
/**
 * 
 * @author jhl
 * 用于kettle中转化(transformation)的bean
 *
 */
@SuppressWarnings("serial")
public class LogTrans implements Serializable {
	private Integer idBatch;
	private String channelId;
	private String transName;
	private String status;// 开始、结束、停止、运行
	private Integer linesRead;
	private Integer linesWritten;
	private Integer linesUpdated;
	private Integer linesInput;
	private Integer linesOutput;
	private Integer linesRejected;
	private Integer errors;
	private Date startDate;
	private Date endDate;
	private String logDate;// 结束日期
	private Date depDate;
	private String replayDate;// 开始日期
	private Clob logField;
	private String batchFlag;
	
	public String getBatchFlag() {
		return batchFlag;
	}

	public void setBatchFlag(String batchFlag) {
		this.batchFlag = batchFlag;
	}

	public String getLogDate() {
		return logDate;
	}

	public void setLogDate(String logDate) {
		this.logDate = logDate;
	}

	public String getReplayDate() {
		return replayDate;
	}

	public void setReplayDate(String replayDate) {
		this.replayDate = replayDate;
	}

	private String jobName;
	
	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	private String govName;
	

	public String getGovName() {
		return govName;
	}

	public void setGovName(String govName) {
		this.govName = govName;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public Integer getIdBatch() {
		return idBatch;
	}

	public void setIdBatch(Integer idBatch) {
		this.idBatch = idBatch;
	}

	public String getTransName() {
		return transName;
	}

	public void setTransName(String transName) {
		this.transName = transName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getLinesRead() {
		return linesRead;
	}

	public void setLinesRead(Integer linesRead) {
		this.linesRead = linesRead;
	}

	public Integer getLinesWritten() {
		return linesWritten;
	}

	public void setLinesWritten(Integer linesWritten) {
		this.linesWritten = linesWritten;
	}


	public Integer getLinesInput() {
		return linesInput;
	}

	public void setLinesInput(Integer linesInput) {
		this.linesInput = linesInput;
	}

	public Integer getLinesOutput() {
		return linesOutput;
	}

	public void setLinesOutput(Integer linesOutput) {
		this.linesOutput = linesOutput;
	}

	public Integer getLinesRejected() {
		return linesRejected;
	}

	public void setLinesRejected(Integer linesRejected) {
		this.linesRejected = linesRejected;
	}

	public Integer getErrors() {
		return errors;
	}

	public void setErrors(Integer errors) {
		this.errors = errors;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}



	public Date getDepDate() {
		return depDate;
	}

	public void setDepDate(Date depDate) {
		this.depDate = depDate;
	}



	public Clob getLogField() {
		return logField;
	}

	public void setLogField(Clob logField) {
		this.logField = logField;
	}
	public Integer getLinesUpdated() {
		return linesUpdated;
	}

	public void setLinesUpdated(Integer linesUpdated) {
		this.linesUpdated = linesUpdated;
	}
}
