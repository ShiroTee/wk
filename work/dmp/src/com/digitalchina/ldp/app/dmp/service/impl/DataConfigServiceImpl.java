package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpColumnRuleData;
import com.digitalchina.ldp.app.dmp.bean.DmpWbjBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.dao.DataConfigDao;
import com.digitalchina.ldp.app.dmp.service.DataConfigService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class DataConfigServiceImpl implements DataConfigService {

	@Autowired
	private DataConfigDao dataConfigDao;
	
	public PageList<DataConfigBean> getDataConfigList(int start, int end, Model argsMap) {
		
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT * FROM DMP_DATACONFIG WHERE 1=1 ");
		String wbjName = argsMap.getValue("wbjCode");
		String tableName = argsMap.getValue("tableNameEn");
		String columnName = argsMap.getValue("columnNameEn");
		if(!StringUtils.isEmptyObj(wbjName)){
			sql.append(" AND DATASOURCEVALUE = '"+wbjName+"'");
		}
		if(!StringUtils.isEmptyObj(tableName)){
			sql.append(" AND TABLENAMEVALUE = '"+tableName+"'");
		}
		if(!StringUtils.isEmptyObj(columnName)){
			sql.append(" AND COLUMNNAMEVALUE = '"+columnName+"'");
		}
		
		sql.append(" ORDER BY DATASOURCE ");
		
		List<DataConfigBean> list = dataConfigDao.getDataConfigList(sql.toString(), start, end);
		PageList<DataConfigBean> pageList = new PageList<DataConfigBean>();
		pageList.setList(list);
		
		StringBuffer countSql = new StringBuffer();
		countSql.append("SELECT COUNT(*) FROM DMP_DATACONFIG WHERE 1=1");
		if(!StringUtils.isEmptyObj(wbjName)){
			countSql.append(" AND DATASOURCEVALUE = '"+wbjName+"'");
		}
		if(!StringUtils.isEmptyObj(tableName)){
			countSql.append(" AND TABLENAMEVALUE = '"+tableName+"'");
		}
		if(!StringUtils.isEmptyObj(columnName)){
			countSql.append(" AND COLUMNNAMEVALUE = '"+columnName+"'");
		}
		int count = dataConfigDao.getCount(countSql.toString());
		pageList.setCount(count);
		return pageList;
	}

	public List<DmWBJBean> getWBJList() {
		List<DmWBJBean> list = dataConfigDao.find(DmWBJBean.class);
		return list;
	}

	public List<WBJTableBean> getTableNameListByWBJBM(WBJTableBean bean) {
		List<WBJTableBean> list = dataConfigDao.find(WBJTableBean.class, "WBJBm", bean.getWBJBm());
		return list;
	}

	public List<WBJTableColumnBean> getTableColumnByTableCode(WBJTableColumnBean columnBean) {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		
		//System.out.println(Constant.DATE_SOURCE_KEY.dmpsip.toString().toUpperCase());
		conditionMap.put("owner", Constant.DATE_SOURCE_KEY.dmp.toString().toUpperCase());
		conditionMap.put("tableName", columnBean.getTableName().toUpperCase());
		List<WBJTableColumnBean> list = dataConfigDao.find(WBJTableColumnBean.class, conditionMap);
		return list;
	}

	public void insert(DataConfigBean bean) {
		this.dataConfigDao.insert(bean);
	}

	public void deleteDataConfig(String ids) {
		//delete from dmp_dataconfig where DATAID in('aa','bb');
		this.dataConfigDao.deleteListById(DataConfigBean.class, "id", ids);
		
	}
	
	public DataConfigBean getDataInfoById(DataConfigBean bean){
		DataConfigBean dataBean = dataConfigDao.find(DataConfigBean.class, "id", bean.getId()).get(0);
		return dataBean;
	}

	public void upateBean(Map<String, Object> map, String id) {
		this.dataConfigDao.update(new DataConfigBean(), map, id);
	}

	public List<DmpColumnRuleData> getColumnRuleList() {
		List<DmpColumnRuleData> list = dataConfigDao.find(DmpColumnRuleData.class);
		return list;
	}

	public List<DataConfigBean> getColumnByTableCode(DataConfigBean configBean) {
		List<DataConfigBean> list = dataConfigDao.find(DataConfigBean.class, "tableNameValue", configBean.getTableNameValue());
		return list;
	}

	public String getColumnRuleNameByRuleID(String columnRuleName) {
 		return dataConfigDao.find(DmpColumnRuleData.class,"ruleId",columnRuleName).get(0).getRuleName();
	}

	public List<DataConfigBean> getDataInfoByBm(String ids) {
		List<DataConfigBean> dataBean = dataConfigDao.find(DataConfigBean.class, "dataRuleCode",ids);
		return dataBean;
	}


}
