package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.sps.bean.OrderProcessInfo;
import com.digitalchina.ldp.app.sps.bean.RouteOrderInfo;
import com.digitalchina.ldp.bean.PageList;

/**
 * 订阅审批管理
 * @author python
 *
 */
public interface RouteOrderService
{
	/**
	 * 保存一条订单信息
	 * @param order
	 */
	public void saveRouteOrderInfo(RouteOrderInfo order);
	/**
	 * 更新订单状态
	 * @param orderId
	 * @param status
	 */
	public void updateOrderStatus(String orderId,int status);
	/**
	 * 保存一条处理节点信息
	 * @param info
	 */
	public void saveOrderProcessInfo(OrderProcessInfo info);
	/**
	 * 获取待审批列表
	 * @param userId
	 * @return
	 */
	public PageList<OrderProcessInfo> getOrderProcessInfoList(String userId,int start,int pageSize);
}
