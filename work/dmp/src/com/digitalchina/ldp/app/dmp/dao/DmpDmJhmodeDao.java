package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;

import com.digitalchina.ldp.dao.BaseDaoSupport;
@SuppressWarnings("unchecked")
public interface DmpDmJhmodeDao extends BaseDaoSupport{
	/**
	 * 方法描述：分页查询
	 */
	public List findByPage(int start, int end, String sql);

	/**
	 * 方法描述：查询总条数
	 */
	public int getTotal(String sql);
	
}
