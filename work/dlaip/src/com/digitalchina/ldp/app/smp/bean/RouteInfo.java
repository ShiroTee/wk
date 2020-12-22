package com.digitalchina.ldp.app.smp.bean;

import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ESB_ROUTE_INFO")
public class RouteInfo implements Serializable {

	@Transient
	private static final long serialVersionUID = -3942345343486962057L;

	@Id
	@Column(name = "res_id")
	private String routeId;

	@Column(name = "PUBLISH_URL", length = 512, nullable = false)
	private String publishURL;

	@Column(name = "srv_url", length = 512, nullable = false)
	private String prxoyURL;

	@Column(name = "res_typ", length = 10, nullable = false)
	private String routeType;

	@Column(name = "ROUTE_STATUS")
	private Integer routeStatus;

	@Column(name = "RUNNING_STATUS")
	private Integer runningStatus;

	@Column(name = "res_nm", length = 100, nullable = false)
	private String routeName;

	@Column(name = "res_desc", length = 1024)
	private String routeDesc;

	@Column(name = "IS_AUTH")
	private Integer isAuth;

	@Column(name = "crt_dt", nullable = false)
	private Date publishDate;

	@Column(name = "provider", length = 40)
	@ManyToOne
	private OrganizationInfoBean provider;

	@Column(name = "SERVICE_TYPE")
	private Integer serviceType;

	@Column(name = "WRITE_LOG")
	private Integer writeLog;

	@Column(name = "MATCH_ON_URIPREFIX", nullable = false)
	private Integer matchOnUriPrefix = Integer.valueOf(0);

//	@Column(name = "SERV_TYPE_ID", length = 36)
//	private String servTypeId;

/*
	@Column(name = "IS_FREE", length = 1)
	private Integer isFree;
*/

//	@Column(name = "PLAT_TYPE", length = 255)
//	private String platType;
//
//	@Column(name = "SERV_PROV", length = 255)
//	private String servProv;

//	@Column(name = "SERV_DESC", length = 1000)
//	private String servDesc;
//
//	@Column(name = "SERV_FEAT", length = 4000)
//	private String servFeat;

//	@Column(name = "ASSOC_RECOM", length = 255)
//	private String assocRecom;

/*
	@Column(name = "SERV_SCORE", length = Constant.FIELD_ID_MAX_LENGTH)
	private String servScore;

	@Column(name = "FREE_COUNT", length = Constant.FIELD_ID_MAX_LENGTH)
	private String freeCount;
*/

//	@Column(name = "SERV_MODE", length = 255)
//	private String servMode;

	@Transient
	private Boolean starting;

	@Transient
	private Boolean started;

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
		if (this.routeType.equals("http")) {
			return errorMsg;
		}
		if (this.routeType.equals("soap")) {
			return errorMsg;
		}

		return errorMsg;
	}

	public String getShowURL() {
		return "http://" + BeanDefineConfigue.getProperty("publishURL") + ":"
				+ BeanDefineConfigue.getProperty("publishPort") + "/"
				+ getBasePath() + "/" + this.publishURL;
	}

	public String getBasePath() {
		return BeanDefineConfigue.getProperty(this.routeType
				+ "PublishBasePath");
	}

//	public String getServTypeId() {
//		return servTypeId;
//	}
//
//	public void setServTypeId(String servTypeId) {
//		this.servTypeId = servTypeId;
//	}

//	public Integer getIsFree() {
//		return isFree;
//	}
//
//	public void setIsFree(Integer isFree) {
//		this.isFree = isFree;
//	}

//	public String getPlatType() {
//		return platType;
//	}
//
//	public void setPlatType(String platType) {
//		this.platType = platType;
//	}
//
//	public String getServProv() {
//		return servProv;
//	}
//
//	public void setServProv(String servProv) {
//		this.servProv = servProv;
//	}
//
//	public String getServDesc() {
//		return servDesc;
//	}
//
//	public void setServDesc(String servDesc) {
//		this.servDesc = servDesc;
//	}
//
//	public String getServFeat() {
//		return servFeat;
//	}
//
//	public void setServFeat(String servFeat) {
//		this.servFeat = servFeat;
//	}
//
//	public String getAssocRecom() {
//		return assocRecom;
//	}
//
//	public void setAssocRecom(String assocRecom) {
//		this.assocRecom = assocRecom;
//	}

//	public String getServScore() {
//		return servScore;
//	}
//
//	public void setServScore(String servScore) {
//		this.servScore = servScore;
//	}
//
//	public String getFreeCount() {
//		return freeCount;
//	}
//
//	public void setFreeCount(String freeCount) {
//		this.freeCount = freeCount;
//	}

//	public String getServMode() {
//		return servMode;
//	}
//
//	public void setServMode(String servMode) {
//		this.servMode = servMode;
//	}
}