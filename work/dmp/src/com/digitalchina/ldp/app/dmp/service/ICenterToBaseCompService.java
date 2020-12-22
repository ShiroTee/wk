package com.digitalchina.ldp.app.dmp.service;

import java.util.Map;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

/**
 * 各个委办局有多少张表
 * @author zhangyg
 *
 */
public interface ICenterToBaseCompService {
	
	/**
	 * 得到全部或者某一个时间段数据对账结果信息
	 * @param argsMap
	 * @param args
	 * @return
	 */
	public PageList<Map<String, Object>> getCompareResultInfo(Model argsMap, Object... args) ;
}
