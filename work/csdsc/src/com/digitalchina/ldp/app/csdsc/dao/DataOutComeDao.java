package com.digitalchina.ldp.app.csdsc.dao;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitInfoBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;

import java.util.List;
import java.util.Map;

/**
 * Created by zhanglei on 15/7/16.
 */
public interface DataOutComeDao {
    List<Map<String, Object>> getAddDataByMonth(int year, int month);
    List<Map<String, Object>> getNotAddDataByMonth(int year, int month);
    List<Map<String, Object>> getApplicationTimesByMonth(int year, int month);
    List<Map<String, Object>> getAddDataByYear(int year);
    List<Map<String, Object>> getDataByYear(int year);
    List<Map<String, Object>> getApplicationTimesByYear(int year);

    Pager getUpdateList(int pageNo, int pageSize);

    WbjDataSubmitInfoBean getUpdateInfoById(int id);

    List<Map<String, Object>> getOlapWbjSubmitData(String start, String end);
    List<Map<String, Object>> getOlapWbjApplicationData(String start, String end);

    List<Map<String, Object>> getOlapWdkData();

    Pager queryForList(String sql, int pageNo, int pageSize);

}
