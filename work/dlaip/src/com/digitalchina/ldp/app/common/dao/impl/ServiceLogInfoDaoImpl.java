package com.digitalchina.ldp.app.common.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.common.bean.ServiceLogBean;
import com.digitalchina.ldp.app.common.dao.ServiceLogInfoDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
@Component
public class ServiceLogInfoDaoImpl extends BaseDao implements ServiceLogInfoDao
{

	@Override
	public PageList<ServiceLogBean> query(int start, int pageSize,
			Map<String, Object> args)
	{
		StringBuilder sql=new StringBuilder();
		sql.append("SELECT S.*,A.APP_ID,A.APP_NAME FROM SERVICE_LOG_INFO S LEFT JOIN APP_INFO_TABLE A");
		sql.append(" ON A.APP_ID=S.SYSTEM_ID WHERE 1=1");
		List<Object> list=new ArrayList<Object>(args.size());
		for(Entry<String,Object> entry:args.entrySet())
		{
			sql.append(" AND ");
			sql.append(entry.getKey());
			sql.append("?");
			list.add(entry.getValue());
		}
		return this.createSqlQuery(ServiceLogBean.class,sql.toString(),list.toArray()).page(start, pageSize);
	}

}
