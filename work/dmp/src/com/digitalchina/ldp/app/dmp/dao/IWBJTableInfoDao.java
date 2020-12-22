package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.dao.BaseDaoSupport;

/**
 * 
 * @author zhangyg
 *
 */
@Component
public interface IWBJTableInfoDao extends BaseDaoSupport{
	
	/**
	 * 根据传入SQL(分页)
	 * @return
	 */
	public List<Map<String,Object>> getTableNameListGroupByBM(String sql, Object... args) ;
	
	/**
	 * 根据传入SQL(不分页)
	 * @return
	 */
	public List<Map<String,Object>> getOneTableInfoByBM(String sql, Object... args) ;
	
	/**
	 * 根据传入SQL(求sql查询出的数据总条数)
	 * @param sql
	 * @param args
	 * @return
	 */
	public int getCount(String sql, Object... args) ;

	/**
	 * 根据传入SQL(求sql查询出的数据总条数)
	 * @param sql
	 * @param args
	 * @return
	 */
	public List<Map<String, Object>> getTableNameListGroup(String sql,Object... args);
	
}
