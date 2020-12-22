package com.digitalchina.ldp.app.osp.service.impl;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.osp.bean.AccessLogBean;
import com.digitalchina.ldp.app.osp.dao.LogDao;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.LogService;
import com.digitalchina.ldp.bean.Model;

@Service
public class LogServiceImpl implements LogService {

	@Autowired 
	private LogDao logDao;
	
	@Override
	public void saveServiceAccessLog(Model model) {
		AccessLogBean alb = new AccessLogBean();
		
		alb.setLogId(UUID.randomUUID().toString());
		alb.setResId(model.getValue(BS_PARAM.BS_SERVICE_ID_STR));
		alb.setUserId(model.getValue(BS_PARAM.BS_USER_ID_STR));
		alb.setResType(BS_PARAM.BS_RESTYPE_SERVICE);
		alb.setAccessTime(new Date());
		
		logDao.saveAccessLog(alb);
	}

}
