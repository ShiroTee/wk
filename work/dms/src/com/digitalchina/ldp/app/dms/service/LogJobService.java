package com.digitalchina.ldp.app.dms.service;

import java.util.Map;

import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface LogJobService 
{
	public PageList<LogJob> getLogJobList(int start,int pageSize,Model model);
	
	public PageList<LogJob> getLogJobList(Map<String, Object> fieldsAndValue,int start,int pageSize);
	
}
