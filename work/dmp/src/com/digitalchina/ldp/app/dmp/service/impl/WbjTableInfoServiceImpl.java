package com.digitalchina.ldp.app.dmp.service.impl;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.app.dmp.bean.OlapDataReportBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableCountBean;
import com.digitalchina.ldp.app.dmp.dao.IWBJTableInfoDao;
import com.digitalchina.ldp.app.dmp.service.IWbjTableInfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

@Service
public class WbjTableInfoServiceImpl implements IWbjTableInfoService {

	@Autowired
	private IWBJTableInfoDao wBJTableInfoDao;

	public PageList<Map<String, Object>> getTableNameListGroupByBM(int start,
			int pageSize, Model argsMap) {
		String SQLStr1 = "SELECT t.wbjbm,t.wbjjc,COUNT(distinct(t.bm)) tablecount,NVL(SUM(o.addcount),0) addsum FROM DMP_WBJ_TABLE t LEFT JOIN (SELECT * FROM OLAP_WBJ_TABLE_COUNT ol ";
		String SQLStr2 = ") o ON t.wbjbm=o.wbjbm AND t.bm=o.bm GROUP BY t.wbjbm,t.wbjjc ";
		String SQLStr3 = "ORDER BY addsum DESC ";
		// SQL参数组
		Object[] args = { start, pageSize };
		Object[] args2 = new Object[0] ;
		String wbjjc = argsMap.getValue("wbjCode");
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		StringBuffer sql = new StringBuffer();

		sql.append(SQLStr1);
		if (!StringUtils.isBlank(startDate) && !StringUtils.isBlank(endDate)) {
			Date sDate = null;
			Date eDate = null;
			try {
				sDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						startDate).getTime());
				eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						endDate).getTime());
				sql.append("WHERE ol.adddate >=? AND ol.adddate <=? ");
				// 传递分页参数
				args = new Object[4];
				args[0] = sDate;
				args[1] = eDate;
				args[2] = start;
				args[3] = pageSize;
				
//				只传递起止日期
				args2 = new Object[2] ;
				args2[0] = sDate ;
				args2[1] = eDate ;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}else if(!StringUtils.isBlank(startDate) && StringUtils.isBlank(endDate)){
			Date sDate = null;
			try {
				sDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						startDate).getTime());
				sql.append("WHERE ol.adddate >=? ");
				// 传递分页参数
				args = new Object[3];
				args[0] = sDate;
				args[1] = start;
				args[2] = pageSize;

				// 只传递起止日期
				args2 = new Object[1];
				args2[0] = sDate;
				// System.out.println(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(eDate));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}else if(StringUtils.isBlank(startDate) && !StringUtils.isBlank(endDate)){
			Date eDate = null;
			try {
				eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						endDate).getTime());
				sql.append("WHERE ol.adddate <=? ");
				// 传递分页参数
				args = new Object[3];
				args[0] = eDate;
				args[1] = start;
				args[2] = pageSize;

				// 只传递起止日期
				args2 = new Object[1];
				args2[0] = eDate;
				// System.out.println(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(eDate));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		sql.append(SQLStr2);
		if (!StringUtils.isBlank(wbjjc)) {
			sql.append("HAVING t.wbjbm='" + wbjjc + "' ");
		}else{
			sql.append(SQLStr3);
		}
		List<Map<String, Object>> list = null;
		list = wBJTableInfoDao.getTableNameListGroupByBM(sql.toString(), args);
		int count = wBJTableInfoDao.getCount(sql.toString(), args2) ;
		PageList<Map<String, Object>> pageList = new PageList<Map<String, Object>>() ;
		pageList.setCount(count) ;
		pageList.setList(list) ;
		return pageList;
	}

	public List<Map<String, Object>> getOneTableInfoByBM(Model argsMap,
			Object... args) {
		
		List<Map<String, Object>> list = null;
		StringBuffer sql = new StringBuffer();
		String SQLStr1 = "SELECT t.wbjbm,t.wbjjc,t.bhzmc,t.bm,NVL(SUM(t.addcount),0) addsum FROM (SELECT d.wbjbm WBJBM,d.wbjjc WBJJC,d.bhzmc BHZMC,d.bm BM,o.addcount ADDCOUNT,o.adddate ADDDATE FROM DMP_WBJ_TABLE d LEFT JOIN OLAP_WBJ_TABLE_COUNT o ON d.wbjbm=o.wbjbm AND d.bm=o.bm WHERE d.wbjbm=? ";
		String SQLStr2 = ") t GROUP BY t.wbjbm,t.wbjjc,t.bhzmc,t.bm ";
		sql.append(SQLStr1);
		String wbjbm = argsMap.getValue("wbjCode");
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		Object[] objs = {wbjbm};

		if (!(startDate.length() < 10 || endDate.length() < 10)) {
			Date sDate = null;
			Date eDate = null;
			try {
				sDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						startDate).getTime());
				eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						endDate).getTime());
				sql.append("AND o.adddate >=? AND o.adddate <=? ");
				objs = new Object[3];
				objs[0] = wbjbm;
				objs[1] = sDate;
				objs[2] = eDate;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		sql.append(SQLStr2);
		list = wBJTableInfoDao.getOneTableInfoByBM(sql.toString(), objs);
		return list;
	}

//	public List<Map<String, Object>> getOneMonthAddByBM(Model argsMap,
//			Object... args) {
//		
//		List<Map<String, Object>> list = null;
//		StringBuffer sql = new StringBuffer();
//		sql.append("SELECT t.adddate,t.addcount FROM olap_wbj_table_count t WHERE t.wbjbm=? AND t.bm=? ") ;
//		sql.append("AND t.adddate >=? AND t.adddate <=? ORDER BY t.adddate ") ;
//		String wbjbm = argsMap.getValue("wbjCode") ;	//获取委办局别名参数
//		String bm = argsMap.getValue("bm") ;		//获取所要查询的表名
//		//取得系统前一个月，后一天的时间，以便取数据库里最近一个月的记录
//		Calendar calendar = Calendar.getInstance();
//		calendar.add(Calendar.MONTH, -6);    //得到前六个月
//		calendar.add(Calendar.DATE, +1);	 //得到后一天
//		Date monthAgo = new Date(calendar.getTimeInMillis()) ;
//		Date now = new Date(new java.util.Date().getTime()) ;
//		Object[] objs = {wbjbm, bm, monthAgo, now} ;
//		list = wBJTableInfoDao.getOneTableInfoByBM(sql.toString(), objs);
//		return list;
//	}
	
	
	public PageList<WBJTableCountBean> getOneMonthAddByBM(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		String bm = argsMap.getValue("bm");
		String wbjCode = argsMap.getValue("wbjCode");
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("wbjbm", wbjCode);
		map.put("bm", bm);
		return this.wBJTableInfoDao.findForPage(WBJTableCountBean.class, map, start, end,"ADDDATE DESC");
	}
	
	/**
	 * 获取委办局数据列表
	 * @return
	 */
	public List<DmpDmJhmodeBean> getWBJList() {
		List<DmpDmJhmodeBean> list = wBJTableInfoDao.find(DmpDmJhmodeBean.class,"jhmode", "2");
		return list;
	}
}
