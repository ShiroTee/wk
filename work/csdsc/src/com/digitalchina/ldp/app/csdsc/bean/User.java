package com.digitalchina.ldp.app.csdsc.bean;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.digitalchina.ldp.app.ums.bean.RoleInfoBean;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
@Table(name="USER_INFO")
@Entity
public class User extends UserInfoBean
{
	@Transient
	private static final long serialVersionUID = -4656382052466106177L;
	@Transient
	private List<RoleInfoBean> roles;
	@Transient
	private List<String> resources;
	public List<String> getResources()
	{
		return resources;
	}
	public void setResources(List<String> resources)
	{
		this.resources = resources;
	}
	public List<RoleInfoBean> getRoles()
	{
		return roles;
	}
	public void setRoles(List<RoleInfoBean> roles)
	{
		this.roles = roles;
	}
	@Transient
	private String authKey;
	public String getAuthKey() {
		return authKey;
	}
	public void setAuthKey(String authKey) {
		this.authKey = authKey;
	}

}
