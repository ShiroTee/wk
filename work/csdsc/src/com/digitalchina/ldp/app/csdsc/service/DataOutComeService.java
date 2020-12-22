package com.digitalchina.ldp.app.csdsc.service;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitInfoBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.bean.Model;

import java.util.List;
import java.util.Map;

/**
 * Created by zhanglei on 15/7/16.
 */
public interface DataOutComeService {
	Map<String, Object> getReportByYear(int year);
    Map<String, Object> getReportByMonth(int year, int month);

    Pager getUpdateList(int pageNo, int pageSize);

    WbjDataSubmitInfoBean getUpdateInfoById(int id);

    List<Map<String, Object>> getOlapWbjData(Model model);
    Map<String, String> getOlapWbjDataExport(Model model);

	List<Map<String, Object>> getOlapWdkData();
    Pager getWbjSubmitData(int pageNo, int pageSize);
    String createDataForSubmit(String sjssq);

}
