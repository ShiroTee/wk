package com.digitalchina.decodeServer.count;

/**
 * Created by dlms on 2016/9/26.
 */
public class CountBean {
    private String orgName;
    private String dataCount;
    private String submitDate;
    private String dataType;
    private String circle;
    private String belongCircle;

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getDataCount() {
        return dataCount;
    }

    public void setDataCount(String dataCount) {
        this.dataCount = dataCount;
    }

    public String getSubmitDate() {
        return submitDate;
    }

    public void setSubmitDate(String submitDate) {
        this.submitDate = submitDate;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getCircle() {
        return circle;
    }

    public void setCircle(String circle) {
        this.circle = circle;
    }

    public String getBelongCircle() {
        return belongCircle;
    }

    public void setBelongCircle(String belongCircle) {
        this.belongCircle = belongCircle;
    }
}
