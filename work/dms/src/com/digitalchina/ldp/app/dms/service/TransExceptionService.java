package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface TransExceptionService {

	// Trans异常记录情况列表
	public PageList<KettleErrors> find(int pageSize, int limit, Model model);

	//查询transformation日志信息
	public String queryLogMessage(Model model);
	
	
}
