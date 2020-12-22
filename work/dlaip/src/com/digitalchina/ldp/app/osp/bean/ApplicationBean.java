package com.digitalchina.ldp.app.osp.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Table(name = "APP_LIST_INFO")
@Entity
public class ApplicationBean implements Serializable {

    @Id
    @Column(name = "APP_ID", length = 36, nullable = false)
    private String appId;//应用id
    @Column(name = "APP_NAME", length = 150)
    private String appName;//应用名称
    @Column(name = "APP_MOLD", length = 50)
    private String appMold;//应用类型
    @Column(name = "APP_TYPE", length = 50)
    private String appType;//应用分类
    @Column(name = "APP_DESC", length = 4000)
    private String appDesc;//应用简介
    @Column(name = "APP_PROV", length = 100)
    private String appProv;//应用提供商
    @Column(name = "APP_URL", length = 255)
    private String appUrl;//应用地址
    @Column(name = "APP_PACK_URL", length = 255)
    private String appPackUrl;//应用存放路径
    @Column(name = "APP_DOC_URL", length = 255)
    private String appDocUrl;//文档存放路径
    @Column(name = "REQ_CPU")
    private Integer reqCpu;//需要cpu数
    @Column(name = "REQ_MEN")
    private Integer reqMen;//需要内存大小
    @Column(name = "REQ_SYS", length = 100)
    private String reqSys;//操作系统平台
    @Column(name = "REQ_MIDD", length = 100)
    private String reqMidd;//中间件
    @Column(name = "REQ_DB", length = 100)
    private String reqDb;//数据库
    @Column(name = "REQ_STROAGE")
    private Integer reqStorage;//存储大小(G)
    @Column(name = "PUBLISH_STATUS")
    private Integer publishStatus;//发布状态
    
    @Transient
    private Integer invokingCount;//当前调用次数
    @Transient
    private Integer clickingCount;//当前点击次数
    
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getAppMold() {
		return appMold;
	}
	public void setAppMold(String appMold) {
		this.appMold = appMold;
	}
	public String getAppType() {
		return appType;
	}
	public void setAppType(String appType) {
		this.appType = appType;
	}
	public String getAppDesc() {
		return appDesc;
	}
	public void setAppDesc(String appDesc) {
		this.appDesc = appDesc;
	}
	public String getAppProv() {
		return appProv;
	}
	public void setAppProv(String appProv) {
		this.appProv = appProv;
	}
	public String getAppUrl() {
		return appUrl;
	}
	public void setAppUrl(String appUrl) {
		this.appUrl = appUrl;
	}
	public String getAppPackUrl() {
		return appPackUrl;
	}
	public void setAppPackUrl(String appPackUrl) {
		this.appPackUrl = appPackUrl;
	}
	public String getAppDocUrl() {
		return appDocUrl;
	}
	public void setAppDocUrl(String appDocUrl) {
		this.appDocUrl = appDocUrl;
	}
	public Integer getReqCpu() {
		return reqCpu;
	}
	public void setReqCpu(Integer reqCpu) {
		this.reqCpu = reqCpu;
	}
	public Integer getReqMen() {
		return reqMen;
	}
	public void setReqMen(Integer reqMen) {
		this.reqMen = reqMen;
	}
	public String getReqSys() {
		return reqSys;
	}
	public void setReqSys(String reqSys) {
		this.reqSys = reqSys;
	}
	public String getReqMidd() {
		return reqMidd;
	}
	public void setReqMidd(String reqMidd) {
		this.reqMidd = reqMidd;
	}
	public String getReqDb() {
		return reqDb;
	}
	public void setReqDb(String reqDb) {
		this.reqDb = reqDb;
	}
	public Integer getReqStorage() {
		return reqStorage;
	}
	public void setReqStorage(Integer reqStorage) {
		this.reqStorage = reqStorage;
	}
	public Integer getPublishStatus() {
		return publishStatus;
	}
	public void setPublishStatus(Integer publishStatus) {
		this.publishStatus = publishStatus;
	}
	public Integer getInvokingCount() {
		return invokingCount;
	}
	public void setInvokingCount(Integer invokingCount) {
		this.invokingCount = invokingCount;
	}
	public Integer getClickingCount() {
		return clickingCount;
	}
	public void setClickingCount(Integer clickingCount) {
		this.clickingCount = clickingCount;
	}

 
}
