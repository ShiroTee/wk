package com.digitalchina.ldp.app.sps.bean;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@SuppressWarnings("serial")
@Table(name="ASSET_CATE_SCHE")
@Entity
public final class ServiceCatalogType implements Serializable{
	@Column(name="typ_cate_id")
	private String code;
	@Column(name="typ_cate_nm")
	private String name;
	@Column(name="field_nm")
	private String fieldName;
	@Column(name="remark")
	private String comment;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
}
