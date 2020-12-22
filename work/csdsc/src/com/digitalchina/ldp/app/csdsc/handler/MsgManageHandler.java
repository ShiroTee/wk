package com.digitalchina.ldp.app.csdsc.handler;

import com.digitalchina.ldp.app.csdsc.dao.MsgManageDao;
import com.digitalchina.ldp.app.csdsc.service.MsgManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 消息管理 Handler
 * Created by zhanglei on 15/7/20.
 */
@Component
public class MsgManageHandler extends AbstractHandler {
    @Autowired
    private MsgManageService msgManageService;

    @Autowired
    private MsgManageDao msgManageDao;

    @HttpService
    public Map getAlertMessage(Model model) {
        DbContextHolder.setDefaultDbType("csdsc");
        String userLoginName = model.getValueNotEmpty("userLoginName");
        return msgManageService.getAlertMessage(userLoginName);
    }
}
