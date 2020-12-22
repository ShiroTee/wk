package com.digitalchina.ldp.app.csdsc.bean;

import javax.persistence.Column;

/**
 * 委办局数据统计任务结果表
 *
 * @Author zhanglei
 * @Date 16/7/6 下午4:26
 */
public class StatCategory {
    @Column(name = "RES_ID")
    private String id;
    @Column(name = "CONF_ID")
    private Object configRelationId;
    @Column(name = "CURRENT_MONTH_COUNT")
    private Object currentMonthCount;
    @Column(name = "TOTAL_COUNT")
    private Object totalCount;
    @Column(name = "ZXQZ_CURRENT_MONTH_COUNT")
    private Object zxqzCurrentMonthCount;
    @Column(name = "ZXQZ_TOTAL_COUNT")
    private Object zxqzTotalCount;

    public StatCategory(Object configRelationId, Object currentMonthCount, Object totalCount, Object zxqzCurrentMonthCount, Object zxqzTotalCount) {
        this.configRelationId = configRelationId;
        this.currentMonthCount = currentMonthCount;
        this.totalCount = totalCount;
        this.zxqzCurrentMonthCount = zxqzCurrentMonthCount;
        this.zxqzTotalCount = zxqzTotalCount;
    }

    public Object[] toArray() {
        return new Object[]{ currentMonthCount, totalCount, zxqzCurrentMonthCount, zxqzTotalCount,configRelationId};
    }
}
