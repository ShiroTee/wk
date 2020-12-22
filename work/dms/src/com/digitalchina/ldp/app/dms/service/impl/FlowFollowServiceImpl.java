package com.digitalchina.ldp.app.dms.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.app.dms.dao.FlowFollowDao;
import com.digitalchina.ldp.app.dms.service.FlowFollowService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class FlowFollowServiceImpl implements FlowFollowService
{

	@Autowired
	public FlowFollowDao	flowFollowDao;

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList()
	{
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("directoryParentId", "0");
		List<RDirectoryBean> list = flowFollowDao.find(RDirectoryBean.class, argsMap);
		return list;
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
		sql.append(" SELECT T.ID_JOB MAINID, R.BATCH_FLAG BATCHFLAG, T.ID_JOBENTRY_TYPE JOBENTRYTYPEID ");
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
			list = flowFollowDao.findBySql(sql.toString());
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
		String directoryId = StringUtils.objToString(map.get("directoryId"));
		String starttime_date = StringUtils.objToString(map.get("starttime_date"));
		String endtime_date = StringUtils.objToString(map.get("endtime_date"));
		StringBuffer qrySql = new StringBuffer();
		if (name != "")
		{
			qrySql.append(" AND A.JOBNAME like '%" + name + "%' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId))
		{
			qrySql.append(" AND R.ID_DIRECTORY = '" + directoryId + "' ");
		}
		if (starttime_date != "")
		{
			qrySql.append(" AND TO_CHAR(A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
		}
		if (endtime_date != "")
		{
			qrySql.append(" AND TO_CHAR(A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
		}

		// 查询的SQL
		StringBuffer sql = new StringBuffer();
		sql.append("  SELECT DISTINCT B.ID_JOB JOBID, ");
		sql.append("         A.JOBNAME, ");
		sql.append("         R.ID_DIRECTORY GOVID, ");
		sql.append("         R.GOVNAME, ");
		// sql.append("         A.LOG_FIELD LOGFIELD, ");
		sql.append("         A.CHANNEL_ID CHANNELID, ");
		sql.append("         A.ID_JOB AS BATCHID, ");
		sql.append("         A.BATCH_FLAG BATCHFLAG, ");
		sql.append("         TO_CHAR (A.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') STARTDATE, ");
		sql.append("         TO_CHAR (A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') ENDDATE, ");
		sql.append("         TO_CHAR (A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
		sql.append("         TO_CHAR (A.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') REPLAYDATE, ");
		sql.append("         A.STATUS, ");
		sql.append("         NVL (A.LINES_READ, 0) LINESREAD, ");
		sql.append("         NVL (A.LINES_WRITTEN, 0) LINESWRITTEN, ");
		sql.append("         NVL (A.LINES_UPDATED, 0) LINESUPDATED, ");
		sql.append("         NVL (A.LINES_INPUT, 0) LINESINPUT, ");
		sql.append("         NVL (A.LINES_OUTPUT, 0) LINESOUTPUT, ");
		sql.append("         NVL (A.LINES_REJECTED, 0) LINESREJECTED, ");
		sql.append("         NVL (A.ERRORS, 0) ERRORS ");
		sql.append("    FROM LOG_JOB A, ");
		sql.append("         R_JOB B, ");
		sql.append("         (SELECT DISTINCT ");
		sql.append("                 T.ID_DIRECTORY, ");
		sql.append("                 T.ID_DIRECTORY_PARENT, ");
		sql.append("                 T.DIRECTORY_NAME AS GOVNAME ");
		sql.append("            FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sql.append("           WHERE T.ID_DIRECTORY_PARENT = 0) R, ");
		sql.append("         (SELECT R.ID_JOB, ");
		sql.append("                 R.ID_DIRECTORY, ");
		sql.append("                 R.NAME AS PARENT_JOB_NAME, ");
		sql.append("                 RJ.ID_JOB AS PARENT_ID_JOB, ");
		sql.append("                 JOB.ID_JOB AS CHILD_ID_JOB, ");
		sql.append("                 RJ.NAME AS CHILD_JOB_NAME ");
		sql.append("            FROM R_JOBENTRY RJ, ");
		sql.append("                 R_JOB JOB, ");
		sql.append("                 R_DIRECTORY D, ");
		sql.append("                 R_JOB R ");
		sql.append("           WHERE     RJ.NAME = JOB.NAME ");
		sql.append("                 AND JOB.ID_DIRECTORY = D.ID_DIRECTORY ");
		sql.append("                 AND R.ID_JOB = RJ.ID_JOB ");
		sql.append("                 AND R.ID_DIRECTORY = 0 ");
		sql.append("                 AND RJ.ID_JOBENTRY_TYPE = 46) JT ");
		sql.append("   WHERE     B.ID_DIRECTORY = R.ID_DIRECTORY ");
		sql.append("         AND B.ID_JOB = JT.CHILD_ID_JOB ");
		sql.append("         AND A.JOBNAME = B.NAME ");
		sql.append(qrySql);
		sql.append("ORDER BY R.GOVNAME, A.JOBNAME, TO_CHAR (A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') DESC ");
		List list = flowFollowDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append("  SELECT COUNT (DISTINCT A.CHANNEL_ID) ");
		sqlCount.append("    FROM LOG_JOB A, ");
		sqlCount.append("         R_JOB B, ");
		sqlCount.append("         (SELECT DISTINCT ");
		sqlCount.append("                 T.ID_DIRECTORY, ");
		sqlCount.append("                 T.ID_DIRECTORY_PARENT, ");
		sqlCount.append("                 T.DIRECTORY_NAME AS GOVNAME ");
		sqlCount.append("            FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sqlCount.append("           WHERE T.ID_DIRECTORY_PARENT = 0) R, ");
		sqlCount.append("         (SELECT R.ID_JOB, ");
		sqlCount.append("                 R.ID_DIRECTORY, ");
		sqlCount.append("                 R.NAME AS PARENT_JOB_NAME, ");
		sqlCount.append("                 RJ.ID_JOB AS PARENT_ID_JOB, ");
		sqlCount.append("                 JOB.ID_JOB AS CHILD_ID_JOB, ");
		sqlCount.append("                 RJ.NAME AS CHILD_JOB_NAME ");
		sqlCount.append("            FROM R_JOBENTRY RJ, ");
		sqlCount.append("                 R_JOB JOB, ");
		sqlCount.append("                 R_DIRECTORY D, ");
		sqlCount.append("                 R_JOB R ");
		sqlCount.append("           WHERE     RJ.NAME = JOB.NAME ");
		sqlCount.append("                 AND JOB.ID_DIRECTORY = D.ID_DIRECTORY ");
		sqlCount.append("                 AND R.ID_JOB = RJ.ID_JOB ");
		sqlCount.append("                 AND R.ID_DIRECTORY = 0 ");
		sqlCount.append("                 AND RJ.ID_JOBENTRY_TYPE = 46) JT ");
		sqlCount.append("   WHERE     B.ID_DIRECTORY = R.ID_DIRECTORY ");
		sqlCount.append("         AND B.ID_JOB = JT.CHILD_ID_JOB ");
		sqlCount.append("         AND A.JOBNAME = B.NAME ");
		sqlCount.append(qrySql);
		int count = flowFollowDao.getTotal(sqlCount.toString());

		SpecilPageList<String> pageList = new SpecilPageList<String>();
		pageList.setList(list);
		pageList.setCount(count);

		list = null;
		return pageList;
	}

	/**
	 * 方法描述：检查子JOB是否含有TRANS
	 */
	public boolean checkIsHaveTrans(Map<String, Object> map)
	{
		// 拼接查询条件
		boolean flag = true;
		String paramSql = StringUtils.objToString(getQueryParamSql(map));
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT T.ID_JOB VICEID, R.BATCH_FLAG BATCHFLAG ");
		sql.append("  FROM R_JOBENTRY T, LOG_TRANS R ");
		sql.append(" WHERE T.NAME = R.TRANSNAME ");
		Integer count = 0;
		// 构造下钻的动态条件
		if (paramSql != "")
		{
			StringBuffer dynSql = new StringBuffer();
			dynSql = sql;
			sql = new StringBuffer();
			sql.append(" SELECT COUNT(0) FROM ( ");
			sql.append(dynSql.toString());
			sql.append(" ) WHERE 1 = 1 ");
			sql.append(paramSql);
			count = flowFollowDao.getTotal(sql.toString());
		}
		if (count == 0)
		{
			flag = false;
		}
		return flag;
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
			qrySql.append(" AND D.ID_DIRECTORY_PARENT = '" + directoryId + "' ");
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
		sql.append("  SELECT T.ID_JOB MAINID, ");
		sql.append("         R.CHANNEL_ID CHANNELID, ");
		sql.append("         R.JOBNAME, ");
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
		sql.append("         R.ID_JOB BATCHID, ");
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
			sql.append(" ORDER BY STARTDATE, LOGDATE ");
		}
		List list = flowFollowDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append("SELECT DISTINCT R.ID_JOB, R.CHANNEL_ID CHANNELID, T.ID_JOB MAINID, R.BATCH_FLAG BATCHFLAG ");
		sqlCount.append("  FROM R_JOBENTRY T, ");
		sqlCount.append("       LOG_JOB R, ");
		sqlCount.append("       R_JOB B, ");
		sqlCount.append("       (SELECT T2.ID_DIRECTORY, ");
		sqlCount.append("               T2.ID_DIRECTORY_PARENT, ");
		sqlCount.append("               T.DIRECTORY_NAME AS GOVNAME, ");
		sqlCount.append("               T2.DIRECTORY_NAME AS STEPNAME ");
		sqlCount.append("          FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sqlCount.append("         WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) D ");
		sqlCount.append(" WHERE     R.JOBNAME = T.NAME ");
		sqlCount.append("       AND T.ID_JOB = B.ID_JOB ");
		sqlCount.append("       AND B.ID_DIRECTORY = D.ID_DIRECTORY_PARENT ");
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
		int count = flowFollowDao.getTotal(sqlCount.toString());

		SpecilPageList<String> pageList = new SpecilPageList<String>();
		pageList.setList(list);
		pageList.setCount(count);

		list = null;
		return pageList;
	}

	/**
	 * 方法描述：检查子TRANS是否含有STEP
	 */
	public boolean checkIsHaveStep(Map<String, Object> map)
	{
		// 拼接查询条件
		boolean flag = true;
		String paramSql = StringUtils.objToString(getQueryParamSql(map));
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT L.ID_BATCH BATCHID ");
		sql.append("  FROM LOG_TRANS_STEP L ");
		sql.append(" WHERE 1 = 1 ");
		Integer count = 0;
		// 构造下钻的动态条件
		if (paramSql != "")
		{
			StringBuffer dynSql = new StringBuffer();
			dynSql = sql;
			sql = new StringBuffer();
			sql.append(" SELECT COUNT(0) FROM ( ");
			sql.append(dynSql.toString());
			sql.append(" ) WHERE 1 = 1 ");
			sql.append(paramSql);
			count = flowFollowDao.getTotal(sql.toString());
		}
		if (count == 0)
		{
			flag = false;
		}
		return flag;
	}

	/**
	 * 方法描述：获取TRANS数据的列表
	 */
	public SpecilPageList<String> getTransData(int start, int end, Map<String, Object> map)
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
			qrySql.append(" AND R.TRANSNAME like '%" + name + "%' ");
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
		sql.append("  SELECT T.ID_JOB VICEID, ");
		sql.append("         B.NAME JOBNAME, ");
		sql.append("         R.ID_BATCH BATCHID, ");
		sql.append("         R.CHANNEL_ID CHANNELID, ");
		sql.append("         R.STATUS, ");
		sql.append("         R.TRANSNAME, ");
		sql.append("         NVL (R.LINES_READ, 0) LINESREAD, ");
		sql.append("         NVL (R.LINES_WRITTEN, 0) LINESWRITTEN, ");
		sql.append("         NVL (R.LINES_UPDATED, 0) LINESUPDATED, ");
		sql.append("         NVL (R.LINES_INPUT, 0) LINESINPUT, ");
		sql.append("         NVL (R.LINES_OUTPUT, 0) LINESOUTPUT, ");
		sql.append("         NVL (R.LINES_REJECTED, 0) LINESREJECTED, ");
		sql.append("         NVL (R.ERRORS, 0) ERRORS, ");
		sql.append("         TO_CHAR (R.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') STARTDATE, ");
		sql.append("         TO_CHAR (R.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') ENDDATE, ");
		sql.append("         TO_CHAR (R.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
		sql.append("         TO_CHAR (R.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') REPLAYDATE, ");
		sql.append("         R.ETL_FLAG ETLFLAG, ");
		sql.append("         R.BATCH_FLAG BATCHFLAG, ");
		sql.append("         T.ID_JOBENTRY JOBENTRYID, ");
		sql.append("         T.ID_JOBENTRY_TYPE JOBENTRYTYPEID ");
		// sql.append("         R.LOG_FIELD LOGFIELD ");
		sql.append("    FROM R_JOBENTRY T, LOG_TRANS R, R_JOB B ");
		sql.append("   WHERE T.NAME = R.TRANSNAME AND T.ID_JOB = B.ID_JOB  ");
		sql.append(qrySql);
		sql.append("ORDER BY R.TRANSNAME, R.LOGDATE ");
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
		List list = flowFollowDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append(" SELECT DISTINCT R.ID_BATCH, R.CHANNEL_ID CHANNELID, T.ID_JOB VICEID, R.BATCH_FLAG BATCHFLAG ");
		sqlCount.append("  FROM R_JOBENTRY T, LOG_TRANS R, R_JOB B ");
		sqlCount.append(" WHERE T.NAME = R.TRANSNAME AND T.ID_JOB = B.ID_JOB ");
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
		int count = flowFollowDao.getTotal(sqlCount.toString());

		SpecilPageList<String> pageList = new SpecilPageList<String>();
		pageList.setList(list);
		pageList.setCount(count);

		list = null;
		return pageList;
	}

	/**
	 * 方法描述：获取STEP数据的列表
	 */
	public SpecilPageList<String> getStepData(int start, int end, Map<String, Object> map)
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
			qrySql.append(" AND L.STEPNAME like '%" + name + "%' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId))
		{
			qrySql.append(" AND R.ID_DIRECTORY_PARENT = '" + directoryId + "' ");
		}
		if (starttime_date != "")
		{
			qrySql.append(" AND TO_CHAR(L.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
		}
		if (endtime_date != "")
		{
			qrySql.append(" AND TO_CHAR(L.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
		}

		// 查询的SQL
		StringBuffer sql = new StringBuffer();
		sql.append("  SELECT L.ID_BATCH BATCHID, ");
		sql.append("         L.CHANNEL_ID CHANNELID, ");
		sql.append("         TO_CHAR (L.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
		sql.append("         L.TRANSNAME, ");
		sql.append("         L.STEPNAME, ");
		sql.append("         L.STEP_COPY STEPCOPY, ");
		sql.append("         NVL (L.LINES_READ, 0) LINESREAD, ");
		sql.append("         NVL (L.LINES_WRITTEN, 0) LINESWRITTEN, ");
		sql.append("         NVL (L.LINES_UPDATED, 0) LINESUPDATED, ");
		sql.append("         NVL (L.LINES_INPUT, 0) LINESINPUT, ");
		sql.append("         NVL (L.LINES_OUTPUT, 0) LINESOUTPUT, ");
		sql.append("         NVL (L.LINES_REJECTED, 0) LINESREJECTED, ");
		sql.append("         NVL (L.ERRORS, 0) ERRORS ");
		// sql.append("         L.LOG_FIELD LOGFIELD ");
		sql.append("    FROM LOG_TRANS_STEP L ");
		sql.append("   WHERE 1 = 1  ");
		sql.append(qrySql);
		sql.append("ORDER BY L.TRANSNAME, L.STEPNAME, L.LOG_DATE ");
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
		List list = flowFollowDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append(" SELECT DISTINCT L.CHANNEL_ID CHANNELID, L.ID_BATCH BATCHID ");
		sqlCount.append("  FROM LOG_TRANS_STEP L ");
		sqlCount.append(" WHERE 1 = 1 ");
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
		int count = flowFollowDao.getTotal(sqlCount.toString());

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
			List list = flowFollowDao.findBySql(sql.toString());

			return list;
		}
		else
		{
			throw new ServiceException("查询过程中发现查询的参数有异常");
		}
	}

}
