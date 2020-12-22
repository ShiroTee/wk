package com.digitalchina.ldp.app.dms.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface JobExceptionDao extends BaseDaoSupport

{

	// 分页获取job异常记录列表
	public PageList<KettleErrors> find(int pageSize, int limit,
			Map<String, Object> map);

	// 查找日志信息
	public String  queryLogMessage(Map<String, Object> map,String id);

	public KettleErrors getKettleErroresById(String sql);

	public List<KettleErrors> getDataKnowBeanList(String jsonStr);

	public void updateDataQualityBeanMark(String jsonStr, String string);

	public void updateErrorBeanIsKnow(String ids);
	
	public void delDafj(String reslutStr);

}
