package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.dao.DataConfigDao;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class DataConfigDaoImpl extends BaseDaoSupportImpl implements DataConfigDao {

	public List<DataConfigBean> getDataConfigList(String sql,int start, int pageSize) {
		
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list = 0 != start ? this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize+start) : this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize+start);
		List<DataConfigBean> reslutList=new ArrayList<DataConfigBean>();
		DataConfigBean bean = null;
		for(Map<String,Object> map:list)
		{
			bean=new DataConfigBean();
			bean.setId(map.get("DATAID").toString());
			bean.setName(map.get("NAME").toString());
			bean.setDataSource(map.get("DATASOURCE").toString());
			bean.setTableName(map.get("TABLENAME").toString());
			bean.setColumnName(map.get("COLUMNNAMEVALUE").toString());
			bean.setDataRuleType(map.get("DATARULETYPE").toString());
			bean.setDataRuleName(map.get("DATARULENAME").toString());
			bean.setDataRuleCode(map.get("DATARULECODE").toString());
			//添加各项的英文值
			bean.setDataSourceCode(map.get("DATASOURCEVALUE").toString());
			bean.setTableNameValue(map.get("TABLENAMEVALUE").toString());
			bean.setColumnNameValue(map.get("COLUMNNAMEVALUE").toString());
			reslutList.add(bean);
		}
		return reslutList;
	}

	public int getCount(String sql) {
		int result = this.getSimpleJdbcTemplate().queryForInt(sql);
		return result;
	}

	public List<DataConfigBean> getErrorDataTableInfo(String sql, int start, int end) {
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list = 0 != start ? this.getSimpleJdbcTemplate().queryForList(sql,start,end+start) : this.getSimpleJdbcTemplate().queryForList(sql,start,end+start);
		List<DataConfigBean> reslutList=new ArrayList<DataConfigBean>();
		DataConfigBean bean = null;
		for(Map<String,Object> map:list)
		{
			bean=new DataConfigBean();
			bean.setDataSource(map.get("DATASOURCE").toString());
			bean.setTableName(map.get("TABLENAME").toString());
			//添加各项的英文值
			bean.setDataSourceCode(map.get("DATASOURCEVALUE").toString());
			bean.setTableNameValue(map.get("TABLENAMEVALUE").toString());
			reslutList.add(bean);
		}
		return reslutList;
	}
}
