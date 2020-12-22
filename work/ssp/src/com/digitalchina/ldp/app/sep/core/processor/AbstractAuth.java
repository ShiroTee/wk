package com.digitalchina.ldp.app.sep.core.processor;

import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.AuthInfoService;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.exception.ServiceException;
import org.apache.camel.Processor;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

abstract public class AbstractAuth extends AbstractProcessor implements Processor, Auth {

    private AuthInfoService authInfoService;
    private RouteLogService routeLogService;

    protected AbstractAuth(AuthInfoService authInfoService, RouteLogService routeLogService) {
        this.authInfoService = authInfoService;
        this.routeLogService = routeLogService;
    }

    @Override
    public AuthInfo auth(HttpServletRequest request, RouteInfo route, Map<String, Object> headers) {
        Model model = new Model(request, null);
        long timestamp = model.getLong(ConstantUtil.TIMESTAMP);
        String authKey = model.getValueNotEmpty(ConstantUtil.AUTH_KEY);
        // 验证时间戳
        if (new Date().getTime() - timestamp > 1000 * 60 * 10) {
            throw new ServiceException("调用过期，请检查时间戳");
        }
        AuthInfo auth = null;
        if (route.getServiceType() == 0 || route.getServiceType() == 1) {
            auth = authInfoService.auth(authKey, route.getRouteId());
        } else {
            auth = authInfoService.auth_(authKey, route.getRouteId());
        }
        headers.remove(ConstantUtil.AUTH_KEY);
        headers.remove(ConstantUtil.TIMESTAMP);
        String camelHttpQuery = this.getCamelHttpQuery(headers.get(ConstantUtil.CAMEL_HTTP_QUERY).toString());
        headers.put(ConstantUtil.CAMEL_HTTP_QUERY, camelHttpQuery);
        return auth;
    }

    private String getCamelHttpQuery(String httpQuery) {
        String arrays[] = httpQuery.split("&");
        StringBuilder sb = new StringBuilder();
        for (String str : arrays) {
            String s[] = str.split("=");
            if (s.length == 2) {
                if (s[0].equals("authKey") || s[0].equals("timestamp")) {
                    continue;
                }
                sb.append(s[0]);
                sb.append("=");
                sb.append(s[1]);
                sb.append("&");

            }
        }
        if (sb.length() != 0) {
            return sb.substring(0, sb.length() - 1);
        }
        return "";
    }

    protected void saveRouteLogInfo(RouteLogInfo log) {
        routeLogService.saveRouteLogInfo(log);
    }
}
