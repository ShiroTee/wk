package com.digitalchina.ldp.app.dms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.StepMonitorDao;
import com.digitalchina.ldp.app.dms.service.StepMonitorService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class StepMonitorServiceImpl implements StepMonitorService
{

	@Autowired
	private StepMonitorDao	stepMonitorDao;

	/**
	 * 方法描述：步骤监控数据列表展示
	 */
	public PageList<String> getStepDataList(int start, int end, Map<String, Object> map)
	{
		try
		{
			// 拼接查询条件
			String transName = StringUtils.objToString(map.get("transName"));
			String stepName = StringUtils.objToString(map.get("stepName"));
			String directoryId = StringUtils.objToString(map.get("directoryId"));
			String starttime_date = StringUtils.objToString(map.get("starttime_date"));
			String endtime_date = StringUtils.objToString(map.get("endtime_date"));
			StringBuffer qrySql = new StringBuffer();
//			if (transName != "")
//			{
//				qrySql.append(" AND L.TRANSNAME like '%" + transName + "%' ");
//			}
			if (stepName != "")
			{
				qrySql.append(" AND L.STEPNAME like '%" + stepName + "%' ");
			}
			if (directoryId != "" && !("全部").equals(directoryId)) {
				//qrySql.append(" and L.WBJDIR = '" + directoryId + "' ");
				qrySql.append(" and r.ID_DIRECTORY_PARENT= '" + directoryId + "' ");
			}
			if (starttime_date != "")
			{
				//qrySql.append(" AND TO_CHAR(L.LOGDATE, 'YYYY-MM-DD HH24:MM:SS') >= '" + starttime_date + " 00:00:00' ");
				qrySql.append(" AND L.LOGDATE >= '" + starttime_date + " 00:00:00' ");
			}
			if (endtime_date != "")
			{
				qrySql.append(" AND L.LOGDATE <= '" + endtime_date + " 23:59:59' ");
			}

			// 查询的SQL
			StringBuffer sql = new StringBuffer();
			sql.append(" WITH TEMP AS                                                                 "); 
			sql.append(" (SELECT XX.ID_TRANSFORMATION,                                                "); 
			sql.append(" L.ID_BATCH BATCHID,                                                          "); 
			sql.append(" L.CHANNEL_ID CHANNELID,                                                       ");
			sql.append(" TO_CHAR(L.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE,                        "); 
			sql.append(" L.TRANSNAME,                                                                 "); 
			sql.append(" L.STEPNAME,                                                                   ");
			sql.append(" L.STEP_COPY STEPCOPY,                                                        "); 
			sql.append(" NVL(L.LINES_READ, 0) LINESREAD,                                              "); 
			sql.append(" NVL(L.LINES_WRITTEN, 0) LINESWRITTEN,                                         ");
			sql.append(" NVL(L.LINES_UPDATED, 0) LINESUPDATED,                                        "); 
			sql.append(" NVL(L.LINES_INPUT, 0) LINESINPUT,                                            "); 
			sql.append(" NVL(L.LINES_OUTPUT, 0) LINESOUTPUT,                                           ");
			sql.append(" NVL(L.LINES_REJECTED, 0) LINESREJECTED,                                      "); 
			sql.append(" NVL(L.ERRORS, 0) ERRORS                                                      "); 
			sql.append(" FROM LOG_TRANS_STEP L, R_TRANSFORMATION XX                                    ");
			sql.append(" WHERE 1 = 1                                                                  "); 
			sql.append(" AND L.TRANSNAME = XX.NAME                                                    "); 
			sql.append(" ORDER BY  L.STEPNAME, L.LOG_DATE DESC                                      ");
			sql.append(" ),                                                                           "); 
			sql.append(" TEMP22 AS                                                                   "); 
			sql.append(" (SELECT B.ID_JOB, A.*                                                        ");
			sql.append(" FROM TEMP A, R_JOBENTRY B                                                    "); 
			sql.append(" WHERE 1 = 1                                                                   "); 
			sql.append(" AND A.TRANSNAME = B.NAME)                                                     ");
			sql.append(" ,                                                                             "); 
			sql.append(" temp33 AS (SELECT D.NAME JOBNAME, C.* FROM TEMP22 C, R_JOB D WHERE C.ID_JOB = D.ID_JOB),  "); 
			sql.append(" TEMP2 AS                                                                     "); 
			sql.append(" (SELECT XX.ID_DIRECTORY, TE.*                                                 ");
			sql.append(" FROM R_TRANSFORMATION XX, temp33 TE                                            "); 
			sql.append(" WHERE 1 = 1                                                                  "); 
			sql.append(" AND XX.ID_TRANSFORMATION = TE.ID_TRANSFORMATION)                              ");
			sql.append(" ,                                                                            "); 
			sql.append(" TEMP3 AS                                                                     "); 
			sql.append(" (SELECT R_DIRECTORY.ID_DIRECTORY_PARENT, TEMP2.*                             "); 
			sql.append(" FROM TEMP2, R_DIRECTORY                                                      "); 
			sql.append(" WHERE 1 = 1                                                                   ");
			sql.append(" AND TEMP2.ID_DIRECTORY = R_DIRECTORY.ID_DIRECTORY)                           "); 
			sql.append(" ,                                                                            "); 
			sql.append(" temp4 AS (SELECT RD.DIRECTORY_NAME WBJNAME, RD.ID_DIRECTORY WBJDIR, TEMP3.*   ");
			sql.append(" FROM TEMP3, R_DIRECTORY RD                                                   "); 
			sql.append(" WHERE 1 = 1                                                                  "); 
			sql.append(" AND TEMP3.ID_DIRECTORY = RD.ID_DIRECTORY                                      ");
			sql.append(" AND TEMP3.ID_DIRECTORY_PARENT = 0                                            "); 
			sql.append(" UNION ALL                                                                     ");
			sql.append(" SELECT RD.DIRECTORY_NAME WBJNAME, RD.ID_DIRECTORY WBJDIR, TEMP3.*            "); 
			sql.append(" FROM TEMP3, R_DIRECTORY RD                                                   "); 
			sql.append(" WHERE 1 = 1                                                                   ");
			sql.append(" AND TEMP3.ID_DIRECTORY_PARENT = RD.ID_DIRECTORY                              "); 
			sql.append(" AND TEMP3.ID_DIRECTORY_PARENT <> 0                                           "); 
			sql.append(" )                                                                            "); 
			sql.append(" 		SELECT L.WBJNAME,                "); 
			sql.append("         L.WBJDIR,                       "); 
			sql.append("         L.JOBNAME,                       "); 
			sql.append("         L.BATCHID,                       "); 
			sql.append("         L.CHANNELID,                      ");
			sql.append("         L.LOGDATE,                       "); 
			sql.append("         L.TRANSNAME,                      "); 
			sql.append("         L.STEPNAME,                        ");
			sql.append("         L.STEPCOPY,                       "); 
			sql.append("         L.LINESREAD,                       "); 
			sql.append("         L.LINESWRITTEN,                     ");
			sql.append("         L.LINESUPDATED,                     "); 
			sql.append("         L.LINESINPUT,                       "); 
			sql.append("         L.LINESOUTPUT,                       ");
			sql.append("         L.LINESREJECTED,                     "); 
			sql.append("         L.ERRORS                            "); 
			sql.append(" FROM TEMP4 L LEFT JOIN r_directory r ON l.WBJDIR=r.ID_DIRECTORY    WHERE 1=1  ");
			sql.append(qrySql);
			sql.append(" ORDER BY l.LOGDATE DESC,l.WBJNAME asc,l.JOBNAME asc,l.TRANSNAME asc,L.STEPNAME asc");
			List list = stepMonitorDao.findByPage(start, end, sql.toString());
			
			//List list = stepMonitorDao.findByPage(start, end, sql.append(qrySql).toString());

			// 计数的SQL
//			StringBuilder sqlCount = new StringBuilder();
//			sqlCount.append("  SELECT COUNT (0) ");
//			sqlCount.append("    FROM LOG_TRANS_STEP L ");
//			sqlCount.append("   WHERE 1 = 1 ");
//			sqlCount.append(qrySql);
//			int count = stepMonitorDao.getTotal(sqlCount.toString());
			
			int count = 0;
			if(null!=list)
			{
				if(list.size()>0)
				{
					//count = stepMonitorDao.queryForlist(sql.append(qrySql).toString()).size();
					/*StringBuilder sqlCount=new StringBuilder();
					sqlCount.append("WITH TEMP AS (SELECT XX.ID_TRANSFORMATION,L.TRANSNAME");
					sqlCount.append(" FROM LOG_TRANS_STEP L,R_TRANSFORMATION XX WHERE L.TRANSNAME = XX.NAME),");
					sqlCount.append(" TEMP22 AS (SELECT B.ID_JOB,A.* FROM TEMP A,R_JOBENTRY B");
					sqlCount.append(" WHERE A.TRANSNAME = B.NAME),");
					sqlCount.append(" temp33 AS (SELECT D.NAME JOBNAME,C.* FROM TEMP22 C,R_JOB D WHERE C.ID_JOB = D.ID_JOB),");
					sqlCount.append(" TEMP2 AS (SELECT XX.ID_DIRECTORY,TE.* FROM R_TRANSFORMATION XX,temp33 TE");
					sqlCount.append(" WHERE XX.ID_TRANSFORMATION = TE.ID_TRANSFORMATION),");
					sqlCount.append(" TEMP3 AS (SELECT R_DIRECTORY.ID_DIRECTORY_PARENT,TEMP2.* FROM TEMP2,R_DIRECTORY");
					sqlCount.append(" WHERE TEMP2.ID_DIRECTORY = R_DIRECTORY.ID_DIRECTORY),");
					sqlCount.append(" temp4 AS (SELECT RD.DIRECTORY_NAME WBJNAME,RD.ID_DIRECTORY WBJDIR,TEMP3.*");
					sqlCount.append(" FROM TEMP3,R_DIRECTORY RD WHERE TEMP3.ID_DIRECTORY = RD.ID_DIRECTORY AND TEMP3.ID_DIRECTORY_PARENT = 0");
					sqlCount.append(" UNION ALL SELECT RD.DIRECTORY_NAME WBJNAME,RD.ID_DIRECTORY WBJDIR,TEMP3.*");
					sqlCount.append(" FROM TEMP3,R_DIRECTORY RD WHERE  TEMP3.ID_DIRECTORY_PARENT = RD.ID_DIRECTORY");
					sqlCount.append(" AND TEMP3.ID_DIRECTORY_PARENT <> 0) SELECT count(1) FROM TEMP4 L LEFT JOIN r_directory r ON l.WBJDIR=r.ID_DIRECTORY    WHERE 1=1 ");
					sqlCount.append(qrySql);*/
					//count = stepMonitorDao.queryForlist(sql.toString()).size();
					StringBuilder sum = new StringBuilder();
					sum.append(" select count(0) from ( ");
					sum.append(sql.toString());
					sum.append("  )   ");
					count=stepMonitorDao.getTotal(sum.toString());
				}
			}

			PageList<String> pageList = new PageList<String>();
			pageList.setList(list);
			pageList.setCount(count);

			list = null;
			return pageList;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取步骤监控的列表异常", e);
		}
	}

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> queryLogMessage(Map<String, Object> map)
	{
		String batchId = StringUtils.objToString(map.get("batchId"));
		String channelId = StringUtils.objToString(map.get("channelId"));
		if (channelId != "" && batchId != "")
		{
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT LOG_FIELD LOGFIELD ");
			sql.append("  FROM LOG_TRANS_STEP ");
			sql.append(" WHERE 1 = 1 ");
			sql.append(" AND CHANNEL_ID = '" + channelId + "' ");
			sql.append(" AND ID_BATCH = '" + batchId + "' ");
			List list = stepMonitorDao.findBySql(sql.toString());

			return list;
		}
		else
		{
			throw new ServiceException("查询过程中发现查询的参数有异常");
		}
	}

	
	public List<RDirectoryBean> getDirectoryList(){
		try {
			List<RDirectoryBean> list = stepMonitorDao.getDirectoryList();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job运行列表异常", e);

		}
	}
}
