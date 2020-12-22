package com.digitalchina.ldp.app.dms.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
public interface JobExceptionService 
{
	
	//job异常记录情况列表
	public PageList<KettleErrors> find(int pageSize,int limit,Model model);
	//查询job日志信息
	public String queryLogMessage(Model model);
	
	public KettleErrors getKettleErrorsBean(Model argsMap);
	
	public void updateKettleErrorsBean(KettleErrors dataBean, Map<String, Object> dataMap);
	
	public KettleErrors getKettleErrorsBeanInfo(Model argsMap);
	
	public List<KettleErrors> getKnowledegQualityBeanList(Model argsMap);
	
	public void saveSolutionBean(DataKnowledgeSolutionBean bean);
	
	public void updateDataQualityBeanMark(String jsonStr, String string);
	
	public void delKnowledgeSolutionBean(String reslutStr);
	
	public void delErrorDataBean(String reslutStr);
	
	public void delDafj(String reslutStr);
	
	public void delDataSolutionBean(DataKnowledgeSolutionBean bean);
}
