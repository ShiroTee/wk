package com.owen.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.owen.server.constance.HBMetaData;


@Entity(name=HBMetaData.HBMD_ORG_TABLE_NAME)
public class Orgnization {

	@Id
	@Column(name=HBMetaData.HBMD_ORG_ORGCODE)
	private String orgCode;
	
	@Column(name=HBMetaData.HBMD_ORG_ORGNAME)
	private String orgName;
	
	@Column(name=HBMetaData.HBMD_ORG_ORGTYPE)
	private String orgType;
	
	@Column(name=HBMetaData.HBMD_ORG_ORGDESC)
	private String orgDesc;
	
	@Column(name=HBMetaData.HBMD_ORG_ORGMODE)
	private String xMode;
	
	@Column(name=HBMetaData.HBMD_ORG_ORGFULLNAME)
	private String orgFullName;
	
	
	
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
	public String getxMode() {
		return xMode;
	}
	public void setxMode(String xMode) {
		this.xMode = xMode;
	}
	public String getOrgFullName() {
		return orgFullName;
	}
	public void setOrgFullName(String orgFullName) {
		this.orgFullName = orgFullName;
	}
}
