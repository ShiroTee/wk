package com.digitalchina.ldp.app.dms.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.app.dms.dao.JobDoDao;
import com.digitalchina.ldp.app.dms.service.JobDoService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class JobDoServiceImpl implements JobDoService
{

	@Autowired
	private JobDoDao	jobDoDao;

	/**
	 * 获取目录结构
	 */
	public List<RDirectoryBean> getDirectoryList()
	{
		try
		{
			List<RDirectoryBean> list = jobDoDao.getDirectoryList();
			return list;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取目录结构异常", e);
		}
	}

	/**
	 * 方法描述：检查JOB是否含有子JOB
	 */
	public boolean checkIsHaveJob(Map<String, Object> map)
	{
		// 拼接查询条件
		boolean flag = true;
		String paramSql = StringUtils.objToString(getQueryParamSql(map));
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT T.ID_JOB JOBID, R.BATCH_FLAG BATCHFLAG, T.ID_JOBENTRY_TYPE JOBENTRYTYPEID ");
		sql.append(" 	FROM R_JOBENTRY T, LOG_JOB R ");
		sql.append(" WHERE R.JOBNAME = T.NAME ");
		List<String> list = new ArrayList<String>();
		// 构造下钻的动态条件
		if (paramSql != "")
		{
			StringBuffer dynSql = new StringBuffer();
			dynSql = sql;
			sql = new StringBuffer();
			sql.append(" SELECT JOBENTRYTYPEID FROM ( ");
			sql.append(dynSql.toString());
			sql.append(" ) WHERE 1 = 1 ");
			sql.append(paramSql);
			list = jobDoDao.findBySql(sql.toString());
		}

		if (list.size() == 0)
		{
			flag = false;
		}
		else
		{
			JSONArray jsonArray = JSONArray.fromObject(list);
			Object[] o = jsonArray.toArray();
			for (Object obj : o)
			{
				JSONObject json = (JSONObject) obj;
				if (!json.get("JOBENTRYTYPEID").toString().equals("46"))
				{
					flag = false;
				}
			}
		}

		return flag;
	}

	/**
	 * 方法描述：获取JOB数据的列表
	 */
	public SpecilPageList<String> getJobData(int start, int end, Map<String, Object> map)
	{
		// 拼接查询条件
		String name = StringUtils.objToString(map.get("name"));
		String flagText = StringUtils.objToString(map.get("flagText"));
		String directoryId = StringUtils.objToString(map.get("directoryId"));
		String starttime_date = StringUtils.objToString(map.get("starttime_date"));
		String endtime_date = StringUtils.objToString(map.get("endtime_date"));
		StringBuffer qrySql = new StringBuffer();
		if (name != "")
		{
			qrySql.append(" AND TEMP1.JOBNAME like '%" + name + "%' ");
		}
		// 执行成功包括:(状态为非stop和正常执行error=0)
		// 执行失败包括:(状态为stop或正常执行error>0)
		if (flagText != "" && !("全部").equals(flagText))
		{
			if (("0").equals(flagText))
			{

				qrySql.append(" AND (NVL(TEMP1.ERRORS, 0) = 0  and TEMP1.status != 'stop') ");

			}
			else if (("1").equals(flagText))
			{
				qrySql.append(" AND (NVL(TEMP1.ERRORS, 0) > 0  or TEMP1.status = 'stop')  ");
			}
		}
		if (directoryId != "" && !("全部").equals(directoryId))
		{
			qrySql.append(" AND TEMP2.ID_DIRECTORY = '" + directoryId + "' ");
		}
		if (starttime_date != "")
		{
			qrySql.append(" AND TO_CHAR(TEMP1.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
		}
		if (endtime_date != "")
		{
			qrySql.append(" AND TO_CHAR(TEMP1.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
		}

		// 查询的SQL
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT DISTINCT TEMP.ID_JOB JOBID, ");
		sql.append("         TEMP2.ID_DIRECTORY GOVID, ");
		sql.append("         TEMP2.GOVNAME, ");
		sql.append("         TEMP1.BATCH_FLAG BATCHFLAG, ");
		sql.append("         TEMP1.R_ID_JOB RJOBID, ");
		sql.append("         TEMP1.ID_JOB BATCHID, ");
		sql.append("         TEMP1.JOBNAME, ");
		sql.append("         TEMP1.CHANNEL_ID CHANNELID, ");
		sql.append("         TO_CHAR (TEMP1.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') STARTDATE, ");
		sql.append("         TO_CHAR (TEMP1.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') ENDDATE, ");
		sql.append("         TO_CHAR (TEMP1.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
		sql.append("         TO_CHAR (TEMP1.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') REPLAYDATE, ");
		sql.append("         TEMP1.STATUS, ");
		// sql.append("         TEMP1.LOG_FIELD LOGFIELD, ");
		sql.append("         NVL (TEMP1.LINES_READ, 0) LINESREAD, ");
		sql.append("         NVL (TEMP1.LINES_WRITTEN, 0) LINESWRITTEN, ");
		sql.append("         NVL (TEMP1.LINES_UPDATED, 0) LINESUPDATED, ");
		sql.append("         NVL (TEMP1.LINES_INPUT, 0) LINESINPUT, ");
		sql.append("         NVL (TEMP1.LINES_OUTPUT, 0) LINESOUTPUT, ");
		sql.append("         NVL (TEMP1.LINES_REJECTED, 0) LINESREJECTED, ");
		sql.append("         NVL (TEMP1.ERRORS, 0) ERRORS ");
		sql.append("    FROM (SELECT T.ID_JOB, T.ID_DIRECTORY, T.NAME ");
		sql.append("            FROM R_JOB T ");
		sql.append("           WHERE T.ID_DIRECTORY IN (SELECT T.ID_DIRECTORY ");
		sql.append("                                      FROM R_DIRECTORY T ");
		sql.append("                                     WHERE T.ID_DIRECTORY_PARENT = 0) ");
		sql.append("                 AND T.NAME IN ");
		sql.append("                        (SELECT T.NAME ");
		sql.append("                           FROM R_JOBENTRY T ");
		sql.append("                          WHERE T.ID_JOB = ");
		sql.append("                                   (SELECT TT.ID_JOB ");
		sql.append("                                      FROM R_JOB TT ");
		sql.append("                                     WHERE TT.NAME = ");
		sql.append("                                              '各委办局数据交换整体调度流程') ");
		sql.append("                                AND T.ID_JOBENTRY_TYPE = 46)) TEMP, ");
		sql.append("         (SELECT * ");
		sql.append("            FROM LOG_JOB LL) TEMP1, ");
		sql.append("         (SELECT DISTINCT ");
		sql.append("                 T.ID_DIRECTORY, ");
		sql.append("                 T.ID_DIRECTORY_PARENT, ");
		sql.append("                 T.DIRECTORY_NAME AS GOVNAME ");
		sql.append("            FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sql.append("           WHERE T.ID_DIRECTORY_PARENT = 0) TEMP2 ");
		sql.append("   WHERE TEMP.ID_JOB = TEMP1.R_ID_JOB ");
		sql.append("         AND TEMP.ID_DIRECTORY = TEMP2.ID_DIRECTORY ");
		sql.append(qrySql);
		sql.append("ORDER BY TEMP2.GOVNAME, TEMP1.JOBNAME, TO_CHAR (TEMP1.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') DESC ");
		List list = jobDoDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append("SELECT COUNT (DISTINCT TEMP1.ID_JOB) ");
		sqlCount.append("  FROM (SELECT T.ID_JOB, T.ID_DIRECTORY, T.NAME ");
		sqlCount.append("          FROM R_JOB T ");
		sqlCount.append("         WHERE T.ID_DIRECTORY IN (SELECT T.ID_DIRECTORY ");
		sqlCount.append("                                    FROM R_DIRECTORY T ");
		sqlCount.append("                                   WHERE T.ID_DIRECTORY_PARENT = 0) ");
		sqlCount.append("               AND T.NAME IN ");
		sqlCount.append("                      (SELECT T.NAME ");
		sqlCount.append("                         FROM R_JOBENTRY T ");
		sqlCount.append("                        WHERE T.ID_JOB = ");
		sqlCount.append("                                 (SELECT TT.ID_JOB ");
		sqlCount.append("                                    FROM R_JOB TT ");
		sqlCount.append("                                   WHERE TT.NAME = ");
		sqlCount.append("                                            '各委办局数据交换整体调度流程') ");
		sqlCount.append("                              AND T.ID_JOBENTRY_TYPE = 46)) TEMP, ");
		sqlCount.append("       (SELECT * ");
		sqlCount.append("          FROM LOG_JOB LL) TEMP1, ");
		sqlCount.append("       (SELECT DISTINCT ");
		sqlCount.append("               T.ID_DIRECTORY, ");
		sqlCount.append("               T.ID_DIRECTORY_PARENT, ");
		sqlCount.append("               T.DIRECTORY_NAME AS GOVNAME ");
		sqlCount.append("          FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sqlCount.append("         WHERE T.ID_DIRECTORY_PARENT = 0) TEMP2 ");
		sqlCount.append(" WHERE TEMP.ID_JOB = TEMP1.R_ID_JOB ");
		sqlCount.append("       AND TEMP.ID_DIRECTORY = TEMP2.ID_DIRECTORY ");
		sqlCount.append(qrySql);
		int count = jobDoDao.getTotal(sqlCount.toString());

		SpecilPageList<String> pageList = new SpecilPageList<String>();
		pageList.setList(list);
		pageList.setCount(count);

		list = null;
		return pageList;
	}

	/**
	 * 方法描述 ：获取子JOB数据的列表
	 */
	public SpecilPageList<String> getChildJobData(int start, int end, Map<String, Object> map)
	{
		// 拼接查询条件
		String paramSql = StringUtils.objToString(getQueryParamSql(map));
		String name = StringUtils.objToString(map.get("name"));
		String directoryId = StringUtils.objToString(map.get("directoryId"));
		String starttime_date = StringUtils.objToString(map.get("starttime_date"));
		String endtime_date = StringUtils.objToString(map.get("endtime_date"));
		StringBuffer qrySql = new StringBuffer();
		if (name != "")
		{
			qrySql.append(" AND R.JOBNAME like '%" + name + "%' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId))
		{
			qrySql.append(" AND R.ID_DIRECTORY_PARENT = '" + directoryId + "' ");
		}
		if (starttime_date != "")
		{
			qrySql.append(" AND TO_CHAR(R.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
		}
		if (endtime_date != "")
		{
			qrySql.append(" AND TO_CHAR(R.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
		}

		// 查询的SQL
		StringBuffer sql = new StringBuffer();
		sql.append("  SELECT T.ID_JOB JOBID, ");
		sql.append("         R.CHANNEL_ID CHANNELID, ");
		sql.append("         R.JOBNAME, ");
		sql.append("         R.ID_JOB BATCHID, ");
		sql.append("         R.STATUS, ");
		sql.append("         D.ID_DIRECTORY_PARENT GOVID, ");
		sql.append("         D.GOVNAME, ");
		// sql.append("         R.LOG_FIELD LOGFIELD, ");
		sql.append("         NVL (R.LINES_READ, 0) LINESREAD, ");
		sql.append("         NVL (R.LINES_WRITTEN, 0) LINESWRITTEN, ");
		sql.append("         NVL (R.LINES_UPDATED, 0) LINESUPDATED, ");
		sql.append("         NVL (R.LINES_INPUT, 0) LINESINPUT, ");
		sql.append("         NVL (R.LINES_OUTPUT, 0) LINESOUTPUT, ");
		sql.append("         NVL (R.LINES_REJECTED, 0) LINESREJECTED, ");
		sql.append("         NVL (R.ERRORS, 0) ERRORS, ");
		sql.append("         TO_CHAR(R.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') STARTDATE, ");
		sql.append("         TO_CHAR(R.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') ENDDATE, ");
		sql.append("         TO_CHAR(R.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
		sql.append("         TO_CHAR(R.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') REPLAYDATE, ");
		sql.append("         R.R_ID_JOB RJOBID, ");
		sql.append("         R.ETL_FLAG ETLFLAG, ");
		sql.append("         R.BATCH_FLAG BATCHFLAG, ");
		sql.append("         T.ID_JOBENTRY JOBENTRYID, ");
		sql.append("         T.ID_JOBENTRY_TYPE JOBENTRYTYPEID ");
		sql.append("    FROM R_JOBENTRY T, LOG_JOB R, R_JOB B, ");
		sql.append("         (SELECT T2.ID_DIRECTORY, ");
		sql.append("                 T2.ID_DIRECTORY_PARENT, ");
		sql.append("                 T.DIRECTORY_NAME AS GOVNAME, ");
		sql.append("                 T2.DIRECTORY_NAME AS STEPNAME ");
		sql.append("            FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sql.append("           WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) D ");
		sql.append("   WHERE     R.JOBNAME = T.NAME AND T.ID_JOB = B.ID_JOB ");
		sql.append("         AND B.ID_DIRECTORY = D.ID_DIRECTORY_PARENT ");
		sql.append(qrySql);
		sql.append("ORDER BY R.JOBNAME, R.LOGDATE ");

		// 构造下钻的动态条件
		if (paramSql != "")
		{
			StringBuffer dynSql = new StringBuffer();
			dynSql = sql;
			sql = new StringBuffer();
			sql.append(" SELECT DISTINCT * FROM ( ");
			sql.append(dynSql.toString());
			sql.append(" ) WHERE 1 = 1 ");
			sql.append(paramSql);
		}
		List list = jobDoDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append(" SELECT DISTINCT R.ID_JOB, T.ID_JOB JOBID, R.BATCH_FLAG BATCHFLAG ");
		sqlCount.append("  FROM R_JOBENTRY T, LOG_JOB R, ");
		sqlCount.append("         (SELECT T2.ID_DIRECTORY, ");
		sqlCount.append("                 T2.ID_DIRECTORY_PARENT, ");
		sqlCount.append("                 T.DIRECTORY_NAME AS GOVNAME, ");
		sqlCount.append("                 T2.DIRECTORY_NAME AS STEPNAME ");
		sqlCount.append("            FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sqlCount.append("           WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) D ");
		sqlCount.append("   WHERE     R.JOBNAME = T.NAME ");
		sqlCount.append("         AND R.R_ID_JOB = D.ID_DIRECTORY_PARENT ");
		sqlCount.append(qrySql);
		// 构造下钻的动态条件
		if (paramSql != "")
		{
			StringBuffer dynSql = new StringBuffer();
			dynSql = sqlCount;
			sqlCount = new StringBuffer();
			sqlCount.append(" SELECT COUNT (0) FROM ( ");
			sqlCount.append(dynSql.toString());
			sqlCount.append(" ) WHERE 1 = 1 ");
			sqlCount.append(paramSql);
		}
		int count = jobDoDao.getTotal(sqlCount.toString());

		SpecilPageList<String> pageList = new SpecilPageList<String>();
		pageList.setList(list);
		pageList.setCount(count);

		list = null;
		return pageList;
	}

	/**
	 * 方法描述：根据条件参数动态拼接查询条件
	 */
	public String getQueryParamSql(Map<String, Object> map)
	{
		// 拼接查询条件
		StringBuffer qrySql = new StringBuffer();
		// 针对格式为:queryParam = {"text": "value"}
		String queryParam = StringUtils.objToString(map.get("queryParam"));
		if (queryParam != "")
		{
			JSONObject jsonObject = JSONObject.fromObject(queryParam);
			for (Iterator it = jsonObject.keys(); it.hasNext();)
			{
				String fieldName = StringUtils.objToString(it.next());
				if (fieldName != "")
				{
					String fieldValue = StringUtils.objToString(jsonObject.getString(fieldName));
					if (fieldValue != "")
					{
						qrySql.append(" AND " + fieldName + " = '" + fieldValue + "' ");
					}
				}
				else
				{
					throw new ServiceException("查询过程中发现查询的参数有异常");
				}
			}
		}

		return qrySql.toString();
	}

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> queryLogMessage(Map<String, Object> map)
	{
		String batchId = StringUtils.objToString(map.get("batchId"));
		String channelId = StringUtils.objToString(map.get("channelId"));
		String stepType = StringUtils.objToString(map.get("stepType"));
		if (channelId != "" && stepType != "")
		{
			StringBuffer sql = new StringBuffer();
			StringBuffer qrySql = new StringBuffer();
			qrySql.append(" AND CHANNEL_ID = '" + channelId + "' ");
			if (("jobGo").equals(stepType) || ("childJobGo").equals(stepType))
			{
				stepType = "LOG_JOB";
				qrySql.append(" AND ID_JOB = '" + batchId + "' ");
			}
			else
			{
				if (("transGo").equals(stepType))
				{
					stepType = "LOG_TRANS";
				}
				if (("stepGo").equals(stepType))
				{
					stepType = "LOG_TRANS_STEP";
				}
				qrySql.append(" AND ID_BATCH = '" + batchId + "' ");
			}
			sql.append(" SELECT LOG_FIELD LOGFIELD ");
			sql.append("  FROM " + stepType + " ");
			sql.append(" WHERE 1 = 1 ");
			sql.append(qrySql);
			List list = jobDoDao.findBySql(sql.toString());

			return list;
		}
		else
		{
			throw new ServiceException("查询过程中发现查询的参数有异常");
		}
	}

}