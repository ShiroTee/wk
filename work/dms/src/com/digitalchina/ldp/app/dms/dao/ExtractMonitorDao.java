package com.digitalchina.ldp.app.dms.dao;

import com.digitalchina.ldp.dao.BaseDaoSupport;
import java.util.List;

public abstract interface ExtractMonitorDao
        extends BaseDaoSupport
{
    public abstract List findByPage(int paramInt1, int paramInt2, String paramString);

    public abstract int getTotal(String paramString);

    public abstract List findBySql(String paramString);

    public abstract void updateBySql(String paramString);

    public abstract void insertBySql(String paramString, Object[] paramArrayOfObject);
}
