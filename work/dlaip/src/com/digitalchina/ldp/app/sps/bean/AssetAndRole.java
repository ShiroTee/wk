package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="ESB_ASSET_ROLE")
public class AssetAndRole implements Serializable
{
	@Id
	@Column(name="AR_ID",length=36,nullable=false)
	private String arId;
	@Column(name="STATUS",nullable=false)
	private Integer status;
	@Column(name="CRE_DATE",nullable=false)
	private Date createDate;
	@ManyToOne
	@Column(name="ROLE_ID",length=36,nullable=false)
	private AssetRole role;
	@ManyToOne
	@Column(name="ASSET_ID",length=36,nullable=false)
	private ResourceCatalogueInfo resource;
	public String getArId()
	{
		return arId;
	}
	public void setArId(String arId)
	{
		this.arId = arId;
	}
	public Integer getStatus()
	{
		return status;
	}
	public void setStatus(Integer status)
	{
		this.status = status;
	}
	public Date getCreateDate()
	{
		return createDate;
	}
	public void setCreateDate(Date createDate)
	{
		this.createDate = createDate;
	}
	public AssetRole getRole()
	{
		return role;
	}
	public void setRole(AssetRole role)
	{
		this.role = role;
	}
	public ResourceCatalogueInfo getResource()
	{
		return resource;
	}
	public void setResource(ResourceCatalogueInfo resource)
	{
		this.resource = resource;
	}
}
