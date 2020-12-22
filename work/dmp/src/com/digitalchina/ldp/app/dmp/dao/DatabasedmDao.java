package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;

import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;

import com.digitalchina.ldp.dao.BaseDaoSupport;

public interface DatabasedmDao extends BaseDaoSupport {
	List<DatabasedmBean> getDatabasedmList(String sql, int start, int pageSize);

	int getCount(String string);
}
