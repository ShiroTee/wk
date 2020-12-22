package com.digitalchina.ldp.app.sep.core.processor;

import javax.servlet.http.HttpServletResponse;

import org.apache.camel.Exchange;

import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;

abstract public class AbstractProcessor
{
	protected void invokException(Exchange exchange,String errorMsg,RouteLogInfo log)
	{
		HttpServletResponse response=(HttpServletResponse)exchange.getIn().getHeader(ConstantUtil.HTTP_RESPONSE);
		response.setContentType("text/html;charset=utf-8");
		
		log.setException(1);
		log.setOutput(errorMsg);
		exchange.getOut().setFault(true);
		exchange.getOut().setBody(errorMsg);
	}
}
