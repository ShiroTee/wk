package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

/**
 * 各个委办局有多少张表
 * @author zhangyg
 *
 */
public interface ICompDataManService {
	
	/**
	 * 根据委办局别名、表名、字段名，查询出此字段相应的清洗规则
	 * @param argsMap
	 * @param args
	 * @return
	 */
	public List<DataConfigBean> getDataRule(Model argsMap, Object... args) ;
	
	/**
	 * 根据规则代码、起止日期，查询清洗结果（成功数据量、失败数据量）
	 * @return
	 */
	public PageList<Map<String, Object>> getCompResultInfo(Model argsMap, Object... args) ;
	
	/**
	 * 根据清洗规则代号，查询建立清洗规则的字段及字段名
	 * @param argsMap
	 * @param args
	 * @return
	 */
	public List<Map<String,Object>> getErrorFieldAndName(Model argsMap, Object... args) ;
	
	/**
	 * 根据日期及清洗规则代号，查询出所有异常数据详情
	 * @param argsMap
	 * @return
	 */
	public PageList<Map<String, Object>> getOneDayFailedInfo(Model argsMap, Object... args) ;

	/**
	 * 根据日期及清洗规则代号，查询出所有异常数据详情
	 * @param argsMap
	 * @return
	 */
	public List<Map<String, Object>> getErrorExceptionInfo(Model argsMap,List<WBJTableColumnBean> list);

	/**
	 * 获取正确的表的中心前置库的数据
	 * @param argsMap
	 * @return
	 */

	public List<Map<String, Object>> getRightDataInfo(Model argsMap);
}
