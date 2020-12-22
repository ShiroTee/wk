package com.digitalchina.ldp.app.sep.core;

import org.apache.camel.Exchange;

import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;

public interface LogInvok
{
	public void logInvok(RouteLogInfo logInfo,Exchange exchange);
}
