package com.digitalchina.ldp.app.dms.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.JobDoBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@SuppressWarnings("rawtypes")
@Component
public interface JobDoDao extends BaseDaoSupport
{
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

	// ////////////////////////////////////旧版本//////////////////////////////
	// 分页获取job执行情况列表
	public PageList<JobDoBean> find(int pageSize, int limit, Map<String, Object> map);

	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();

	// 下钻数据列表展示
	// public PageList<LogJobEntryBean> getDetailDataList(int pageSize, int limit,Map<String,
	// Object> map);

	// 查找日志信息
	public String queryLogMessage(Map<String, Object> map, String id);

}
