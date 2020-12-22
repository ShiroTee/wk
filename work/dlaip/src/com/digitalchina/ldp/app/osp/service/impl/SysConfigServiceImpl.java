package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.CitiesBean;
import com.digitalchina.ldp.app.osp.bean.CityBean;
import com.digitalchina.ldp.app.osp.dao.SysConfigDao;
import com.digitalchina.ldp.app.osp.service.SysConfigService;
import com.digitalchina.ldp.bean.PageList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhanglei on 15/6/2.
 */
@Service
public class SysConfigServiceImpl implements SysConfigService {
    @Autowired
    private SysConfigDao sysConfigDao;

    @Override
    public PageList<CityBean> listCity(String province, int start, int size) {
        return sysConfigDao.listCity(province, start, size);
    }

    @Override
    public List<CitiesBean> listAllCity() {
        return sysConfigDao.listAllCity();
    }
}
