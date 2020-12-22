package com.owen.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.owen.server.constance.HBMetaData;


@Entity(name=HBMetaData.HBMD_OSREP_TABLE_NAME)
public class OSRelationShip {
	
	@Column(name=HBMetaData.HBMD_OSREP_ORGCODE)
	private String orgCode;
	
	@Column(name=HBMetaData.HBMD_OSREP_SERVERIP)
	private String server_ip;
	
	@Id
	@Column(name=HBMetaData.HBMD_OSREP_ID)
	private int    id;
	
	@Column(name=HBMetaData.HBMD_OSREP_STAGE_NAME)
	private String stage_name;

	
	public String getStage_name() {
		return stage_name;
	}
	public void setStage_name(String stage_name) {
		this.stage_name = stage_name;
	}
	public String getServer_ip() {
		return server_ip;
	}
	public void setServer_ip(String server_ip) {
		this.server_ip = server_ip;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
}
