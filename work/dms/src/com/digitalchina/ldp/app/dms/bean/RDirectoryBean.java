package com.digitalchina.ldp.app.dms.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "R_DIRECTORY")
public class RDirectoryBean implements java.io.Serializable
{
	@Column(name = "ID_DIRECTORY")
	private Integer directoryId;// 目录ID
	@Column(name = "ID_DIRECTORY_PARENT")
	private Integer directoryParentId; // 子目录的父ID
	@Column(name = "DIRECTORY_NAME")
	private String directoryName;// 目录名称

	public Integer getDirectoryId()
	{
		return directoryId;
	}

	public void setDirectoryId(Integer directoryId)
	{
		this.directoryId = directoryId;
	}

	public Integer getDirectoryParentId()
	{
		return directoryParentId;
	}

	public void setDirectoryParentId(Integer directoryParentId)
	{
		this.directoryParentId = directoryParentId;
	}

	public String getDirectoryName()
	{
		return directoryName;
	}

	public void setDirectoryName(String directoryName)
	{
		this.directoryName = directoryName;
	}

}
