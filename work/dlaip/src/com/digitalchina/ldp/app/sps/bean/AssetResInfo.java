package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="asset_res")
public class AssetResInfo implements Serializable
{
	@Column(name="res_id",length=40,nullable=false)
	@Id
	private String resId;
	@Column(name="asset_id",length=40,nullable=false)
	private String assetId;
	@Column(name="res_typ",length=40,nullable=false)
	private String resType;
	@Column(name="res_nm",length=60,nullable=false)
	private String resName;
	@Column(name="res_fmt",length=100)
	private String resFormart;
	@Column(name="res_desc",length=500)
	private String resDesc;
	@Column(name="file_size")
	private Long fileSize;
	@Column(name="srv_url")
	private String resURL;
	@Column(name="att_cntt")
	private Object file;
	public Object getFile()
	{
		return file;
	}
	public void setFile(Object file)
	{
		this.file = file;
	}
	public String getResId()
	{
		return resId;
	}
	public void setResId(String resId)
	{
		this.resId = resId;
	}
	public String getAssetId()
	{
		return assetId;
	}
	public void setAssetId(String assetId)
	{
		this.assetId = assetId;
	}
	public String getResType()
	{
		return resType;
	}
	public void setResType(String resType)
	{
		this.resType = resType;
	}
	public String getResName()
	{
		return resName;
	}
	public void setResName(String resName)
	{
		this.resName = resName;
	}
	public String getResFormart()
	{
		return resFormart;
	}
	public void setResFormart(String resFormart)
	{
		this.resFormart = resFormart;
	}
	public String getResDesc()
	{
		return resDesc;
	}
	public void setResDesc(String resDesc)
	{
		this.resDesc = resDesc;
	}
	public Long getFileSize()
	{
		return fileSize;
	}
	public void setFileSize(Long fileSize)
	{
		this.fileSize = fileSize;
	}
	public String getResURL()
	{
		return resURL;
	}
	public void setResURL(String resURL)
	{
		this.resURL = resURL;
	}
}
