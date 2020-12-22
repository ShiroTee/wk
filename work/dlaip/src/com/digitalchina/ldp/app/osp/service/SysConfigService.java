package com.digitalchina.ldp.app.osp.service;

import com.digitalchina.ldp.app.osp.bean.CitiesBean;
import com.digitalchina.ldp.app.osp.bean.CityBean;
import com.digitalchina.ldp.bean.PageList;

import java.util.List;

/**
 * Created by zhanglei on 15/6/2.
 */
public interface SysConfigService {
    PageList<CityBean> listCity(String province, int start, int size);

    List<CitiesBean> listAllCity();
}
