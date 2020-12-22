package com.digitalchina.ldp.app.dms.dao;

import com.digitalchina.ldp.app.dms.bean.EsbTransLogBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public abstract interface EsbLogManageDao
        extends BaseDaoSupport
{
    public abstract PageList<EsbTransLogBean> find(int paramInt1, int paramInt2, Map<String, Object> paramMap);

    public abstract PageList<EsbTransLogBean> findByType(int paramInt1, int paramInt2, Map<String, String> paramMap);

    public abstract String getLogDetail(String paramString1, String paramString2);

    public abstract List<Map<String, Object>> getTypeCombox();

    public abstract List<Map<String, Object>> getServiceids(String paramString1, String paramString2);

    public abstract List<Map<String, Object>> getServiceidsByTypeid(int paramInt, String paramString);

    public abstract List<Map<String, Object>> findForPie(Map<String, String> paramMap);

    public abstract Map<String, Object> findForChannelPie(Map<String, String> paramMap);

    public abstract PageList<Map<String, Object>> getServicesByType(int paramInt1, int paramInt2, String paramString1, String paramString2, String paramString3);

    public abstract int getCountByServiceid(String paramString1, String paramString2);

    public abstract List<Map<String, Object>> getProtocolComBox();

    public abstract List<Map<String, Object>> getChannelComBox();

    public abstract List<Map<String, Object>> getServiceComBox(String paramString);

    public abstract void addService(String paramString1, String paramString2, String paramString3, String paramString4);

    public abstract void updateService(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6);

    public abstract void delService(String paramString);

    public abstract List<Map<String, Object>> getAllChannel();

    public abstract List<Map<String, Object>> getChannelsBypid(String paramString);
}