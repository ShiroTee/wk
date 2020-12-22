package com.digitalchina.ldp.app.dmp.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.app.dmp.dao.ICleanDataManDao;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class CleanDataManDaoImpl extends BaseDaoSupportImpl implements
		ICleanDataManDao {

	public List<DataConfigBean> getCleanDataConfigBean() {
		return null;
	}

}
