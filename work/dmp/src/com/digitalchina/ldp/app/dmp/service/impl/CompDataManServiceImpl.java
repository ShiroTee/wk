package com.digitalchina.ldp.app.dmp.service.impl;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.dao.IWBJTableInfoDao;
import com.digitalchina.ldp.app.dmp.service.ICompDataManService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

@Service
public class CompDataManServiceImpl implements ICompDataManService {

	@Autowired
	private IWBJTableInfoDao wBJTableInfoDao;

	public List<DataConfigBean> getDataRule(Model argsMap, Object... args) {
		String wbjCode = argsMap.getValue("wbjCode") ;
		String tableNameEn = argsMap.getValue("tableCode") ;
		String columnNameEn = argsMap.getValue("columnNameEn") ;
		Map<String, Object> paraMap = new HashMap<String, Object>() ;
		paraMap.put("dataSourceCode", wbjCode) ;
		paraMap.put("tableNameValue", tableNameEn) ;
		paraMap.put("columnNameValue", columnNameEn) ;
		List<DataConfigBean> resultList = new ArrayList<DataConfigBean>() ;
		resultList = wBJTableInfoDao.find(DataConfigBean.class, paraMap) ;
		return resultList;
	}
	
	public PageList<Map<String, Object>> getCompResultInfo(Model argsMap, Object... args1) {
		String SQLStr1 = "SELECT  d.TABLENAMEVALUE,d.TABLENAME, d.COLUMNNAMEVALUE,d.datasourcevalue,d.datasource,ol.datarulecode,d.datarulename,NVL(ol.success,0) success,NVL(ol.failed,0) failed,ol.insertdate FROM olap_comp_count ol INNER JOIN DMP_DATACONFIG d ON ol.datarulecode=d.datarulecode WHERE 1=1 ";
		
		//取出页面传递过来的参数
		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize") + start;
		//委办局别名
		String wbjCode = argsMap.getValue("wbjCode") ;
		//表名
		String tableNameEn = argsMap.getValue("tableNameEn") ;
		//字段名
		String columnNameEn = argsMap.getValue("columnNameEn") ;
		columnNameEn = columnNameEn.replaceAll("全部", "");
		
		//清洗规则
		String DataRuleCode = argsMap.getValue("DataRuleCode") ;
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		
		StringBuffer sql = new StringBuffer();
		sql.append(SQLStr1);
		// SQL参数组
		List<Object> argsList = new LinkedList<Object>() ;
		List<Object> countArgsList = new LinkedList<Object>() ;
//		如果清洗规则存在
		if(!StringUtils.isBlank(DataRuleCode)){
			sql.append("AND ol.datarulecode=? ") ;
			argsList.add(DataRuleCode) ;
			countArgsList.add(DataRuleCode);
//		如果字段存在规则存在
		}else if(!StringUtils.isBlank(columnNameEn)){
			sql.append("AND ol.datarulecode LIKE ? ") ;
			argsList.add("R_" + wbjCode + "_" + tableNameEn + "_" + columnNameEn + "%") ;
			countArgsList.add("R_" + wbjCode + "_" + tableNameEn + "_" + columnNameEn + "%") ;
//		如果表名存在
		}else if(!StringUtils.isBlank(tableNameEn)){
			sql.append("AND ol.datarulecode LIKE ? ") ;
			argsList.add("R_" + wbjCode + "_" + tableNameEn + "%") ;
			countArgsList.add("R_" + wbjCode + "_" + tableNameEn + "%") ;
//		如果委办局存在
		}else if(!StringUtils.isBlank(wbjCode)){
			sql.append("AND ol.datarulecode LIKE ? ") ;
			argsList.add("R_" + wbjCode + "%") ;
			countArgsList.add("R_" + wbjCode + "%") ;
		}
		
//		判断日期是否存在
		Date sDate = null;
		Date eDate = null;
		if (!StringUtils.isBlank(startDate)) {
			
			try {
				sDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						startDate).getTime());
				//eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
					//	endDate).getTime());
				sql.append("AND ol.insertdate >=? ");
				argsList.add(sDate) ;
				//argsList.add(eDate) ;
				countArgsList.add(sDate) ;
				//countArgsList.add(eDate) ;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
		if(!StringUtils.isBlank(endDate)){
			try {
			eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
				endDate).getTime());
				sql.append(" AND ol.insertdate <=? ");
				argsList.add(eDate) ;
				countArgsList.add(eDate) ;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		argsList.add(start) ;
		argsList.add(pageSize) ;
		int count = wBJTableInfoDao.getCount(sql.toString(), countArgsList.toArray()) ;
		List<Map<String, Object>> list = null;
		list = wBJTableInfoDao.getTableNameListGroupByBM(sql.toString(), argsList.toArray()) ;
		PageList<Map<String, Object>> pageList = new PageList<Map<String, Object>>() ;
		pageList.setCount(count) ;
		pageList.setList(list) ;
		return pageList;
	}
	
	public List<Map<String, Object>> getErrorFieldAndName(Model argsMap,
			Object... args) {
		List<Map<String, Object>> respList = new ArrayList<Map<String, Object>>() ;
		String SQLStr1 = "select d.columnname,d.columnnamevalue from DMP_DATACONFIG d WHERE d.datarulecode=? ";
		respList = wBJTableInfoDao.getOneTableInfoByBM(SQLStr1, args) ;
		return respList;
	}

