package com.digitalchina.ldp.app.csdsc.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

/**
 * Created by zhanglei on 15/7/20.
 */
@Entity
@Table(name = "wbj_data_submit_info")
public class WbjDataSubmitInfoBean {
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    private int id;
    @Column(name = "wbjmc", nullable = true, insertable = true, updatable = true, length = 45)
    private String wbjmc;
    @Column(name = "data_name", nullable = true, insertable = true, updatable = true, length = 45)
    private String dataName;
    @Column(name = "data_type", nullable = true, insertable = true, updatable = true, length = 45)
    private String dataType;
    @Column(name = "data_num", nullable = true, insertable = true, updatable = true, precision = 0)
    private Integer dataNum;
    @Column(name = "time", nullable = true, insertable = true, updatable = true)
    private Date time;
    @Column(name = "data_error_num", nullable = true, insertable = true, updatable = true, length = 45)
    private String dataErrorNum;
    @Column(name = "submit_time", nullable = true, insertable = true, updatable = true)
    private Date submitTime;
    @Column(name = "cycle_time", nullable = true, insertable = true, updatable = true, length = 45)
    private String cycleTime;
    @Column(name = "share_level", nullable = true, insertable = true, updatable = true, length = 45)
    private String shareLevel;

    @Id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWbjmc() {
        return wbjmc;
    }

    public void setWbjmc(String wbjmc) {
        this.wbjmc = wbjmc;
    }

    public String getDataName() {
        return dataName;
    }

    public void setDataName(String dataName) {
        this.dataName = dataName;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public Integer getDataNum() {
        return dataNum;
    }

    public void setDataNum(Integer dataNum) {
        this.dataNum = dataNum;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getDataErrorNum() {
        return dataErrorNum;
    }

    public void setDataErrorNum(String dataErrorNum) {
        this.dataErrorNum = dataErrorNum;
    }

    public Date getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Date submitTime) {
        this.submitTime = submitTime;
    }

    public String getCycleTime() {
        return cycleTime;
    }

    public void setCycleTime(String cycleTime) {
        this.cycleTime = cycleTime;
    }

    public String getShareLevel() {
        return shareLevel;
    }

    public void setShareLevel(String shareLevel) {
        this.shareLevel = shareLevel;
    }
}
