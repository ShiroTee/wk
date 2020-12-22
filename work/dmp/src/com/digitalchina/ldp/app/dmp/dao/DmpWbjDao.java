package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;


import com.digitalchina.ldp.app.dmp.bean.DmpWbjBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;
public interface DmpWbjDao extends BaseDaoSupport {

	List<DmpWbjBean> getDmpWbjList(String sql, int start, int pageSize);

	int getCount(String string);

}
