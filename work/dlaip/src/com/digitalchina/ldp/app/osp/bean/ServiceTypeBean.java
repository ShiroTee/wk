package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.*;

@SuppressWarnings("serial")
@Table(name = "ESB_ROUTE_TYPE")
@Entity
public class ServiceTypeBean {
    @Id
    @Column(name = "SERV_TYPE_ID")
    private String servTypeId;//服务分类id
    @Column(name = "TYPE_NAME")
    private String typeName;//分类名称
    @Column(name = "TYPE_DESC")
    private String typeDesc;//分类描述
    @Column(name = "PARANT_TYPE_ID")
    private String parantTypeId;//父类id
    @Column(name = "TYPE_STATUS")
    private String typeStatus;//分类状态
    @Column(name = "TYPE_PHOTO_URL")
    private String typePhotoUrl;//图片路径
    @Column(name = "TYPE_LEVEL")
    private String typeLevel;//分类等级

    @Transient
    private Integer innerServiceCount;//该服务分类的服务数量

    public String getServTypeId() {
        return servTypeId;
    }

    public void setServTypeId(String servTypeId) {
        this.servTypeId = servTypeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getTypeDesc() {
        return typeDesc;
    }

    public void setTypeDesc(String typeDesc) {
        this.typeDesc = typeDesc;
    }

    public String getParantTypeId() {
        return parantTypeId;
    }

    public void setParantTypeId(String parantTypeId) {
        this.parantTypeId = parantTypeId;
    }

    public String getTypeStatus() {
        return typeStatus;
    }

    public void setTypeStatus(String typeStatus) {
        this.typeStatus = typeStatus;
    }

    public String getTypePhotoUrl() {
        return typePhotoUrl;
    }

    public void setTypePhotoUrl(String typePhotoUrl) {
        this.typePhotoUrl = typePhotoUrl;
    }

    public String getTypeLevel() {
        return typeLevel;
    }

    public void setTypeLevel(String typeLevel) {
        this.typeLevel = typeLevel;
    }

    public Integer getInnerServiceCount() {
        return innerServiceCount;
    }

    public void setInnerServiceCount(Integer innerServiceCount) {
        this.innerServiceCount = innerServiceCount;
    }
}
