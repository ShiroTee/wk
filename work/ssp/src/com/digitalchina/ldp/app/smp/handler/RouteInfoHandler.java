/*    */ package com.digitalchina.ldp.app.smp.handler;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.RouteInfo;
/*    */ import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
/*    */ import com.digitalchina.ldp.app.smp.service.RouteService;
/*    */ import com.digitalchina.ldp.bean.Model;
/*    */ import com.digitalchina.ldp.bean.PageList;
/*    */ import com.digitalchina.ldp.common.util.BeanDefineConfigue;
/*    */ import com.digitalchina.ldp.handler.AbstractHandler;
/*    */ import org.springframework.beans.factory.annotation.Autowired;
/*    */ import org.springframework.stereotype.Component;
/*    */ 
/*    */ @Component
/*    */ public class RouteInfoHandler extends AbstractHandler
/*    */ {
/*    */ 
/*    */   @Autowired
/*    */   private RouteService routeService;
/*    */ 
/*    */   public PageList<RouteInfo> getRoutePageList(Model model)
/*    */   {
            String routeType = model.getValue("routeType");
            int start = model.getInt("start");
            int pageSize = model.getInt("limit");
             return this.routeService.getPageList(routeType, 1, start, pageSize);
/*    */   }
/*    */ 
/*    */   public PageList<RouteInfo> search(Model model)
/*    */   {
/* 33 */     String routeType = model.getValue("routeType");
/* 34 */     int start = model.getInt("start");
/* 35 */     int pageSize = model.getInt("limit");
/*    */ 
/* 39 */     int started = 0;
/* 40 */     if (!"".equals(model.getValue("started")))
/*    */     {
/* 42 */       started = model.getInt("started");
/*    */     }
/* 44 */     String routeName = model.getValue("routeName");
/* 45 */     return this.routeService.search(routeType, routeName, started, start, pageSize);
/*    */   }
/*    */ 
/*    */   public String startRoute(Model model)
/*    */   {
/* 50 */     String routeId = model.getValueNotEmpty("routeId");
/* 51 */     RmiRouteManager rmiRouteManager = (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
/* 52 */     rmiRouteManager.startRoute(routeId);
/* 53 */     return "{success:true}";
/*    */   }
/*    */ 
/*    */   public String stopRoute(Model model)
/*    */   {
/* 58 */     String routeId = model.getValueNotEmpty("routeId");
/* 59 */     RmiRouteManager rmiRouteManager = (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
/* 60 */     rmiRouteManager.suspendRoute(routeId);
/* 61 */     return "{success:true}";
/*    */   }
/*    */ 
/*    */   public String removeRoute(Model model)
/*    */   {
/* 66 */     String routeId = model.getValueNotEmpty("routeId");
/* 67 */     RmiRouteManager rmiRouteManager = (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
/* 68 */     rmiRouteManager.deleteRoute(routeId);
/* 69 */     return "{success:true}";
/*    */   }
/*    */ 
/*    */   public String addRoute(Model model)
/*    */   {
/* 74 */     String routeId = model.getValueNotEmpty("routeId");
/* 75 */     RouteInfo route = this.routeService.getRouteInfo(routeId);
/* 76 */     RmiRouteManager rmiRouteManager = (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
/* 77 */     rmiRouteManager.addRoute(route);
/* 78 */     return "{success:true}";
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.handler.RouteInfoHandler
 * JD-Core Version:    0.6.2
 */