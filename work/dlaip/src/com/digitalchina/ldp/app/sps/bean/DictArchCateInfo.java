package com.digitalchina.ldp.app.sps.bean;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 架构类别码表
 * @author python
 *
 */
@Table(name="dict_arch_cate")

public class DictArchCateInfo
{
	@Column(name="typ_cd")
	@Id
	private String typCd;
	@Column(name="typ_nm")
	private String typNm;
	@Column(name="eng_nm")
	private String engNm;
	public String getTypCd()
	{
		return typCd;
	}
	public void setTypCd(String typCd)
	{
		this.typCd = typCd;
	}
	public String getTypNm()
	{
		return typNm;
	}
	public void setTypNm(String typNm)
	{
		this.typNm = typNm;
	}
	public String getEngNm()
	{
		return engNm;
	}
	public void setEngNm(String engNm)
	{
		this.engNm = engNm;
	}
}
