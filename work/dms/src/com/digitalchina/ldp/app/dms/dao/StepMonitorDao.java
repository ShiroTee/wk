package com.digitalchina.ldp.app.dms.dao;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@SuppressWarnings("rawtypes")
public interface StepMonitorDao extends BaseDaoSupport

{
	
	public List queryForlist(String sql);
	
	
	/**
	 * 方法描述：分页查询
	 */
	public List findByPage(int start, int end, String sql);

	/**
	 * 方法描述：查询总条数
	 */
	public int getTotal(String sql);

	/**
	 * 方法描述：普通的查询语句
	 */
	public List findBySql(String sql);

	/**
	 * 方法描述：更新语句
	 */
	public void updateBySql(String sql);

	/**
	 * 方法描述：插入语句
	 */
	public void insertBySql(String sql, Object[] args);
	
	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();


}
