package com.owen.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.owen.server.constance.HBMetaData;

@Entity(name=HBMetaData.HBMD_TASK_TABLE_NAME)
public class StatusTasks {
	@Id
	@Column(name=HBMetaData.HBMD_TASK_ID)
	private String taskid;
	
	@Column(name=HBMetaData.HBMD_TASK_INTERVAL)
	private String interval;
	
	@Column(name=HBMetaData.HBMD_TASK_NAME)
	private String taskname;
	
	@Column(name=HBMetaData.HBMD_TASK_ORGCODE)
	private String orgcode;
	
	@Column(name=HBMetaData.HBMD_TASK_ORGNAME)
	private String orgname;
	

	@Column(name=HBMetaData.HBMD_TASK_STAGE)
	private String stage;
	
	@Column(name=HBMetaData.HBMD_TASK_STATUS	)
	private String status;

	public String getTaskid() {
		return taskid;
	}

	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}

	public String getInterval() {
		return interval;
	}

	public void setInterval(String interval) {
		this.interval = interval;
	}

	public String getTaskname() {
		return taskname;
	}

	public void setTaskname(String taskname) {
		this.taskname = taskname;
	}

	public String getOrgcode() {
		return orgcode;
	}

	public void setOrgcode(String orgcode) {
		this.orgcode = orgcode;
	}

	public String getOrgname() {
		return orgname;
	}

	public void setOrgname(String orgname) {
		this.orgname = orgname;
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
	
	


}
