package com.digitalchina.ldp.app.dms.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.LogTrans;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface TransDoDao extends BaseDaoSupport

{

	// 分页获取Trans执行情况列表
	public PageList<LogTrans> find(int pageSize, int limit, Map<String, Object> map);
	
	// 查找transformation日志信息
	public String  queryLogMessage(Map<String, Object> map,String id);
	
	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();

}
