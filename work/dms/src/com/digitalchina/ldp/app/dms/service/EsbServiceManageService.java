package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.bean.PageList;
import java.util.Map;

public abstract interface EsbServiceManageService
{
    public abstract PageList<Map<String, Object>> find(int paramInt1, int paramInt2, Map<String, String> paramMap);

    public abstract void addService(String paramString1, String paramString2, String paramString3);

    public abstract void updateService(String paramString1, String paramString2, String paramString3, String paramString4);

    public abstract void delService(String[] paramArrayOfString);

    public abstract PageList<Map<String, Object>> findServiceType(int paramInt1, int paramInt2, Map<String, String> paramMap);

    public abstract void addServiceType(String paramString1, String paramString2);

    public abstract void updateServiceType(String paramString1, String paramString2, String paramString3);

    public abstract void delServiceType(String[] paramArrayOfString);
}