package com.digitalchina.ldp.app.dms.dao;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface TransExceptionDao extends BaseDaoSupport

{

	// 分页获取transformation异常记录情况列表
	public PageList<KettleErrors> find(int pageSize, int limit, Map<String, Object> map);

	
	// 查找transformation日志信息
	public String  queryLogMessage(Map<String, Object> map,String id);
}
