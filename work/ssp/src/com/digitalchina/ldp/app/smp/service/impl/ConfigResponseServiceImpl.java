/*    */ package com.digitalchina.ldp.app.smp.service.impl;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;
import com.digitalchina.ldp.app.smp.service.ConfigResponseService;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.stereotype.Service;

/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ 
/*    */ @Service
/*    */ public class ConfigResponseServiceImpl extends BaseService
/*    */   implements ConfigResponseService
/*    */ {
/*    */   public ResponseTemplateInfo getResponseTemplateByRouteId(String routeId)
/*    */   {
/* 15 */     return (ResponseTemplateInfo)createBeanQuery(ResponseTemplateInfo.class).eq("route", routeId, new String[0]).uniqueResult();
/*    */   }
/*    */ 
/*    */   public void updateResponseTemplate(ResponseTemplateInfo response)
/*    */   {
/* 21 */     createExecuteQuery().update(response);
/*    */   }
/*    */ 
/*    */   public void deleteResponseTemplate(String roueId)
/*    */   {
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.impl.ConfigResponseServiceImpl
 * JD-Core Version:    0.6.2
 */