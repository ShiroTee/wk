package com.digitalchina.ldp.app.common.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.common.dao.RequestLogsinfoDao;
import com.digitalchina.ldp.dao.BaseDao;

@Component
public class RequestLogsinfoDaoimpl extends BaseDao implements
		RequestLogsinfoDao {
	/**
	 * 获取 RequestLogsinfoUrl
	 * @param sql
	 * @return
	 */
	public List<Map<String, Object>> getRequestLogsinfoUrl(String sql) {
		List<Map<String, Object>> list = this.createJdbcTemplate()
				.queryForList(sql);
		return list;
	}
}
