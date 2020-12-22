package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;
import java.sql.Clob;
import java.util.Date;
/**
 * 
 * @author jhl 
 * 用于kettle中作业(job)的bean
 * 
 */

@SuppressWarnings("serial")
public class LogJob implements Serializable {
	private Integer idJob;
	private String channelId;
	private String jobName;
	private String status;// 开始、结束、停止、运行
	private Integer linesRead;
	private Integer linesWritten;
	private Integer linesupdated;
	private Integer linesInput;
	private Integer linesOutput;
	private Integer linesRejected;
	private Integer errors;
	private Date startDate;
	private Date endDate;
	// 结束日期
	private String logDate;
	private Date depDate;
	// 开始日期
	private String  replayDate;
	//委办局
	private String govName;
	private String id_directory;
	private String id_root;
	private Clob logField;
	public String getId_directory() {
		return id_directory;
	}

	public void setId_directory(String idDirectory) {
		id_directory = idDirectory;
	}

	public String getId_root() {
		return id_root;
	}

	public void setId_root(String idRoot) {
		id_root = idRoot;
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

	public String getGovName() {
		return govName;
	}

	public void setGovName(String govName) {
		this.govName = govName;
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

	public Integer getLinesupdated() {
		return linesupdated;
	}

	public void setLinesupdated(Integer linesupdated) {
		this.linesupdated = linesupdated;
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

}
