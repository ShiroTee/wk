package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DmWBJBean;
import com.digitalchina.ldp.app.dmp.bean.DmpWbjBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableBean;
import com.digitalchina.ldp.app.dmp.bean.WBJTableColumnBean;
import com.digitalchina.ldp.app.dmp.dao.DmpWbjDao;
import com.digitalchina.ldp.app.dmp.service.DmpWbjService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class DmpWbjServiceImpl implements DmpWbjService {

	@Autowired
	private DmpWbjDao dmpWbjDao;

	public PageList<DmpWbjBean> getDmpWbjList(int start, int end, Model argsMap) {

		StringBuffer sql = new StringBuffer();
		sql.append("select * from dmp_wbj_table where 1=1 ");
		String wbjjc = argsMap.getValue("wbjCode");
		String bhzmc = argsMap.getValue("tableNameEn");
		if (!StringUtils.isEmptyObj(wbjjc)) {
			sql.append(" and WBJBM = '" + wbjjc + "'");
		}
		if (!StringUtils.isEmptyObj(bhzmc)) {
			sql.append(" and BM = '" + bhzmc + "'");
		}
		List<DmpWbjBean> list = dmpWbjDao.getDmpWbjList(sql.toString(), start,
				end);
		PageList<DmpWbjBean> pageList = new PageList<DmpWbjBean>();
		pageList.setList(list);

		StringBuffer countSql = new StringBuffer();
		countSql.append("select count(*) from dmp_wbj_table where 1=1");
		if (!StringUtils.isEmptyObj(wbjjc)) {
			sql.append(" and WBJBM = '" + wbjjc + "'");
		}
		if (!StringUtils.isEmptyObj(bhzmc)) {
			sql.append(" and BM = '" + bhzmc + "'");
		}
		int count = dmpWbjDao.getCount(countSql.toString());
		pageList.setCount(count);
		return pageList;
	}

	public List<DmWBJBean> getWBJList() {
		List<DmWBJBean> list = dmpWbjDao.find(DmWBJBean.class);
		return list;
	}

	public List<WBJTableBean> getTableNameListByWBJBM(WBJTableBean bean) {
		List<WBJTableBean> list = dmpWbjDao.find(WBJTableBean.class, "WBJBm",
				bean.getWBJBm());
		return list;
	}

	public List<WBJTableColumnBean> getTableColumnByTableCode(
			WBJTableColumnBean columnBean) {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("owner", Constant.DATE_SOURCE_KEY.dmp.toString().toUpperCase());
		conditionMap.put("tableName", columnBean.getTableName().toUpperCase());
		List<WBJTableColumnBean> list = dmpWbjDao.find(
				WBJTableColumnBean.class, conditionMap);
		return list;
	}

	/**
	 * 增加数据
	 */
	public void insert(DmpWbjBean bean) {
		this.dmpWbjDao.insert(bean);
	}

	/**
	 * 删除数据
	 */
	public void deleteDmpWbj(String ids) {
		// delete from dmp_dataconfig where DATAID in('aa','bb');
		this.dmpWbjDao.deleteListById(DmpWbjBean.class, "bm", ids);

	}

	/**
	 * 查询某条数据
	 */
	public DmpWbjBean getDataInfoById(DmpWbjBean bean) {
		DmpWbjBean dataBean = dmpWbjDao.find(DmpWbjBean.class, "wbjbm",
				bean.getWbjbm()).get(0);
		return dataBean;
	}
	
	/**
	 * 查询某条数据
	 */
	public List<DmpWbjBean> getDataInfoByBm(String ids) {
		List<DmpWbjBean> dataBean = dmpWbjDao.find(DmpWbjBean.class, "bm",ids);
		return dataBean;
	}


	/**
	 * 更新数据
	 */
	public void upateBean(Map<String, Object> map, String ids) {
		this.dmpWbjDao.update(new DmpWbjBean(), map, "bm",ids);
	}

}
