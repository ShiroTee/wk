package com.digitalchina.ldp.app.dms.dao.impl;

import com.digitalchina.ldp.app.dms.bean.JobRunTimeSetBean;
import com.digitalchina.ldp.app.dms.bean.LogJobBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.JobRunManagerDao;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JobRunManagerDaoImpl extends BaseDaoSupportImpl
        implements JobRunManagerDao {
    private ParameterizedRowMapper<LogJobBean> getMapper() {
        ParameterizedRowMapper mapper = new ParameterizedRowMapper() {
            public LogJobBean mapRow(ResultSet rs, int row) throws SQLException {
                LogJobBean logJob = new LogJobBean();
                logJob.setDir(rs.getString("DIR"));
                logJob.setJobId(rs.getString("JOBID"));
                logJob.setIsRepeat(rs.getString("ISREPEAT"));
                logJob.setIdJob(Integer.valueOf(rs.getInt("ID_JOB")));
                logJob.setJobName(rs.getString("JOBNAME"));
                logJob.setId_directory(rs.getString("ID_DIRECTORY"));
                logJob.setId_root(rs.getString("P_ID_DIRECTORY"));
                logJob.setStartDate(rs.getString("STARTTIME"));
                logJob.setEndDate(rs.getString("ENDTIME"));

                logJob.setStatus(rs.getString("STATUS"));
                logJob.setGovName(rs.getString("GOVNAME"));
                return logJob;
            }
        };
        return mapper;
    }

    public PageList<LogJobBean> find(int pageSize, int limit, Model model) {
        String directoryId = StringUtils.objToString(model.get("directoryId"));
        StringBuilder param = new StringBuilder();
        StringBuilder sb = new StringBuilder();

        if ((directoryId != "") && (!"全部".equals(directoryId))) {
            param.append(" AND TT2.P_ID_DIRECTORY = '" + directoryId + "' ");
        }
        sb.append(" WITH TEMP AS                                                                 ");
        sb.append(" (SELECT RD2.ID_DIRECTORY,                                                    ");
        sb.append(" RD2.DIRECTORY_NAME,                                                          ");
        sb.append(" RD.ID_DIRECTORY    P_ID_DIRECTORY,                                           ");
        sb.append(" RD.DIRECTORY_NAME  GOVNAME                                                   ");
        sb.append(" FROM R_DIRECTORY RD, R_DIRECTORY RD2                                         ");
        sb.append(" WHERE 1 = 1                                                                  ");
        sb.append(" AND RD.ID_DIRECTORY = RD2.ID_DIRECTORY_PARENT                                ");
        sb.append(" AND RD.ID_DIRECTORY_PARENT = 0),                                             ");
        sb.append(" TEMP2 AS                                                                     ");
        sb.append(" (SELECT RJ.ID_JOB,                                                           ");
        sb.append(" RJ.NAME JOBNAME,                                                             ");
        sb.append(" TT.DIRECTORY_NAME,                                              ");
        sb.append(" TT.GOVNAME,                                                     ");
        sb.append(" RJ.ID_DIRECTORY,                                                ");
        sb.append(" TT.P_ID_DIRECTORY,                                              ");
        sb.append(" '/' || TT.GOVNAME || '/' || TT.DIRECTORY_NAME DIR,              ");
        sb.append(" CASE                                                            ");
        sb.append(" WHEN JRM.ISREPEAT IS NULL THEN                                  ");
        sb.append(" 'N'                                                             ");
        sb.append(" ELSE                                                            ");
        sb.append(" JRM.ISREPEAT                                                    ");
        sb.append(" END ISREPEAT                                                    ");
        sb.append(" FROM JOBRUNMANAGER JRM, R_JOB RJ, TEMP TT                       ");
        sb.append(" WHERE 1 = 1                                                     ");
        sb.append(" AND RJ.NAME = JRM.JOBNAME(+)                                    ");
        sb.append(" AND TT.ID_DIRECTORY = RJ.ID_DIRECTORY                           ");
        sb.append(" ORDER BY TT.GOVNAME, RJ.ID_DIRECTORY, TT.DIRECTORY_NAME),       ");
        sb.append(" TEMP3 AS                                                        ");
        sb.append(" (SELECT T2.ID_JOB JOBID, T2.JOBNAME, MAX(LLL.ID_JOB) ID_JOB     ");
        sb.append(" FROM TEMP2 T2, LOG_JOB LLL                                      ");
        sb.append(" WHERE 1 = 1                                                     ");
        sb.append(" AND T2.JOBNAME = LLL.JOBNAME(+)                                 ");
        sb.append(" GROUP BY T2.ID_JOB, T2.JOBNAME)                                 ");
        sb.append(" SELECT TTT3.JOBID,                                              ");
        sb.append(" TTT3.JOBNAME,                                                   ");
        sb.append(" TT2.DIRECTORY_NAME,                                             ");
        sb.append(" TT2.GOVNAME,                                                    ");
        sb.append(" TT2.ID_DIRECTORY,                                               ");
        sb.append(" TT2.P_ID_DIRECTORY,                                             ");
        sb.append(" TT2.DIR,                                                        ");
        sb.append(" TT2.ISREPEAT,                                                   ");
        sb.append(" JJJ.STATUS,                                                     ");
        sb.append(" TO_CHAR(JJJ.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS')    STARTTIME,  ");
        sb.append(" TO_CHAR(JJJ.LOGDATE, 'YYYY-MM-DD HH24:MI:SS')        ENDTIME,   ");
        sb.append(" JJJ.ID_JOB                                                      ");
        sb.append(" FROM LOG_JOB JJJ, TEMP3 TTT3, TEMP2 TT2                         ");
        sb.append(" WHERE 1 = 1                                                     ");
        sb.append(param);
        sb.append(" AND TTT3.ID_JOB = JJJ.ID_JOB(+)                                 ");
        sb.append(" AND TT2.JOBNAME = TTT3.JOBNAME                                  ");
        sb.append(" ORDER BY TT2.GOVNAME, TT2.ID_DIRECTORY, TT2.DIRECTORY_NAME      ");

        String sql = getPage().pageForParams(sb.toString());
        List list = getSimpleJdbcTemplate().query(sql,
                getMapper(), new Object[]{Integer.valueOf(pageSize), Integer.valueOf(pageSize + limit)});

        StringBuilder sum = new StringBuilder();
        sum.append(" select count(0) from ( ");
        sum.append(sb.toString());
        sum.append("  )  ");
        int count = getSimpleJdbcTemplate().queryForInt(sum.toString());
        PageList pageList = new PageList();
        pageList.setList(list);
        pageList.setCount(count);
        return pageList;
    }

    public List<JobRunTimeSetBean> getJobRunTimeSetInfo() {
        List apcis = new ArrayList();
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" SELECT MAX(CASE \t\t\t");
            sql.append(" WHEN T.STEP = '抽取' THEN \t");
            sql.append(" T.VALUE ");
            sql.append(" END) CHOUQUVALUE, \t\t\t");
            sql.append(" MAX(CASE \t\t\t\t\t");
            sql.append(" WHEN T.STEP = '清洗' THEN \t");
            sql.append(" T.VALUE \t\t\t\t\t");
            sql.append(" END) QINGXIVALUE, \t\t\t");
            sql.append(" MAX(CASE \t\t\t\t\t");
            sql.append(" WHEN T.STEP = '转换' THEN \t");
            sql.append(" T.VALUE \t\t\t\t\t");
            sql.append(" END) ZHUANHUANVALUE, \t\t");
            sql.append(" MAX(CASE \t\t\t\t\t");
            sql.append(" WHEN T.STEP = '比对' THEN \t");
            sql.append(" T.VALUE \t\t\t\t\t");
            sql.append(" END) BIDUIVALUE, \t\t\t");
            sql.append(" MAX(CASE \t\t\t\t\t");
            sql.append(" WHEN T.STEP = '加载' THEN \t");
            sql.append(" T.VALUE \t\t\t\t\t");
            sql.append(" END) JIAZAIVALUE \t\t\t");
            sql.append(" FROM JOBRUNRTIMESET T \t\t");

            List list = getSimpleJdbcTemplate().queryForList(sql.toString());

            if ((list != null) && (list.size() > 0)) {
                for (int i = 0; i < list.size(); i++) {
                    JobRunTimeSetBean apci = new JobRunTimeSetBean();
                    apci.setChouquvalue(((Map) list.get(i)).get("CHOUQUVALUE").toString());
                    apci.setQingxivalue(((Map) list.get(i)).get("QINGXIVALUE").toString());
                    apci.setZhuanhuanvalue(((Map) list.get(i)).get("ZHUANHUANVALUE").toString());
                    apci.setBiduivalue(((Map) list.get(i)).get("BIDUIVALUE").toString());
                    apci.setJiazaivalue(((Map) list.get(i)).get("JIAZAIVALUE").toString());
                    apcis.add(apci);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return apcis;
    }

    public List<RDirectoryBean> getDirectoryList() {
        Map argsMap = new HashMap();
        argsMap.put("directoryParentId", "0");
        RDirectoryBean bean = new RDirectoryBean();
        bean.setDirectoryId(null);
        bean.setDirectoryName("全部");
        List list = find(RDirectoryBean.class, argsMap);
        list.add(0, bean);
        return list;
    }

    public int addJobRunTimeSetInfo(String cqid, String qxid, String zhid, String bdid, String jzid) {
        int rtn = 1;
        try {
            String[] sql = new String[5];
            sql[0] = (" UPDATE JOBRUNRTIMESET A SET A.VALUE = " + cqid + " WHERE A.UUID = 1 ");
            sql[1] = (" UPDATE JOBRUNRTIMESET A SET A.VALUE = " + qxid + " WHERE A.UUID = 2 ");
            sql[2] = (" UPDATE JOBRUNRTIMESET A SET A.VALUE = " + zhid + " WHERE A.UUID = 3 ");
            sql[3] = (" UPDATE JOBRUNRTIMESET A SET A.VALUE = " + bdid + " WHERE A.UUID = 4 ");
            sql[4] = (" UPDATE JOBRUNRTIMESET A SET A.VALUE = " + jzid + " WHERE A.UUID = 5 ");

            getSimpleJdbcTemplate().batchUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return rtn;
    }

    public void runLoop(String jobId, String jobName, String idDirectory, String dir, String gapTime) {
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" INSERT INTO JOBRUNMANAGER(JOBID, JOBNAME, JOBDIRECTORYID, JOBDIRECTORYDIR, GAPTIME) VALUES('" + jobId + "','" + jobName + "','" + idDirectory + "','" + dir + "','" + gapTime + "') ");
            getSimpleJdbcTemplate().execute(sql.toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServiceException("启动轮循异常！");
        }
    }

    public void stopLoop(String jobId) {
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" DELETE FROM JOBRUNMANAGER jrm WHERE 1=1 AND jrm.jobid='" + jobId + "' ");
            getSimpleJdbcTemplate().execute(sql.toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServiceException("停止轮循异常！");
        }
    }

    public String getJobRunTime(String dir) {
        String rtn = "1";
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" SELECT X.VALUE GAPTIME, X.STEP FROM JOBRUNRTIMESET X WHERE 1 = 1 AND INSTR('" + dir + "', X.STEP) > 0 ");
            getSimpleJdbcTemplate().queryForList(sql.toString());

            List list = getSimpleJdbcTemplate().queryForList(sql.toString());

            if ((list != null) && (list.size() > 0))
                rtn = ((Map) list.get(0)).get("GAPTIME").toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return rtn;
    }
}