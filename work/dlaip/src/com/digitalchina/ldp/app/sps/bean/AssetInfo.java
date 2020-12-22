package com.digitalchina.ldp.app.sps.bean;

import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Table(name="Asset")
@Entity
public class AssetInfo extends ResourceCatalogueInfo
{
	private String isAuth;

	public String getIsAuth()
	{
		if(this.isAuth==null)
		{
			return "N";
		}
		return "Y";
	}

	public void setIsAuth(String isAuth)
	{
		this.isAuth = isAuth;
	}
}
