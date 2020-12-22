package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.bean.PageList;
import java.util.Map;

public abstract interface EsbChannelManageService
{
    public abstract PageList<Map<String, Object>> find(int paramInt1, int paramInt2, Map<String, String> paramMap);

    public abstract void addChannel(String paramString1, String paramString2);

    public abstract void updateChannel(String paramString1, String paramString2, String paramString3);

    public abstract void delChannel(String[] paramArrayOfString);
}
