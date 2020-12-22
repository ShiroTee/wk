package com.digitalchina.ldp.app.common.dao;

import java.util.Map;

import com.digitalchina.ldp.app.common.bean.ServiceLogBean;
import com.digitalchina.ldp.bean.PageList;

public interface ServiceLogInfoDao
{
	public PageList<ServiceLogBean> query(int start,int pageSize,Map<String,Object> args);
}
