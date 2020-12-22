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
@Table(name = "wbj_data_useage_info")
public class WbjDataUseageInfoBean {
    @Column(name = "id", nullable = false, insertable = true, updatable = true)
    private int id;
    @Column(name = "wbjmc", nullable = true, insertable = true, updatable = true, length = 45)
    private String wbjmc;
    @Column(name = "provider", nullable = true, insertable = true, updatable = true, length = 45)
    private String provider;
    @Column(name = "data_name", nullable = true, insertable = true, updatable = true, length = 45)
    private String dataName;
    @Column(name = "data_type", nullable = true, insertable = true, updatable = true, length = 45)
    private String dataType;
    @Column(name = "data_num", nullable = true, insertable = true, updatable = true, precision = 0)
    private Integer dataNum;
    @Column(name = "time", nullable = true, insertable = true, updatable = true)
    private Date time;

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

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
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
}
