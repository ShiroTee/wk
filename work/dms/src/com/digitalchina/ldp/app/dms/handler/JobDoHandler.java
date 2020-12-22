package com.digitalchina.ldp.app.dms.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.app.dms.service.JobDoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class JobDoHandler extends AbstractExtHandler
{

	@Autowired
	private JobDoService	jobDoService;

	public ViewModel page(Model model)
	{
		ViewModel viewModel = new ViewModel("jobmonitor/jobDo.jsp", "flowfollow/dynamicGrid.js");
		model.getRequest().setAttribute("mainStep", "0");
		model.getRequest().setAttribute("mainColParam", "jobGo");
		model.getRequest().setAttribute("getLogInfoUrl", "getLogMessage");
		model.getRequest().setAttribute("columnNameUrl", "getColumnName");
		model.getRequest().setAttribute("tableDataUrl", "getTableData");
		model.getRequest().setAttribute("tipMsg", "对作业的今日和历史执行情况进行展示，点击每条记录的日志详情，可查看该作业运行的详细日志信息，双击列表记录可实现下钻，以查看该作业的子作业的执行情况。");
		return viewModel;
	}

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList(Model model)
	{
		List<RDirectoryBean> list = jobDoService.getDirectoryList();
		RDirectoryBean bean = new RDirectoryBean();
		bean.setDirectoryId(null);
		bean.setDirectoryName("全部");
		list.add(0, bean);
		return list;
	}

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> getLogMessage(Model model)
	{
		List<String> list = jobDoService.queryLogMessage(model);
		return list;
	}

	/**
	 * 类描述：主要是暂时解决Combobox静态数据的问题
	 */
	class OkFlag
	{
		private String	flagText;
		private String	flagValue;

		public String getFlagText()
		{
			return flagText;
		}

		public void setFlagText(String flagText)
		{
			this.flagText = flagText;
		}

		public String getFlagValue()
		{
			return flagValue;
		}

		public void setFlagValue(String flagValue)
		{
			this.flagValue = flagValue;
		}
	}

	/**
	 * 方法描述：返回成功与否的下拉表
	 */
	public List<OkFlag> getOkFlagList(Model model)
	{
		List<OkFlag> list = new ArrayList<OkFlag>();
		OkFlag okFlag = new OkFlag();
		okFlag.setFlagText("");
		okFlag.setFlagValue("全部");
		list.add(okFlag);
		okFlag = new OkFlag();
		okFlag.setFlagText("0");
		okFlag.setFlagValue("成功");
		list.add(okFlag);
		okFlag = new OkFlag();
		okFlag.setFlagText("1");
		okFlag.setFlagValue("失败");
		list.add(okFlag);

		return list;
	}

	/**
	 * 页面设置
	 */
	private Map<String, Object> getPageExt(String queryColParam)
	{
		Map<String, Object> retMap = new HashMap<String, Object>();
		List<Object> queryStrList = new ArrayList<Object>();
		List<Object> columnNamesList = new ArrayList<Object>();

		if (("jobGo").equals(queryColParam))
		{
			// 列名称
			columnNamesList.add("{fieldsValue: \"{name: 'JOBID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'GOVID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'REPLAYDATE'}\", columnsValue: \"\"}");
			columnNamesList
					.add("{fieldsValue: \"{name: 'JOBNAME'}\", columnsValue: \"{header: '作业名称', dataIndex: 'JOBNAME', width: 90, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'GOVNAME'}\", columnsValue: \"{header: '所属委办局', dataIndex: 'GOVNAME', width: 85,align: 'center', hidden: false, sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"{header: '批次号', dataIndex: 'BATCHFLAG', width: 80, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STATUS'}\", columnsValue: \"{header: '状态', dataIndex: 'STATUS', width: 40, align: 'center', sortable: true, renderer: formatQtip,hidden : true}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STARTDATE'}\", columnsValue: \"{header: '启动时间', hidden: true,dataIndex: 'STARTDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ENDDATE'}\", columnsValue: \"{header: '停止时间', hidden: true,dataIndex: 'ENDDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGDATE'}\", columnsValue: \"{header: '记录时间', dataIndex: 'LOGDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREAD'}\", columnsValue: \"{header: '读取', dataIndex: 'LINESREAD', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESWRITTEN'}\", columnsValue: \"{header: '写入', dataIndex: 'LINESWRITTEN', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESUPDATED'}\", columnsValue: \"{header: '更新', dataIndex: 'LINESUPDATED', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESINPUT'}\", columnsValue: \"{header: '输入', dataIndex: 'LINESINPUT', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESOUTPUT'}\", columnsValue: \"{header: '输出', dataIndex: 'LINESOUTPUT', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREJECTED'}\", columnsValue: \"{header: '拒绝', dataIndex: 'LINESREJECTED', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ERRORS'}\", columnsValue: \"{header: '错误', dataIndex: 'ERRORS', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'OPERWAY'}\", columnsValue: \"{header: '操作', dataIndex: 'OPERWAY', width: 70, align: 'center', sortable: true, renderer: renderOper}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGFIELD'}\", columnsValue: \"\"}");

			// 查询条件
			queryStrList.add("{id: 'name', fieldLabel: '作业名称', value: '', qryType: 'textfield', columnWidth: '.18', anchor: '100%'}");
			queryStrList.add("{id: 'wbjName', fieldLabel: '委办局', url: 'getDirectoryList', valueField: 'directoryId', displayField: 'directoryName', qryType: 'combobox', columnWidth: '.24', anchor: '50%'}");
			queryStrList.add("{id: 'okFlag', fieldLabel: '作业状态', url: 'getOkFlagList', valueField: 'flagText', displayField: 'flagValue', qryType: 'combobox', columnWidth: '.24', anchor: '100%'}");
			queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType: 'datefield', columnWidth: '.34', anchor: '60%'}");

			retMap.put("columnNamesList", columnNamesList);
			retMap.put("queryStrList", queryStrList);
			retMap.put("queryGroupField", "GOVNAME");
		}
		else if (("childJobGo").equals(queryColParam))
		{
			// 列名称
			columnNamesList.add("{fieldsValue: \"{name: 'MAINID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'RJOBID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'GOVID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'REPLAYDATE'}\", columnsValue: \"\"}");
			columnNamesList
					.add("{fieldsValue: \"{name: 'JOBNAME'}\", columnsValue: \"{header: '作业名称', dataIndex: 'JOBNAME', width: 120, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'GOVNAME'}\", columnsValue: \"{header: '所属委办局', dataIndex: 'GOVNAME', width: 85, align: 'center',hidden: false, sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"{header: '批次号', dataIndex: 'BATCHFLAG', width: 80, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STATUS'}\", columnsValue: \"{header: '状态', dataIndex: 'STATUS', width: 40, align: 'center', sortable: true, renderer: formatQtip,hidden : true}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STARTDATE'}\", columnsValue: \"{header: '启动时间', dataIndex: 'STARTDATE', width: 120, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ENDDATE'}\", columnsValue: \"{header: '停止时间', dataIndex: 'ENDDATE', width: 120, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGDATE'}\", columnsValue: \"{header: '记录时间', dataIndex: 'LOGDATE', width: 120, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREAD'}\", columnsValue: \"{header: '读取', dataIndex: 'LINESREAD', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESWRITTEN'}\", columnsValue: \"{header: '写入', dataIndex: 'LINESWRITTEN', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESUPDATED'}\", columnsValue: \"{header: '更新', dataIndex: 'LINESUPDATED', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESINPUT'}\", columnsValue: \"{header: '输入', dataIndex: 'LINESINPUT', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESOUTPUT'}\", columnsValue: \"{header: '输出', dataIndex: 'LINESOUTPUT', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREJECTED'}\", columnsValue: \"{header: '拒绝', dataIndex: 'LINESREJECTED', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ERRORS'}\", columnsValue: \"{header: '错误', dataIndex: 'ERRORS', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'OPERWAY'}\", columnsValue: \"{header: '操作', dataIndex: 'OPERWAY', width: 70, align: 'center', sortable: true, renderer: renderOper}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGFIELD'}\", columnsValue: \"\"}");

			// 查询条件
			queryStrList.add("{id: 'name', fieldLabel: '作业名称', value: '', qryType: 'textfield', columnWidth: '.4', anchor: '70%'}");
			queryStrList.add("{fieldLabel: '记录日期', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType: 'datefield', columnWidth: '.6', anchor: '70%'}");

			retMap.put("columnNamesList", columnNamesList);
			retMap.put("queryStrList", queryStrList);
			retMap.put("queryGroupField", "GOVNAME");
		}

		return retMap;
	}

	/**
	 * 方法描述：设置页面表头信息
	 */
	public Map<String, Object> getColumnName(Model model)
	{
		// 页面的构造(动态列名和查询条件)的标识字段
		String queryColParam = StringUtils.objToString(model.get("queryColParam"));
		// 事件的类型(下钻/上钻)
		String flowType = StringUtils.objToString(model.get("flowType"));
		// 返回的结果集
		Map<String, Object> retMap = new HashMap<String, Object>();

		if (("down").equals(flowType))
		{
			if (("jobGo").equals(queryColParam))
			{
				retMap = this.getPageExt("jobGo");
			}
			else if (("childJobGo").equals(queryColParam))
			{
				// 校验是否还有子JOB
				boolean isHaveJob = jobDoService.checkIsHaveJob(model);
				if (isHaveJob)
				{
					retMap = this.getPageExt("childJobGo");
				}
			}
		}
		else if (("up").equals(flowType))
		{
			if (("jobGo").equals(queryColParam))
			{
				retMap = this.getPageExt("jobGo");
			}
			else if (("childJobGo").equals(queryColParam))
			{
				retMap = this.getPageExt("childJobGo");
			}
		}

		return retMap;
	}

	/**
	 * 方法描述：返回相应的表格数据
	 */
	public SpecilPageList<String> getTableData(Model model)
	{
		// 页面的构造(动态列名和查询条件)的标识字段
		String queryColParam = StringUtils.objToString(model.get("queryColParam"));
		// 当前流程号
		Integer currStep = StringUtils.toNum(model.get("queryStep").toString());
		// 返回的结果
		SpecilPageList<String> specilPageList = new SpecilPageList<String>();
		// 事件的类型(下钻/上钻)
		String flowType = StringUtils.objToString(model.get("flowType"));
		// 上一步流程号
		Integer lastStep = -999;
		// 下一步流程号
		Integer nextStep = -999;
		// 返回页面到下一步需要传递的参数
		String nextParam = "";
		// 页面分组的字段
		String nextGroupField = "";
		// 返回的下一步的标识符
		String nextColParam = "";
		// 返回的当前步骤的标识符
		String currColParam = queryColParam;
		if (currStep != 0)
		{
			lastStep = currStep - 1;
		}
		if (currStep != -999)
		{
			nextStep = currStep + 1;
		}

		if (("down").equals(flowType))
		{
			if (("jobGo").equals(queryColParam))
			{
				// 主流程---默认进入子JOB进行分流
				nextColParam = "childJobGo";
				nextGroupField = "GOVNAME";
				nextParam = "{'JOBID': '',  'BATCHFLAG': ''}";
				specilPageList = this.getQryList("jobGo", model);
			}
			if (("childJobGo").equals(queryColParam))
			{
				boolean isHaveJob = jobDoService.checkIsHaveJob(model);
				if (isHaveJob)
				{
					// 进入子JOB
					nextColParam = "childJobGo";
					nextGroupField = "GOVNAME";
					nextParam = "{'RJOBID': 'JOBID', 'BATCHFLAG': ''}";
					specilPageList = this.getQryList("childJobGo", model);
				}
				else
				{
					nextStep = -999;
				}
			}
		}
		else if (("up").equals(flowType))
		{
			if (("jobGo").equals(queryColParam))
			{
				// 主流程---默认进入子JOB进行分流
				lastStep = -999;
				nextColParam = "childJobGo";
				nextGroupField = "GOVNAME";
				nextParam = "{'JOBID': '',  'BATCHFLAG': ''}";
				specilPageList = this.getQryList("jobGo", model);
			}
			if (("childJobGo").equals(queryColParam))
			{
				nextColParam = "childJobGo";
				nextGroupField = "GOVNAME";
				nextParam = "{'RJOBID': 'JOBID', 'BATCHFLAG': ''}";
				specilPageList = this.getQryList("childJobGo", model);
			}
		}

		specilPageList.setCurrColParam(currColParam);
		specilPageList.setLastStep(lastStep);
		specilPageList.setCurrStep(currStep);
		specilPageList.setNextStep(nextStep);
		specilPageList.setNextColParam(nextColParam);
		specilPageList.setNextGroupField(nextGroupField);
		specilPageList.setNextParam(nextParam);
		return specilPageList;
	}

	/**
	 * 方法描述：根据流程提供不同的返回结果
	 */
	private SpecilPageList<String> getQryList(String queryColParam, Model model)
	{
		SpecilPageList<String> specilPageList = new SpecilPageList<String>();
		Integer start = StringUtils.toNum(model.get("start").toString());
		Integer end = StringUtils.toNum(model.get("limit").toString());

		if (("jobGo").equals(queryColParam))
		{
			specilPageList = jobDoService.getJobData(start, end, model);
		}
		if (("childJobGo").equals(queryColParam))
		{
			specilPageList = jobDoService.getChildJobData(start, end, model);
		}

		return specilPageList;
	}

}
