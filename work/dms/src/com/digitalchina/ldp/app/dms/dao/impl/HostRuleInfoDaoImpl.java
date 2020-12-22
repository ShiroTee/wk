package com.digitalchina.ldp.app.dms.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.HostRuleInfoBean;
import com.digitalchina.ldp.app.dms.dao.HostRuleInfoDao;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
@SuppressWarnings("rawtypes")
@Component
public class HostRuleInfoDaoImpl extends BaseDaoSupportImpl implements HostRuleInfoDao{
	/**
	 * 
	 * 方法描述：普通的查询语句
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public List findBySql(String sql)
	{
		List list = this.getSimpleJdbcTemplate().queryForList(sql);

		return list;
	}
	/**
	 * 
	 * 方法描述：更新语句
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public void updateBySql(String sql)
	{
		this.getSimpleJdbcTemplate().update(sql);
	}

	/**
	 * 
	 * 方法描述：插入语句
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public void insertBySql(String sql, Object[] args)
	{
		this.getSimpleJdbcTemplate().update(sql, args);
	}
}
