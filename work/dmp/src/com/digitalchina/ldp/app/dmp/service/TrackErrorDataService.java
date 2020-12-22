package com.digitalchina.ldp.app.dmp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.OlapDataReportBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.vo.ErrorDataBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface TrackErrorDataService {

	
	List<WBJTableBean> find(Class cla, String fieldName, Object value);

	List<WBJTableBean> find(Class cla, Map<String, Object> fieldsAndValeMap);

	List<WBJTableBean> find(Class cla);
	
	
	Map<String, Object> queryExceptionTableCount(String tableName,String startTime,String endTime);
	
	
	List<Map<String, Object>> getExceptionTableInfo(String sql, int start, int pageSize);
	
	/**
	 * 获取异常数据跟踪菜单的错误信息列表
	 * @param argsMap
	 * @return
	 */
	PageList<ErrorDataBean> getErrorDataList(Model argsMap);
	
	/**
	 * 获取某个异常表的详细信息
	 * @param argsMap
	 * @param param 
	 * @return
	 */
	List<Map<String, Object>> getExceptionTableInfo(Model argsMap, String param);

	/**
	 * 获取异常表中有规则的异常数据字段
	 * @param tableName
	 * @param i 
	 * @return
	 */
	List<DataConfigBean> getDataConfigTableColumn(String tableName, int i);

	/**
	 * 获取报告列表
	 * @param argsMap
	 * @return
	 */
	PageList<OlapDataReportBean> getDataReportList(Model argsMap);

	/**
	 * 获取报告listBean
	 * @param argsMap
	 * @return
	 */
	List<OlapDataReportBean> getDataReportBeanList(Model argsMap);

	List<Map<String, Object>> getExceptionTableColumnComments(String string);
}
