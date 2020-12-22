package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;
import com.digitalchina.ldp.app.dmp.dao.DatabasedmDao;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
@Component
public class DatabasedmDaoImpl extends BaseDaoSupportImpl implements DatabasedmDao{
public List<DatabasedmBean> getDatabasedmList(String sql,int start, int pageSize) {
		
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list=this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize);
		List<DatabasedmBean> reslutList=new ArrayList<DatabasedmBean>();
		DatabasedmBean bean = null;
		for(Map<String,Object> map:list)
		{
			bean=new DatabasedmBean();
			bean.setSjklx(map.get("sjklx").toString());
			bean.setSjkmc(map.get("sjkmc").toString());
			reslutList.add(bean);
		}
		return reslutList;
	}

	public int getCount(String sql) {
		int result = this.getSimpleJdbcTemplate().queryForInt(sql);
		return result;
	}

}
