package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.CitiesBean;
import com.digitalchina.ldp.app.osp.bean.CityBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.SysConfigService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by zhanglei on 15/6/2.
 */
@Component
public class SysConfigHandler extends AbstractHandler {
    @Autowired
    private SysConfigService sysConfigService;

    @HttpService
    public PageList<CityBean> listCity(Model model) {
        String province = model.getValue("province");
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        return sysConfigService.listCity(province, start, size);
    }

    @HttpService
    public List<CitiesBean> listAllCity(Model model) {
        return sysConfigService.listAllCity();
    }
}
