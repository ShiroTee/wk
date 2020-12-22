package com.digitalchina.ldp.app.dms.dao;

import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public abstract interface EsbChannelManageDao
        extends BaseDaoSupport
{
    public abstract PageList<Map<String, Object>> find(int paramInt1, int paramInt2, Map<String, String> paramMap);

    public abstract void addChannel(String paramString1, String paramString2);

    public abstract void updateChannel(String paramString1, String paramString2, String paramString3);

    public abstract void delChannel(String paramString);
}
