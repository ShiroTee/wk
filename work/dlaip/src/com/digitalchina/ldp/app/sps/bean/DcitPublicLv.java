package com.digitalchina.ldp.app.sps.bean;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 公开级别码表
 * @author python
 *
 */
@Table(name="DICT_PUB_LV")
public class DcitPublicLv
{
	@Column(name="TYP_CD")
	@Id
	private String publicLvId;
	@Column(name="TYP_NM")
	private String publicLvName;
	public String getPublicLvId()
	{
		return publicLvId;
	}
	public void setPublicLvId(String publicLvId)
	{
		this.publicLvId = publicLvId;
	}
	public String getPublicLvName()
	{
		return publicLvName;
	}
	public void setPublicLvName(String publicLvName)
	{
		this.publicLvName = publicLvName;
	}
}
