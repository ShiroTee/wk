package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
@Table(name = "ESB_ROUTE_INFO")
@Entity
public class ServiceBean implements Serializable {
    @Id
    @Column(name = "RES_ID", length = 36, nullable = false)
    private String resId;//服务id
    @Column(name = "SERV_TYPE_ID", length = 36)
    private String servTypeId;//服务分类id
    @Column(name = "RES_NM", length = 100)
    private String resNm;//服务名
    @Column(name = "SRV_PHOTO_PATH")
    private String srvPhotoPath;//服务图片路径
    @Column(name = "IS_FREE")
    private Integer isFree;//是否收费

    @Transient
    private String isFreeStr;//是否收费，前台显示

    @Column(name = "IS_AUTH")
    private Integer isAuth;//是否认证

    @Transient
    private String isAuthStr;//是否认证，前台显示

    @Column(name = "PLAT_TYPE")
    private String platType;//支持平台
    @Column(name = "ROUTE_STATUS")
    private Integer routeStatus;//服务状态
    @Column(name = "PUBLISH_URL")
    private String publishUrl;//服务地址

    //代理地址单独放在 ServiceUrlBean 中
//    @Column(name = "SRV_URL")
//    private String srvUrl;//代理地址

    @Column(name = "RES_TYP")
    private String resTyp;//协议类型
    @Column(name = "CRT_DT")
    private Date crtDt;//创建时间
    @Column(name = "SERV_PROV")
    private String servProv;//服务提供商
    @Column(name = "SERV_DESC")
    private String servDesc;//服务详细描述
    @Column(name = "SERV_FEAT")
    private String servFeat;//特色功能
    @Column(name = "ASSOC_RECOM")
    private String assocRecom;//关联推荐
    @Column(name = "SERV_SCORE")
    private Integer servScore;//服务费用
    @Column(name = "FREE_COUNT")
    private Integer freeCount;//免费次数
    @Column(name = "INTERFACE_DESC", length = 1024)
    private String interfaceDesc;//接口备注

    @Transient
    private Integer invokingCount;//当前调用次数
    @Transient
    private Integer clickingCount;//当前点击次数
    @Transient
    private Integer commentCount;//评论数量
    @Transient
    private Integer collectCount;//收藏数量


    /**
     * 显示在API中的调用地址，亦即其真实的调用地址，形如http://ip:port/publishURL/xx
     *
     * 其与publishURL的关系如http://ip:port/publishURL/xx所示，包含关系
     * */
    @Transient
    private String  apiUrl;


    /**
     * 服务收费
     */
    @Transient
    private String price;//服务价格
    @Transient
    private String count;//服务价格对应的使用次数
    @Transient
    private String trueFreeCount;//申请后送的免费次

    public String getResId() {
        return resId;
    }

    public void setResId(String resId) {
        this.resId = resId;
    }

    public String getServTypeId() {
        return servTypeId;
    }

    public void setServTypeId(String servTypeId) {
        this.servTypeId = servTypeId;
    }

    public String getResNm() {
        return resNm;
    }

    public void setResNm(String resNm) {
        this.resNm = resNm;
    }

    public String getSrvPhotoPath() {
        return srvPhotoPath;
    }

    public void setSrvPhotoPath(String srvPhotoPath) {
        this.srvPhotoPath = srvPhotoPath;
    }

    public Integer getIsFree() {
		return isFree;
	}

	public void setIsFree(Integer isFree) {
		this.isFree = isFree;
	}

	public Integer getIsAuth() {
        return isAuth;
    }

    public void setIsAuth(Integer isAuth) {
        this.isAuth = isAuth;
    }

    public String getPlatType() {
        return platType;
    }

    public void setPlatType(String platType) {
        this.platType = platType;
    }

    public Integer getRouteStatus() {
        return routeStatus;
    }

    public void setRouteStatus(Integer routeStatus) {
        this.routeStatus = routeStatus;
    }

    public String getPublishUrl() {
        return publishUrl;
    }

    public void setPublishUrl(String publishUrl) {
        this.publishUrl = publishUrl;
    }

    public String getResTyp() {
        return resTyp;
    }

    public void setResTyp(String resTyp) {
        this.resTyp = resTyp;
    }

    public Date getCrtDt() {
        return crtDt;
    }

    public void setCrtDt(Date crtDt) {
        this.crtDt = crtDt;
    }

    public String getServProv() {
        return servProv;
    }

    public void setServProv(String servProv) {
        this.servProv = servProv;
    }

    public String getServDesc() {
        return servDesc;
    }

    public void setServDesc(String servDesc) {
        this.servDesc = servDesc;
    }

    public String getServFeat() {
        return servFeat;
    }

    public void setServFeat(String servFeat) {
        this.servFeat = servFeat;
    }

    public String getAssocRecom() {
        return assocRecom;
    }

    public void setAssocRecom(String assocRecom) {
        this.assocRecom = assocRecom;
    }

    public Integer getServScore() {
        return servScore;
    }

    public void setServScore(Integer servScore) {
        this.servScore = servScore;
    }

    public Integer getFreeCount() {
        return freeCount;
    }

    public void setFreeCount(Integer freeCount) {
        this.freeCount = freeCount;
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

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public Integer getCollectCount() {
		return collectCount;
	}

	public void setCollectCount(Integer collectCount) {
		this.collectCount = collectCount;
	}

	public String getIsFreeStr() {
		return isFreeStr;
	}

	public void setIsFreeStr(String isFreeStr) {
		this.isFreeStr = isFreeStr;
	}

	public String getIsAuthStr() {
		return isAuthStr;
	}

	public void setIsAuthStr(String isAuthStr) {
		this.isAuthStr = isAuthStr;
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}

//	public String getSrvUrl() {
//		return srvUrl;
//	}
//
//	public void setSrvUrl(String srvUrl) {
//		this.srvUrl = srvUrl;
//	}

    public String getInterfaceDesc() {
        return interfaceDesc;
    }

    public void setInterfaceDesc(String interfaceDesc) {
        this.interfaceDesc = interfaceDesc;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getTrueFreeCount() {
        return trueFreeCount;
    }

    public void setTrueFreeCount(String trueFreeCount) {
        this.trueFreeCount = trueFreeCount;
    }
}
