package com.digitalchina.ldp.app.sep.core.processor;

import org.apache.camel.Processor;

import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.RouteLogService;

public abstract class AbstractProxyProcessor extends AbstractProcessor implements Processor,ProxyProcessor
{
	

	private RouteLogService routeLogService;
	protected AbstractProxyProcessor(RouteLogService routeLogService)
	{
		this.routeLogService=routeLogService;
	}
	@Override
	public void updateRouteLogInfo(RouteLogInfo log)
	{		
		routeLogService.updateRouteLogInfo(log);
	}
	
}
