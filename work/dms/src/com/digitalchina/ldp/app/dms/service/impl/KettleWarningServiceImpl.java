package com.digitalchina.ldp.app.dms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.dao.KettleWarningDao;
import com.digitalchina.ldp.app.dms.service.KettleWarningService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class KettleWarningServiceImpl implements KettleWarningService
{

	@Autowired
	private KettleWarningDao	kettleWarningDao;

	/**
	 * 方法描述：kettle异常预警列表展示
	 */
	public PageList<String> getWarningDataList(int start, int end, Map<String, Object> map)
	{
		try
		{
			// 拼接查询条件
			String name = StringUtils.objToString(map.get("name"));
			String starttime_date = StringUtils.objToString(map.get("starttime_date"));
			String endtime_date = StringUtils.objToString(map.get("endtime_date"));
			StringBuffer qrySql = new StringBuffer();
			if (name != "")
			{
				qrySql.append(" AND L.JOBNAME like '%" + name + "%' ");
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
			sql.append("  SELECT L.ID_JOB BATCHID, ");
			sql.append("         L.CHANNEL_ID CHANNELID, ");
			sql.append("         L.JOBNAME, ");
			sql.append("         L.STATUS, ");
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
			sql.append("    FROM LOG_JOB L ");
			sql.append("   WHERE 1 = 1 ");
			sql.append("   AND (NVL (L.ERRORS, 0) > 0 ");
			sql.append("   OR L.STATUS = 'stop') ");
			sql.append(qrySql);
			sql.append("ORDER BY L.LOGDATE DESC, L.JOBNAME asc ");
			List list = kettleWarningDao.findByPage(start, end, sql.toString());

			// 计数的SQL
			StringBuilder sqlCount = new StringBuilder();
			sqlCount.append("  SELECT COUNT (0) ");
			sqlCount.append("    FROM LOG_JOB L ");
			sqlCount.append("   WHERE 1 = 1 ");
			sqlCount.append("   AND (NVL (L.ERRORS, 0) > 0 ");
			sqlCount.append("   OR L.STATUS = 'stop') ");
			sqlCount.append(qrySql);
			int count = kettleWarningDao.getTotal(sqlCount.toString());

			PageList<String> pageList = new PageList<String>();
			pageList.setList(list);
			pageList.setCount(count);

			list = null;
			return pageList;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取kettle异常预警的列表异常", e);
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
			sql.append("  FROM LOG_JOB ");
			sql.append(" WHERE 1 = 1 ");
			sql.append(" AND CHANNEL_ID = '" + channelId + "' ");
			sql.append(" AND ID_JOB = '" + batchId + "' ");
			List list = kettleWarningDao.findBySql(sql.toString());

			return list;
		}
		else
		{
			throw new ServiceException("查询过程中发现查询的参数有异常");
		}
	}

}
