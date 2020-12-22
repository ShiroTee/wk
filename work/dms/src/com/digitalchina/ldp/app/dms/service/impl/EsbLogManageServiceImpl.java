package com.digitalchina.ldp.app.dms.service.impl;

import com.digitalchina.ldp.app.dms.bean.EsbTransLogBean;
import com.digitalchina.ldp.app.dms.dao.EsbLogManageDao;
import com.digitalchina.ldp.app.dms.service.EsbLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EsbLogManageServiceImpl
        implements EsbLogManageService
{
    @Autowired
    private EsbLogManageDao esbLogManageDao;

    public PageList<EsbTransLogBean> find(int pageSize, int limit, Model model)
    {
        try
        {
            return this.esbLogManageDao.find(pageSize, limit, model);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            throw new ServiceException("ESB日志管理列表异常", e);
        }
    }

    public String getLogDetail(String esbflowno, String flowstepid)
    {
        return this.esbLogManageDao.getLogDetail(esbflowno, flowstepid);
    }

    public List<Map<String, Object>> getTypeCombox()
    {
        return this.esbLogManageDao.getTypeCombox();
    }

    public PageList<EsbTransLogBean> findByType(int pageSize, int limit, Map<String, String> map)
    {
        return this.esbLogManageDao.findByType(pageSize, limit, map);
    }

    public List<Map<String, Object>> getServiceids(String bigTypeId, String typeId)
    {
        return this.esbLogManageDao.getServiceids(bigTypeId, typeId);
    }

    public List<Map<String, Object>> findByPie(Map<String, String> map)
    {
        return this.esbLogManageDao.findForPie(map);
    }

    public PageList<Map<String, Object>> getServicesByType(int pageSize, int limit, String bigTypeId, String typeId, String pro_id)
    {
        return this.esbLogManageDao.getServicesByType(pageSize, limit, bigTypeId, typeId, pro_id);
    }

    public int getCountByServiceid(String serviceId, String channelId)
    {
        return this.esbLogManageDao.getCountByServiceid(serviceId, channelId);
    }

    public List<Map<String, Object>> getChannelComBox()
    {
        return this.esbLogManageDao.getChannelComBox();
    }

    public List<Map<String, Object>> getProtocolComBox()
    {
        return this.esbLogManageDao.getProtocolComBox();
    }

    public void addService(String serid, String channelid, String channelcode, String protocol)
    {
        this.esbLogManageDao.addService(serid, channelid, channelcode, protocol);
    }

    public void updateService(String serid_old, String serid, String sername, String bigtype, String type, String protocol)
    {
        this.esbLogManageDao.updateService(serid_old, serid, sername, bigtype, type, protocol);
    }

    public void delService(String[] serids)
    {
        for (int i = 0; i < serids.length; i++) {
            this.esbLogManageDao.delService(serids[i]);
        }
    }

    public List<Map<String, Object>> getServiceComBox(String typeId)
    {
        return this.esbLogManageDao.getServiceComBox(typeId);
    }

    public List<Map<String, Object>> getServiceidsByTypeid(int parm, String typeId)
    {
        return this.esbLogManageDao.getServiceidsByTypeid(parm, typeId);
    }

    public Map<String, Object> findForChannelPie(Map<String, String> map)
    {
        return this.esbLogManageDao.findForChannelPie(map);
    }

    public List<Map<String, Object>> getAllChannel()
    {
        return this.esbLogManageDao.getAllChannel();
    }

    public List<Map<String, Object>> getChannelsBypid(String pid)
    {
        return this.esbLogManageDao.getChannelsBypid(pid);
    }
}