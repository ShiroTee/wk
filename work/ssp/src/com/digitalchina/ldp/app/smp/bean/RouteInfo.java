//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.digitalchina.ldp.app.smp.bean;

import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(
    name = "ESB_ROUTE_INFO"
)
public class RouteInfo implements Serializable {
    @Transient
    private static final long serialVersionUID = -3942345343486962057L;
    @Id
    @Column(
        name = "res_id"
    )
    private String routeId;
    @Column(
        name = "PUBLISH_URL",
        length = 512,
        nullable = false
    )
    private String publishURL;
    @Column(
        name = "srv_url",
        length = 512,
        nullable = false
    )
    private String prxoyURL;
    @Column(
        name = "res_typ",
        length = 10,
        nullable = false
    )
    private String routeType;
    @Column(
        name = "ROUTE_STATUS"
    )
    private Integer routeStatus;
    @Column(
        name = "RUNNING_STATUS"
    )
    private Integer runningStatus;
    @Column(
        name = "res_nm",
        length = 100,
        nullable = false
    )
    private String routeName;
    @Column(
        name = "res_desc",
        length = 1024
    )
    private String routeDesc;
    @Column(
        name = "IS_AUTH"
    )
    private Integer isAuth;
    @Column(
        name = "crt_dt",
        nullable = false
    )
    private Date publishDate;
    @Column(
        name = "provider",
        length = 40
    )
    @ManyToOne
    private OrganizationInfoBean provider;
    @Column(
        name = "SERVICE_TYPE"
    )
    private Integer serviceType;
    @Column(
        name = "WRITE_LOG"
    )
    private Integer writeLog;
    @Column(
        name = "MATCH_ON_URIPREFIX",
        nullable = false
    )
    private Integer matchOnUriPrefix = Integer.valueOf(0);

    @Column(name = "BASE_URL")
    private String baseUrl;

    @Transient
    private Boolean starting;
    @Transient
    private Boolean started;


    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
    public Integer getMatchOnUriPrefix() {
        return this.matchOnUriPrefix;
    }

    public void setMatchOnUriPrefix(Integer matchOnUriPrefix) {
        this.matchOnUriPrefix = matchOnUriPrefix;
    }

    public Integer getWriteLog() {
        return this.writeLog;
    }

    public void setWriteLog(Integer writeLog) {
        this.writeLog = writeLog;
    }

    public Integer getServiceType() {
        return this.serviceType;
    }

    public void setServiceType(Integer serviceType) {
        this.serviceType = serviceType;
    }

    public OrganizationInfoBean getProvider() {
        return this.provider;
    }

    public void setProvider(OrganizationInfoBean provider) {
        this.provider = provider;
    }

    public Date getPublishDate() {
        return this.publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public RouteInfo() {
        this.publishDate = new Date();
    }

    public RouteInfo(String routeId) {
        this.routeId = routeId;
    }

    public Integer getIsAuth() {
        return this.isAuth;
    }

    public void setIsAuth(Integer isAuth) {
        this.isAuth = isAuth;
    }

    public String getRouteName() {
        return this.routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getRouteDesc() {
        return this.routeDesc;
    }

    public void setRouteDesc(String routeDesc) {
        this.routeDesc = routeDesc;
    }

    public Integer getRunningStatus() {
        return this.runningStatus;
    }

    public void setRunningStatus(Integer runningStatus) {
        this.runningStatus = runningStatus;
    }

    public String getRouteId() {
        return this.routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getPublishURL() {
        return this.publishURL;
    }

    public void setPublishURL(String publishURL) {
        this.publishURL = publishURL;
    }

    public String getPrxoyURL() {
        return this.prxoyURL;
    }

    public void setPrxoyURL(String prxoyURL) {
        this.prxoyURL = prxoyURL;
    }

    public String getRouteType() {
        return this.routeType;
    }

    public void setRouteType(String routeType) {
        this.routeType = routeType;
    }

    public Integer getRouteStatus() {
        return this.routeStatus;
    }

    public void setRouteStatus(Integer routeStatus) {
        this.routeStatus = routeStatus;
    }

    public Boolean isStarting() {
        return this.starting;
    }

    public void setStarting(Boolean starting) {
        this.starting = starting;
    }

    public Boolean isStarted() {
        return this.started;
    }

    public void setStarted(Boolean started) {
        this.started = started;
    }

    public String getErrorMsg(String errorMsg) {
        return this.routeType.equals("http")?errorMsg:(this.routeType.equals("soap")?errorMsg:errorMsg);
    }

    public String getShowURL() {
        return "http://" + BeanDefineConfigue.getProperty("publishURL") + ":" + BeanDefineConfigue.getProperty("publishPort") + "/" + this.getBasePath() + "/" + this.publishURL;
    }

    public String getBasePath() {
        return BeanDefineConfigue.getProperty(this.routeType + "PublishBasePath");
    }
}
