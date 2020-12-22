package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 字段信息表
 * @author python
 *
 */
@Entity
@Table(name="Dataele")
public class FieldInfo implements Serializable
{

	@Transient
	private static final long serialVersionUID = 8559071472250808282L;
	@Column(name="ele_id",length=40)
	@Id
	private String fieldId;
	@Column(name="ele_nm",length=240,nullable=false)
	private String fieldName;					//元素名称
	@Column(name="eng_cd",length=80,nullable=false)
	private String engFieldName;				//英文标示符
	@Column(name="data_typ",length=80,nullable=false)
	private String dataType;
	@Column(name="py_cd")
	private String pyName;
	public String getPyName()
	{
		return pyName;
	}
	public void setPyName(String pyName)
	{
		this.pyName = pyName;
	}
	public String getFieldId()
	{
		return fieldId;
	}
	public void setFieldId(String fieldId)
	{
		this.fieldId = fieldId;
	}
	public String getFieldName()
	{
		return fieldName;
	}
	public void setFieldName(String fieldName)
	{
		this.fieldName = fieldName;
	}
	public String getEngFieldName()
	{
		return engFieldName;
	}
	public void setEngFieldName(String engFieldName)
	{
		this.engFieldName = engFieldName;
	}
	public String getDataType()
	{
		//return DictionaryUtil.getValue(DictionaryUtil.DictionaryEnum.DICT_DATAELE_TYPE.name(),this.dataType);
		return this.dataType;
	}
	public void setDataType(String dataType)
	{
		this.dataType = dataType;
	}
}
