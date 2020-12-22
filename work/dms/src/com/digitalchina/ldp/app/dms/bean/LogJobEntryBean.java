package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;

/**
 * 
 * @author jhl 
 * 用于kettle中作业(job)//下钻的bean
 * 
 */

@SuppressWarnings("serial")
public class LogJobEntryBean implements Serializable {

	//下钻
	private Integer idBatch;
	private String channelId;
	private String stepName;
	private Integer linesRead;
	private Integer linesWritten;
	private Integer linesUpdated;
	private Integer linesInput;
	private Integer linesOutput;
	private Integer linesRejected;
	private Integer errors;
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
	
	public Integer getIdBatch() {
		return idBatch;
	}
	public void setIdBatch(Integer idBatch) {
		this.idBatch = idBatch;
	}
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	public String getStepName() {
		return stepName;
	}
	public void setStepName(String stepName) {
		this.stepName = stepName;
	}
	
	

}
