package com.digitalchina.ldp.app.dms.dao;

import java.util.List;

import com.digitalchina.ldp.dao.BaseDaoSupport;
@SuppressWarnings("rawtypes")
public interface RuleinfoDao extends BaseDaoSupport{

	/**
	 * 方法描述：分页查询
	 */
	public List findByPage(int start, int end, String sql);

	/**
	 * 方法描述：查询总条数
	 */
	public int getTotal(String sql);
	
	public void updateBySql(String sql);

}
