package com.digitalchina.ldp.app.sps.dao.impl;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.OrderProcessInfo;
import com.digitalchina.ldp.app.sps.dao.OrderProcessInfoDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
@Component
public class OrderProcessInfoDaoImpl extends BaseDao implements OrderProcessInfoDao
{
	private static final String QUERY_SQL="SELECT EP.PROCESS_ID,EO.SUBMIT_DATE,U.USER_NAME FROM ESB_ORDER_PROCESS EP INNER JOIN ESB_ROUTE_ORDER EO" +
			" ON EP.ORDER_ID=EO.ORDER_ID INNER JOIN USER_INFO U ON U.USER_ID=EO.USER_ID AND EP.USER_ID=?";
	@Override
	public PageList<OrderProcessInfo> find(String userId, int start,
			int pageSize)
	{
		String sql=this.getDbPage().pageForParams(QUERY_SQL);
		return this.createSqlQuery(OrderProcessInfo.class, sql, userId).page(start, pageSize);
	}

}
