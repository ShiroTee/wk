package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.bean.PageList;


public interface DmpDmJhmodeSevice {
	/**
	 * 获取委办局数据模式列表
	 * @param start
	 * @param end
	 * @param argsMap
	 * @return
	 */
	public PageList<String> getDmpDmJhmodeList(int start, int end, Map<String, Object> map);
	
	/**
	 * 根据委办局简称获取模式
	 * @return
	 */
	List<DmpDmJhmodeBean> getJhmodeListByDBtBM(DmpDmJhmodeBean bean);
	
	/**
	 * 保存数据
	 * @param bean
	 */
	public void insert(DmpDmJhmodeBean bean);
	/**
	 * 删除数据,可以是多条
	 * @param ids
	 */
	public void deleteDmpDmJhmode(String ids);
	/**
	 * 修改某条数据
	 * @param bean
	 */
	void upateBean(Map<String, Object> map, String id);
	//获取某条信息
	public DmpDmJhmodeBean getaddDmpDmJhmode(String ids);
}
