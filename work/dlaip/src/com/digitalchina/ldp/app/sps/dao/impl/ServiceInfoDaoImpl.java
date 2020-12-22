package com.digitalchina.ldp.app.sps.dao.impl;


import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.dao.ServiceInfoDao;
import com.digitalchina.ldp.dao.BaseDao;
@Component
public class ServiceInfoDaoImpl extends BaseDao implements ServiceInfoDao
{

	@Override
	public void update(String routeId)
	{
		String sql="update esb_route_info set asset_id=? ,SERVICE_TYPE=? where res_id=?";
		this.createJdbcTemplate().update(sql,null,2,routeId);
	}

	@Override
	public String find(String publishURL,Integer matchOnUriPrefix)
	{
		
		if(matchOnUriPrefix==0)
		{
			String sql="select e.publish_url from esb_route_info e where e.RES_TYP<>? and MATCH_ON_URIPREFIX=? and  instr(?,e.publish_url)>0";
			Object[] args=new Object[]{"ftp",1,publishURL};
			List<String> list=this.createJdbcTemplate().queryForList(sql,String.class,args);
			if(list.isEmpty())
			{
				return null;
			}
			return list.get(0);
		}
		String sql="select e.publish_url from esb_route_info e where e.RES_TYP<>?  and  instr(?,e.publish_url)>0";
		Object[] args=new Object[]{"ftp",publishURL};
		List<String> list=this.createJdbcTemplate().queryForList(sql,String.class,args);
		if(list.isEmpty())
		{
			return null;
		}
		return list.get(0);
		
	}

}
