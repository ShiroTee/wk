package com.digitalchina.ldp.app.dms.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.dao.CleanMonitorDao;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@SuppressWarnings("rawtypes")
@Component
public class CleanMonitorDaoImpl extends BaseDaoSupportImpl implements CleanMonitorDao
{

	/**
	 * 
	 * 方法描述：分页查询
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
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
