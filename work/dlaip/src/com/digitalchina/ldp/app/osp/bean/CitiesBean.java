package com.digitalchina.ldp.app.osp.bean;

import java.util.List;

/**
 * Created by zhanglei on 15/6/4.
 */
public class CitiesBean {
    private String province;//省份
    private int cityCount;//省份下面的城市个数
    private List<CityBean> cities;

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public int getCityCount() {
        return cityCount;
    }

    public void setCityCount(int cityCount) {
        this.cityCount = cityCount;
    }

    public List<CityBean> getCities() {
        return cities;
    }

    public void setCities(List<CityBean> cities) {
        this.cities = cities;
    }
}
