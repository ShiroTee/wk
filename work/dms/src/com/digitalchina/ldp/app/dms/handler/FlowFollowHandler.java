package com.digitalchina.ldp.app.dms.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.app.dms.service.FlowFollowService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class FlowFollowHandler extends AbstractExtHandler
{

	@Autowired
	private FlowFollowService	flowFollowService;

	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel = new ViewModel("flowfollow/flowfollow.jsp", "flowfollow/dynamicGrid.js");
		model.getRequest().setAttribute("mainStep", "0");
		model.getRequest().setAttribute("mainColParam", "jobGo");
		model.getRequest().setAttribute("getLogInfoUrl", "getLogMessage");
		model.getRequest().setAttribute("columnNameUrl", "getColumnName");
		model.getRequest().setAttribute("tableDataUrl", "getTableData");
		model.getRequest().setAttribute("tipMsg", "对各委办局的各数据交换流程进行跟踪，可查看该流程在作业、转换、步骤级别的运行信息，点击每条记录的日志详情，可查看该节点运行的日志信息，双击一条列表记录可实现下钻。");
		return viewModel;
	}

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList(Model model)
	{
		List<RDirectoryBean> list = flowFollowService.getDirectoryList();
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
		List<String> list = flowFollowService.queryLogMessage(model);
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
					.add("{fieldsValue: \"{name: 'JOBNAME'}\", columnsValue: \"{header: '作业名称', dataIndex: 'JOBNAME', width: 120, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'GOVNAME'}\", columnsValue: \"{header: '所属委办局', dataIndex: 'GOVNAME', width: 120, hidden: true, sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"{header: '批次号', dataIndex: 'BATCHFLAG', width: 80, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STATUS'}\", columnsValue: \"{header: '状态', dataIndex: 'STATUS', width: 40, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STARTDATE'}\", columnsValue: \"{header: '启动时间', dataIndex: 'STARTDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ENDDATE'}\", columnsValue: \"{header: '停止时间', dataIndex: 'ENDDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
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
			queryStrList.add("{id: 'name', fieldLabel: '作业名称', value: '', qryType: 'textfield', columnWidth: '.3', anchor: '70%'}");
			queryStrList.add("{id: 'wbjName', fieldLabel: '委办局', url: 'getDirectoryList', valueField: 'directoryId', displayField: 'directoryName', qryType: 'combobox', columnWidth: '.3', anchor: '70%'}");
			queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType: 'datefield', columnWidth: '.4', anchor: '70%'}");

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
			columnNamesList.add("{fieldsValue: \"{name: 'GOVNAME'}\", columnsValue: \"{header: '所属委办局', dataIndex: 'GOVNAME', width: 120, hidden: true, sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"{header: '批次号', dataIndex: 'BATCHFLAG', width: 80, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STATUS'}\", columnsValue: \"{header: '状态', dataIndex: 'STATUS', width: 40, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STARTDATE'}\", columnsValue: \"{header: '启动时间', dataIndex: 'STARTDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ENDDATE'}\", columnsValue: \"{header: '停止时间', dataIndex: 'ENDDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
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
			queryStrList.add("{id: 'name', fieldLabel: '作业名称', value: '', qryType: 'textfield', columnWidth: '.3', anchor: '70%'}");
			queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType: 'datefield', columnWidth: '.7', anchor: '70%'}");

			retMap.put("columnNamesList", columnNamesList);
			retMap.put("queryStrList", queryStrList);
			retMap.put("queryGroupField", "GOVNAME");
		}
		else if (("transGo").equals(queryColParam))
		{
			// 列名称
			columnNamesList.add("{fieldsValue: \"{name: 'JOBID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
			columnNamesList
					.add("{fieldsValue: \"{name: 'TRANSNAME'}\", columnsValue: \"{header: '转换名称', dataIndex: 'TRANSNAME', width: 120, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'JOBNAME'}\", columnsValue: \"{header: '所属作业名称', dataIndex: 'JOBNAME', width: 120, hidden: true, sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STATUS'}\", columnsValue: \"{header: '状态', dataIndex: 'STATUS', width: 40, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'STARTDATE'}\", columnsValue: \"{header: '启动时间', dataIndex: 'STARTDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ENDDATE'}\", columnsValue: \"{header: '停止时间', dataIndex: 'ENDDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGDATE'}\", columnsValue: \"{header: '记录时间', dataIndex: 'LOGDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREAD'}\", columnsValue: \"{header: '读取', dataIndex: 'LINESREAD', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESWRITTEN'}\", columnsValue: \"{header: '写入', dataIndex: 'LINESWRITTEN', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESUPDATED'}\", columnsValue: \"{header: '更新', dataIndex: 'LINESUPDATED', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESINPUT'}\", columnsValue: \"{header: '输入', dataIndex: 'LINESINPUT', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESOUTPUT'}\", columnsValue: \"{header: '输出', dataIndex: 'LINESOUTPUT', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREJECTED'}\", columnsValue: \"{header: '拒绝', dataIndex: 'LINESREJECTED', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ERRORS'}\", columnsValue: \"{header: '错误', dataIndex: 'ERRORS', width: 50, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'OPERWAY'}\", columnsValue: \"{header: '操作', dataIndex: 'OPERWAY', width: 100, align: 'center', sortable: true, renderer: renderOper}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGFIELD'}\", columnsValue: \"\"}");

			// 查询条件
			queryStrList.add("{id: 'name', fieldLabel: '转换名称', value: '', qryType: 'textfield', columnWidth: '.3', anchor: '70%'}");
			queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType:'datefield', columnWidth: '.7', anchor: '70%'}");

			retMap.put("columnNamesList", columnNamesList);
			retMap.put("queryStrList", queryStrList);
			retMap.put("queryGroupField", "JOBNAME");
		}
		else if (("stepGo").equals(queryColParam))
		{
			// 列名称
			columnNamesList.add("{fieldsValue: \"{name: 'ID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
			columnNamesList
					.add("{fieldsValue: \"{name: 'STEPNAME'}\", columnsValue: \"{header: '步骤名称', dataIndex: 'STEPNAME', width: 350, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'TRANSNAME'}\", columnsValue: \"{header: '所属转换名称', dataIndex: 'TRANSNAME', width: 120, hidden: true, sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGDATE'}\", columnsValue: \"{header: '记录时间', dataIndex: 'LOGDATE', width: 130, align: 'center', sortable: true, renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREAD'}\", columnsValue: \"{header: '读取', dataIndex: 'LINESREAD', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESWRITTEN'}\", columnsValue: \"{header: '写入', dataIndex: 'LINESWRITTEN', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESUPDATED'}\", columnsValue: \"{header: '更新', dataIndex: 'LINESUPDATED', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESINPUT'}\", columnsValue: \"{header: '输入', dataIndex: 'LINESINPUT', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESOUTPUT'}\", columnsValue: \"{header: '输出', dataIndex: 'LINESOUTPUT', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LINESREJECTED'}\", columnsValue: \"{header: '拒绝', dataIndex: 'LINESREJECTED', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'ERRORS'}\", columnsValue: \"{header: '错误', dataIndex: 'ERRORS', width: 60, align: 'center', sortable: true, summaryType: 'sum', renderer: formatQtip}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'OPERWAY'}\", columnsValue: \"{header: '操作', dataIndex: 'OPERWAY', width: 100, align: 'center', sortable: true, renderer: renderOper}\"}");
			columnNamesList.add("{fieldsValue: \"{name: 'LOGFIELD'}\", columnsValue: \"\"}");

			// 查询条件
			queryStrList.add("{id: 'name', fieldLabel: '步骤名称', value: '', qryType: 'textfield', columnWidth: '.3', anchor: '70%'}");
			queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType:'datefield', columnWidth: '.7', anchor: '70%'}");

			retMap.put("columnNamesList", columnNamesList);
			retMap.put("queryStrList", queryStrList);
			retMap.put("queryGroupField", "TRANSNAME");
		}

		return retMap;
	}

	/**
	 * 方法描述：设置页面表头信息
	 */
	public Map<String, Object> getColumnName(Model model)
	{
		// 查询的参数
		String queryParam = StringUtils.objToString(model.get("queryParam"));
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
				String childJobStr = getQryStr("childJob", queryParam);
				if (childJobStr != "")
				{
					model.put("queryParam", childJobStr);
					boolean isHaveJob = flowFollowService.checkIsHaveJob(model);
					if (!isHaveJob)
					{
						String transStr = getQryStr("trans", queryParam);
						model.put("queryParam", transStr);
						boolean isHaveTrans = flowFollowService.checkIsHaveTrans(model);
						if (isHaveTrans)
						{
							// 若有TRANS,则进入TRANS
							retMap = this.getPageExt("transGo");
						}
					}
					else
					{
						retMap = this.getPageExt("childJobGo");
					}
				}
				else
				{
					throw new ServiceException("查询过程中发现查询的参数有异常");
				}
			}
			else if (("transGo").equals(queryColParam))
			{
				// 校验是否还有子STEP
				boolean isHaveStep = flowFollowService.checkIsHaveStep(model);
				if (isHaveStep)
				{
					// 若有STEP,则进入STEP
					retMap = this.getPageExt("stepGo");
				}
			}
			else if (("stepGo").equals(queryColParam))
			{
				retMap = this.getPageExt("stepGo");
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
			else if (("transGo").equals(queryColParam))
			{
				retMap = this.getPageExt("transGo");
			}
			else if (("stepGo").equals(queryColParam))
			{
				retMap = this.getPageExt("stepGo");
			}
		}

		return retMap;
	}

	/**
	 * 方法描述：返回相应的表格数据
	 */
	public SpecilPageList<String> getTableData(Model model)
	{
		// 查询的参数
		String queryParam = StringUtils.objToString(model.get("queryParam"));
		// 页面的构造(动态列名和查询条件)的标识字段
		String queryColParam = StringUtils.objToString(model.get("queryColParam"));
		// 当前流程号
		Integer currStep = StringUtils.toNum(model.get("queryStep").toString());
		// 事件的类型(下钻/上钻)
		String flowType = StringUtils.objToString(model.get("flowType"));
		// 返回的结果
		SpecilPageList<String> specilPageList = new SpecilPageList<String>();
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
				nextParam = "{'JOBID ': 'MAINID', 'JOBID': 'VICEID', 'BATCHFLAG': ''}";
				specilPageList = this.getQryList("jobGo", model);
			}
			if (("childJobGo").equals(queryColParam))
			{
				// 重新构造查询参数
				if (queryParam != "")
				{
					String childJobStr = getQryStr("childJob", queryParam);
					if (childJobStr != "")
					{
						model.put("queryParam", childJobStr);
						boolean isHaveJob = flowFollowService.checkIsHaveJob(model);
						if (isHaveJob)
						{
							// 进入子JOB
							nextColParam = "childJobGo";
							nextGroupField = "GOVNAME";
							nextParam = "{'RJOBID ': 'VICEID', 'RJOBID': 'MAINID', 'BATCHFLAG': ''}";
							specilPageList = this.getQryList("childJobGo", model);
						}
						else
						{
							String transStr = getQryStr("trans", queryParam);
							model.put("queryParam", transStr);
							boolean isHaveTrans = flowFollowService.checkIsHaveTrans(model);
							if (isHaveTrans)
							{
								// 若有TRANS,则进入TRANS
								currColParam = "transGo";// 主要是将当前的childJobGo更新为transGo
								nextColParam = "transGo";
								nextGroupField = "JOBNAME";
								nextParam = "{'BATCHID': ''}";
								specilPageList = this.getQryList("transGo", model);
							}
							else
							{
								// 已经到了根节点,则结束
								queryColParam = "over";
							}
						}
					}
					else
					{
						throw new ServiceException("查询过程中发现查询的参数有异常");
					}
				}
				else
				{
					throw new ServiceException("查询过程中发现查询的参数有异常");
				}
			}
			if ("transGo".equals(queryColParam))
			{
				boolean isHaveStep = flowFollowService.checkIsHaveStep(model);
				if (isHaveStep)
				{
					// 若有STEP,则进入STEP(最后一步)
					queryColParam = "stepGo";
				}
				else
				{
					// 已经到了根节点,则结束
					queryColParam = "over";
				}
			}
			if ("stepGo".equals(queryColParam))
			{
				nextStep = -999;
				currColParam = "stepGo";// 主要是将当前的transGo更新为stepGo
				specilPageList = this.getQryList("stepGo", model);
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
				nextParam = "{'JOBID ': 'MAINID', 'JOBID': 'VICEID', 'BATCHFLAG': ''}";
				specilPageList = this.getQryList("jobGo", model);
			}
			if (("childJobGo").equals(queryColParam))
			{
				String childJobStr = getQryStr("childJob", queryParam);
				if (childJobStr != "")
				{
					model.put("queryParam", childJobStr);
					nextColParam = "childJobGo";
					nextGroupField = "GOVNAME";
					nextParam = "{'RJOBID ': 'VICEID', 'RJOBID': 'MAINID', 'BATCHFLAG': ''}";
					specilPageList = this.getQryList("childJobGo", model);
				}
			}
			if ("transGo".equals(queryColParam))
			{
				String transStr = getQryStr("trans", queryParam);
				if (transStr != "")
				{
					model.put("queryParam", transStr);
					nextColParam = "stepGo";
					nextGroupField = "TRANSNAME";
					nextParam = "{'BATCHID': ''}";
					specilPageList = this.getQryList("transGo", model);
				}
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
			specilPageList = flowFollowService.getJobData(start, end, model);
		}
		if (("childJobGo").equals(queryColParam))
		{
			specilPageList = flowFollowService.getChildJobData(start, end, model);
		}
		if ("transGo".equals(queryColParam))
		{
			specilPageList = flowFollowService.getTransData(start, end, model);
		}
		if ("stepGo".equals(queryColParam))
		{
			specilPageList = flowFollowService.getStepData(start, end, model);
		}

		return specilPageList;
	}

	/**
	 * 方法描述：根据流程需要的参数进行拼接
	 */
	private String getQryStr(String type, String queryParam)
	{
		if (queryParam != "")
		{
			String childJobStr = "";
			String transStr = "";
			JSONObject jsonObject = JSONObject.fromObject(queryParam);
			Integer num = 1;
			for (Iterator it = jsonObject.keys(); it.hasNext();)
			{
				String fieldName = StringUtils.objToString(it.next());
				String fieldValue = StringUtils.objToString(jsonObject.getString(fieldName));
				if (num == 1)
				{
					if (("MAINID").equals(fieldName) || ("BATCHFLAG").equals(fieldName))
					{
						childJobStr += "'" + fieldName + "': '" + fieldValue + "'";
					}
					if (("VICEID").equals(fieldName) || ("BATCHFLAG").equals(fieldName))
					{
						transStr += "'" + fieldName + "': '" + fieldValue + "'";
					}
				}
				else
				{
					if (("MAINID").equals(fieldName) || ("BATCHFLAG").equals(fieldName))
					{
						childJobStr += ", '" + fieldName + "': '" + fieldValue + "' ";
					}
					if (("VICEID").equals(fieldName) || ("BATCHFLAG").equals(fieldName))
					{
						transStr += ", '" + fieldName + "': '" + fieldValue + "' ";
					}
				}

				num++;
			}
			if (childJobStr.substring(0, 1).equals(","))
			{
				childJobStr = childJobStr.substring(1, childJobStr.length());
			}
			if (transStr.substring(0, 1).equals(","))
			{
				transStr = transStr.substring(1, transStr.length());
			}
			childJobStr = "{" + childJobStr + "}";
			transStr = "{" + transStr + "}";

			if (("childJob").equals(type))
			{
				return childJobStr;
			}
			else if (("trans").equals(type))
			{
				return transStr;
			}
			else
			{
				return "";
			}
		}
		else
		{
			return "";
		}
	}
}
