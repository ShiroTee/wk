package com.digitalchina.ldp.app.csdsc.dao;

import com.digitalchina.ldp.app.csdsc.bean.CategoryRelationBean;
import com.digitalchina.ldp.app.csdsc.bean.StatCategory;

import java.util.List;
import java.util.Map;

/**
 * @Author zhanglei
 * @Date 16/7/6 下午4:54
 */
public interface StatisticsTaskDao {
    int addCategoryResult(StatCategory statCategory);

    int addSubmitDataCountByTimeResult(Map<String,String> map);

    List<CategoryRelationBean> findRelation();

    Object getSqlResult(String sql);
}
