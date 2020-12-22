package com.digitalchina.ldp.app.dms.bean;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author  spoon操作记录bean
 * 
 */

@SuppressWarnings("serial")
public class RepositoryLog implements Serializable {

	private Integer idRepositoryLog;
	private String repVersion;
	private String operationDesc;
	private String logUser;
	private String logDate;

	public String getLogDate() {
		return logDate;
	}

	public void setLogDate(String logDate) {
		this.logDate = logDate;
	}

	public Integer getIdRepositoryLog() {
		return idRepositoryLog;
	}

	public void setIdRepositoryLog(Integer idRepositoryLog) {
		this.idRepositoryLog = idRepositoryLog;
	}

	public String getRepVersion() {
		return repVersion;
	}

	public void setRepVersion(String repVersion) {
		this.repVersion = repVersion;
	}

	public String getOperationDesc() {
		return operationDesc;
	}

	public void setOperationDesc(String operationDesc) {
		this.operationDesc = operationDesc;
	}

	public String getLogUser() {
		return logUser;
	}

	public void setLogUser(String logUser) {
		this.logUser = logUser;
	}

	

}
