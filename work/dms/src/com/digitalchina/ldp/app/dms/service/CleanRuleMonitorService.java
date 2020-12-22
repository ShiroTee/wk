package com.digitalchina.ldp.app.dms.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.PageList;

public interface CleanRuleMonitorService
{
	/**
	 * 方法描述：清洗规则数据列表展示
	 */
	public PageList<String> getCleanRuleDataList(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList();

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> queryLogMessage(Map<String, Object> map);

}
