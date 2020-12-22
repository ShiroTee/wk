package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.app.dms.bean.RepositoryLog;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
public interface RepositoryLogService 
{
	
	//job日志管理列表
	public PageList<RepositoryLog> find(int pageSize,int limit,Model model);
	
}
