package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

/**
 * 各个委办局有多少张表
 * @author zhangyg
 *
 */
public interface IWbjFileInfoService {
	
	/**
	 * 按照委办别名分组查询各个委办局的文件总数量和文件总大小
	 * @return
	 */
	public PageList<Map<String, Object>> getFileCountListGroupByBm(int start, int end, Model argsMap) ;
	
	/**
	 * 根据委办局别名，统计某一个委办局的所有上传的文件详情
	 * @param argsMap
	 * @return
	 */
	public List<Map<String,Object>> getOneWbjAllFilesByBm(Model argsMap, Object... args) ;
	
	/**
	 * 根据么办局别名，查询一段时间里，每天新上传文件详情
	 * @param argsMap
	 * @param args
	 * @return
	 */
	public List<Map<String,Object>> getOneMonthAddByBm(Model argsMap, Object... args) ;
	
	/**
	 * 获取委办局数据列表
	 * @return
	 */
	List<DmpDmJhmodeBean> getWBJList();
	
}
