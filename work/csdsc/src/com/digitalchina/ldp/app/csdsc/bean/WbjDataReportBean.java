package com.digitalchina.ldp.app.csdsc.bean;

import java.util.List;

/**
 * Created by zhanglei on 15/7/20.
 */
public class WbjDataReportBean {
    private String wbjmc;
    private String dataName;
    private int dataNum;
    private List<WbjDataReportBean> detail;

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

    public int getDataNum() {
        return dataNum;
    }

    public void setDataNum(int dataNum) {
        this.dataNum = dataNum;
    }

    public List<WbjDataReportBean> getDetail() {
        return detail;
    }

    public void setDetail(List<WbjDataReportBean> detail) {
        this.detail = detail;
    }
}
