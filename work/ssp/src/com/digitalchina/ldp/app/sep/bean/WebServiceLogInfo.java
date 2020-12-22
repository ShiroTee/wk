package com.digitalchina.ldp.app.sep.bean;

import java.util.Date;

public class WebServiceLogInfo {
    private String logId;
    private String serviceId;
    private Date startDate;
    private Date endDate;
    private String routeNode;    //发生异常的路由节点，只有当exception为1是该值才有效
    private int exception;        //是否异常，0为没发生异常，1为异常
    private String input;        //输入参数或输入报文
    private String output;        //输出参数或输出报文

    public WebServiceLogInfo() {

    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getRouteNode() {
        return routeNode;
    }

    public void setRouteNode(String routeNode) {
        this.routeNode = routeNode;
    }

    public int getException() {
        return exception;
    }

    public void setException(int exception) {
        this.exception = exception;
    }

    public String getLogId() {
        return logId;
    }

    public void setLogId(String logId) {
        this.logId = logId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
