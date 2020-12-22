/*    */ package com.digitalchina.ldp.app.smp.service.impl;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo;
import com.digitalchina.ldp.app.smp.service.ServiceParameterService;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.stereotype.Service;

import java.util.List;

/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ 
/*    */ @Service
/*    */ public class ServiceParameterServiceImpl extends BaseService
/*    */   implements ServiceParameterService
/*    */ {
/*    */   public List<ServiceParameterInfo> getParameterList(String routeId)
/*    */   {
/* 18 */     return createBeanQuery(ServiceParameterInfo.class).eq("routeInfo", routeId, new String[0]).sortForDesc(new String[] { "type" }).list();
/*    */   }
/*    */ 
/*    */   public void updateParameterInfo(ServiceParameterInfo info)
/*    */   {
/* 24 */     createExecuteQuery().update(info);
/*    */   }
/*    */ 
/*    */   public void saveServiceParameterInfo(ServiceParameterInfo info)
/*    */   {
/* 30 */     createExecuteQuery().insert(info, false);
/*    */   }
/*    */ 
/*    */   public void deleteServiceParameterInfo(String id)
/*    */   {
/* 36 */     createExecuteQuery().delete(ServiceParameterInfo.class, id);
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.impl.ServiceParameterServiceImpl
 * JD-Core Version:    0.6.2
 */