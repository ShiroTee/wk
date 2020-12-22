package com.digitalchina.ldp.app.dms.common.util.quarts;

import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Timer;

public class QuartzJob extends BaseDaoSupportImpl {
    public void work2() {
        System.out.println("测试---调度开始...");
    }

    public void work() {
        DbContextHolder.setDefaultDbType(Constant.DATE_SOURCE_KEY.dms.toString());

        List list = getJobRunManagerList();

        for (int i = 0; i < list.size(); i++) {
            JobRunManagerBean jrmbean = (JobRunManagerBean) list.get(i);

            if ("Y".equals(jrmbean.getIsRepeat())) {
                if ("end".equals(jrmbean.getStatus())) {
                    if ("Y".equals(jrmbean.getIsExecute())) {
                        Timer timer = new Timer();

                        int theGapTime = Integer.parseInt(jrmbean.getGapTime());
                        long gapTime = theGapTime * 60 * 1000;

                        if (gapTime == 0L) gapTime = 1000L;

                        timer.schedule(new JobStart(jrmbean, getSimpleJdbcTemplate()), gapTime);

                        updateJobRunManager(jrmbean.getJobId(), "N");
                    }
                }
            }
        }
    }

    public void updateJobRunManager(String jobId, String isExecute) {
        int counts;
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" UPDATE JOBRUNMANAGER XXX SET XXX.ISEXECUTE='" + isExecute + "' WHERE XXX.JOBID='" + jobId + "' ");
            counts = getSimpleJdbcTemplate().update(sql.toString());
        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    public List<JobRunManagerBean> getJobRunManagerList() {
        List apcis = new ArrayList();
        try {
            StringBuffer sql = new StringBuffer();
            sql.append(" WITH TEMP AS                                ");
            sql.append(" (SELECT MAX(LLL.ID_JOB) ID_JOB, X.JOBNAME   ");
            sql.append(" FROM JOBRUNMANAGER X, LOG_JOB LLL           ");
            sql.append(" WHERE 1 = 1                                 ");
            sql.append(" AND X.JOBNAME = LLL.JOBNAME(+)              ");
            sql.append(" GROUP BY X.JOBNAME),                        ");
            sql.append(" TEMP2 AS                                    ");
            sql.append(" (SELECT X.JOBDIRECTORYDIR,                  ");
            sql.append(" X.ISEXECUTE,                                ");
            sql.append(" X.GAPTIME,                                  ");
            sql.append(" X.ISREPEAT,                                 ");
            sql.append(" X.JOBDIRECTORYID,                           ");
            sql.append(" X.JOBNAME,                                  ");
            sql.append(" X.JOBID,                                    ");
            sql.append(" TT.ID_JOB                                   ");
            sql.append(" FROM JOBRUNMANAGER X, TEMP TT               ");
            sql.append(" WHERE X.JOBNAME = TT.JOBNAME)               ");
            sql.append(" SELECT T2.*,                                ");
            sql.append(" CASE                                        ");
            sql.append(" WHEN LLL.STATUS IS NULL THEN                ");
            sql.append(" 'end'                                       ");
            sql.append(" ELSE                                        ");
            sql.append(" LLL.STATUS                                  ");
            sql.append(" END STATUS                                  ");
            sql.append(" FROM TEMP2 T2, LOG_JOB LLL                  ");
            sql.append(" WHERE 1 = 1                                 ");
            sql.append(" AND T2.ID_JOB = LLL.ID_JOB(+)               ");

            List list = getSimpleJdbcTemplate().queryForList(sql.toString());

            if ((list != null) && (list.size() > 0)) {
                for (int i = 0; i < list.size(); i++) {
                    JobRunManagerBean apci = new JobRunManagerBean();
                    apci.setJobDirectoryDir(((Map) list.get(i)).get("JOBDIRECTORYDIR").toString());
                    apci.setIsExecute(((Map) list.get(i)).get("ISEXECUTE").toString());
                    apci.setGapTime(((Map) list.get(i)).get("GAPTIME").toString());
                    apci.setIsRepeat(((Map) list.get(i)).get("ISREPEAT").toString());
                    apci.setJobName(((Map) list.get(i)).get("JOBNAME").toString());
                    apci.setJobId(((Map) list.get(i)).get("JOBID").toString());
                    apci.setStatus(((Map) list.get(i)).get("STATUS").toString());
                    apcis.add(apci);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return apcis;
    }
}