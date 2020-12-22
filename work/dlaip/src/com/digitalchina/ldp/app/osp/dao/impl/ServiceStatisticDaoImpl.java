package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.dao.ServiceStatisticDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.springframework.stereotype.Component;

@Component
public class ServiceStatisticDaoImpl extends BaseDao implements ServiceStatisticDao {

	@Override
	public PageList<DynamicBean> listServiceByInvoking(int start, int size) {
			
			String sql = "select t.route_id,count(1) from esb_route_log t group by t.route_id order by count(1) desc";

		    return this.createDynamicSqlQuery(sql).page(start, size);
	}

	@Override
	public PageList<DynamicBean> listServiceByAccessing(int start, int size) {
		 StringBuilder sb = new StringBuilder();
		    sb.append("    SELECT T.RES_ID AS SERVICE_ID, COUNT(1) ");
		    sb.append("   FROM RES_ACCESS_LOG t ,ESB_ROUTE_INFO e");
		    sb.append("	  WHERE t.RES_ID = e.RES_ID");
		    sb.append("    GROUP BY t.RES_ID ");
		    sb.append("        ORDER BY COUNT(1) DESC");

		    return this.createDynamicSqlQuery(sb.toString()).page(start, size);
	}

	@Override
	public PageList<DynamicBean> listServiceByCollectCount(int start, int size, String parentType) {
		String sql = "  SELECT T1.RES_ID, " +
				"         T1.SERV_TYPE_ID, " +
				"         T3.PARANT_TYPE_ID, " +
				"         (SELECT COUNT(1) " +
				"            FROM USER_ROUTE_COLLECT T2 " +
				"           WHERE T2.RES_ID = T1.RES_ID) " +
				"            COUNT " +
				"    FROM ESB_ROUTE_INFO T1 " +
				"         JOIN ESB_ROUTE_TYPE T3 " +
				"            ON T1.SERV_TYPE_ID = T3.SERV_TYPE_ID AND T3.PARANT_TYPE_ID = ? " +
				"ORDER BY COUNT DESC";
		return this.createDynamicSqlQuery(sql, parentType).page(start, size);
	}

	@Override
	public PageList<DynamicBean> listServiceByCollect(int start, int size) {
		 StringBuilder sb = new StringBuilder();
		 sb.append("select res_id,count(1) from user_route_collect group by res_id order by count(1) desc");
		 return this.createDynamicSqlQuery(sb.toString()).page(start, size);
	}

}
