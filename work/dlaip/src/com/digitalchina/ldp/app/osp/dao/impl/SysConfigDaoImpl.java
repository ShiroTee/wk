package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.bean.CitiesBean;
import com.digitalchina.ldp.app.osp.bean.CityBean;
import com.digitalchina.ldp.app.osp.dao.SysConfigDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by zhanglei on 15/6/2.
 */
@Component
public class SysConfigDaoImpl extends BaseDao implements SysConfigDao {
    @Override
    public PageList<CityBean> listCity(String province, int start, int size) {
        return this.createBeanQuery(CityBean.class).eq("province", province).page(start, size);
    }

    @Override
    public List<CitiesBean> listAllCity() {
        List<CitiesBean> result = new ArrayList<CitiesBean>();

        /**
         * select province,count(city) city_count from city group by province
         */
        List<Map<String, Object>> maps = this.createJdbcTemplate().queryForList("select province,count(city) city_count from city group by province");
        for (Map<String, Object> map : maps) {
            CitiesBean citiesBean = new CitiesBean();
            citiesBean.setProvince((String) map.get("province"));

            String url = BeanDefineConfigue.getProperty("url");
            if (url.startsWith("jdbc:oracle")) {
                citiesBean.setCityCount(((BigDecimal) map.get("city_count")).intValue());
            } else if (url.startsWith("jdbc:mysql")) {
                citiesBean.setCityCount(((Long) map.get("city_count")).intValue());
            }

            citiesBean.setCities(this.createBeanQuery(CityBean.class).eq("province", citiesBean.getProvince()).list());
            result.add(citiesBean);
        }

        return result;
    }
}
