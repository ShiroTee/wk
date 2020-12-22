package com.digitalchina.ldp.app.sps.bean;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
@SuppressWarnings("serial")
@Entity
@Table(name="asset_role_user")
public class UserAndAssetRole implements Serializable
{
	@Column(name="R_R_ID",length=36,nullable=false)
	@Id
	private String id;
	@Column(name="STATUS",nullable=false)
	private Integer status;
	@Column(name="CREATE_DATE",nullable=false)
	private Date createDate;
	@Column(name="USER_ID",length=36,nullable=false)
	@ManyToOne
	private UserInfoBean user;
	@Column(name="role_id",length=36,nullable=false)
	@ManyToOne
	private AssetRole role;
	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
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
	public UserInfoBean getUser()
	{
		return user;
	}
	public void setUser(UserInfoBean user)
	{
		this.user = user;
	}
	public AssetRole getRole()
	{
		return role;
	}
	public void setRole(AssetRole role)
	{
		this.role = role;
	}
}
