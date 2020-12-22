package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DmpWbjBean;
import com.digitalchina.ldp.app.dmp.dao.DmpWbjDao;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class DmpWbjDaoImpl extends BaseDaoSupportImpl implements DmpWbjDao {

	public List<DmpWbjBean> getDmpWbjList(String sql,int start, int pageSize) {
		
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list= 0 != start ? this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize+start) : this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize+start);
		List<DmpWbjBean> reslutList=new ArrayList<DmpWbjBean>();
		DmpWbjBean bean = null;
		for(Map<String,Object> map:list)
		{
			bean=new DmpWbjBean();
			bean.setWbjbm(StringUtils.objToString(map.get("wbjbm")));
			bean.setWbjjc(StringUtils.objToString(map.get("wbjjc")));
			bean.setBm(StringUtils.objToString(map.get("bm")));
			bean.setBhzmc(StringUtils.objToString(map.get("bhzmc")));
			bean.setZdzj(Integer.valueOf(StringUtils.objToString(map.get("zdzj"))));
			reslutList.add(bean);
		}
		return reslutList;
	}

	public int getCount(String sql) {
		int result = this.getSimpleJdbcTemplate().queryForInt(sql);
		return result;
	}

}
