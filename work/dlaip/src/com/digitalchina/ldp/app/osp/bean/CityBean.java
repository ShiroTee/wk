package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by zhanglei on 15/6/2.
 */
@Table(name = "city")
@Entity
public class CityBean {
    @Column(name = "province")
    private String province;//省份
    @Column(name = "city")
    private String city;//城市
    @Column(name = "addr")
    private String addr;//相对地址

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }
}
