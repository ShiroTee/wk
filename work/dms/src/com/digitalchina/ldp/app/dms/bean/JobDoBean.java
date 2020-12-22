package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author jhl 用于kettle中作业(job)的bean
 * 
 */

@SuppressWarnings("serial")
public class JobDoBean implements Serializable {
	private Integer idJob;
	private Integer rIdJob;//log_job设置的id与r_job中的idJob相关连
	private String jobName;
	private String govName;//委办局
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
	private Date logDate;// 结束日期
	private Date depDate;
	private Date replayDate;// 开始日期
	private String logField;
	private String channelId;
	private String batchFlag; //批次号
	public Integer getRIdJob() {
		return rIdJob;
	}

	public void setRIdJob(Integer rIdJob) {
		this.rIdJob = rIdJob;
	}


	public String getBatchFlag() {
		return batchFlag;
	}

	public void setBatchFlag(String batchFlag) {
		this.batchFlag = batchFlag;
	}

	public String getLogField() {
		return logField;
	}

	public void setLogField(String logField) {
		this.logField = logField;
	}


	

	public Integer getIdJob() {
		return idJob;
	}

	public void setIdJob(Integer idJob) {
		this.idJob = idJob;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
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

	public Integer getLinesUpdated() {
		return linesUpdated;
	}

	public void setLinesUpdated(Integer linesUpdated) {
		this.linesUpdated = linesUpdated;
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

	public Date getLogDate() {
		return logDate;
	}

	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}

	public Date getDepDate() {
		return depDate;
	}

	public void setDepDate(Date depDate) {
		this.depDate = depDate;
	}

	public Date getReplayDate() {
		return replayDate;
	}

	public void setReplayDate(Date replayDate) {
		this.replayDate = replayDate;
	}

	
	
	public String getGovName() {
		return govName;
	}

	public void setGovName(String govName) {
		this.govName = govName;
	}

}
