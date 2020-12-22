package com.digitalchina.ldp.app.sep.core.router;

import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.common.exception.ServiceException;
import org.apache.camel.builder.RouteBuilder;

/**
 * 路由工厂
 *
 * @author python
 */
public class RouteBuilderFactory {
    public static RouteBuilder createRouteBuilder(RouteInfo routeInfo) {
        if (routeInfo.getRouteType().equals(ConstantUtil.SOAP_SERVICE_TYPE)) {
            return new WebServiceRouterBuilder(routeInfo);
        } else if (routeInfo.getRouteType().equals(ConstantUtil.HTTP_SERVICE_TYPE)) {
            return new HttpServiceRouterBuiler(routeInfo);
        } else if (routeInfo.getRouteType().equals(ConstantUtil.FTP_SERVICE_TYPE)) {
            return new FtpServiceRouteBuilder(routeInfo);
        } else {
            throw new ServiceException("未找到对应的路由类型[" + routeInfo.getRouteType() + "]");
        }
    }
}
