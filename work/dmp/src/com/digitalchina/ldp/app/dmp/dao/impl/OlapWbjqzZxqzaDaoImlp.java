package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.List;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dmp.dao.OlapWbjqzZxqzaDao;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class OlapWbjqzZxqzaDaoImlp extends BaseDaoSupportImpl implements OlapWbjqzZxqzaDao {

	/**
	 * 
	 * 方法描述：分页查询
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	@SuppressWarnings("unchecked")
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
}
