package com.digitalchina.ldp.app.sep.core.processor;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;

/**
 * 服务调用认证接口
 * @author python
 *
 */
public interface Auth
{
	
	public AuthInfo auth(HttpServletRequest request,RouteInfo route,Map<String,Object> headers);
}
