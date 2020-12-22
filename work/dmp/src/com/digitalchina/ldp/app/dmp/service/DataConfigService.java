package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpColumnRuleData;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface DataConfigService {

	/**
	 * 获取异常规则代码管理列表
	 * @param start
	 * @param end
	 * @param argsMap
	 * @return
	 */
	PageList<DataConfigBean> getDataConfigList(int start, int end, Model argsMap);
	

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
	void insert(DataConfigBean bean);


	/**
	 * 删除数据,可以使多条
	 * @param ids
	 */
	void deleteDataConfig(String ids);


	/**
	 * 查询某条数据
	 * @param bean
	 * @return
	 */
	DataConfigBean getDataInfoById(DataConfigBean bean);


	/**
	 * 修改某条数据
	 * @param bean
	 */
	void upateBean(Map<String, Object> map, String id);

	
	/**
	 * 获取字段出来规则列表
	 * @return
	 */
	List<DmpColumnRuleData> getColumnRuleList();


	/**
	 * 获取某个表中需要处理的字段
	 * @param configBean
	 * @return
	 */
	List<DataConfigBean> getColumnByTableCode(DataConfigBean configBean);


	/**
	 * 根据ruleId获取ruleName
	 * @param columnRuleName
	 * @return
	 */
	String getColumnRuleNameByRuleID(String columnRuleName);
	
	public List<DataConfigBean> getDataInfoByBm(String ids);

}
