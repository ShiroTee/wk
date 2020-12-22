package com.digitalchina.ldp.app.dms.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.bean.PageList;

public interface KettleWarningService
{
	/**
	 * 方法描述：kettle异常预警列表展示
	 */
	public PageList<String> getWarningDataList(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> queryLogMessage(Map<String, Object> map);

}
