package com.digitalchina.ldp.app.dms.service.impl;

import com.digitalchina.ldp.app.dms.dao.EsbChannelManageDao;
import com.digitalchina.ldp.app.dms.service.EsbChannelManageService;
import com.digitalchina.ldp.bean.PageList;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EsbChannelManageServiceImpl
        implements EsbChannelManageService
{
    @Autowired
    private EsbChannelManageDao esbChannelManageDao;

    public void addChannel(String chanid, String channame)
    {
        this.esbChannelManageDao.addChannel(chanid, channame);
    }

    public void delChannel(String[] chanids)
    {
        for (int i = 0; i < chanids.length; i++) {
            this.esbChannelManageDao.delChannel(chanids[i]);
        }
    }

    public PageList<Map<String, Object>> find(int pageSize, int limit, Map<String, String> args)
    {
        return this.esbChannelManageDao.find(pageSize, limit, args);
    }

    public void updateChannel(String chanidOld, String chanid, String channame)
    {
        this.esbChannelManageDao.updateChannel(chanidOld, chanid, channame);
    }
}
