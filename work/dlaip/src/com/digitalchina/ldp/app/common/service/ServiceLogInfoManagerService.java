package com.digitalchina.ldp.app.common.service;

import java.util.Map;

import com.digitalchina.ldp.app.common.bean.ServiceLogBean;
import com.digitalchina.ldp.bean.PageList;

public interface ServiceLogInfoManagerService
{
	public PageList<ServiceLogBean> query(Map<String,Object> args,int start,int pageSize);
}
