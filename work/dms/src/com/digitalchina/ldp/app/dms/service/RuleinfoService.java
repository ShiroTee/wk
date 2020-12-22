package com.digitalchina.ldp.app.dms.service;
import java.util.Map;
import com.digitalchina.ldp.app.dms.bean.RuleinfoBean;
import com.digitalchina.ldp.bean.PageList;

public interface RuleinfoService {
	/**
	 * 获取委办局数据模式列表
	 * @param start
	 * @param end
	 * @param argsMap
	 * @return
	 */
	public PageList<String> getaddRuleinfoList(int start, int end, Map<String, Object> map);
	
	/**
	 * 保存数据
	 * @param bean
	 */
	public void insertRuleinfoList(RuleinfoBean bean);
	/**
	 * 删除数据,可以是多条
	 * @param ids
	 */
	public void deleteRuleinfo(String ids);
	/**
	 * 修改某条数据
	 * @param bean
	 */
	void upateRuleinfo(Map<String, Object> map, String id);
	/**
	 * 获取某条信息
	 * @param ids
	 */
	public RuleinfoBean getaddRuleinfo(String ids);
	/**
	 * 修改状态
	 * @param ids
	 */
	public void updateRuleinfoStatus(Map<String, Object> map);
}
