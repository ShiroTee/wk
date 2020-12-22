package com.digitalchina.ldp.app.sps.bean;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.common.constant.Constant;
/**
 * 订单流程处理信息
 * 
 * @author python
 * 
 */
@Entity
@Table(name="ESB_ORDER_PROCESS")
public class OrderProcessInfo implements Serializable
{

	@Transient
	private static final long serialVersionUID = 5477122459534769043L;
	@Id
	@Column(name="PROCESS_ID",length=Constant.FIELD_ID_MAX_LENGTH)
	private String processId;
	@ManyToOne
	@Column(name="ORDER_PID",length=Constant.FIELD_ID_MAX_LENGTH)
	private OrderProcessInfo parent;
	@ManyToOne
	@Column(name="USER_ID",length=Constant.FIELD_ID_MAX_LENGTH)
	private UserInfoBean user;
	/**
	 * 处理状态 0=同意;1=不同意
	 */
	@Column(name="PROCESS_STATUS")
	private int status;
	/**
	 * 处理时间
	 */
	@Column(name="INVOK_DATE",nullable=false)
	private Date invokDate;
	@ManyToOne
	@Column(name="ORDER_ID",nullable=false,length=Constant.FIELD_ID_MAX_LENGTH)
	private RouteOrderInfo routeOrder;
	/**
	 *   审批意见
	 */
	@Column(name="SUGGESTION",length=512)
	private String suggestion;
	public UserInfoBean getUser()
	{
		return user;
	}
	public void setUser(UserInfoBean user)
	{
		this.user = user;
	}
	public int getStatus()
	{
		return status;
	}
	public void setStatus(int status)
	{
		this.status = status;
	}
	public Date getInvokDate()
	{
		return invokDate;
	}
	public void setInvokDate(Date invokDate)
	{
		this.invokDate = invokDate;
	}
	public RouteOrderInfo getRouteOrder()
	{
		return routeOrder;
	}
	public void setRouteOrder(RouteOrderInfo routeOrder)
	{
		this.routeOrder = routeOrder;
	}
	public String getSuggestion()
	{
		return suggestion;
	}
	public void setSuggestion(String suggestion)
	{
		this.suggestion = suggestion;
	}
	public OrderProcessInfo getParent()
	{
		return parent;
	}
	public void setParent(OrderProcessInfo parent)
	{
		this.parent = parent;
	}
	public String getProcessId()
	{
		return processId;
	}
	public void setProcessId(String processId)
	{
		this.processId = processId;
	}
	
}
