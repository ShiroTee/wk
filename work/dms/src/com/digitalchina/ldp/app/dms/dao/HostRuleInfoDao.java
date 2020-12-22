package com.digitalchina.ldp.app.dms.dao;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.HostRuleInfoBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

public interface HostRuleInfoDao extends BaseDaoSupport{
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

}
