package com.digitalchina.ldp.app.dmp.service;

import java.util.List;

import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;
import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.app.dmp.bean.RecordBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface RecordService {

	/**
	 * 获取基础数据库管理列表
	 * @param start
	 * @param end
	 * @param argsMap
	 * @return
	 */
	PageList<RecordBean> getRecordList(int start, int end, Model argsMap);
	

	/**
	 * 获取基础库数据列表
	 * @return
	 */
	List<DatabasedmBean> getRecordList();
	/**
	 * 根据数据库类别获取表名
	 * @return
	 */
	List<DmpDataBaseTableBean> getTableNameListByJCK(DmpDataBaseTableBean bean);
	/**
	 * 获取某张表的所有列名
	 * @param columnBean
	 * @return
	 */
	List<WBJTableColumnBean> getTableColumnByTableCode(WBJTableColumnBean columnBean);

	/**
	 * 查询某条数据
	 * @param bean
	 * @return
	 */
	public RecordBean getDataInfoById(RecordBean bean);
	/**
	 * 查询基础数据
	 */
	public PageList<String> getRecordDataList(Model argsMap);
	/**
	 * 保存数据
	 * @param bean
	 */
	public void insert(RecordBean bean);
	
}
