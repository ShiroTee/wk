package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.app.dms.bean.JobRunTimeSetBean;
import com.digitalchina.ldp.app.dms.bean.LogJobBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

import java.util.List;

public interface JobRunManagerService {
    public PageList<LogJobBean> find(int paramInt1, int paramInt2, Model paramModel);

    public List<RDirectoryBean> getDirectoryList();

    public List<JobRunTimeSetBean> getJobRunTimeSetInfo();

    public int addJobRunTimeSetInfo(Model paramModel);

    public void runLoop(Model paramModel);

    public void stopLoop(Model paramModel);
}