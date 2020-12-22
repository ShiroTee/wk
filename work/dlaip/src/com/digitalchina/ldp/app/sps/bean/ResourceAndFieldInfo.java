package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="Arch_dm_entitystr")
public class ResourceAndFieldInfo implements Serializable
{
	@Transient
	private static final long serialVersionUID = -394614189204113005L;
	@Column(name="entstr_id",length=40)
	@Id
	private String id;
	@ManyToOne
	@Column(name="ent_id",length=40,nullable=false)
	private ResourceCatalogueInfo resource;
	@ManyToOne
	@Column(name="ele_id",length=40,nullable=false)
	private FieldInfo field;
	@Column(name="data_len",nullable=false)
	private Integer fieldLength;
	@Column(name="is_manda",length=1,nullable=false)
	private String isNull;
	@Column(name="remark",length=2048)
	private String remark;
	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
	}
	public ResourceCatalogueInfo getResource()
	{
		return resource;
	}
	public void setResource(ResourceCatalogueInfo resource)
	{
		this.resource = resource;
	}
	public FieldInfo getField()
	{
		return field;
	}
	public void setField(FieldInfo field)
	{
		this.field = field;
	}
	public Integer getFieldLength()
	{
		return fieldLength;
	}
	public void setFieldLength(Integer fieldLength)
	{
		this.fieldLength = fieldLength;
	}
	public String getIsNull()
	{
		return isNull;
	}
	public void setIsNull(String isNull)
	{
		this.isNull = isNull;
	}
	public String getRemark()
	{
		return remark;
	}
	public void setRemark(String remark)
	{
		this.remark = remark;
	}

}
