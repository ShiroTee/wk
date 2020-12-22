package com.digitalchina.ldp.app.dmp.service.impl;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.dao.IWBJTableInfoDao;
import com.digitalchina.ldp.app.dmp.service.ICenterToBaseCompService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

@Service
public class CenterToBaseCompServiceImpl implements ICenterToBaseCompService {

	@Autowired
	private IWBJTableInfoDao wBJTableInfoDao;

	public PageList<Map<String, Object>> getCompareResultInfo(Model argsMap,
			Object... args) {
		String SQLStr1 = "SELECT DM.WBJBM, DM.WBJJC, DM.BM, DM.BHZMC, OL.SUPPLYCOUNT SUPPLY, OL.ACCEPTCOUNT ACCEPT, OL.COMPAREDATE, (OL.SUPPLYCOUNT - OL.ACCEPTCOUNT) DIFF FROM DMP_WBJ_TABLE DM LEFT JOIN OLAP_CENTERTOBASE_COMPARE OL ON DM.WBJBM = OL.WBJBM AND DM.BM = OL.BM WHERE 1=1 ";

		// 取出页面传递过来的参数
		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize") + start;
		String wbjCode = argsMap.getValue("wbjCode") ;
		String tableNameEn = argsMap.getValue("tableNameEn") ;
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");

		StringBuffer sql = new StringBuffer();
		sql.append(SQLStr1);
		// SQL参数组
		List<Object> argsList = new LinkedList<Object>();
		List<Object> countArgsList = new LinkedList<Object>();
		if (!StringUtils.isBlank(wbjCode)) {
			sql.append("AND dm.wbjbm=? ");
			argsList.add(wbjCode) ;
			countArgsList.add(wbjCode);
			if(!StringUtils.isBlank(tableNameEn)){
				sql.append("AND dm.bm=? ") ;
				argsList.add(tableNameEn) ;
				countArgsList.add(tableNameEn);
			}
		}
		Date sDate = null;
		Date eDate = null;
		if (!StringUtils.isBlank(startDate)) {
			
			try {
				sDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						startDate).getTime());
				sql.append("AND ol.comparedate >=?  ");
				argsList.add(sDate);
				countArgsList.add(sDate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
		if ( !StringUtils.isBlank(endDate)) {
			try {
				eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						endDate).getTime());
				sql.append("AND  ol.comparedate <=? ");
				argsList.add(eDate);
				countArgsList.add(eDate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		argsList.add(start);
		argsList.add(pageSize);
		int count = wBJTableInfoDao.getCount(sql.toString(),
				countArgsList.toArray());
		List<Map<String, Object>> list = null;
		list = wBJTableInfoDao.getTableNameListGroupByBM(sql.toString(),
				argsList.toArray());
		PageList<Map<String, Object>> pageList = new PageList<Map<String, Object>>();
		pageList.setCount(count);
		pageList.setList(list);
		return pageList;
	}
}
