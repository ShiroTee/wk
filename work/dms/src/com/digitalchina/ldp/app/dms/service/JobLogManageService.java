package com.digitalchina.ldp.app.dms.service;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.LogManager;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
public interface JobLogManageService 
{
	
	//job日志管理列表
	public PageList<LogManager> find(int pageSize,int limit,Model model);
	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();
	
}
