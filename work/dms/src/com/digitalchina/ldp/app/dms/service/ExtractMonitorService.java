package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import java.util.List;
import java.util.Map;

public abstract interface ExtractMonitorService
{
    public abstract List<RDirectoryBean> getDirectoryList();

    public abstract boolean checkIsHaveTrans(Map<String, Object> paramMap);

    public abstract SpecilPageList<String> getJobData(int paramInt1, int paramInt2, Map<String, Object> paramMap);

    public abstract boolean checkIsHaveStep(Map<String, Object> paramMap);

    public abstract SpecilPageList<String> getTransData(int paramInt1, int paramInt2, Map<String, Object> paramMap);

    public abstract SpecilPageList<String> getStepData(int paramInt1, int paramInt2, Map<String, Object> paramMap);

    public abstract List<String> queryLogMessage(Map<String, Object> paramMap);

    public abstract PageList<Map<String, Object>> getJobEchartsData(Model paramModel);

    public abstract PageList<Map<String, Object>> getChildJobEchartsData(Model paramModel);
}
