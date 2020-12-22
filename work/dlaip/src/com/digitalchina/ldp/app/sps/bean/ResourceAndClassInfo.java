package com.digitalchina.ldp.app.sps.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Asset_cate")
/**
 * 分类关联关系表
 */

public class ResourceAndClassInfo
{
	@Column(name="RC_ID")
	@Id
	private String rcId;
	@ManyToOne
	@Column(name="typ_id",length=40,nullable=false)
	private ResourceClassInfo classInfo;
	@ManyToOne
	@Column(name="asset_id",length=36,nullable=false)
	private ResourceCatalogueInfo rd;
	@Column(name="STATUS")
	private Integer status;
	public String getRcId()
	{
		return rcId;
	}
	public void setRcId(String rcId)
	{
		this.rcId = rcId;
	}
	public ResourceClassInfo getClassInfo()
	{
		return classInfo;
	}
	public void setClassInfo(ResourceClassInfo classInfo)
	{
		this.classInfo = classInfo;
	}
	public ResourceCatalogueInfo getRd()
	{
		return rd;
	}
	public void setRd(ResourceCatalogueInfo rd)
	{
		this.rd = rd;
	}
	public Integer getStatus()
	{
		return status;
	}
	public void setStatus(Integer status)
	{
		this.status = status;
	}
}
