package com.digitalchina.ldp.app.dms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dms.dao.dataKnowledgeDao;
import com.digitalchina.ldp.app.dms.service.DataKnowledgeService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class DataKnowledgeServiceImpl implements DataKnowledgeService {

	@Autowired
	private dataKnowledgeDao dataKnowledgeDao;

	@Override
	public void delKnowledgeSolutionBean(String ids) {
		this.dataKnowledgeDao.deleteListById(DataKnowledgeSolutionBean.class, "id", ids);
	}

	@Override
	public DataKnowledgeSolutionBean getDataSolutionBean(DataKnowledgeSolutionBean bean) {
		return this.dataKnowledgeDao.find(DataKnowledgeSolutionBean.class, "id", bean.getId()).get(0);
	}

	@Override
	public PageList<DataKnowledgeSolutionBean> getKnowledgeSolutionFileList(Model argsMap) {
		int start = argsMap.getInt("start"), pageSize = argsMap.getInt("limit");
		String title = argsMap.getValue("questionTitle");
		String type = argsMap.getValue("dataSorceFrom");
		String startTime = argsMap.getValue("startTimeSoultion");
		String mark = argsMap.getValue("mark");
		String endTime = argsMap.getValue("endTimeSoultion");
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT * FROM DATA_KNOWLEDGE_SOLUTION WHERE 1=1 ");
		sb.append(" AND MARK = '" + mark + "'");
		StringBuffer countSql = new StringBuffer();
		countSql.append("SELECT COUNT(ID) FROM DATA_KNOWLEDGE_SOLUTION WHERE 1=1 ");
		countSql.append(" AND MARK = '" + mark + "'");
		if(!StringUtils.isEmpty(title)){
			sb.append(" AND TITLE LIKE '%"+title+"%'");
			countSql.append(" AND TITLE LIKE '%"+title+"%'");
		}
		if(!StringUtils.isEmpty(type)&&!"全部".equals(type)){
			sb.append(" AND type = '"+type+"'");
			countSql.append(" AND type = '"+type+"'");
		}
		//System.out.println(startTime);
		//System.out.print(endTime);
		if(!StringUtils.isEmpty(startTime)){
			sb.append(" AND SUBTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
			//sb.append(" AND SUBTIME <= to_date('"+endTime+"', 'yyyy-mm-dd')");
			countSql.append(" AND SUBTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
			//countSql.append(" AND SUBTIME <= to_date('"+endTime+"', 'yyyy-mm-dd')");
		}
		if(!StringUtils.isEmpty(endTime)){
			sb.append(" AND SUBTIME < = to_date('"+endTime+"', 'yyyy-mm-dd')");
			countSql.append(" AND SUBTIME < = to_date('"+endTime+"', 'yyyy-mm-dd')");
		}
		List<DataKnowledgeSolutionBean> list = this.dataKnowledgeDao.getListSoultion(sb.toString(),start,(start+pageSize));
		int count = this.dataKnowledgeDao.getSolutionCount(countSql.toString());
		PageList<DataKnowledgeSolutionBean> pageList = new PageList<DataKnowledgeSolutionBean>();
		pageList.setCount(count);
		pageList.setList(list);
		return pageList;	
	}

	@Override
	public void updateDataQualityBeanMark(String jsonStr, String value) {
		this.dataKnowledgeDao.updateDataQualityBeanMark(jsonStr,value);
	}

	@Override
	public void updateDataSolutionBean(DataKnowledgeSolutionBean dataBean, Map<String, Object> map) {
		this.dataKnowledgeDao.update(new DataKnowledgeSolutionBean(), map, dataBean.getId());
	}

	@Override
	public void saveSolutionBean(DataKnowledgeSolutionBean dataBean) {
		this.dataKnowledgeDao.insert(dataBean);
	}

	public void delDafj(String reslutStr){
		this.dataKnowledgeDao.delDafj(reslutStr);

	}
}
