package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.RecordBean;
import com.digitalchina.ldp.app.dmp.dao.RecordDao;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class RecordDaoImpl extends BaseDaoSupportImpl implements RecordDao {

	public List<RecordBean> getRecordList(String sql,int start, int pageSize) {
		
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list=this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize);
		List<RecordBean> reslutList=new ArrayList<RecordBean>();
		RecordBean bean = null;
		//Model model=null;
		for(Map<String,Object> map:list)
		{
			bean=new RecordBean();
			bean.setSjklx(StringUtils.objToString(map.get("sjklx")));
			bean.setDatabasetype(StringUtils.objToString(map.get("databasetype")));
			bean.setTablename(StringUtils.objToString(map.get("tablename")));
			bean.setDatacount(StringUtils.objToString(map.get("datacount")));
			reslutList.add(bean);
		}
		return reslutList;
	}

	public int getCount(String sql) {
		int result = this.getSimpleJdbcTemplate().queryForInt(sql);
		return result;
	}

	public List<Map<String, Object>> getRecordTableInfo(String sql, int start,
			int pageSize) {
		sql=this.getPage().pageForParams(sql);
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate().queryForList(sql, start, pageSize);
		return list;
	}

	public int queryRecordTableCount(String tableName) {
		tableName = "EXCEPITION_"+tableName;
		String sql = "select count(*) from "+ tableName;
		int count = this.getSimpleJdbcTemplate().queryForInt(sql);
		return count;
	}
}
