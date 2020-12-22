package com.owen.console.xchange;

import java.io.Serializable;

public class OwenOrgnization implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	private String orgName;
	private String orgFullName;
	private String orgCode;
	private String orgType;
	private String orgDesc;
	private String orgMode;
	private String orgSvrId;
	
	
	public String getOrgFullName() {
		return orgFullName;
	}
	public void setOrgFullName(String orgFullName) {
		this.orgFullName = orgFullName;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getOrgType() {
		return orgType;
	}
	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}
	public String getOrgDesc() {
		return orgDesc;
	}
	public void setOrgDesc(String orgDesc) {
		this.orgDesc = orgDesc;
	}
	public String getOrgMode() {
		return orgMode;
	}
	public void setOrgMode(String orgMode) {
		this.orgMode = orgMode;
	}
	public String getOrgSvrId() {
		return orgSvrId;
	}
	public void setOrgSvrId(String orgSvrId) {
		this.orgSvrId = orgSvrId;
	}
}
