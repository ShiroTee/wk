package com.digitalchina.ldp.app.dmp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;
import com.digitalchina.ldp.app.dmp.dao.DatabasedmDao;
import com.digitalchina.ldp.app.dmp.service.DatabasedmServce;
@Service
public class DatabasedmServceImpl  implements DatabasedmServce{
@Autowired
	private DatabasedmDao databasedmDao;
	
	public List<DatabasedmBean> getDBtList() {
		List<DatabasedmBean>list=this.databasedmDao.find(DatabasedmBean.class);
		return list;
	}

}
