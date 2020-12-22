package com.digitalchina.ldp.app.common.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.common.dao.RequestLogsinfoDao;
import com.digitalchina.ldp.app.common.service.RequestLogsinfoService;
import com.digitalchina.ldp.service.BaseService;

@Service
public class RequestLogsinfoServiceimpl extends BaseService implements
		RequestLogsinfoService {
	@Autowired
	private RequestLogsinfoDao logsinfoDao;

	/**
	 * 获取 RequestLogsinfoUrl
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getRequestLogsinfoUrl() {
		String sql = "select request_url from request_logs_info  group by request_url order by request_url";
		List<Map<String, Object>> list = this.logsinfoDao
				.getRequestLogsinfoUrl(sql.toString());
		return list;
	}

}
