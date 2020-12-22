package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by zhanglei on 15/5/27.
 */

@Table(name = "ESB_ROUTE_INFO")
@Entity
public class ServiceUrlBean implements Serializable {
    @Id
    @Column(name = "RES_ID", length = 36, nullable = false)
    private String resId;//服务id

    @Column(name = "SRV_URL")
    private String srvUrl;//代理地址

    public String getResId() {
        return resId;
    }

    public void setResId(String resId) {
        this.resId = resId;
    }

    public String getSrvUrl() {
        return srvUrl;
    }

    public void setSrvUrl(String srvUrl) {
        this.srvUrl = srvUrl;
    }
}
