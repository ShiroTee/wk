package com.digitalchina.ldp.app.dms.service.impl;

import com.digitalchina.ldp.app.dms.dao.EsbServiceManageDao;
import com.digitalchina.ldp.app.dms.service.EsbServiceManageService;
import com.digitalchina.ldp.bean.PageList;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EsbServiceManageServiceImpl
        implements EsbServiceManageService
{
    @Autowired
    private EsbServiceManageDao esbServiceManageDao;

    public void addService(String serid, String sername, String sertype)
    {
        this.esbServiceManageDao.addService(serid, sername, sertype);
    }

    public void delService(String[] serids)
    {
        for (int i = 0; i < serids.length; i++) {
            this.esbServiceManageDao.delService(serids[i]);
        }
    }

    public PageList<Map<String, Object>> find(int pageSize, int limit, Map<String, String> args)
    {
        return this.esbServiceManageDao.find(pageSize, limit, args);
    }

    public void updateService(String seridOld, String serid, String sername, String type)
    {
        this.esbServiceManageDao.updateService(seridOld, serid, sername, type);
    }

    public void addServiceType(String typeid, String typename)
    {
        this.esbServiceManageDao.addServiceType(typeid, typename);
    }

    public void delServiceType(String[] typeids)
    {
        for (int i = 0; i < typeids.length; i++) {
            this.esbServiceManageDao.delServiceType(typeids[i]);
        }
    }

    public PageList<Map<String, Object>> findServiceType(int pageSize, int limit, Map<String, String> args)
    {
        return this.esbServiceManageDao.findServiceType(pageSize, limit, args);
    }

    public void updateServiceType(String typeidOld, String typeid, String typename)
    {
        this.esbServiceManageDao.updateServiceType(typeidOld, typeid, typename);
    }
}