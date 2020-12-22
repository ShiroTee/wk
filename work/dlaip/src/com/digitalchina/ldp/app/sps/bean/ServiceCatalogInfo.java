package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Transient;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@SuppressWarnings("serial")
@Table(name="DICT_ASSET_CATE")
@Entity
public final class ServiceCatalogInfo implements Serializable{
	@Id
	@Column(name="typ_id")
	private String id;
	@Column(name="par_typ_id")
	private String parentId;
	@Column(name="typ_nm")
	private String name;
	@Column(name="remark")
	private String comment;
	@Column(name="typ_cate")
	private String typeCate;
	
//	@Column(name="creatorId")
	@Transient
	private String creatorId;
//	@Column(name="createTime")
	@Transient
	private Date createTime;
//	@Column(name="modifierId")
	@Transient
	private String modifierId;
//	@Column(name="modifyTime")
	@Transient
	private Date modifyTime;
	
	public ServiceCatalogInfo(){
		
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getModifierId() {
		return modifierId;
	}

	public void setModifierId(String modifierId) {
		this.modifierId = modifierId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getTypeCate() {
		return typeCate;
	}

	public void setTypeCate(String typeCate) {
		this.typeCate = typeCate;
	}
	public String getText()
	{
		return this.name;
	}
	
	
}
