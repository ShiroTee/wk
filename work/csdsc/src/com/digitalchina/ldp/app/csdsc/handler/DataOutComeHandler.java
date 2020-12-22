package com.digitalchina.ldp.app.csdsc.handler;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitInfoBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.service.DataOutComeService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * 数据成果 Handler
 * Created by zhanglei on 15/7/16.
 */
@Component
public class DataOutComeHandler extends AbstractHandler {
    @Autowired
    private DataOutComeService dataOutComeService;

    /**
     * 数据更新列表
     */
    @HttpService
    public Pager getUpdateList(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        int pageNo = model.getInt("pageNo");
        int pageSize = model.getInt("pageSize");
        return dataOutComeService.getUpdateList(pageNo, pageSize);
    }

    /**
     * 数据更新明细
     */
    @HttpService
    public WbjDataSubmitInfoBean getUpdateInfoById(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        int id = model.getInt("id");
        return dataOutComeService.getUpdateInfoById(id);
    }

    /**
     * 月报
     */
    @HttpService
    public Map<String, Object> getMonthlyReport(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        String months = model.getValueNotEmpty("month");
        int month=Integer.parseInt(months);
        String years = model.getValueNotEmpty("year");
        int year=Integer.parseInt(years);
        return dataOutComeService.getReportByMonth(year, month);
    }

    /**
     * 年报
     */
    @HttpService
    public Map<String, Object> getAnnualReport(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        String years = model.getValueNotEmpty("year");
        int year=Integer.parseInt(years);
        return dataOutComeService.getReportByYear(year);
    }
    
    @HttpService
    public List<Map<String, Object>> getOlapWbjData(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        return dataOutComeService.getOlapWbjData(model);
    }

    @HttpService
    public Map<String, String> getOlapWbjDataExport(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        return dataOutComeService.getOlapWbjDataExport(model);
    }
    
    @HttpService
    public List<Map<String, Object>> getOlapWdkData(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        return dataOutComeService.getOlapWdkData();
    }

    /**
     * http入口
     * 处理数据月报年报的提交数据
     * 生成逾期数据
     */
    @HttpService
    public String createDataForSubmit(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        String sjssq = model.getValueNotEmpty("sjssq");
        return dataOutComeService.createDataForSubmit(sjssq);
    }


    /**
     * 统计每个委办局提供的总数据量, 按总数据量倒序排序
     *
     * @return +-------------+-------------------+--------+
     *         | 委办局名称    | 数据总量           | 排名    |
     *         +-------------+-------------------+--------+
     *         | WBJMC       | ALL_DATA_COUNT    | RN     |
     *         +-------------+-------------------+--------+
     */
    @HttpService
    public Pager getWbjSubmitData(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        int pageNo = model.getInt("pageNo");
        int pageSize = model.getInt("pageSize");
        return dataOutComeService.getWbjSubmitData(pageNo, pageSize);
    }
}
