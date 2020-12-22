package com.digitalchina.ldp.app.dms.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.SpecilPageList;
import com.digitalchina.ldp.app.dms.dao.LoadMonitorDao;
import com.digitalchina.ldp.app.dms.service.LoadMonitorService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class LoadMonitorServiceImpl implements LoadMonitorService
{

	@Autowired
	private LoadMonitorDao	loadMonitorDao;

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList()
	{
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("directoryParentId", "0");
		List<RDirectoryBean> list = loadMonitorDao.find(RDirectoryBean.class, argsMap);
		return list;
	}

	/**
	 * 方法描述：检查JOB是否含有TRANS
	 */
	public boolean checkIsHaveTrans(Map<String, Object> map)
	{
		// 拼接查询条件
		boolean flag = true;
		String paramSql = StringUtils.objToString(getQueryParamSql(map));
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT T.ID_JOB JOBID, R.BATCH_FLAG BATCHFLAG ");
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
			count = loadMonitorDao.getTotal(sql.toString());
		}
		if (count == 0)
		{
			flag = false;
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
			qrySql.append(" AND R.NAME like '%" + name + "%' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId))
		{
			//qrySql.append(" AND A.ID_DIRECTORY_PARENT = '" + directoryId + "' ");
			qrySql.append(" AND A.parent_id = '" + directoryId + "' ");
		}
		if (starttime_date != "")
		{
			qrySql.append(" AND TO_CHAR(L.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
		}
		if (endtime_date != "")
		{
			qrySql.append(" AND TO_CHAR(L.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
		}

		// 查询的SQL
		StringBuffer sql = new StringBuffer();
		sql.append("  SELECT DISTINCT R.ID_JOB JOBID, ");
		sql.append("         R.ID_DIRECTORY DIRECTORYID, ");
		sql.append("         A.GOVNAME, ");
		sql.append("         R.NAME JOBNAME, ");
		// sql.append("         TO_CHAR (R.DESCRIPTION) DESCRIPTION, ");// CLOB类型字段单独处理
		// sql.append("         TO_CHAR (R.EXTENDED_DESCRIPTION) EXTENDEDDESCRIPTION, ");
		sql.append("         R.JOB_VERSION JOBVERSION, ");
		sql.append("         R.JOB_STATUS JOBSTATUS, ");
		sql.append("         R.ID_DATABASE_LOG DATABASELOGID, ");
		sql.append("         R.TABLE_NAME_LOG TABLENAMELOG, ");
		sql.append("         R.CREATED_USER CREATEDUSER, ");
		sql.append("         TO_CHAR (R.CREATED_DATE, 'YYYY-MM-DD HH24:MI:SS') CREATEDDATE, ");
		sql.append("         R.MODIFIED_USER MODIFIEDUSER, ");
		sql.append("         TO_CHAR (R.MODIFIED_DATE, 'YYYY-MM-DD HH24:MI:SS') MODIFIEDDATE, ");
		sql.append("         R.USE_BATCH_ID USEBATCHID, ");
		sql.append("         R.PASS_BATCH_ID PASSBATCHID, ");
		sql.append("         R.USE_LOGFIELD USELOGFIELD, ");
		sql.append("         R.SHARED_FILE SHAREDFILE, ");
		sql.append("         L.ID_JOB BATCHID, ");
		sql.append("         L.CHANNEL_ID CHANNELID, ");
		sql.append("         L.STATUS, ");
		sql.append("         L.BATCH_FLAG BATCHFLAG, ");
		sql.append("         NVL (L.LINES_READ, 0) LINESREAD, ");
		sql.append("         NVL (L.LINES_WRITTEN, 0) LINESWRITTEN, ");
		sql.append("         NVL (L.LINES_UPDATED, 0) LINESUPDATED, ");
		sql.append("         NVL (L.LINES_INPUT, 0) LINESINPUT, ");
		sql.append("         NVL (L.LINES_OUTPUT, 0) LINESOUTPUT, ");
		sql.append("         NVL (L.LINES_REJECTED, 0) LINESREJECTED, ");
		sql.append("         NVL (L.ERRORS, 0) ERRORS, ");
		sql.append("         TO_CHAR (L.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') STARTDATE, ");
		sql.append("         TO_CHAR (L.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') ENDDATE, ");
		sql.append("         TO_CHAR (L.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
		sql.append("         TO_CHAR (L.DEPDATE, 'YYYY-MM-DD HH24:MI:SS') DEPDATE, ");
		// sql.append("         L.LOG_FIELD LOGFIELD, ");
		sql.append("         TO_CHAR (L.REPLAYDATE, 'YYYY-MM-DD HH24:MI:SS') REPLAYDATE ");
		sql.append("    FROM R_JOB R, LOG_JOB L, (SELECT T2.ID_DIRECTORY, ");
		sql.append("                                     T2.ID_DIRECTORY_PARENT, ");
		sql.append("                                     T.DIRECTORY_NAME AS GOVNAME, ");
		sql.append("                                     T2.DIRECTORY_NAME AS STEPNAME,T.ID_DIRECTORY_PARENT AS parent_id ");
		sql.append("                                FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sql.append("                               WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) A ");
		sql.append("   WHERE     R.NAME(+) = L.JOBNAME ");
		sql.append("         AND R.ID_DIRECTORY = A.ID_DIRECTORY ");
		sql.append("         AND A.STEPNAME = '加载' ");
		sql.append(qrySql);
		sql.append("ORDER BY TO_CHAR (L.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') DESC,R.NAME asc ");
		List list = loadMonitorDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append("  SELECT COUNT (DISTINCT L.ID_JOB) ");
		sqlCount.append("    FROM R_JOB R, LOG_JOB L, (SELECT T2.ID_DIRECTORY, ");
		sqlCount.append("                                     T2.ID_DIRECTORY_PARENT, ");
		sqlCount.append("                                     T.DIRECTORY_NAME AS GOVNAME, ");
		sqlCount.append("                                     T2.DIRECTORY_NAME AS STEPNAME,T.ID_DIRECTORY_PARENT AS parent_id ");
		sqlCount.append("                                FROM R_DIRECTORY T, R_DIRECTORY T2 ");
		sqlCount.append("                               WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) A ");
		sqlCount.append("   WHERE     R.NAME = L.JOBNAME(+) ");
		sqlCount.append("         AND R.ID_DIRECTORY = A.ID_DIRECTORY ");
		sqlCount.append("         AND A.STEPNAME = '加载' ");
		sqlCount.append(qrySql);
		int count = loadMonitorDao.getTotal(sqlCount.toString());

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
			count = loadMonitorDao.getTotal(sql.toString());
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
		sql.append("  SELECT T.ID_JOB JOBID, ");
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
		List list = loadMonitorDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuffer sqlCount = new StringBuffer();
		sqlCount.append(" SELECT DISTINCT R.ID_BATCH BATCHID, T.ID_JOB JOBID, R.BATCH_FLAG BATCHFLAG ");
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
		int count = loadMonitorDao.getTotal(sqlCount.toString());

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
		List list = loadMonitorDao.findByPage(start, end, sql.toString());

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
		int count = loadMonitorDao.getTotal(sqlCount.toString());

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
			List list = loadMonitorDao.findBySql(sql.toString());

			return list;
		}
		else
		{
			throw new ServiceException("查询过程中发现查询的参数有异常");
		}
	}

}
