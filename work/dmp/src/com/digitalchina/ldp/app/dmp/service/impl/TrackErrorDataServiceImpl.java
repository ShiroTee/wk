package com.digitalchina.ldp.app.dmp.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.OlapDataReportBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.vo.ErrorDataBean;
import com.digitalchina.ldp.app.dmp.common.CommonDataUtil;
import com.digitalchina.ldp.app.dmp.dao.DataConfigDao;
import com.digitalchina.ldp.app.dmp.dao.TrackErrorDataDao;
import com.digitalchina.ldp.app.dmp.service.TrackErrorDataService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class TrackErrorDataServiceImpl implements TrackErrorDataService {

	@Autowired
	private TrackErrorDataDao trackErrorDataDao;

	@Autowired
	private DataConfigDao dataConfigDao;

	
	
	/**
	 * 查询异常数据
	 */
	public PageList<ErrorDataBean> getErrorDataList(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		PageList<ErrorDataBean> pageList = new PageList<ErrorDataBean>();
		int count = 0;
		// 获取页面传入查询条件的值
		String wbjName = argsMap.getValue("wbjCode");
		String ruleType = argsMap.getValue("comboRuleName");
		if (!StringUtils.isEmpty(ruleType)) {
			ruleType = CommonDataUtil.getRuleFlag(ruleType);
		}

		String startTime = argsMap.getValue("startTime_date");
		String endTime = argsMap.getValue("endTime_date");

		// 重新组装返回的list
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<ErrorDataBean> list = new ArrayList<ErrorDataBean>();
		Map<String, Object> map = null;
		// 有条件查询
		if (!StringUtils.isEmpty(wbjName) || !StringUtils.isEmpty(ruleType)
				|| !StringUtils.isEmpty(startTime)
				|| !StringUtils.isEmpty(endTime)) {

			String tableName = argsMap.getValue("tableNameEn");
//			StringBuffer sql = new StringBuffer();
//			StringBuffer countSql = new StringBuffer();
//			sql
//					.append("SELECT DISTINCT T.TABLENAME,T.DATASOURCE,T.TABLENAMEVALUE,T.DATASOURCEVALUE FROM DMP_DATACONFIG T WHERE 1=1 ");
//			countSql
//					.append("SELECT COUNT(DISTINCT T.TABLENAME) FROM DMP_DATACONFIG T WHERE 1=1");
//			if (!StringUtils.isEmptyObj(wbjName)) {
//				sql.append(" AND DATASOURCEVALUE = '" + wbjName + "'");
//				countSql.append(" AND DATASOURCEVALUE = '" + wbjName + "'");
//			}
//			if (!StringUtils.isEmptyObj(tableName)) {
//				sql.append(" AND TABLENAMEVALUE = '" + tableName + "'");
//				countSql.append(" AND TABLENAMEVALUE = '" + tableName + "'");
//			}
//			if (!StringUtils.isEmptyObj(ruleType)) {
//				sql.append(" AND DATARULECODE LIKE '" + ruleType + "%'");
//				countSql.append(" AND DATARULECODE LIKE '" + ruleType + "%'");
//			}
			// 获取异常代码规则下的异常表的信息
//			List<DataConfigBean> dataConfigList = dataConfigDao
//					.getErrorDataTableInfo(sql.toString(), start, end);

//			count = dataConfigDao.getCount(countSql.toString());
			Set<String> set = new java.util.HashSet<String>();

			//if (0 == dataConfigList.size() && !StringUtils.isEmptyObj(wbjName)) {
				List<WBJTableBean> wbjList = null;
				if (!StringUtils.isEmptyObj(tableName)) {
					Map<String, Object> contintMap = new HashMap<String, Object>();
					contintMap.put("WBJBm", wbjName);
					contintMap.put("tableNameEn", tableName);
					wbjList = trackErrorDataDao.find(WBJTableBean.class,
							contintMap);
				} else {
					wbjList = trackErrorDataDao.find(WBJTableBean.class,
							"WBJBm", wbjName);
				}
				for (int j = 0; j < wbjList.size(); j++) {
					ErrorDataBean bean = new ErrorDataBean();
					bean.setTableName(wbjList.get(j).getTableNameZh());
					if (StringUtils.isEmpty(startTime)
							&& StringUtils.isEmpty(endTime)) {
						SimpleDateFormat sdfTemp = new SimpleDateFormat(
								"yyyy-MM");
						bean.setStartTime(sdfTemp.format(new Date()) + "-01");
						bean.setEndTime(sdf.format(new Date()));
					} else {
						bean.setStartTime(startTime);
						bean.setEndTime(endTime);
					}
					bean.setWbjName(wbjList.get(j).getWBJJc());
					bean.setTableCode(wbjList.get(j).getExceptionBm());

					map = trackErrorDataDao.queryExceptionTableCount(wbjList
							.get(j).getExceptionBm(), startTime, endTime);
					if (!"0".equals(String.valueOf(map.get("COUNT")))) {
						bean.setErrorCount(String.valueOf(map.get("COUNT")));
						bean.setExceptionCount(String.valueOf(map
								.get("EXCECOUNT")));
						list.add(bean);
					}
				}
			//}

//			for (int i = 0; i < dataConfigList.size(); i++) {
//
//				List<WBJTableBean> wbjList = trackErrorDataDao.find(
//						WBJTableBean.class, "WBJBm", dataConfigList.get(i)
//								.getDataSourceCode());
//				for (int j = 0; j < wbjList.size(); j++) {
//					ErrorDataBean bean = new ErrorDataBean();
//					bean.setTableName(wbjList.get(j).getTableNameZh());
//					if (StringUtils.isEmpty(startTime)
//							&& StringUtils.isEmpty(endTime)) {
//						SimpleDateFormat sdfTemp = new SimpleDateFormat(
//								"yyyy-MM");
//						bean.setStartTime(sdfTemp.format(new Date()) + "-01");
//						bean.setStartTime(sdf.format(new Date()));
//						bean.setEndTime(sdf.format(new Date()));
//					} else {
//						bean.setStartTime(startTime);
//						bean.setEndTime(endTime);
//					}
//					bean.setWbjName(wbjList.get(j).getWBJJc());
//					bean.setTableCode(wbjList.get(j).getExceptionBm());
//
//					map = trackErrorDataDao.queryExceptionTableCount(wbjList
//							.get(j).getTableNameEn(), startTime, endTime);
//					if (!"0".equals(String.valueOf(map.get("COUNT")))) {
//						bean.setErrorCount(String.valueOf(map.get("COUNT")));
//						bean.setExceptionCount(String.valueOf(map
//								.get("EXCECOUNT")));
//						boolean flag = false;
//						if (set.add(bean.getTableCode())) {
//							flag = true;
//						}
//						if (!list.contains(bean) && flag) {
//							list.add(bean);
//						}
//					}
//				}

//			}
		} else {
			// 无条件查询
			List<WBJTableBean> currPageList = trackErrorDataDao
					.find(WBJTableBean.class);
			// 获取委办局表的list
			List<WBJTableBean> wbjTableList = currPageList;

			
			for (int i = 0; i < wbjTableList.size(); i++) {
				String tableName = wbjTableList.get(i).getExceptionBm();
				// String tableName = "RKW_RKJBB";
				
				map = trackErrorDataDao.queryExceptionTableCount(tableName,
						startTime, endTime);

				ErrorDataBean bean = new ErrorDataBean();
				bean.setWbjName(wbjTableList.get(i).getWBJJc());
				bean.setTableName(wbjTableList.get(i).getTableNameZh());
				bean.setTableCode(tableName);
				SimpleDateFormat sdfTemp = new SimpleDateFormat("yyyy-MM");
				bean.setStartTime(sdfTemp.format(new Date()) + "-01");
				bean.setEndTime(sdf.format(new Date()));
				if (!"0".equals(String.valueOf(map.get("COUNT")))) {
					bean.setErrorCount(String.valueOf(map.get("COUNT")));
					bean
							.setExceptionCount(String.valueOf(map
									.get("EXCECOUNT")));
					list.add(bean);
				}

			}
			
			count = list.size();
		}
		
		
		List<ErrorDataBean> returnList = new ArrayList<ErrorDataBean>();
		for (int i = start; i < end+start; i++) {
			if(i<list.size()){
				returnList.add(list.get(i));
			}
		}
		
		pageList.setList(returnList);
		pageList.setCount(count);
		return pageList;
	}
	
	
	
	public List<WBJTableBean> find(Class cla,String fieldName,Object value)
	{
		return trackErrorDataDao.find(WBJTableBean.class,fieldName,value);
	}
	
	
	public List<WBJTableBean> find(Class cla,Map<String,Object> fieldsAndValeMap)
	{
		return trackErrorDataDao.find(WBJTableBean.class,fieldsAndValeMap);
	}
	
	public  List<WBJTableBean> find(Class cla)
	{
		return trackErrorDataDao.find(WBJTableBean.class);
	}
	
	
	public Map<String, Object> queryExceptionTableCount(String tableName,String startTime,String endTime)
	{
		return trackErrorDataDao.queryExceptionTableCount(tableName,startTime, endTime);
	}
	
	
	public List<Map<String, Object>> getExceptionTableInfo(String sql, int start, int pageSize)
	{
		return this.trackErrorDataDao.getExceptionTableInfo(sql.toString(),
				start, pageSize);
	}
	
	

	public List<Map<String, Object>> getExceptionTableInfo(Model argsMap,
			String param) {
		
		//String tableName = "EXCEPTION_" + argsMap.getValue("tableCode");
		String tableName = argsMap.getValue("tableCode");
		StringBuffer sql = new StringBuffer("SELECT * FROM " + tableName+Constant.DBLINK
				+ " WHERE 1=1 AND ID IS NOT NULL AND INTIME IS NOT NULL ");
		String startTime = argsMap.getValue("startTime");
		String endTime = argsMap.getValue("endTime");
		if (!StringUtils.isEmpty(startTime)) {
			sql.append(" AND INTIME >= to_date('" + startTime
					+ "', 'yyyy-mm-dd')");
		}
		if (!StringUtils.isEmpty(endTime)) {
			sql.append(" and intime <= to_date('" + endTime
					+ "', 'yyyy-mm-dd')");
		}
		List<Map<String, Object>> list = null;
		if ("all".equals(param)) {
			// 暂时将导出数据的条数设为10000
			list = this.trackErrorDataDao.getExceptionTableInfo(sql.toString(),
					0, 10000);
		} else {
			int start = argsMap.getInt("start"), pageSize = argsMap
					.getInt("limit");
			list = this.trackErrorDataDao.getExceptionTableInfo(sql.toString(),
					start, pageSize);
		}
		return list;
	}

	public List<DataConfigBean> getDataConfigTableColumn(String tableName,
			int temp) {
		List<DataConfigBean> list = this.trackErrorDataDao.find(
				DataConfigBean.class, "tableNameValue", tableName);
		return list;
	}

	public PageList<OlapDataReportBean> getDataReportList(Model argsMap) {
		String type = argsMap.getValue("type");
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		String date = argsMap.getValue("reportTime");
		String wbjCode = argsMap.getValue("wbjCode");
		Map<String, Object> map = new HashMap<String, Object>();
		if (!StringUtils.isEmpty(date)) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				map.put("reportTime", sdf.parse(date));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if (!StringUtils.isEmpty(wbjCode)) {
			map.put("wbjCode", wbjCode);
		}
		map.put("reportType", type);
		return this.trackErrorDataDao.findForPage(OlapDataReportBean.class,
				map, start, end);
	}

	public List<OlapDataReportBean> getDataReportBeanList(Model argsMap) {
		String type = argsMap.getValue("type");
		String date = argsMap.getValue("queryTime");
		String wbjCode = argsMap.getValue("queryWbjName");
		Map<String, Object> map = new HashMap<String, Object>();
		if (!StringUtils.isEmpty(date)) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				map.put("reportTime", sdf.parse(date));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if (!StringUtils.isEmpty(wbjCode)) {
			map.put("wbjCode", wbjCode);
		}
		map.put("reportType", type);
		return this.trackErrorDataDao.find(OlapDataReportBean.class, map);
	}

	public List<Map<String, Object>> getExceptionTableColumnComments(
			String exceptionTable) {
		List<Map<String, Object>> list = this.trackErrorDataDao
				.getExceptionTableComments(exceptionTable);
		return list;
	}
}
