package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.app.dmp.dao.DmpDataBaseTableDao;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
@Component
public class DmpDataBaseTableDaoImpl extends BaseDaoSupportImpl implements DmpDataBaseTableDao {
public List<DmpDataBaseTableBean> getDmpDataBaseTableList(String sql,int start, int pageSize) {
		
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list=this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize);
		List<DmpDataBaseTableBean> reslutList=new ArrayList<DmpDataBaseTableBean>();
		List<DmpDataBaseTableBean> reslutList_1=new ArrayList<DmpDataBaseTableBean>();
		DmpDataBaseTableBean bean = null;
		for(Map<String,Object> map:list)
		{
			bean=new DmpDataBaseTableBean();
			DmpDataBaseTableBean beanRecord =new DmpDataBaseTableBean();
			beanRecord.setSjklx(StringUtils.objToString(map.get("SJKLX")));
			bean.setSjklx(StringUtils.objToString(map.get("sjklx")));
			bean.setSjkmc(StringUtils.objToString(map.get("sjkmc")));
			bean.setBm(StringUtils.objToString(map.get("bm")));
			String zdsum=StringUtils.objToString(map.get("zdtcount"));
			Integer zdtcount=Integer.valueOf(zdsum);
			bean.setZdtcount(zdtcount);
//			bean.setZdtcount(Integer.parseInt(StringUtils.objToString(map.get("zdtcount"))));
			beanRecord.setSjkmc(StringUtils.objToString(map.get("DATABASETYPE")));
			beanRecord.setBm(StringUtils.objToString(map.get("TABLENAME")));
			bean.setBhzmc(StringUtils.objToString(map.get("bhzmc")));	
			reslutList.add(bean);
			reslutList_1.add(beanRecord);
		}
		return reslutList;
	}

	public int getCount(String sql) {
		int result = this.getSimpleJdbcTemplate().queryForInt(sql);
		return result;
	}

	/**
	 * 
	 * 方法描述：分页查询
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List findByPage(int start, int end, String sql)
	{
		String sb = this.getPage().pageForParams(sql);
		List list = this.getSimpleJdbcTemplate().queryForList(sb, start, start + end);

		return list;
	}

	/**
	 * 
	 * 方法描述：查询总条数
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public int getTotal(String sql)
	{
		int count = this.getSimpleJdbcTemplate().queryForInt(sql);
		return count;
	}


}
