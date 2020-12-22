package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;

import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

public interface DmpDataBaseTableDao extends BaseDaoSupport {
	List<DmpDataBaseTableBean> getDmpDataBaseTableList(String sql, int start, int pageSize);

	int getCount(String string);
	
	/**
	 * 方法描述：分页查询
	 */
	@SuppressWarnings("unchecked")
	public List findByPage(int start, int end, String sql);

	/**
	 * 方法描述：查询总条数
	 */
	public int getTotal(String sql);
}
