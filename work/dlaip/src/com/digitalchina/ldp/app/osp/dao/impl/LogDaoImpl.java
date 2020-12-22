package com.digitalchina.ldp.app.osp.dao.impl;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.osp.bean.AccessLogBean;
import com.digitalchina.ldp.app.osp.dao.LogDao;
import com.digitalchina.ldp.dao.BaseDao;

@Component
public class LogDaoImpl extends BaseDao implements LogDao {

	@Override
	public void saveAccessLog(AccessLogBean alb) {
		
		this.createExecuteQuery().insert(alb, false);
	}

}
