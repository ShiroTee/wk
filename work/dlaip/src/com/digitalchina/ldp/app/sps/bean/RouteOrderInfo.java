package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.common.constant.Constant;
@Entity
@Table(name="ESB_ROUTE_ORDER")
public class RouteOrderInfo implements Serializable
{
	@Transient
	private static final long serialVersionUID = -717146101239805907L;
	@Id
	@Column(name="ORDER_ID",length=Constant.FIELD_ID_MAX_LENGTH)
	private String orderId;
	/**
	 * 申请人
	 */
	@ManyToOne
	@Column(name="USER_ID",length=Constant.FIELD_ID_MAX_LENGTH,nullable=false)
	private UserInfoBean submitUser;
	/**
	 * 申请时间
	 */
	@Column(name="SUBMIT_DATE",nullable=false)
	private Date submitDate;
	/**
	 * 申请服务集合
	 */
	@Transient
	private Set<ResourceCatalogueInfo> routes=new HashSet<ResourceCatalogueInfo>(0);
	/**
	 * 订单状态
	 * 0=正在处理；1=处理完成
	 */
	@Column(name="ORDER_STATUS")
	private int orderStatus;
	/**
	 * 备注信息
	 */
	@Column(name="ORDER_REMARKS",length=512)
	private String remarks;	
	/**
	 * 申请用途
	 */
	@Column(name="APPLY_USE",length=512,nullable=false)
	private String applyUse;
	public String getOrderId()
	{
		return orderId;
	}
	public void setOrderId(String orderId)
	{
		this.orderId = orderId;
	}
	public UserInfoBean getSubmitUser()
	{
		return submitUser;
	}
	public void setSubmitUser(UserInfoBean submitUser)
	{
		this.submitUser = submitUser;
	}
	public Date getSubmitDate()
	{
		return submitDate;
	}
	public void setSubmitDate(Date submitDate)
	{
		this.submitDate = submitDate;
	}
	public Set<ResourceCatalogueInfo> getRoutes()
	{
		return routes;
	}
	public void setRoutes(Set<ResourceCatalogueInfo> routes)
	{
		this.routes = routes;
	}
	public int getOrderStatus()
	{
		return orderStatus;
	}
	public void setOrderStatus(int orderStatus)
	{
		this.orderStatus = orderStatus;
	}
	public String getRemarks()
	{
		return remarks;
	}
	public void setRemarks(String remarks)
	{
		this.remarks = remarks;
	}
	public String getApplyUse()
	{
		return applyUse;
	}
	public void setApplyUse(String applyUse)
	{
		this.applyUse = applyUse;
	}

}
