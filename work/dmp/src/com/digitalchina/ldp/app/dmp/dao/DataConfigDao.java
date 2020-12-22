package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface DataConfigDao extends BaseDaoSupport{

	List<DataConfigBean> getDataConfigList(String sql,int start,int pageSize);

	int getCount(String sql);

	List<DataConfigBean> getErrorDataTableInfo(String string, int start, int end);

}
