package com.digitalchina.ldp.app.sps.dao;

import com.digitalchina.ldp.app.sps.bean.OrderProcessInfo;
import com.digitalchina.ldp.bean.PageList;

public interface OrderProcessInfoDao
{
	/**
	 * 根据用户ID获取待审批列表
	 * @param userId
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<OrderProcessInfo> find(String userId,int start,int pageSize);
}
