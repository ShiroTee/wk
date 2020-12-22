package com.digitalchina.ldp.app.dms.common.util.quarts;

import com.digitalchina.ldp.app.dms.handler.JobRunManagerHandler;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import org.pentaho.di.core.KettleEnvironment;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.job.Job;
import org.pentaho.di.job.JobMeta;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.pentaho.di.repository.kdr.KettleDatabaseRepository;
import org.pentaho.di.repository.kdr.KettleDatabaseRepositoryMeta;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.TimerTask;

public class JobStart extends TimerTask {
    private JobRunManagerBean jrmbean;
    private JdbcTemplate simpleJdbcTemplate;
    private static Properties properties;
    private static String repository_jdbc_connectionName = properties.getProperty("repository_jdbc_connectionName");
    private static String repository_jdbc_host = properties.getProperty("repository_jdbc_host");
    private static String repository_jdbc_database = properties.getProperty("repository_jdbc_database");
    private static String repository_jdbc_port = properties.getProperty("repository_jdbc_port");
    private static String repository_jdbc_username = properties.getProperty("repository_jdbc_username");
    private static String repository_jdbc_password = properties.getProperty("repository_jdbc_password");
    private static String repository_jdbc_databaseType = properties.getProperty("repository_jdbc_databaseType");
    private static String repository_jdbc_databaseMold = properties.getProperty("repository_jdbc_databaseMold");
    private static String repositoryMeta_id = properties.getProperty("repositoryMeta_id");
    private static String repositoryMeta_name = properties.getProperty("repositoryMeta_name");
    private static String repositoryMeta_description = properties.getProperty("repositoryMeta_description");
    private static String repository_username = properties.getProperty("repository_username");
    private static String repository_password = properties.getProperty("repository_password");

    static {
        JobRunManagerHandler cla = new JobRunManagerHandler();
        InputStream inputStream = cla.getClass().getClassLoader().getResourceAsStream("jobrunconfig.properties");
        properties = new Properties();
        try {
            properties.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public JobStart(JobRunManagerBean jrmbean, JdbcTemplate simpleJdbcTemplate) {
        this.jrmbean = jrmbean;
        this.simpleJdbcTemplate = simpleJdbcTemplate;
    }

    public void run() {
        DbContextHolder.setDefaultDbType(Constant.DATE_SOURCE_KEY.dms.toString());

        doJob();
    }

    public void doJob() {
        try {
            KettleEnvironment.init();

            KettleDatabaseRepository repository = new KettleDatabaseRepository();

            DatabaseMeta dataMeta = new DatabaseMeta(repository_jdbc_connectionName, repository_jdbc_databaseType, repository_jdbc_databaseMold, repository_jdbc_host, repository_jdbc_database, repository_jdbc_port,
                    repository_jdbc_username, repository_jdbc_password);

            KettleDatabaseRepositoryMeta kettleDatabaseMeta = new KettleDatabaseRepositoryMeta(repositoryMeta_name, repositoryMeta_id,
                    repositoryMeta_description, dataMeta);

            repository.init(kettleDatabaseMeta);

            repository.connect(repository_username, repository_password);

            RepositoryDirectoryInterface directory = repository.findDirectory(this.jrmbean.getJobDirectoryDir());

            JobMeta jobMeta = repository.loadJob(this.jrmbean.getJobName(), directory, null, null);

            Job job = new Job(repository, jobMeta);

            job.start();
        } catch (KettleException e) {
            System.err.println("启动kettle作业异常！");
            e.printStackTrace();
        } finally {
            updateJobRunManager(this.jrmbean.getJobId(), "Y");
        }
    }

    public void updateJobRunManager(String jobId, String isExecute) {
        int counts;
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" UPDATE JOBRUNMANAGER XXX SET XXX.ISEXECUTE='" + isExecute + "' WHERE XXX.JOBID='" + jobId + "' ");
            counts = this.simpleJdbcTemplate.update(sql.toString());
        } catch (Exception e) {

            e.printStackTrace();
        } finally {
            System.gc();
        }
    }
}