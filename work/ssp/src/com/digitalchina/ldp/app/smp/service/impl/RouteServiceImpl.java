/*     */ package com.digitalchina.ldp.app.smp.service.impl;
/*     */ 
/*     */ import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
import com.digitalchina.ldp.app.smp.service.RouteService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
/*     */
/*     */
/*     */ 
/*     */ @Service
/*     */ public class RouteServiceImpl extends BaseService
/*     */   implements RouteService
/*     */ {
/*     */   public List<RouteInfo> getRouteList(int routeStatus)
/*     */   {
/*  25 */     return createBeanQuery(RouteInfo.class)
/*  26 */       .eq("routeStatus", Integer.valueOf(routeStatus), new String[0]).list();
/*     */   }
/*     */ 
/*     */   public void saveRouteInfo(RouteInfo route, boolean isAddtoRouteManager)
/*     */   {
/*  32 */     createExecuteQuery().insert(route, false);
/*     */   }
/*     */ 
/*     */   public PageList<RouteInfo> getPageList(String routeType, int routeStatus, int start, int pageSize)
/*     */   {
/*  39 */     BeanQuery query = createBeanQuery(RouteInfo.class);
/*  40 */     if (!StringUtils.isEmpty(routeType))
/*     */     {
/*  42 */       query.eq("routeType", routeType, new String[0]);
/*     */     }
/*  44 */     query.eq("routeStatus", Integer.valueOf(routeStatus), new String[0]);
/*  45 */     PageList pageList = query.page(start, pageSize);
/*  46 */     RmiRouteManager rmiRouteManager = 
/*  47 */       (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
/*  48 */     List list = rmiRouteManager.getRouteStatus(pageList
/*  49 */       .getList());
/*  50 */     pageList.setList(list);
/*  51 */     return pageList;
/*     */   }
/*     */ 
/*     */   public RouteInfo getRouteInfo(String routeId)
/*     */   {
/*  57 */     RouteInfo bean = 
/*  58 */       (RouteInfo)createBeanQuery(RouteInfo.class)
/*  58 */       .eq("routeId", routeId, new String[0]).uniqueResult();
/*  59 */     if (bean == null)
/*     */     {
/*  61 */       throw new ServiceException("服务信息不存在或已被删除");
/*     */     }
/*  63 */     return bean;
/*     */   }
/*     */ 
/*     */   public RouteInfo getRouteInfoByPublishURL(String url)
/*     */   {
/*  69 */     BeanQuery query = createBeanQuery(RouteInfo.class)
/*  70 */       .eq("publishURL", url, new String[0]).eq("routeStatus", Integer.valueOf(1), new String[0]);
/*  71 */     query.selectFields(new String[] { "routeId", "prxoyURL", "isAuth", "routeType" });
/*  72 */     RouteInfo info = (RouteInfo)query.uniqueResult();
/*  73 */     return info;
/*     */   }
/*     */ 
/*     */   public PageList<RouteInfo> search(String routeType, String routeName, int started, int start, int pageSize)
/*     */   {
/*  80 */     BeanQuery query = createBeanQuery(RouteInfo.class);
/*  81 */     if (!"".equals(routeType))
/*     */     {
/*  83 */       query.eq("routeType", routeType, new String[0]);
/*     */     }
/*  85 */     if (!"".equals(routeName))
/*     */     {
/*  87 */       query.like("routeName", routeName, new String[0]);
/*     */     }
/*  89 */     PageList<RouteInfo>  pageList = query.page(start, pageSize);
/*  90 */     RmiRouteManager rmiRouteManager = 
/*  91 */       (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
/*  92 */     List list = new ArrayList();
/*     */ 
/*  94 */     for (RouteInfo r : rmiRouteManager.getRouteStatus(pageList.getList()))
/*     */     {
/*  97 */       if (started != 0)
/*     */       {
/* 100 */         if (started == 2)
/*     */         {
/* 102 */           if (r.isStarted() != null)
/*     */             continue;
/* 104 */           list.add(r);
/*     */ 
/* 107 */           continue;
/*     */         }
/*     */ 
/* 110 */         if (started == 1)
/*     */         {
/* 112 */           if ((r.isStarted() == null) || (r.isStarted().booleanValue()))
/*     */             continue;
/* 114 */           list.add(r);
/*     */ 
/* 117 */           continue;
/*     */         }
/*     */ 
/* 120 */         if (started == 3)
/*     */         {
/* 122 */           if ((r.isStarted() == null) || (!r.isStarted().booleanValue()))
/*     */             continue;
/* 124 */           list.add(r);
/*     */ 
/* 127 */           continue;
/*     */         }
/*     */       }
/* 130 */       list.add(r);
/*     */     }
/* 132 */     pageList.setList(list);
/* 133 */     return pageList;
/*     */   }
/*     */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.impl.RouteServiceImpl
 * JD-Core Version:    0.6.2
 */