package com.digitalchina.ldp.app.csdsc.task;

import com.digitalchina.ldp.app.csdsc.bean.CategoryRelationBean;
import com.digitalchina.ldp.app.csdsc.bean.StatCategory;
import com.digitalchina.ldp.app.csdsc.dao.StatisticsTaskDao;
import com.digitalchina.ldp.common.util.DbContextHolder;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * 委办局数据统计任务
 * Created by zhanglei on 2016/7/6.
 */
public class StatisticsTask {
    @Autowired
    private StatisticsTaskDao statisticsTaskDao;

    public void wbjDataStatisticsService() {
        System.out.println("task start...");

        DbContextHolder.setDefaultDbType("csdsc");
        List<CategoryRelationBean> relationList = statisticsTaskDao.findRelation();

        List<StatCategory> statCategoryList = new ArrayList<StatCategory>();
        for (CategoryRelationBean bean : relationList) {
            DbContextHolder.setDefaultDbType(bean.getDataSource());
            Object currentMonthCount = statisticsTaskDao.getSqlResult(bean.getCurrentMonthCountSql());
            Object totalCount = statisticsTaskDao.getSqlResult(bean.getTotalCountSql());

            DbContextHolder.setDefaultDbType(bean.getZxqzDataSource());
            Object zxqzCurrentMonthCount = statisticsTaskDao.getSqlResult(bean.getZxqzCurrentMonthCountSql());
            Object zxqzTotalCount = statisticsTaskDao.getSqlResult(bean.getZxqzTotalCountSql());

            statCategoryList.add(new StatCategory(bean.getId(), currentMonthCount, totalCount, zxqzCurrentMonthCount, zxqzTotalCount));
        }

        DbContextHolder.setDefaultDbType("csdsc");
        for (StatCategory statCategory : statCategoryList) {
            statisticsTaskDao.addCategoryResult(statCategory);
        }

        System.out.println("task end...");
    }
}