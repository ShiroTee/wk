package com.digitalchina.ldp.app.sep.core;

import org.apache.camel.Exchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
@Component
public class LogInvokImpl implements LogInvok
{

	@Autowired
	private RouteLogService routeLogService; 
	@Override
	public void logInvok(RouteLogInfo logInfo, Exchange exchange)
	{
		routeLogService.saveRouteLogInfo(logInfo);
		this.setBody(exchange, logInfo.getRoute().getRouteType());
		
	}
	private void setBody(Exchange exchange,String routeType)
	{
		exchange.getOut().setBody(this.getErrorMsg(routeType));
	}
	private String getErrorMsg(String routeType)
	{
		return "";
	}

}
