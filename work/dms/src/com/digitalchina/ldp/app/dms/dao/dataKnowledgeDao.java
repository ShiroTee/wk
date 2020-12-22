package com.digitalchina.ldp.app.dms.dao;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

public interface dataKnowledgeDao extends BaseDaoSupport{

	List<DataKnowledgeSolutionBean> getListSoultion(String string, int start, int pageSize);

	int getSolutionCount(String string);

	void updateDataQualityBeanMark(String jsonStr, String value);
	
	
	public void delDafj(String reslutStr);

}
