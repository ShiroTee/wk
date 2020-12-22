package com.digitalchina.ldp.app.dmp.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpColumnRuleData;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.common.CommonDataUtil;
import com.digitalchina.ldp.app.dmp.service.DataConfigService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class DataConfigHandler extends AbstractExtHandler {

	@Autowired
	private DataConfigService dataConfigService;

	/**
	 * 获取异常规则数据列表
	 * 
	 * @param argsMap
	 * @return
	 */
	public PageList<DataConfigBean> getDataConfigList(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		PageList<DataConfigBean> dataConfigList = dataConfigService
				.getDataConfigList(start, end, argsMap);
		return dataConfigList;
	}

	/**
	 * 获取所有委办局
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getRootData(Model argsMap) {
		List<DmWBJBean> list = dataConfigService.getWBJList();
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("wbjCode", list.get(i).getWbjCode());
			json.add("wbjShortName", list.get(i).getWbjShortName());
			json.addToList();
		}
		return json.getResultJson();
	}

	/**
	 * 根据委办局获取表
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getTableNameListByWBJ(Model argsMap) {
		String wbjCode = argsMap.getValue("wbjCode");
		WBJTableBean tableBean = new WBJTableBean();
		tableBean.setWBJBm(wbjCode);
		List<WBJTableBean> list = dataConfigService
				.getTableNameListByWBJBM(tableBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("tableNameEn", list.get(i).getTableNameEn());
			json.add("tableNameZh", list.get(i).getTableNameZh());
			json.addToList();
		}
		return json.getResultJson();
	}

	/**
	 * 根据表名获取表的列名
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getTableColumnNameByTName(Model argsMap) {
		String tableCode = argsMap.getValue("tableCode");
		WBJTableColumnBean columnBean = new WBJTableColumnBean();
		columnBean.setTableName(tableCode);
		List<WBJTableColumnBean> list = dataConfigService
				.getTableColumnByTableCode(columnBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			//if (!StringUtils.isEmpty(list.get(i).getComments())) {
				json.add("columnNameEn", list.get(i).getColumnName());
				json.add("columnNameZh", list.get(i).getComments());
				json.addToList();
			//}
		}
		return json.getResultJson();
	}

	/**
	 * 获取此段数据处理类型列表
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getColumnRuleName(Model argsMap) {

		List<DmpColumnRuleData> list = dataConfigService.getColumnRuleList();
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			if (!StringUtils.isEmpty(list.get(i).getRuleName())) {
				json.add("columnRuleId", list.get(i).getRuleId().toString());
				json.add("columnRuleName", list.get(i).getRuleName());
				json.addToList();
			}
		}
		return json.getResultJson();
	}

	/**
	 * 添加数据规则
	 * 
	 * @param argsMap
	 * @return
	 */
	public String addDataConfig(Model argsMap) {
		// 切换数据源
		// DbContextHolder.setDbType(Constant.DATE_SOURCE_KEY.dms.name());
		String name = argsMap.getValue("name");
		// 获取委办局名称
		String wbjName = argsMap.getValue("addFormWBJName");
		String wbjCode = argsMap.getValue("wbjCode");
		// 获取委办局表名
		String tableName = argsMap.getValue("tableNameValue");
		String tableCode = argsMap.getValue("tableCode");
		// 获取委办局表的列名
		String columnName = argsMap.getValue("columnNameValue");
		String columnCode = argsMap.getValue("columnCode");
		// 获取对比规则
		String ruleType = argsMap.getValue("ruleType");
		// 获取规则名称
		String ruleNameId = argsMap.getValue("columnRuleName");
		String ruleName = argsMap.getValue("columnRuleValue");
		String desc = argsMap.getValue("desc");
		DataConfigBean bean = new DataConfigBean();
		bean.setName(name);
		bean.setDataSource(wbjName);
		bean.setDataSourceCode(wbjCode);
		bean.setTableName(tableName);
		bean.setTableNameValue(tableCode);
		bean.setColumnName(columnName);
		bean.setColumnNameValue(columnCode);
		// 格式化规则类型
		String ruleTypeStr = CommonDataUtil.getRuleTypeStr(Integer
				.parseInt(ruleType));
		bean.setDataRuleType(ruleTypeStr);
		bean.setDataRuleName(ruleName);
		bean.setColumnRuleId(ruleNameId);
		// 生成数据转为规则代码
		bean.setId(StringUtils.getRandmStr(32));
		String dataRuleCode = CommonDataUtil.getDataRuleCode(ruleType, wbjCode,
				tableCode, columnCode, ruleNameId);
		bean.setDataRuleCode(dataRuleCode);
		bean.setDesc(desc);
		List<DataConfigBean> rule = this.dataConfigService
		.getDataInfoByBm(dataRuleCode);
			if (rule.size() > 0) {
				throw new ServiceException("数据已存在！");
			}
		this.dataConfigService.insert(bean);
		return "{success:true}";
	}

	/**
	 * 删除选择的数据
	 * 
	 * @param argsMap
	 * @return
	 */
	public String delDataConfig(Model argsMap) {
		String ids = argsMap.getValue("jsonData");
		String reslutStr = ids.replace("[", "(").replace("]", ")")
				.replaceAll("\"", "\'");
		dataConfigService.deleteDataConfig(reslutStr);
		return "{success:true}";
	}

	/**
	 * 获取某条数据信息
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getConfigInfo(Model argsMap) {
		String id = argsMap.getValue("dataId");
		DataConfigBean bean = new DataConfigBean();
		bean.setId(id);
		bean = dataConfigService.getDataInfoById(bean);
		bean.setColumnName(bean.getColumnNameValue());
		BaseBean baseBean = new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData = JSON.toJSONString(baseBean);
		return responseData;
	}

	/**
	 * 修改某条数据
	 * 
	 * @param argsMap
	 * @return
	 */
	public String updateDataConfig(Model argsMap) {
		String dataId = argsMap.getValue("dataId");
		DataConfigBean bean = new DataConfigBean();
		bean.setId(dataId);
		bean = dataConfigService.getDataInfoById(bean);
		Map<String, Object> map = new HashMap<String, Object>();

		// 获取对比规则
		String ruleType = argsMap.getValue("ruleType");

		// 获取字段出来规则代码
		String columnRuleName = argsMap.getValue("columnRuleName");
		String columnRuleValue = "";
		if (StringUtils.isNum(columnRuleName)) {
			columnRuleValue = columnRuleName;
			columnRuleName = dataConfigService
					.getColumnRuleNameByRuleID(columnRuleName);
		} else {
			columnRuleValue = argsMap.getValue("columnRuleValue");
		}

		String ruleTypeStr = "";
		int ruleNum = 0;
		// 获取规则名称
		// 生成数据转为规则代码
		String dataRuleCode = "";
		if (ruleType.length() == 1) {
			ruleTypeStr = CommonDataUtil.getRuleTypeStr(Integer
					.parseInt(ruleType));
			bean.setDataRuleType(ruleTypeStr);
			dataRuleCode = CommonDataUtil.getDataRuleCode(ruleType,
					bean.getDataSourceCode(), bean.getTableNameValue(),
					bean.getColumnNameValue(), columnRuleValue);
			map.put("dataRuleType", ruleTypeStr);
		} else {
			bean.setDataRuleType(ruleType);
			ruleNum = CommonDataUtil.getRuleNum(ruleType);
			dataRuleCode = CommonDataUtil.getDataRuleCode(
					String.valueOf(ruleNum), bean.getDataSourceCode(),
					bean.getTableNameValue(), bean.getColumnNameValue(),
					columnRuleValue);
			map.put("dataRuleType", ruleType);
		}
		String name = argsMap.getValue("name");
		String desc = argsMap.getValue("desc");

		// 格式化规则类型
		bean.setDataRuleName(columnRuleName);
		bean.setDataRuleCode(dataRuleCode);
		bean.setColumnRuleId(columnRuleValue);
		bean.setDesc(desc);
		bean.setName(name);

		map.put("name", name);
		map.put("dataRuleName", columnRuleName);
		map.put("dataRuleCode", dataRuleCode);
		map.put("columnRuleId", columnRuleValue);
		map.put("desc", desc);
		this.dataConfigService.upateBean(map, bean.getId());
		return "{success:true}";
	}

}
