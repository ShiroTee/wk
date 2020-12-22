package com.digitalchina.ldp.app.sps.handler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;
import com.digitalchina.ldp.app.smp.service.ConfigResponseService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.handler.AbstractHandler;
@Component
public class ConfigResponseHandler extends AbstractHandler
{
	@Autowired
	private ConfigResponseService configResponseService;
	public List<ResponseTemplateInfo> getResponseTemplate(Model model)
	{
		String routeId=model.getValueNotEmpty("routeId");
		List<ResponseTemplateInfo> list= new ArrayList<ResponseTemplateInfo>(1);
		 list.add(configResponseService.getResponseTemplateByRouteId(routeId));
		return list;
	}
	public String editResponseTemplate(Model model)
	{
		String responseId=model.getValueNotEmpty("responseId");
		String xmlResponse=model.getRequest().getParameter("xmlResponse");
		String jsonResponse=model.getRequest().getParameter("jsonResponse");
		ResponseTemplateInfo info=new ResponseTemplateInfo();
		info.setJsonResponse(jsonResponse);
		info.setResponseId(responseId);
		info.setXmlResponse(xmlResponse);
		this.configResponseService.updateResponseTemplate(info);
		return SUCCESS_JSON;
	}
}
