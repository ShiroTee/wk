package com.digitalchina.ldp.app.sps.service.impl;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.OrderProcessInfo;
import com.digitalchina.ldp.app.sps.bean.RouteOrderInfo;
import com.digitalchina.ldp.app.sps.service.RouteOrderService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
@Service
public class RouteOrderServiceImpl extends BaseService implements RouteOrderService
{

	@Override
	public void saveRouteOrderInfo(RouteOrderInfo order)
	{
		this.createExecuteQuery().insert(order,false);
	}

	@Override
	public void updateOrderStatus(String orderId, int status)
	{
		RouteOrderInfo order=new RouteOrderInfo();
		order.setOrderId(orderId);
		order.setOrderStatus(status);
		this.createExecuteQuery().update(order);
	}

	@Override
	public void saveOrderProcessInfo(OrderProcessInfo info)
	{
		this.createExecuteQuery().insert(info,false);
	}

	@Override
	public PageList<OrderProcessInfo> getOrderProcessInfoList(String userId,int start,int pageSize)
	{
		BeanQuery<OrderProcessInfo> query=this.createBeanQuery(OrderProcessInfo.class);
		query.eq("user.userId",userId);
		query.setJoin(true);
		query.setJoinBean("RouteOrderInfo");
		query.selectFields("routeOrder.orderId","routeOrder.submitDate");
		return null;
	}

}
