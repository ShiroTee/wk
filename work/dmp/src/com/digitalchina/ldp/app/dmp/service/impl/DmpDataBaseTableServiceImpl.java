package com.digitalchina.ldp.app.dmp.service.impl;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.app.dmp.dao.DmpDataBaseTableDao;
import com.digitalchina.ldp.app.dmp.service.DmpDataBaseTableService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class DmpDataBaseTableServiceImpl implements DmpDataBaseTableService{

	@Autowired
	private DmpDataBaseTableDao dmpDataBaseTableDao;

	
	public void deleteDmpDataBaseTable(String ids) {
	this.dmpDataBaseTableDao.deleteListById(DmpDataBaseTableBean.class,"bm", ids);
//		this.dmpDataBaseTableDao.deleteListById(DmpDataBaseTableBean.class, ids, "bm");
		
	}


	public List<DmpDataBaseTableBean> getDBtList() {
	List<DmpDataBaseTableBean>	list=this.dmpDataBaseTableDao.find(DmpDataBaseTableBean.class);
		return list;
	}

	
	public DmpDataBaseTableBean getDataInfoById(DmpDataBaseTableBean bean) {
		DmpDataBaseTableBean databean=this.dmpDataBaseTableDao.find(DmpDataBaseTableBean.class, "sjklx",bean.getSjklx()).get(0);
		return databean;
	}

	
	public PageList<DmpDataBaseTableBean> getDmpDataBaseTableList(int start,
			int end, Model argsMap) {
		StringBuffer sql = new StringBuffer();
		sql.append("select * from DMP_DATABASE_TABLE where 1=1 ");
		String sjklx = argsMap.getValue("sjklx");
		String bhzmc = argsMap.getValue("bm");
		if (!StringUtils.isEmptyObj(sjklx)) {
			sql.append(" and SJKLX = '" + sjklx + "'");
		}
		if (!StringUtils.isEmptyObj(bhzmc)) {
			sql.append(" and BM = '" + bhzmc + "'");
		}
			
		List<DmpDataBaseTableBean> list = dmpDataBaseTableDao.getDmpDataBaseTableList(sql.toString(), start,
				end);
		PageList<DmpDataBaseTableBean> pageList = new PageList<DmpDataBaseTableBean>();
		pageList.setList(list);

		StringBuffer countSql = new StringBuffer();
		countSql.append("select count(*) from DMP_DATABASE_TABLE where 1=1");
		if (!StringUtils.isEmptyObj(sjklx)) {
			sql.append(" and SJKLX = '" + sjklx + "'");
		}
		if (!StringUtils.isEmptyObj(bhzmc)) {
			sql.append(" and BM = '" + bhzmc + "'");
		}
		int count = dmpDataBaseTableDao.getCount(countSql.toString());
		pageList.setCount(count);
		return pageList;
}

	
	public List<DmpDataBaseTableBean> getTableNameListByDBtBM(
			DmpDataBaseTableBean bean) {
		
		List<DmpDataBaseTableBean> list = dmpDataBaseTableDao.find(DmpDataBaseTableBean.class, "sjklx",
				bean.getSjklx());
		return list;
	}

	/**
	 * 添加基础库基本配置
	 */
	public void insert(DmpDataBaseTableBean bean) {
		this.dmpDataBaseTableDao.insert(bean);
		
	}

	/**
	 * 修改基础库基本配置
	 */
	public void upateBean(Map<String, Object> map, String ids) {
		
		this.dmpDataBaseTableDao.update(new DmpDataBaseTableBean(), map, "bm", ids);
	}
	
	public	List<DmpDataBaseTableBean> getWbjbm(String ids){
		return this.dmpDataBaseTableDao.find(DmpDataBaseTableBean.class,"bm",ids);
	}
}
