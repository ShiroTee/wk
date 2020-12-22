package com.digitalchina.ldp.app.sps.bean;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
@Table(name="dict_secure_class")
public class DictSecrLv
{
	@Column(name="typ_cd")
	@Id
	private String secrTypCd;
	@Column(name="typ_nm")
	private String secrTypeName;
	public String getSecrTypCd()
	{
		return secrTypCd;
	}
	public void setSecrTypCd(String secrTypCd)
	{
		this.secrTypCd = secrTypCd;
	}
	public String getSecrTypeName()
	{
		return secrTypeName;
	}
	public void setSecrTypeName(String secrTypeName)
	{
		this.secrTypeName = secrTypeName;
	}
}
