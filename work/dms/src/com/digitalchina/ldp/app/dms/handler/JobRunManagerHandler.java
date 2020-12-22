package com.digitalchina.ldp.app.dms.handler;

import com.digitalchina.ldp.app.dms.bean.JobRunTimeSetBean;
import com.digitalchina.ldp.app.dms.bean.LogJobBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.service.JobRunManagerService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import org.pentaho.di.core.KettleEnvironment;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.job.Job;
import org.pentaho.di.job.JobMeta;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.pentaho.di.repository.kdr.KettleDatabaseRepository;
import org.pentaho.di.repository.kdr.KettleDatabaseRepositoryMeta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;

@Component
public class JobRunManagerHandler extends AbstractExtHandler {

    @Autowired
    private JobRunManagerService jobRunManagerService;
    private static String repository_jdbc_connectionName;
    private static String repository_jdbc_host;
    private static String repository_jdbc_database;
    private static String repository_jdbc_port;
    private static String repository_jdbc_username;
    private static String repository_jdbc_password;
    private static String repository_jdbc_databaseType;
    private static String repository_jdbc_databaseMold;
    private static String repositoryMeta_id;
    private static String repositoryMeta_name;
    private static String repositoryMeta_description;
    private static String repository_username;
    private static String repository_password;

    static {
        JobRunManagerHandler cla = new JobRunManagerHandler();
        InputStream inputStream = cla.getClass().getClassLoader().getResourceAsStream("jobrunconfig.properties");
        Properties properties = new Properties();
        try {
            properties.load(inputStream);
            repository_jdbc_connectionName = properties.getProperty("repository_jdbc_connectionName");
            repository_jdbc_host = properties.getProperty("repository_jdbc_host");
            repository_jdbc_database = properties.getProperty("repository_jdbc_database");
            repository_jdbc_port = properties.getProperty("repository_jdbc_port");
            repository_jdbc_username = properties.getProperty("repository_jdbc_username");
            repository_jdbc_password = properties.getProperty("repository_jdbc_password");
            repository_jdbc_databaseType = properties.getProperty("repository_jdbc_databaseType");
           repository_jdbc_databaseMold = properties.getProperty("repository_jdbc_databaseMold");
            repositoryMeta_id = properties.getProperty("repositoryMeta_id");
            repositoryMeta_name = properties.getProperty("repositoryMeta_name");
            repositoryMeta_description = properties.getProperty("repositoryMeta_description");
            repository_username = properties.getProperty("repository_username");
            repository_password = properties.getProperty("repository_password");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public ViewModel page(Model model) {
        ViewModel viewModel = new ViewModel("jobrunmanager/jobRunManager.jsp", "jobrunmanager/jobRunManager.js");
        return viewModel;
    }

    public PageList<LogJobBean> getLogJobList(Model model) {
        int start = StringUtils.toNum(model.get("start").toString());
        int end = StringUtils.toNum(model.get("limit").toString());
        PageList list = this.jobRunManagerService.find(start, end, model);
        return list;
    }

    public List<RDirectoryBean> getDirectoryList(Model model) {
        List list = this.jobRunManagerService.getDirectoryList();
        return list;
    }

    public JobRunTimeSetBean getJobRunTimeSetInfo(Model model) {
        List list = this.jobRunManagerService.getJobRunTimeSetInfo();
        JobRunTimeSetBean jobRunTimeSetBean=null;
        if(list.size()>0){
            jobRunTimeSetBean = (JobRunTimeSetBean) list.get(0);
        }else{
            jobRunTimeSetBean=new JobRunTimeSetBean();
        }
        return jobRunTimeSetBean;
    }

    public int updateJobRunTimeSetInfo(Model model) {
        int rtn = this.jobRunManagerService.addJobRunTimeSetInfo(model);
        return rtn;
    }

    public void runLoop(Model model) {
        this.jobRunManagerService.runLoop(model);
    }

    public void stopLoop(Model model) {
        this.jobRunManagerService.stopLoop(model);
    }

    public void runJob(Model model) {
        try {
            String jobName = model.getValue("jobName").toString();
            String dir = model.getValue("dir").toString();

            KettleEnvironment.init();

            KettleDatabaseRepository repository = new KettleDatabaseRepository();

            DatabaseMeta dataMeta = new DatabaseMeta(repository_jdbc_connectionName, repository_jdbc_databaseType, repository_jdbc_databaseMold, repository_jdbc_host, repository_jdbc_database, repository_jdbc_port,
                    repository_jdbc_username, repository_jdbc_password);

            KettleDatabaseRepositoryMeta kettleDatabaseMeta = new KettleDatabaseRepositoryMeta(repositoryMeta_name, repositoryMeta_id,
                    repositoryMeta_description, dataMeta);

            repository.init(kettleDatabaseMeta);

            repository.connect(repository_username, repository_password);

            RepositoryDirectoryInterface directory = repository.findDirectory(dir);

            JobMeta jobMeta = repository.loadJob(jobName, directory, null, null);

            Job job = new Job(repository, jobMeta);

            job.start();
        } catch (KettleException e) {
            System.err.println("启动kettle作业异常！");
            e.printStackTrace();
            throw new ServiceException("启动kettle作业异常！");
        }
    }
}