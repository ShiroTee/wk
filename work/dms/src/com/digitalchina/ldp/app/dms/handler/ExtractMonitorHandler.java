package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.app.dms.service.ExtractMonitorService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExtractMonitorHandler
        extends AbstractExtHandler
{
    @Autowired
    private ExtractMonitorService extractMonitorService;

    public ViewModel page(Model model)
    {
        ViewModel viewModel = new ViewModel("extractmonitor/extractmonitor.jsp", "flowfollow/dynamicGrid.js");
        model.getRequest().setAttribute("mainStep", "0");
        model.getRequest().setAttribute("mainColParam", "jobGo");
        model.getRequest().setAttribute("getLogInfoUrl", "getLogMessage");
        model.getRequest().setAttribute("columnNameUrl", "getColumnName");
        model.getRequest().setAttribute("tableDataUrl", "getTableData");
        model.getRequest().setAttribute("tipMsg", "监控数据抽取过程，双击列表记录，可下钻查看该作业的转换、步骤的执行情况。");
        return viewModel;
    }

    public List<RDirectoryBean> getDirectoryList(Model model)
    {
        List<RDirectoryBean> list = this.extractMonitorService.getDirectoryList();
        RDirectoryBean bean = new RDirectoryBean();
        bean.setDirectoryId(null);
        bean.setDirectoryName("全部");
        list.add(0, bean);
        return list;
    }

    public List<String> getLogMessage(Model model)
    {
        List<String> list = this.extractMonitorService.queryLogMessage(model);
        return list;
    }

    private Map<String, Object> getPageExt(String queryColParam)
    {
        Map<String, Object> retMap = new HashMap();
        List<Object> queryStrList = new ArrayList();
        List<Object> columnNamesList = new ArrayList();
        if ("jobGo".equals(queryColParam))
        {
            columnNamesList.add("{fieldsValue: \"{name: 'JOBID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'GOVID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'BATCHFLAG'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'REPLAYDATE'}\", columnsValue: \"\"}");
            columnNamesList
                    .add("{fieldsValue: \"{name: 'JOBNAME'}\", columnsValue: \"{header: '作业名称', dataIndex: 'JOBNAME', width: 120, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'GOVNAME'}\", columnsValue: \"{header: '所属委办局', dataIndex: 'GOVNAME', width: 120,  sortable: true, renderer: formatQtip}\"}");
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


            queryStrList.add("{id: 'name', fieldLabel: '作业名称', value: '', qryType: 'textfield', columnWidth: '.3', anchor: '70%'}");
            queryStrList.add("{id: 'wbjName', fieldLabel: '委办局', url: 'getDirectoryList', valueField: 'directoryId', displayField: 'directoryName', qryType: 'combobox', columnWidth: '.3', anchor: '70%'}");
            queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType: 'datefield', columnWidth: '.4', anchor: '70%'}");

            retMap.put("columnNamesList", columnNamesList);
            retMap.put("queryStrList", queryStrList);
            retMap.put("queryGroupField", "GOVNAME");
        }
        else if ("transGo".equals(queryColParam))
        {
            columnNamesList.add("{fieldsValue: \"{name: 'JOBID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
            columnNamesList
                    .add("{fieldsValue: \"{name: 'TRANSNAME'}\", columnsValue: \"{header: '转换名称', dataIndex: 'TRANSNAME', width: 120, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'JOBNAME'}\", columnsValue: \"{header: '所属作业名称', dataIndex: 'JOBNAME', width: 120,  sortable: true, renderer: formatQtip}\"}");
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


            queryStrList.add("{id: 'name', fieldLabel: '转换名称', value: '', qryType: 'textfield', columnWidth: '.4', anchor: '70%'}");
            queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType:'datefield', columnWidth: '.6', anchor: '70%'}");

            retMap.put("columnNamesList", columnNamesList);
            retMap.put("queryStrList", queryStrList);
            retMap.put("queryGroupField", "JOBNAME");
        }
        else if ("stepGo".equals(queryColParam))
        {
            columnNamesList.add("{fieldsValue: \"{name: 'ID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'BATCHID'}\", columnsValue: \"\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'CHANNELID'}\", columnsValue: \"\"}");
            columnNamesList
                    .add("{fieldsValue: \"{name: 'STEPNAME'}\", columnsValue: \"{header: '步骤名称', dataIndex: 'STEPNAME', width: 350, align: 'center', sortable: true, summaryType: 'count', summaryRenderer: summaryRenderer, renderer: formatQtip}\"}");
            columnNamesList.add("{fieldsValue: \"{name: 'TRANSNAME'}\", columnsValue: \"{header: '所属转换名称', dataIndex: 'TRANSNAME', width: 120,  sortable: true, renderer: formatQtip}\"}");
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


            queryStrList.add("{id: 'name', fieldLabel: '步骤名称', value: '', qryType: 'textfield', columnWidth: '.4', anchor: '70%'}");
            queryStrList.add("{fieldLabel: '记录时间', starttimeName: 'starttime_date', starttimeValue: '', endtimeName: 'endtime_date', endtimeValue: '', qryType:'datefield', columnWidth: '.6', anchor: '70%'}");

            retMap.put("columnNamesList", columnNamesList);
            retMap.put("queryStrList", queryStrList);
            retMap.put("queryGroupField", "TRANSNAME");
        }
        return retMap;
    }

    public Map<String, Object> getColumnName(Model model)
    {
        String queryColParam = StringUtils.objToString(model.get("queryColParam"));

        Map<String, Object> retMap = new HashMap();
        if ("jobGo".equals(queryColParam))
        {
            retMap = getPageExt("jobGo");
        }
        else if ("transGo".equals(queryColParam))
        {
            boolean isHaveTrans = this.extractMonitorService.checkIsHaveTrans(model);
            if (isHaveTrans) {
                retMap = getPageExt("transGo");
            }
        }
        else if ("stepGo".equals(queryColParam))
        {
            boolean isHaveStep = this.extractMonitorService.checkIsHaveStep(model);
            if (isHaveStep) {
                retMap = getPageExt("stepGo");
            }
        }
        return retMap;
    }

    public SpecilPageList<String> getTableData(Model model)
    {
        String queryColParam = StringUtils.objToString(model.get("queryColParam"));

        Integer currStep = Integer.valueOf(StringUtils.toNum(model.get("queryStep").toString()));

        SpecilPageList<String> specilPageList = new SpecilPageList();

        Integer lastStep = Integer.valueOf(-999);

        Integer nextStep = Integer.valueOf(-999);

        String nextParam = "";

        String nextGroupField = "";

        String nextColParam = "";

        String currColParam = queryColParam;
        if (currStep.intValue() != 0) {
            lastStep = Integer.valueOf(currStep.intValue() - 1);
        }
        if (currStep.intValue() != -999) {
            nextStep = Integer.valueOf(currStep.intValue() + 1);
        }
        if ("jobGo".equals(queryColParam))
        {
            nextColParam = "transGo";
            nextGroupField = "JOBNAME";
            nextParam = "{'JOBID': '', 'BATCHFLAG': ''}";
            specilPageList = getQryList("jobGo", model);
        }
        if ("transGo".equals(queryColParam))
        {
            nextColParam = "stepGo";
            nextGroupField = "TRANSNAME";
            nextParam = "{'BATCHID': ''}";
            specilPageList = getQryList("transGo", model);
        }
        if ("stepGo".equals(queryColParam))
        {
            nextStep = Integer.valueOf(-999);
            specilPageList = getQryList("stepGo", model);
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

    private SpecilPageList<String> getQryList(String queryColParam, Model model)
    {
        SpecilPageList<String> specilPageList = new SpecilPageList();
        Integer start = Integer.valueOf(StringUtils.toNum(model.get("start").toString()));
        Integer end = Integer.valueOf(StringUtils.toNum(model.get("limit").toString()));
        if ("jobGo".equals(queryColParam)) {
            specilPageList = this.extractMonitorService.getJobData(start.intValue(), end.intValue(), model);
        }
        if ("transGo".equals(queryColParam)) {
            specilPageList = this.extractMonitorService.getTransData(start.intValue(), end.intValue(), model);
        }
        if ("stepGo".equals(queryColParam)) {
            specilPageList = this.extractMonitorService.getStepData(start.intValue(), end.intValue(), model);
        }
        return specilPageList;
    }

    public PageList<Map<String, Object>> getJobEchartsData(Model model)
    {
        return this.extractMonitorService.getJobEchartsData(model);
    }

    public PageList<Map<String, Object>> getChildJobEchartsData(Model model)
    {
        return this.extractMonitorService.getChildJobEchartsData(model);
    }
}
