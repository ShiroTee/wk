package com.digitalchina.ldp.app.common.dao;

import java.util.List;
import java.util.Map;

public interface RequestLogsinfoDao {
/**
 * 获取 RequestLogsinfoUrl
 * @param sql
 * @return
 */
	public List<Map<String,Object>> getRequestLogsinfoUrl(String sql);
}
