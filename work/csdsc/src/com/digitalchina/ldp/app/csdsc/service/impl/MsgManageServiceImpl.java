package com.digitalchina.ldp.app.csdsc.service.impl;

import com.digitalchina.ldp.app.csdsc.dao.MsgManageDao;
import com.digitalchina.ldp.app.csdsc.service.MsgManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by zhanglei on 15/7/20.
 */
@Service
public class MsgManageServiceImpl implements MsgManageService {
    @Autowired
    private MsgManageDao msgManageDao;

    @Override
    public Map getAlertMessage(String loginName) {
        return msgManageDao.getAlertMessage(loginName);
    }
}
