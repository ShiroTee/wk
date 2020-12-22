package com.digitalchina.ldp.app.dms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.CleanRuleMonitorDao;
import com.digitalchina.ldp.app.dms.service.CleanRuleMonitorService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class CleanRuleMonitorServiceImpl implements CleanRuleMonitorService
{

	@Autowired
	private CleanRuleMonitorDao	cleanMonitorDao;

	/**
	 * 方法描述：清洗规则数据列表展示
	 */
	public PageList<String> getCleanRuleDataList(int start, int end, Map<String, Object> map)
	{
		try
		{
			// 拼接查询条件
			String rulename = StringUtils.objToString(map.get("rulename"));
			//String directoryId = StringUtils.objToString(map.get("directoryId"));
			String transName = StringUtils.objToString(map.get("transName"));
			String starttime_date = StringUtils.objToString(map.get("starttime_date"));
			String endtime_date = StringUtils.objToString(map.get("endtime_date"));
			StringBuffer qrySql = new StringBuffer();
			if (rulename != "")
			{
				qrySql.append(" AND T.STEPNAME like '%" + rulename + "%' ");
			}
//			if (directoryId != "" && !("全部").equals(directoryId))
//			{
//				qrySql.append(" AND D.ID_DIRECTORY_PARENT = '" + directoryId + "' ");
//			}
			if (transName != "")
			{
				qrySql.append(" AND T.TRANSNAME like '%" + transName + "%' ");
			}
			
			if (starttime_date != "")
			{
				qrySql.append(" AND TO_CHAR(LOG.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
			}
			if (endtime_date != "")
			{
				qrySql.append(" AND TO_CHAR(LOG.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
			}

			// 查询的SQL
			StringBuffer sql = new StringBuffer();
			sql.append("  SELECT T.ID_STEP STEPID, ");
			sql.append("         T.STEPNAME, ");
			sql.append("         T.DESCRIPTION, ");
			sql.append("         T.ID_TRANSFORMATION TRANSFORMATIONID, ");
			sql.append("         T.TRANSNAME, ");
			sql.append("         D.ID_DIRECTORY DIRECTORYID, ");
			sql.append("         D.ID_DIRECTORY_PARENT DIRECTORYPARENTID, ");
			sql.append("         D.PARENTNAME, ");
			sql.append("         D.CHILDNAME, ");
			sql.append("         LOG.ID_BATCH BATCHID, ");
			sql.append("         LOG.CHANNEL_ID CHANNELID, ");
			sql.append("         TO_CHAR(LOG.LOG_DATE, 'YYYY-MM-DD HH24:MI:SS') LOGDATE, ");
			// sql.append("         LOG.LOG_FIELD LOGFIELD, ");
			sql.append("         NVL (LOG.LINES_READ, 0) LINESREAD, ");
			sql.append("         NVL (LOG.LINES_WRITTEN, 0) LINESWRITTEN, ");
			sql.append("         NVL (LOG.LINES_UPDATED, 0) LINESUPDATED, ");
			sql.append("         NVL (LOG.LINES_INPUT, 0) LINESINPUT, ");
			sql.append("         NVL (LOG.LINES_OUTPUT, 0) LINESOUTPUT, ");
			sql.append("         NVL (LOG.LINES_REJECTED, 0) LINESREJECTED, ");
			sql.append("         NVL (LOG.ERRORS, 0) ERRORS ");
			sql.append("    FROM LOG_TRANS_STEP LOG, ");
			sql.append("         (SELECT R.ID_STEP, ");
			sql.append("                 R.NAME AS STEPNAME, ");
			sql.append("                 R.DESCRIPTION, ");
			sql.append("                 R.ID_STEP_TYPE, ");
			sql.append("                 T.ID_TRANSFORMATION, ");
			sql.append("                 T.NAME AS TRANSNAME, ");
			sql.append("                 T.ID_DIRECTORY ");
			sql.append("            FROM R_TRANSFORMATION T, R_STEP R ");
			sql.append("           WHERE T.ID_TRANSFORMATION = R.ID_TRANSFORMATION ");
			sql.append("                 AND R.DESCRIPTION IS NOT NULL) T, ");
			sql.append("         (SELECT T2.ID_DIRECTORY, ");
			sql.append("                 T2.ID_DIRECTORY_PARENT, ");
			sql.append("                 T.DIRECTORY_NAME AS PARENTNAME, ");
			sql.append("                 T2.DIRECTORY_NAME AS CHILDNAME ");
			sql.append("            FROM R_DIRECTORY T, R_DIRECTORY T2 ");
			sql.append("           WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) D ");
			sql.append("   WHERE     T.ID_DIRECTORY = D.ID_DIRECTORY ");
			sql.append("         AND LOG.STEPNAME = T.STEPNAME ");
			sql.append(qrySql);
			sql.append("ORDER BY LOG.LOG_DATE DESC, T.STEPNAME asc, T.TRANSNAME asc ");
			List list = cleanMonitorDao.findByPage(start, end, sql.toString());

			// 计数的SQL
			StringBuilder sqlCount = new StringBuilder();
			sqlCount.append("SELECT COUNT (0) ");
			sqlCount.append("  FROM LOG_TRANS_STEP LOG, ");
			sqlCount.append("       (SELECT R.ID_STEP, ");
			sqlCount.append("               R.NAME AS STEPNAME, ");
			sqlCount.append("               R.DESCRIPTION, ");
			sqlCount.append("               R.ID_STEP_TYPE, ");
			sqlCount.append("               T.ID_TRANSFORMATION, ");
			sqlCount.append("               T.NAME AS TRANSNAME, ");
			sqlCount.append("               T.ID_DIRECTORY ");
			sqlCount.append("          FROM R_TRANSFORMATION T, R_STEP R ");
			sqlCount.append("         WHERE T.ID_TRANSFORMATION = R.ID_TRANSFORMATION ");
			sqlCount.append("               AND R.DESCRIPTION IS NOT NULL) T, ");
			sqlCount.append("       (SELECT T2.ID_DIRECTORY, ");
			sqlCount.append("               T2.ID_DIRECTORY_PARENT, ");
			sqlCount.append("               T.DIRECTORY_NAME AS PARENTNAME, ");
			sqlCount.append("               T2.DIRECTORY_NAME AS CHILDNAME ");
			sqlCount.append("          FROM R_DIRECTORY T, R_DIRECTORY T2 ");
			sqlCount.append("         WHERE T.ID_DIRECTORY = T2.ID_DIRECTORY_PARENT) D ");
			sqlCount.append(" WHERE T.ID_DIRECTORY = D.ID_DIRECTORY AND LOG.STEPNAME = T.STEPNAME ");
			sqlCount.append(qrySql);
			int count = cleanMonitorDao.getTotal(sqlCount.toString());

			PageList<String> pageList = new PageList<String>();
			pageList.setList(list);
			pageList.setCount(count);

			list = null;
			return pageList;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取清洗规则数据的列表异常", e);
		}
	}

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList()
	{
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("directoryParentId", "0");
		List<RDirectoryBean> list = cleanMonitorDao.find(RDirectoryBean.class, argsMap);
		return list;
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
			List list = cleanMonitorDao.findBySql(sql.toString());

			return list;
		}
		else
		{
			throw new ServiceException("查询过程中发现查询的参数有异常");
		}
	}

}
