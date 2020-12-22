package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface DmpDataBaseTableService {
	/**
	 * 获取基础库数据配置列表
	 * @param start
	 * @param end
	 * @param argsMap
	 * @return
	 */
	PageList<DmpDataBaseTableBean> getDmpDataBaseTableList(int start, int end, Model argsMap);
	

	/**
	 * 获取基础库数据列表
	 * @return
	 */
	List<DmpDataBaseTableBean> getDBtList();
	/**
	 * 根据基础库简称获取表名
	 * @return
	 */
	
	List<DmpDataBaseTableBean> getWbjbm(String ids);
	
	List<DmpDataBaseTableBean> getTableNameListByDBtBM(DmpDataBaseTableBean bean);
	
	/**
	 * 保存数据
	 * @param bean
	 */
	public void insert(DmpDataBaseTableBean bean);
	/**
	 * 删除数据,可以是多条
	 * @param ids
	 */
	public void deleteDmpDataBaseTable(String ids);


	/**
	 * 查询某条数据
	 * @param bean
	 * @return
	 */
	public DmpDataBaseTableBean getDataInfoById(DmpDataBaseTableBean bean);


	/**
	 * 修改某条数据
	 * @param bean
	 */
	void upateBean(Map<String, Object> map, String id);
	
}
