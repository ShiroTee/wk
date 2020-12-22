package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.RecordBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;
public interface RecordDao extends BaseDaoSupport {

	List<RecordBean> getRecordList(String sql, int start, int pageSize);

	int getCount(String string);
	
	int queryRecordTableCount(String tableName);
	
	List<Map<String, Object>> getRecordTableInfo(String sql, int start, int pageSize);
}
