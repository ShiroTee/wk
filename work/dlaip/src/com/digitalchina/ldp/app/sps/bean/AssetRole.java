package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
@Entity
@Table(name="ESB_ROLE")
/**
 * 资源目录角色
 */
public class AssetRole implements Serializable
{

	@Transient
	private static final long serialVersionUID = -3674814350193991650L;
	@Column(name="ROLE_ID",length=36,nullable=false)
	@Id
	private String roleId;
	@Column(name="ROLE_NAME",length=100,nullable=false)
	private String roleName;
	@Column(name="STATUS")
	private Integer status;
	@Column(name="CR_DATE")
	private Date createDate;
	@Column(name="REMARK",length=255)
	private String remark;
	public String getRoleId()
	{
		return roleId;
	}
	public void setRoleId(String roleId)
	{
		this.roleId = roleId;
	}
	public String getRoleName()
	{
		return roleName;
	}
	public void setRoleName(String roleName)
	{
		this.roleName = roleName;
	}
	public Integer getStatus()
	{
		return status;
	}
	public void setStatus(Integer status)
	{
		this.status = status;
	}
	public Date getCreateDate()
	{
		return createDate;
	}
	public void setCreateDate(Date createDate)
	{
		this.createDate = createDate;
	}
	public String getRemark()
	{
		return remark;
	}
	public void setRemark(String remark)
	{
		this.remark = remark;
	}

}
