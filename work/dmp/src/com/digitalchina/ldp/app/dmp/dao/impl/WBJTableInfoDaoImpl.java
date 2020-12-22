package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.dao.IWBJTableInfoDao;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

import javax.sql.DataSource;

@Component
public class WBJTableInfoDaoImpl extends BaseDaoSupportImpl implements
		IWBJTableInfoDao {

	//分页
	public List<Map<String,Object>> getTableNameListGroupByBM(String sql, Object... args) {
//		sql = "SELECT t.wbjbm,t.wbjjc,COUNT(distinct(t.bm)) tablecount,SUM(t.addcount) addsum FROM (SELECT d.wbjbm WBJBM,d.wbjjc WBJJC,d.bm BM,o.addcount ADDCOUNT,o.adddate ADDDATE FROM DMP_WBJ_TABLE d LEFT JOIN OLAP_WBJ_TABLE_COUNT o ON d.wbjbm=o.wbjbm AND d.bm=o.bm) t GROUP BY t.wbjbm,t.wbjjc ;" ;
		sql=this.getPage().pageForParams(sql);
		List<Map<String,Object>> list = this.getSimpleJdbcTemplate().queryForList(sql, args);
		return list;
	}

	//不分页
	public List<Map<String, Object>> getOneTableInfoByBM(String sql, Object... args) {
		List<Map<String,Object>> list = this.getSimpleJdbcTemplate().queryForList(sql, args);
		return list;
	}

	//求数据总条数
	public int getCount(String sql, Object... args) {
		sql = this.getPage().pageForCount(sql) ;
		int count = this.getSimpleJdbcTemplate().queryForInt(sql, args) ;
		return count;
	}

	public List<Map<String, Object>> getTableNameListGroup(String sql, Object... args) {
		List<Map<String,Object>> list = this.getSimpleJdbcTemplate().queryForList(sql, args);
		return list;
	}

}
