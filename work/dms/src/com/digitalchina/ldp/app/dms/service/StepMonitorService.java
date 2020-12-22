package com.digitalchina.ldp.app.dms.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.PageList;

public interface StepMonitorService
{
	/**
	 * 方法描述：步骤监控数据列表展示
	 */
	public PageList<String> getStepDataList(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> queryLogMessage(Map<String, Object> map);
	
	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();
	
}
