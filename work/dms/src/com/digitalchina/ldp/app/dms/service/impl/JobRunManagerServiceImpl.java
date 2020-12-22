package com.digitalchina.ldp.app.dms.service.impl;

import com.digitalchina.ldp.app.dms.bean.JobRunTimeSetBean;
import com.digitalchina.ldp.app.dms.bean.LogJobBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.JobRunManagerDao;
import com.digitalchina.ldp.app.dms.service.JobRunManagerService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobRunManagerServiceImpl
        implements JobRunManagerService {

    @Autowired
    private JobRunManagerDao jobRunManagerDao;

    public PageList<LogJobBean> find(int pageSize, int limit, Model model) {
        try {
            return this.jobRunManagerDao.find(pageSize, limit, model);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServiceException("job运行列表异常", e);
        }
    }

    public List<RDirectoryBean> getDirectoryList() {
        try {
            return this.jobRunManagerDao.getDirectoryList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServiceException("job运行列表异常", e);
        }
    }

    public List<JobRunTimeSetBean> getJobRunTimeSetInfo() {
        List list = this.jobRunManagerDao.getJobRunTimeSetInfo();
        return list;
    }

    public int addJobRunTimeSetInfo(Model model) {
        String cqid = model.getValue("cqid").toString();
        String qxid = model.getValue("qxid").toString();
        String zhid = model.getValue("zhid").toString();
        String bdid = model.getValue("bdid").toString();
        String jzid = model.getValue("jzid").toString();

        return this.jobRunManagerDao.addJobRunTimeSetInfo(cqid, qxid, zhid, bdid, jzid);
    }

    public void runLoop(Model model) {
        String jobId = model.getValue("jobId").toString();
        String jobName = model.getValue("jobName").toString();
        String idDirectory = model.getValue("idDirectory").toString();
        String dir = model.getValue("dir").toString();
        String gapTime = this.jobRunManagerDao.getJobRunTime(dir);
        this.jobRunManagerDao.runLoop(jobId, jobName, idDirectory, dir, gapTime);
    }

    public void stopLoop(Model model) {
        String jobId = model.getValue("jobId").toString();
        this.jobRunManagerDao.stopLoop(jobId);
    }
}