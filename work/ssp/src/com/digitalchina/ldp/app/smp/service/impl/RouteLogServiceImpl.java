/*     */ package com.digitalchina.ldp.app.smp.service.impl;
/*     */ 
/*     */ import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Map;

/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */ 
/*     */ @Service
/*     */ public class RouteLogServiceImpl extends BaseService
/*     */   implements RouteLogService
/*     */ {
/*     */   public void saveRouteLogInfo(RouteLogInfo log)
/*     */   {
/*     */     try
/*     */     {
/*  23 */       createExecuteQuery().insert(log, false);
/*     */     }
/*     */     catch (DataAccessException e)
/*     */     {
/*  27 */       e.printStackTrace();
/*     */     }
/*     */   }
/*     */ 
/*     */   public void updateRouteLogInfo(RouteLogInfo log)
/*     */   {
/*  35 */     createExecuteQuery().update(log);
/*     */   }
/*     */ 
/*     */   public void saveOrUpdateLog(RouteLogInfo log)
/*     */   {
/*  42 */     if (log.getLogId() == null)
/*     */     {
/*  44 */       createExecuteQuery().insert(log, false);
/*     */     }
/*     */     else
/*     */     {
/*  48 */       createExecuteQuery().update(log);
/*     */     }
/*     */   }
/*     */ 
/*     */   public PageList<RouteLogInfo> search(int start, int pageSize, Map<String, Object> args)
/*     */   {
/*  56 */     BeanQuery query = createBeanQuery(RouteLogInfo.class);
/*  57 */     if (args.get("exception") != null)
/*     */     {
/*  59 */       query.eq("exception", args.get("exception"), new String[0]);
/*     */     }
/*  61 */     if (args.get("routeName") != null)
/*     */     {
/*  63 */       query.like("route.routeName", args.get("routeName"), new String[0]);
/*     */     }
/*  65 */     if (args.get("startDate") != null)
/*     */     {
/*  68 */       query.gtEq("accessDate", args.get("startDate"), new String[0]);
/*     */     }
/*  70 */     if (args.get("endDate") != null)
/*     */     {
/*  72 */       query.ltEq("accessDate", args.get("endDate"), new String[0]);
/*     */     }
/*  74 */     if (args.get("routeType") != null)
/*     */     {
/*  76 */       query.eq("route.routeType", args.get("routeType"), new String[0]);
/*     */     }
/*  78 */     query.selectFields(new String[] { "logId", "route.routeName", "exception", "accessDate", "route.routeType", "route.publishURL" });
/*  79 */     query.selectFields(new String[] { "user.name" });
/*  80 */     query.setJoin(true);
/*  81 */     query.setJoinLeftJoin();
/*  82 */     query.sortForDesc(new String[] { "accessDate" });
/*  83 */     PageList pageList = query.page(start, pageSize);
/*  84 */     return pageList;
/*     */   }
/*     */ 
/*     */   public RouteLogInfo getRouteLogInfo(String logId)
/*     */   {
/*  91 */     BeanQuery query = createBeanQuery(RouteLogInfo.class);
/*  92 */     query.eq("logId", logId, new String[0]);
/*  93 */     query.setJoinLeftJoin();
/*  94 */     query.setJoin(true);
/*  95 */     query.selectFields(new String[] { "logId", "route.routeName", "exception", "accessDate", "route.routeType", "route.publishURL" });
/*  96 */     query.selectFields(new String[] { "user.name", "input", "output" });
/*  97 */     RouteLogInfo bean = (RouteLogInfo)query.uniqueResult();
/*  98 */     if (bean.getUser() != null)
/*     */     {
/* 100 */       BeanQuery q = createBeanQuery(UserInfoBean.class);
/* 101 */       q.eq("userId", bean.getUser().getUserId(), new String[0]);
/* 102 */       q.setJoin(true);
/* 103 */       q.selectFields(new String[] { "orgInfo.orgName", "name" });
/* 104 */       bean.setUser((UserInfoBean)q.uniqueResult());
/*     */     }
/* 106 */     return bean;
/*     */   }
/*     */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.impl.RouteLogServiceImpl
 * JD-Core Version:    0.6.2
 */