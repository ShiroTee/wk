package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeQualityBean;
import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dmp.dao.TrackErrorDataDao;
import com.digitalchina.ldp.app.dmp.service.DataFileService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class DataFileServiceImpl implements DataFileService {

	@Autowired
	private TrackErrorDataDao dataFileDao;
	
	public PageList<DataKnowledgeQualityBean> getUploadDataFileList(Model argsMap) {
		int start = argsMap.getInt("start"), pageSize = argsMap.getInt("limit") + start;
		String title = argsMap.getValue("questionQTitle");
		String dataFrom = argsMap.getValue("dataSourceFrom");
		String rank = argsMap.getValue("dataSorceFrom");
		String startTime = argsMap.getValue("startTimeQuality");
		String endTime = argsMap.getValue("endTimeQuality");
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT * FROM DMP_DATA_KNOWLEDGE_QUALITY WHERE 1=1 ");
		StringBuffer countSql = new StringBuffer();
		countSql.append("SELECT COUNT(ID) FROM DMP_DATA_KNOWLEDGE_QUALITY WHERE 1=1 ");
		if(!StringUtils.isEmpty(title)){
			sb.append(" AND TITLE LIKE '%"+title+"%'");
			countSql.append(" AND TITLE LIKE '%"+title+"%'");
		}
		if(!StringUtils.isEmpty(dataFrom)){
			sb.append(" AND DATAFROM = '"+dataFrom+"'");
			countSql.append(" AND DATAFROM = '"+dataFrom+"'");
		}
		if(!StringUtils.isEmpty(rank)){
			sb.append(" AND RANK = '"+rank+"'");
			countSql.append(" AND RANK = '"+rank+"'");
		}
		if(!StringUtils.isEmpty(startTime)){
			sb.append(" AND SUBTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
			countSql.append(" AND SUBTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
		}
		if(!StringUtils.isEmpty(endTime)){
			sb.append(" AND SUBTIME <= to_date('"+endTime+"', 'yyyy-mm-dd')");
			countSql.append(" AND SUBTIME <= to_date('"+endTime+"', 'yyyy-mm-dd')");
		}
		List<DataKnowledgeQualityBean> list = this.dataFileDao.getListDataQuality(sb.toString(),start,pageSize);
		int count = this.dataFileDao.getSolutionCount(countSql.toString());
		PageList<DataKnowledgeQualityBean> pageList = new PageList<DataKnowledgeQualityBean>();
		pageList.setCount(count);
		pageList.setList(list);
		return pageList;
	}

	public void save(DataKnowledgeQualityBean dataBean) {
		this.dataFileDao.insert(dataBean);
	}

	public void delDataQuality(String ids) {
		this.dataFileDao.deleteListById(DataKnowledgeQualityBean.class, "id", ids);
	}
	
	public void delDafj(String reslutStr){
		this.dataFileDao.delDafj(reslutStr);

	}

	public DataKnowledgeQualityBean getKnowledgeQualityBean(Model argsMap) {
		String id = argsMap.getValue("id");
		DataKnowledgeQualityBean dataBean = this.dataFileDao.find(DataKnowledgeQualityBean.class, id);
		return dataBean;
	}

	/**
	 * 录入解决方案知识库问题
	 */
	public void saveSolutionBean(DataKnowledgeSolutionBean dataBean) {
		this.dataFileDao.insert(dataBean);
	}

	public PageList<DataKnowledgeSolutionBean> getKnowledgeSolutionFileList(Model argsMap) {
		int start = argsMap.getInt("start"), pageSize = argsMap.getInt("limit");
		String title = argsMap.getValue("questionTitle");
		String type = argsMap.getValue("dataSorceFrom");
		String startTime = argsMap.getValue("startTimeSoultion");
		String endTime = argsMap.getValue("endTimeSoultion");
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT * FROM DMP_DATA_KNOWLEDGE_SOLUTION WHERE 1=1 ");
		StringBuffer countSql = new StringBuffer();
		countSql.append("SELECT COUNT(ID) FROM DMP_DATA_KNOWLEDGE_SOLUTION WHERE 1=1 ");
		if(!StringUtils.isEmpty(title)){
			sb.append(" AND TITLE LIKE '%"+title+"%'");
			countSql.append(" AND TITLE LIKE '%"+title+"%'");
		}
		if(!StringUtils.isEmpty(type)){
			sb.append(" AND type = '"+type+"'");
			countSql.append(" AND type = '"+type+"'");
		}
		if(!StringUtils.isEmpty(startTime)){
			sb.append(" AND SUBTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
			countSql.append(" AND SUBTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
		}
		if(!StringUtils.isEmpty(endTime)){
			sb.append(" AND SUBTIME <= to_date('"+endTime+"', 'yyyy-mm-dd')");
			countSql.append(" AND SUBTIME <= to_date('"+endTime+"', 'yyyy-mm-dd')");
		}
		List<DataKnowledgeSolutionBean> list = this.dataFileDao.getListSoultion(sb.toString(),start,start+pageSize);
		int count = this.dataFileDao.getSolutionCount(countSql.toString());
		PageList<DataKnowledgeSolutionBean> pageList = new PageList<DataKnowledgeSolutionBean>();
		pageList.setCount(count);
		pageList.setList(list);
		return pageList;
	}

	public DataKnowledgeSolutionBean getSolutionAccessoryPath(Model argsMap) {
		String id = argsMap.getValue("id");
		return this.dataFileDao.find(DataKnowledgeSolutionBean.class, id);
	}

	public void delKnowledgeSolutionBean(String ids) {
		this.dataFileDao.deleteListById(DataKnowledgeSolutionBean.class, "id", ids);
	}

	public List<DataKnowledgeQualityBean> getKnowledegQualityBeanList(Model argsMap) {
		String jsonStr = argsMap.getValue("jsonStr");
		jsonStr = jsonStr.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
		List<DataKnowledgeQualityBean> list = this.dataFileDao.getDataKnowBeanList(jsonStr);
//		if("1".equals(list.get(0).getMark())){
//			throw new ServiceException("您选中的数据在异常案例解决方案中已存在，不能重复导出！");
//		}
		return list;
	}
	
	public void delDataSolutionBean(DataKnowledgeSolutionBean bean) {
		this.dataFileDao.delete(DataKnowledgeSolutionBean.class, bean.getId());
	}

	public DataKnowledgeSolutionBean getDataSolutionBean(DataKnowledgeSolutionBean bean) {
		return this.dataFileDao.find(DataKnowledgeSolutionBean.class, "id", bean.getId()).get(0);
	}


	public void updateDataQualityBean(DataKnowledgeQualityBean dataBean, Map<String, Object> dataMap) {
		this.dataFileDao.update(new DataKnowledgeQualityBean(), dataMap, dataBean.getId());
	}

	public void updateDataSolutionBean(DataKnowledgeSolutionBean dataBean, Map<String, Object> map) {
		this.dataFileDao.update(new DataKnowledgeSolutionBean(), map, dataBean.getId());
		
	}

	public void updateDataQualityBeanMark(String ids,String value) {
		this.dataFileDao.updateDataQualityBeanMark(ids,value);
	}

}