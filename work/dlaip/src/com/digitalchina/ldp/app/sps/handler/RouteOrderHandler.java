package com.digitalchina.ldp.app.sps.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.OrderProcessInfo;
import com.digitalchina.ldp.app.sps.service.RouteOrderService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.handler.AbstractHandler;
@Component
public class RouteOrderHandler extends AbstractHandler
{
	/**
	 * 获取我的待审批列表
	 * @param model
	 * @return
	 */
	@Autowired
	private RouteOrderService routeOrderService;
	public PageList<OrderProcessInfo> getMyApprovalList(Model model)
	{
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		String userId=model.getSystemModel().getUser().getUserId();
		routeOrderService.getOrderProcessInfoList(userId, start, pageSize);
		return null;
	}
}
