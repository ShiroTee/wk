package com.digitalchina.ldp.app.common.handler;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.TreeMap;
import com.digitalchina.ldp.app.common.bean.ServiceLogBean;
import com.digitalchina.ldp.app.common.service.ServiceLogInfoManagerService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class ServiceLogInfoHandler extends AbstractHandler {
    @Autowired
    private ServiceLogInfoManagerService serviceLogInfoManagerService;

    public PageList<ServiceLogBean> query(Model model) {
        int start = model.getInt("start");
        int pageSize = model.getInt("limit");
        String appId = model.getValue("appId");
        String startDate = model.getValue("startDate");
        String endDate = model.getValue("endDate");
        Map<String, Object> args = new TreeMap<String, Object>();
        if (!"".equals(appId)) {
            args.put("A.APP_ID=", appId);
        }
        if (!"".equals(startDate)) {
            args.put("S.CREATE_DATE>",
                    StringUtils.toDate(startDate + " 00:00:00"));
            if ("".equals(endDate)) {
                args.put("S.CREATE_DATE<=", new Date());
            } else {
                args.put("S.CREATE_DATE<=",
                        StringUtils.toDate(startDate + " 23:59:59"));
            }
        }
        String isException = model.getValue("isException");
        if (!"".equals(isException)) {
            args.put("S.IS_EXCEPTION=", isException);
        }
        return serviceLogInfoManagerService.query(args, start, pageSize);
    }
}
