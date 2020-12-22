package com.digitalchina.ldp.app.dms.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;

public interface CleanMonitorService
{
	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList();

	/**
	 * 方法描述：检查JOB是否含有TRANS
	 */
	public boolean checkIsHaveTrans(Map<String, Object> map);

	/**
	 * 方法描述：获取JOB数据的列表
	 */
	public SpecilPageList<String> getJobData(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：检查子TRANS是否含有STEP
	 */
	public boolean checkIsHaveStep(Map<String, Object> map);

	/**
	 * 方法描述：获取TRANS数据的列表
	 */
	public SpecilPageList<String> getTransData(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：获取STEP数据的列表
	 */
	public SpecilPageList<String> getStepData(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> queryLogMessage(Map<String, Object> map);
}
