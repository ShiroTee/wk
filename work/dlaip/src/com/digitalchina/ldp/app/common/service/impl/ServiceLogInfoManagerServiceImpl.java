package com.digitalchina.ldp.app.common.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.common.bean.ServiceLogBean;
import com.digitalchina.ldp.app.common.dao.ServiceLogInfoDao;
import com.digitalchina.ldp.app.common.service.ServiceLogInfoManagerService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;
@Service
public class ServiceLogInfoManagerServiceImpl  extends BaseService implements ServiceLogInfoManagerService
{

	@Autowired
	private ServiceLogInfoDao serviceLogInfoDao;
	@Override
	public PageList<ServiceLogBean> query(Map<String, Object> args, int start,
			int pageSize)
	{
		
		return serviceLogInfoDao.query(start, pageSize, args);
	}

}
