package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpWbjBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface DmpWbjService {

	/**
	 * 获取委办局数据交换管理列表
	 * @param start
	 * @param end
	 * @param argsMap
	 * @return
	 */
	PageList<DmpWbjBean> getDmpWbjList(int start, int end, Model argsMap);
	

	/**
	 * 获取委办局数据列表
	 * @return
	 */
	List<DmWBJBean> getWBJList();
	/**
	 * 根据委办局简称获取表名
	 * @return
	 */
	List<WBJTableBean> getTableNameListByWBJBM(WBJTableBean bean);
	/**
	 * 获取某张表的所有列名
	 * @param columnBean
	 * @return
	 */
	List<WBJTableColumnBean> getTableColumnByTableCode(WBJTableColumnBean columnBean);

	/**
	 * 保存数据
	 * @param bean
	 */
	public void insert(DmpWbjBean bean);
	/**
	 * 删除数据,可以是多条
	 * @param ids
	 */
	public void deleteDmpWbj(String ids);


	/**
	 * 查询某条数据
	 * @param bean
	 * @return
	 */
	/**
	 * 根据字段查询
	 * @param bean
	 * @return
	 */
	public DmpWbjBean getDataInfoById(DmpWbjBean bean);

	public List<DmpWbjBean> getDataInfoByBm(String ids);
	/**
	 * 修改某条数据
	 * @param bean
	 */
	void upateBean(Map<String, Object> map, String id);
}
