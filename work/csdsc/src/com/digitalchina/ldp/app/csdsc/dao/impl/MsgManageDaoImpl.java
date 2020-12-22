package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.dao.MsgManageDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhanglei on 15/7/20.
 */
@Component
public class MsgManageDaoImpl extends BaseDao implements MsgManageDao {
    @Override
    public Map getAlertMessage(String loginName) {
        //String promiseSql = "select time,data_name from wbj_data_submit_info where submit_time is null and wbjmc=? and time<sysdate";
        String promiseSql = "select time,data_name from wbj_data_submit_info w LEFT JOIN USER_ORG_INFO u on w.WBJMC=u.ORG_NM where submit_time is null and user_login_name=? and time<sysdate";
        //String errorRateSql = "select time,data_name from wbj_data_submit_info where submit_time is not null and wbjmc=? and data_error_num/data_num>0.5";
        String errorRateSql = "select time,data_name from wbj_data_submit_info w LEFT JOIN USER_ORG_INFO u on w.WBJMC=u.ORG_NM where submit_time is not null and user_login_name=? and data_error_num/data_num>0.5";
        List<Map<String, Object>> promiseList = this.createJdbcTemplate().queryForList(promiseSql, loginName);
        List<Map<String, Object>> errorRateList = this.createJdbcTemplate().queryForList(errorRateSql, loginName);
        Map resultMap = new HashMap();
        resultMap.put("promise", promiseList);
        resultMap.put("errorRate", errorRateList);
        return resultMap;
    }
}
