package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;
import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.app.dmp.bean.RecordBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.dao.DmpDataBaseTableDao;
import com.digitalchina.ldp.app.dmp.dao.RecordDao;
import com.digitalchina.ldp.app.dmp.service.RecordService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class RecordServiceImpl implements RecordService {

	@Autowired
	private RecordDao recordDao;
	@Autowired
	private DmpDataBaseTableDao dmpDataBaseTableDao;

	public PageList<RecordBean> getRecordList(int start, int end, Model argsMap) {
		StringBuffer sql = new StringBuffer();
		sql.append("select * from OLAP_RECORD_SUM where 1=1 ");
		String databasetype = argsMap.getValue("sjklx");
		String tablename = argsMap.getValue("bm");
		if (!StringUtils.isEmptyObj(databasetype)) {
			sql.append(" and SJKLX = '" + databasetype + "'");
		}
		if (!StringUtils.isEmptyObj(tablename)) {
			sql.append(" and BM = '" + tablename + "'");
		}
		List<RecordBean> list = recordDao.getRecordList(sql.toString(), start,
				end);
		PageList<RecordBean> pageList = new PageList<RecordBean>();
		pageList.setList(list);

		StringBuffer countSql = new StringBuffer();
		countSql.append("select count(*) from OLAP_RECORD_SUM where 1=1");
		if (!StringUtils.isEmptyObj(databasetype)) {
			sql.append(" and SJKLX = '" + databasetype + "'");
		}
		if (!StringUtils.isEmptyObj(tablename)) {
			sql.append(" and BM = '" + tablename + "'");
		}
		int count = recordDao.getCount(countSql.toString());
		pageList.setCount(count);
		return pageList;
	}

	public List<DatabasedmBean> getRecordList() {
		List<DatabasedmBean> list = recordDao.find(DatabasedmBean.class);
		return list;
	}

	public List<DmpDataBaseTableBean> getTableNameListByJCK(
			DmpDataBaseTableBean bean) {
		List<DmpDataBaseTableBean> list = recordDao.find(
				DmpDataBaseTableBean.class, "sjklx", bean.getSjklx());
		return list;
	}

	public List<WBJTableColumnBean> getTableColumnByTableCode(
			WBJTableColumnBean columnBean) {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("owner", Constant.DATE_SOURCE_KEY.dmp.toString().toUpperCase());
		conditionMap.put("tableName", columnBean.getTableName().toUpperCase());
		List<WBJTableColumnBean> list = recordDao.find(
				WBJTableColumnBean.class, conditionMap);
		return list;
	}

	/**
	 * 查询某条数据
	 */
	public RecordBean getDataInfoById(RecordBean bean) {
		RecordBean dataBean = recordDao.find(RecordBean.class, "sjklx",
				bean.getSjklx()).get(0);
		return dataBean;
	}

	/**
	 * 查询基础数据
	 */
	public PageList<String> getRecordDataList(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");

		// 获取页面传入查询条件的值
		String sjkmc = argsMap.getValue("sjklx");
		String bhzmc = argsMap.getValue("bm");
		String startDate = argsMap.getValue("starttime_date1");
		String endDate = argsMap.getValue("endtime_date1");

		StringBuffer qrySql = new StringBuffer();
		if (!StringUtils.isEmptyObj(sjkmc)) {
			qrySql.append(" AND O.SJKLX = '" + sjkmc + "'");
		}
		if (!StringUtils.isEmptyObj(bhzmc)) {
			qrySql.append(" AND O.TABLENAME = '" + bhzmc + "'");
		}
		if (!StringUtils.isEmptyObj(startDate)) {
			qrySql.append(" AND TO_CHAR(O.STARTDATE, 'YYYY-MM-DD') >= '"
					+ startDate + "'");
		}
		if (!StringUtils.isEmptyObj(endDate)) {
			qrySql.append(" AND TO_CHAR(O.STARTDATE, 'YYYY-MM-DD') <= '"
					+ endDate + "'");
		}

		StringBuffer sql = new StringBuffer();
		sql.append("	SELECT O.SJKLX, ");
		sql.append("	O.DATABASETYPE, ");
		sql.append("	O.TABLENAME, ");
		sql.append("	D.BHZMC,TO_CHAR(O.STARTDATE, 'yyyy-mm-dd') INDATE, ");
		sql.append("	SUM(NVL(O.DATACOUNT, 0)) DATACOUNT, ");
		sql.append("	SUM   (NVL(D.ZDTCOUNT, 0) * (NVL (O.DATACOUNT, 0))) ZDCOUNT ");
		sql.append("	FROM OLAP_RECORD_SUM O  LEFT JOIN  DMP_DATABASE_TABLE D ON O.SJKLX = D.SJKLX AND O.TABLENAME = D.BM ");
		sql.append("	where 1=1 ");
		sql.append(qrySql);
		sql.append(" GROUP BY O.SJKLX, O.DATABASETYPE, O.TABLENAME, D.BHZMC,O.STARTDATE ");
		sql.append(" ORDER BY INDATE desc ");
		List list = dmpDataBaseTableDao.findByPage(start, end, sql.toString());

		// 计数的SQL
		StringBuilder sqlCount = new StringBuilder();
		sqlCount.append("  SELECT COUNT(0) FROM( ");
		sqlCount.append("  SELECT O.SJKLX ");
		sqlCount.append("    FROM OLAP_RECORD_SUM O  LEFT JOIN  DMP_DATABASE_TABLE D ON O.SJKLX = D.SJKLX AND O.TABLENAME = D.BM ");
		sqlCount.append("   WHERE 1 = 1 ");
		sqlCount.append(qrySql);
		sqlCount.append(" GROUP BY O.SJKLX, O.DATABASETYPE, O.TABLENAME ");
		sqlCount.append(" ) ");
		int count = dmpDataBaseTableDao.getTotal(sqlCount.toString());

		//返回查询日期时间段，没有显示“无”
		if (!StringUtils.isEmptyObj(startDate)
				&& !StringUtils.isEmptyObj(endDate)) {
			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = (Map<String, Object>) list.get(i);
				map.put("startDate", startDate);
				map.put("endDate", endDate);
			}
		} else {
			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = (Map<String, Object>) list.get(i);
				map.put("startDate", "无");
				map.put("endDate", "无");
			}
		}
		
		PageList<String> pageList = new PageList<String>();
		pageList.setList(list);
		pageList.setCount(count);
		return pageList;
	}

	public int queryRecordTableCount(String tableName) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	public void insert(RecordBean bean){	
		this.dmpDataBaseTableDao.insert(bean);
	}

}
