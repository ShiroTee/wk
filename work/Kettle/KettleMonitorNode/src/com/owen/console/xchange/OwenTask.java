package com.owen.console.xchange;

import java.io.Serializable;

public class OwenTask implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String taskId;
	private String taskName;
	private String orgCode;
	private String orgName;
	private String interval;
	private String stage;
	private String status;
	
	
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getInterval() {
		return interval;
	}
	public void setInterval(String interval) {
		this.interval = interval;
	}
	public String getStage() {
		return stage;
	}
	public void setStage(String stage) {
		this.stage = stage;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public OwenTask clone(){
		
		OwenTask ot = new OwenTask();
		ot.setInterval(interval);
		ot.setOrgCode(orgCode);
		ot.setOrgName(orgName);
		ot.setStage(stage);
		ot.setStatus(status);
		ot.setTaskId(taskId);
		ot.setTaskName(taskName);
		
		return ot;
	}
}
