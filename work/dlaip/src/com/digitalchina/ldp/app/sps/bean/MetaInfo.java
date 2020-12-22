package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 元数据信息
 * @author python
 *
 */
@Entity
@Table(name="Arch_dm_entitystr")
public class MetaInfo implements Serializable
{

	@Transient
	private static final long serialVersionUID = 533466303730069913L;
	@Column(name="entstr_id")
	@Id
	private String metaInfoId;
	@ManyToOne
	@Column(name="ent_id")
	private ResourceCatalogueInfo resource;
	@Column(name="remark")
	private String remark;
	/**
	 * 字段长度
	 */
	@Column(name="data_len")
	private Integer dataLength;
	/**
	 * 小数位数
	 */
	@Column(name="dec_len")
	private Integer decLength;
	/**
	 * 是否为null
	 */
	@Column(name="is_manda")
	private String isNull;
	/**
	 * 是否为主键
	 */
	@Column(name="iskey")
	private String iskey;
	/**
	 * 是否为外键
	 */
	@Column(name="fk_entstr_id")
	private String isFKey;
	@Column(name="ele_id")
	@ManyToOne
	private FieldInfo field;
	@Column(name="ENT_STATUS")
	private String status;
	public String getStatus()
	{
		return status;
	}
	public void setStatus(String status)
	{
		this.status = status;
	}
	public FieldInfo getField()
	{
		return field;
	}
	public void setField(FieldInfo field)
	{
		this.field = field;
	}
	public String getMetaInfoId()
	{
		return metaInfoId;
	}
	public void setMetaInfoId(String metaInfoId)
	{
		this.metaInfoId = metaInfoId;
	}
	public ResourceCatalogueInfo getResource()
	{
		return resource;
	}
	public void setResource(ResourceCatalogueInfo resource)
	{
		this.resource = resource;
	}
	public String getRemark()
	{
		return remark;
	}
	public void setRemark(String remark)
	{
		this.remark = remark;
	}
	public Integer getDataLength()
	{
		return dataLength;
	}
	public void setDataLength(Integer dataLength)
	{
		this.dataLength = dataLength;
	}
	public Integer getDecLength()
	{
		return decLength;
	}
	public void setDecLength(Integer decLength)
	{
		this.decLength = decLength;
	}
	public String getIsNull()
	{
		return isNull;
	}
	public void setIsNull(String isNull)
	{
		this.isNull = isNull;
	}
	public String getIskey()
	{
		return iskey;
	}
	public void setIskey(String iskey)
	{
		this.iskey = iskey;
	}
	public String getIsFKey()
	{
		return isFKey;
	}
	public void setIsFKey(String isFKey)
	{
		this.isFKey = isFKey;
	}
}
