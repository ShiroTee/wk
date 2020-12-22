package com.digitalchina.ldp.app.dmp.service.impl;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.app.dmp.dao.IWBJTableInfoDao;
import com.digitalchina.ldp.app.dmp.service.IWbjFileInfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

@Service
public class WbjFileInfoServiceImpl implements IWbjFileInfoService {

	@Autowired
	private IWBJTableInfoDao wBJTableInfoDao;

	public PageList<Map<String, Object>> getFileCountListGroupByBm(int start,
			int pageSize, Model argsMap) {
		String SQLStr1 = "SELECT t.wbjbm,COUNT(o.filename) filecount, NVL(SUM(o.records),0) records, NVL(SUM(o.filesize),0) filesizecount, t.wbjjc FROM dmp_dm_wbj t LEFT JOIN (SELECT * FROM OLAP_WBJ_FILE_COUNT ol ";
		String SQLStr2 = ") o ON t.wbjbm=o.wbjbm where t.jhmode='1' GROUP BY t.wbjbm, t.wbjjc ";
		String SQLStr3 = "ORDER BY filesizecount DESC" ;
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
		} else {
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

	public List<Map<String, Object>> getOneWbjAllFilesByBm(Model argsMap,
			Object... args) {
		
		List<Map<String, Object>> list = null;
		StringBuffer sql = new StringBuffer();
		String SQLStr1 = "SELECT t.wbjbm,t.wbjjc,t.bhzmc,ol.filename,ol.filetype,ol.filedesc,ol.records,ol.filesize,ol.adddate FROM DMP_WBJ_TABLE t LEFT JOIN OLAP_WBJ_FILE_COUNT ol ON t.wbjbm=ol.wbjbm AND t.bm=ol.bm ";
		String SQLStr2 = "WHERE ol.wbjbm=? ";
		sql.append(SQLStr1);
		sql.append(SQLStr2);
		String wbjbm = argsMap.getValue("wbjCode");
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		// SQL参数组
		List<Object> argsList = new LinkedList<Object>() ;
		argsList.add(wbjbm) ;

		if (!(startDate.length() < 10 || endDate.length() < 10)) {
			Date sDate = null;
			Date eDate = null;
			try {
				sDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						startDate).getTime());
				eDate = new Date(new SimpleDateFormat("yyyy-MM-dd").parse(
						endDate).getTime());
				sql.append("AND ol.adddate >=? AND ol.adddate <=? ");
				argsList.add(sDate) ;
				argsList.add(eDate) ;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		list = wBJTableInfoDao.getOneTableInfoByBM(sql.toString(), argsList.toArray());
		return list;
	}

	public List<Map<String, Object>> getOneMonthAddByBm(Model argsMap,
			Object... args) {
		
		List<Map<String, Object>> list = null;
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT t.adddate,t.addcount FROM olap_wbj_table_count t WHERE t.wbjbm=? AND t.bm=? ") ;
		sql.append("AND t.adddate >=? AND t.adddate <=? ORDER BY t.adddate ") ;
		String wbjbm = argsMap.getValue("wbjCode") ;	//获取委办局别名参数
		String bm = argsMap.getValue("bm") ;		//获取所要查询的表名
		//取得系统前一个月，后一天的时间，以便取数据库里最近一个月的记录
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -6);    //得到前六个月
		calendar.add(Calendar.DATE, +1);    //得到后一天
		Date monthAgo = new Date(calendar.getTimeInMillis()) ;
		Date now = new Date(new java.util.Date().getTime()) ;
		Object[] objs = {wbjbm, bm, monthAgo, now} ;
		list = wBJTableInfoDao.getOneTableInfoByBM(sql.toString(), objs);
		return list;
	}
	/**
	 * 获取委办局数据列表
	 * @return
	 */
	public List<DmpDmJhmodeBean> getWBJList() {
		List<DmpDmJhmodeBean> list = wBJTableInfoDao.find(DmpDmJhmodeBean.class,"jhmode", "1");
		return list;
	}
}
