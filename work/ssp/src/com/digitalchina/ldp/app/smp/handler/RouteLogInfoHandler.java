/*    */ package com.digitalchina.ldp.app.smp.handler;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ 
/*    */ @Component
/*    */ public class RouteLogInfoHandler extends AbstractHandler
/*    */ {
/*    */ 
/*    */   @Autowired
/*    */   private RouteLogService routeLogService;
/*    */ 
/*    */   public PageList<RouteLogInfo> getRouteLogList(Model model)
/*    */   {
/* 30 */     int start = model.getInt("start");
/* 31 */     int pageSize = model.getInt("limit");
/* 32 */     String routeType = model.getValue("routeType");
/* 33 */     String routeId = model.getValue("routeId");
/* 34 */     String routeStatus = model.getValue("routeStatus");
/* 35 */     Map argsMap = new HashMap(3);
/* 36 */     if (!StringUtils.isEmpty(routeType))
/*    */     {
/* 38 */       argsMap.put("routeType", routeType);
/*    */     }
/* 40 */     if (!StringUtils.isEmpty(routeId))
/*    */     {
/* 42 */       argsMap.put("routeId", routeId);
/*    */     }
/* 44 */     if (!StringUtils.isEmpty(routeStatus))
/*    */     {
/* 46 */       argsMap.put("routeStatus", Integer.valueOf(StringUtils.toNum(routeStatus)));
/*    */     }
/*    */ 
/* 49 */     String exception = model.getValue("exception");
/*    */ 
/* 51 */     if (!"".equals(exception))
/*    */     {
/* 53 */       argsMap.put("exception", Integer.valueOf(StringUtils.toNum(exception)));
/*    */     }
/* 55 */     String routeName = model.getValue("routeName");
/* 56 */     if (!"".equals(routeName))
/*    */     {
/* 58 */       argsMap.put("routeName", routeName);
/*    */     }
/* 60 */     String startDate = model.getValue("startDate");
/* 61 */     if (!"".equals(startDate))
/*    */     {
/* 63 */       argsMap.put("startDate", StringUtils.toDate(startDate + " 00:00:00"));
/*    */     }
/* 65 */     String endDate = model.getValue("endDate");
/* 66 */     if ((!"".equals(startDate)) && ("".equals(endDate)))
/*    */     {
/* 68 */       argsMap.put("endDate", new Date());
/*    */     }
/* 70 */     if ((!"".equals(startDate)) && (!"".equals(endDate)))
/*    */     {
/* 72 */       argsMap.put("endDate", StringUtils.toDate(endDate + " 23:59:59"));
/*    */     }
/* 74 */     return this.routeLogService.search(start, pageSize, argsMap);
/*    */   }
/*    */ 
/*    */   public List<RouteLogInfo> getRouteLogDetail(Model model)
/*    */   {
/* 83 */     String logId = model.getValueNotEmpty("logId");
/* 84 */     List list = new ArrayList();
/* 85 */     list.add(this.routeLogService.getRouteLogInfo(logId));
/* 86 */     return list;
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.handler.RouteLogInfoHandler
 * JD-Core Version:    0.6.2
 */