	public PageList<Map<String, Object>> getOneDayFailedInfo(Model argsMap,
			Object... args) {
		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize") + start;
		String DataRuleCode = argsMap.getValue("DataRuleCode") ;
		String insertDate = argsMap.getValue("insertDate") ;
		String TableNameValue=argsMap.getValue("TableNameValue");
		//System.out.println("************************"+TableNameValue);
		String ColumnNameValue=argsMap.getValue("ColumnNameValue");
		//System.out.println("************************"+ColumnNameValue);
		//截取清洗规则代号，拼装需要查询的表。如从C_RKW_RKW_RKJBB_GB011_004中拼装出“EXCEPTION_RKW_RKJBB”
		//String[] DataRuleCodeStr = DataRuleCode.split("_") ;
		String exceptionTable = "EXCP_" + TableNameValue ;
		String SQLStr1 = "SELECT ex.exception_id,d.tablename,d.tablenamevalue,ex." ;
		String SQLStr2 = ",ex.excepition_info,ex.doflag,ex.dotime,ex.intime FROM " ;
		String SQLStr3 = " ex INNER JOIN DMP_DATACONFIG d ON ex.excepition_code=d.datarulecode WHERE ex.doflag='N' AND ex.excepition_code=? AND trunc(ex.intime)＝to_date(?,'yyyy-MM-dd') " ;
		String sql = SQLStr1 + ColumnNameValue.toLowerCase() + SQLStr2 + exceptionTable + SQLStr3 ;
		
		int count = wBJTableInfoDao.getCount(sql, DataRuleCode, insertDate) ;
		List<Map<String, Object>> list = null;
		list = wBJTableInfoDao.getTableNameListGroupByBM(sql, DataRuleCode, insertDate, start, pageSize) ;
//		格式化异常数据列，使其显示为红色
		for(Map<String, Object> map : list){
			if(map.get(ColumnNameValue) != null){
			String errorFieldValue = map.get(ColumnNameValue).toString() ;
				String errorFieldFormat = "<span style=\"color:red;\">" + errorFieldValue + "</span>" ;
				map.put(ColumnNameValue.toLowerCase(), errorFieldFormat) ;
			}
		}
		PageList<Map<String, Object>> pageList = new PageList<Map<String, Object>>() ;
		pageList.setCount(count) ;
		pageList.setList(list) ;
		return pageList;
	}

	public List<Map<String, Object>> getErrorExceptionInfo(Model argsMap, List<WBJTableColumnBean> columnList) {
 		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize") + start;
		String DataRuleCode = argsMap.getValue("DataRuleCode") ;
		String insertDate = argsMap.getValue("insertDate") ;
		String TableNameValue=argsMap.getValue("TableNameValue");
		//System.out.println("************************"+TableNameValue);
		String ColumnNameValue=argsMap.getValue("ColumnNameValue");
		//System.out.println("************************"+ColumnNameValue);
		//截取清洗规则代号，拼装需要查询的表。如从C_RKW_RKW_RKJBB_GB011_004中拼装出“EXCEPTION_RKW_RKJBB”
		//String[] DataRuleCodeStr = DataRuleCode.split("_") ;
		String exceptionTable = "EXCEPTION_" + TableNameValue ;
		String SQLStr1 = "SELECT ex.exception_id,d.tablename,d.tablenamevalue,ex." ;
		String SQLStr2 = " ex.excepition_info, ex.doflag,ex.dotime,ex.intime FROM " ;
		String SQLStr3 = " ex INNER JOIN DMP_DATACONFIG d ON ex.excepition_code=d.datarulecode WHERE ex.doflag='N' AND ex.excepition_code=? AND trunc(ex.intime)＝to_date(?,'yyyy-MM-dd') " ;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < columnList.size(); i++) {
			sb.append(" ex."+columnList.get(i).getColumnName().toLowerCase()+",");
		}
		String sql = SQLStr1 + ColumnNameValue.toLowerCase() + ", " + sb.toString() + SQLStr2 + exceptionTable + SQLStr3 ;
		List<Map<String, Object>> list = wBJTableInfoDao.getTableNameListGroup(sql, DataRuleCode, insertDate) ;
		return list;
	}

	public List<Map<String, Object>> getRightDataInfo(Model argsMap) {
		//String DataRuleCode = argsMap.getValue("DataRuleCode") ;
		String TableNameValue=argsMap.getValue("TableNameValue");
		//System.out.println("************************"+TableNameValue);
		//String ColumnNameValue=argsMap.getValue("ColumnNameValue");
		//System.out.println("************************"+ColumnNameValue);
		//截取清洗规则代号，拼装需要查询的表。如从C_RKW_RKW_RKJBB_GB011_004中拼装出“EXCEPTION_RKW_RKJBB”
		//String[] DataRuleCodeStr = DataRuleCode.split("_") ;
		String table = TableNameValue ;
		String sql = "select * from "+ table + " where "+ " RKBS= '"+argsMap.getValue("dataExceptionId")+"'";
		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize") + start;
		List<Map<String, Object>> list = wBJTableInfoDao.getTableNameListGroupByBM(sql, start, pageSize);
		return list;
	}
}
