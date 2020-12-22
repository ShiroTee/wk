package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="ESB_ROUTE_TYPE")
public class RouteTypeInfo implements Serializable{

	@Id
	@Column(name="SERV_TYPE_ID",length=36)
	private String servTypeId;
	/**
	 * 类型名称
	 */
	@Column(name="TYPE_NAME",length=100)
	private String typeName;
	/**
	 * 类型描述
	 */
	@Column(name="TYPE_DESC")
	private String typeDesc;
	/**
	 * 父类型ID
	 */

	@Column(name="PARANT_TYPE_ID",length=36)
	private String parantTypeId;
	/**
	 * 状态
	 */
	@Column(name="TYPE_STATUS",length=1)
	private String typeStatus;	
	/**
	 * 图标URL
	 */
	@Column(name="TYPE_PHOTO_URL",length=255,nullable=false)
	private String typePhtotUrl;
	
	/**
	 * 类型级别
	 */
	@Column(name="TYPE_LEVEL",length=1,nullable=false)
	private String typeLevel;

	public RouteTypeInfo() {
		super();
	}
	
	public RouteTypeInfo(String rtRootId) {
		super();
		this.servTypeId = rtRootId;
	}

	public String getServTypeId() {
		return servTypeId;
	}

	public void setServTypeId(String servTypeId) {
		this.servTypeId = servTypeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getTypeDesc() {
		return typeDesc;
	}

	public void setTypeDesc(String typeDesc) {
		this.typeDesc = typeDesc;
	}

	public String getParantTypeId() {
		return parantTypeId;
	}

	public void setParantTypeId(String parantTypeId) {
		this.parantTypeId = parantTypeId;
	}

	public String getTypeStatus() {
		return typeStatus;
	}

	public void setTypeStatus(String typeStatus) {
		this.typeStatus = typeStatus;
	}

	public String getTypePhtotUrl() {
		return typePhtotUrl;
	}

	public void setTypePhtotUrl(String typePhtotUrl) {
		this.typePhtotUrl = typePhtotUrl;
	}

	public String getTypeLevel() {
		return typeLevel;
	}

	public void setTypeLevel(String typeLevel) {
		this.typeLevel = typeLevel;
	}
}
