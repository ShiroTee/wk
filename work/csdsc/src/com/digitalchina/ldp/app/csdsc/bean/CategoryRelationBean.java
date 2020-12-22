package com.digitalchina.ldp.app.csdsc.bean;

import javax.persistence.Column;

/**
 * 委办局数据统计任务配置表
 * Created by zhanglei on 2016/7/6.
 */
public class CategoryRelationBean {
    @Column(name = "CONF_ID")
    private String id;
    @Column(name = "ASSET_ID")
    private String assetId;
    @Column(name = "DATA_SOURCE")
    private String dataSource;
    @Column(name = "CURRENT_MONTH_COUNT_SQL")
    private String currentMonthCountSql;
    @Column(name = "TOTAL_COUNT_SQL")
    private String totalCountSql;
    @Column(name = "ZXQZ_DATA_SOURCE")
    private String zxqzDataSource;
    @Column(name = "ZXQZ_CURRENT_MONTH_COUNT_SQL")
    private String zxqzCurrentMonthCountSql;
    @Column(name = "ZXQZ_TOTAL_COUNT_SQL")
    private String zxqzTotalCountSql;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getCurrentMonthCountSql() {
        return currentMonthCountSql;
    }

    public void setCurrentMonthCountSql(String currentMonthCountSql) {
        this.currentMonthCountSql = currentMonthCountSql;
    }

    public String getTotalCountSql() {
        return totalCountSql;
    }

    public void setTotalCountSql(String totalCountSql) {
        this.totalCountSql = totalCountSql;
    }

    public String getZxqzDataSource() {
        return zxqzDataSource;
    }

    public void setZxqzDataSource(String zxqzDataSource) {
        this.zxqzDataSource = zxqzDataSource;
    }

    public String getZxqzCurrentMonthCountSql() {
        return zxqzCurrentMonthCountSql;
    }

    public void setZxqzCurrentMonthCountSql(String zxqzCurrentMonthCountSql) {
        this.zxqzCurrentMonthCountSql = zxqzCurrentMonthCountSql;
    }

    public String getZxqzTotalCountSql() {
        return zxqzTotalCountSql;
    }

    public void setZxqzTotalCountSql(String zxqzTotalCountSql) {
        this.zxqzTotalCountSql = zxqzTotalCountSql;
    }
}
