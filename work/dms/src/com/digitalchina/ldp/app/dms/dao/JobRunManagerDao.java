package com.digitalchina.ldp.app.dms.dao;

import com.digitalchina.ldp.app.dms.bean.JobRunTimeSetBean;
import com.digitalchina.ldp.app.dms.bean.LogJobBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public  interface JobRunManagerDao extends BaseDaoSupport
{
    public  PageList<LogJobBean> find(int paramInt1, int paramInt2, Model paramModel);

    public  List<RDirectoryBean> getDirectoryList();

    public  List<JobRunTimeSetBean> getJobRunTimeSetInfo();

    public  int addJobRunTimeSetInfo(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5);

    public  void runLoop(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5);

    public  String getJobRunTime(String paramString);

    public  void stopLoop(String paramString);
}