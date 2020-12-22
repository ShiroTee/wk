package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="dict_asset_cate")
public class ResourceClassInfo implements Serializable
{
	@Column(name="typ_id",length=40)
	@Id
	private String classId;
	@Column(name="typ_cd",length=40,nullable=false)
	private String classCode;
	@Column(name="typ_nm",length=100,nullable=false)
	private String className;
	@Column(name="typ_cate",length=40)
	/**
	 * 所属大类
	 * 行业：HY 主题：ZT  服务：FW 资源：ZY等
	 */
	private String bigClassType;
	public String getClassId()
	{
		return classId;
	}
	public void setClassId(String classId)
	{
		this.classId = classId;
	}
	public String getClassCode()
	{
		return classCode;
	}
	public void setClassCode(String classCode)
	{
		this.classCode = classCode;
	}
	public String getClassName()
	{
		return className;
	}
	public void setClassName(String className)
	{
		this.className = className;
	}
	public String getBigClassType()
	{
		return bigClassType;
	}
	public void setBigClassType(String bigClassType)
	{
		this.bigClassType = bigClassType;
	}
}
