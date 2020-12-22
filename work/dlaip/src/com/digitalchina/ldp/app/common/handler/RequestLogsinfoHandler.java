package com.digitalchina.ldp.app.common.handler;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.common.service.RequestLogsinfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class RequestLogsinfoHandler extends AbstractHandler {
	@Autowired
	private RequestLogsinfoService logsinfoService;

	/**
	 * 获取 RequestLogsinfoUrl
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getRequestLogsinfoUrl(Model model) {
		return this.logsinfoService.getRequestLogsinfoUrl();
	}
}
