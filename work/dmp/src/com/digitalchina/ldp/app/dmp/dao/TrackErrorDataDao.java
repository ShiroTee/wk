package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeQualityBean;
import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

public interface TrackErrorDataDao extends BaseDaoSupport{

	Map<String, Object> queryExceptionTableCount(String tableName,String startTime,String endTime);

	List<Map<String, Object>> getExceptionTableInfo(String sql, int start, int pageSize);

	List<DataKnowledgeQualityBean> getDataKnowBeanList(String jsonStr);

	List<DataKnowledgeSolutionBean> getListSoultion(String sql, int start, int end);

	int getSolutionCount(String string);

	List<DataKnowledgeQualityBean> getListDataQuality(String string, int start, int pageSize);

	void updateDataQualityBeanMark(String ids,String value);

	List<Map<String, Object>> getExceptionTableComments(String exceptionTable);

	
	void delDafj(String reslutStr);

}
