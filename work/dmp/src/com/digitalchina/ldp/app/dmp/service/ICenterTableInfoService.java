package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

/**
 * 各个委办局有多少张表
 * @author zhangyg
 *
 */
public interface ICenterTableInfoService {
	
	/**
	 * 在中心前置库里，按照委办别名分组查询各个委办局有多少张表
	 * @return
	 */
	public PageList<Map<String, Object>> getTableNameListGroupByBM(int start, int end, Model argsMap) ;
	
	/**
	 * 在中心前置库里，根据委办局别名，查询某一个委办局的所有数据表的详情
	 * @param argsMap
	 * @return
	 */
	public List<Map<String,Object>> getOneTableInfoByBM(Model argsMap, Object... args) ;
	
	/**
	 * 根据么办局别名，查询一段时间里，每天新增数据详情
	 * @param argsMap
	 * @param args
	 * @return
	 */
	public List<Map<String,Object>> getOneMonthAddByBM(Model argsMap, Object... args) ;
	
}
