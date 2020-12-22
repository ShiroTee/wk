package com.digitalchina.ldp.app.dms.service;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.LogTrans;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
public interface TransDoService 
{
	
	//Trans执行情况列表
	public PageList<LogTrans> find(int pageSize,int limit,Model model);
	

	//查询transformation日志信息
	public String queryLogMessage(Model model);
	
	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();
}
