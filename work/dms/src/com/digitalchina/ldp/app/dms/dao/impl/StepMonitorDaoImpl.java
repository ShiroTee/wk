package com.digitalchina.ldp.app.dms.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.StepMonitorDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@SuppressWarnings("rawtypes")
@Component
public class StepMonitorDaoImpl extends BaseDaoSupportImpl implements StepMonitorDao
{

	/**
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
	
	public List<RDirectoryBean> getDirectoryList() {
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("directoryParentId", "0");
		RDirectoryBean bean = new RDirectoryBean();
		bean.setDirectoryId(null);
		bean.setDirectoryName("全部");
		List<RDirectoryBean> list = this.find(RDirectoryBean.class, argsMap);
		list.add(0, bean);
		return list;
	}

	@Override
	public List queryForlist(String sql) {
		// TODO Auto-generated method stub
		return this.getSimpleJdbcTemplate().queryForList(sql);
	}

	

	@Override
	public <T> PageList<T> findForPage(Class<T> cla,
			Map<String, Object> fieldsAndValue, int start, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> PageList<T> findForPage(Class<T> cla,
			Map<String, Object> fieldsAndValue, int start, int pageSize,
			String orderby) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> T get(Class<T> cla, Map<String, Object> fieldsAndValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> void update(T t, Map<String, Object> args, String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <T> void update(T t, Map<String, Object> args, String fieldName,
			Object value) {
		// TODO Auto-generated method stub
		
	}
}
