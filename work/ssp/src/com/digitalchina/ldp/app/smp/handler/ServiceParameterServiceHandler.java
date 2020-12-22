/*    */ package com.digitalchina.ldp.app.smp.handler;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo;
import com.digitalchina.ldp.app.smp.service.ServiceParameterService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
/*    */ public class ServiceParameterServiceHandler extends AbstractHandler
/*    */ {
/*    */ 
/*    */   @Autowired
/*    */   private ServiceParameterService serviceParameterService;
/*    */ 
/*    */   public PageList<ServiceParameterInfo> getParameterInfoList(Model model)
/*    */   {
/* 21 */     String routeId = model.getValueNotEmpty("routeId");
/* 22 */     PageList pageList = new PageList(this.serviceParameterService.getParameterList(routeId), 1000);
/* 23 */     return pageList;
/*    */   }
/*    */ 
/*    */   public String saveParameterInfo(Model model) {
/* 27 */     String routeId = model.getValueNotEmpty("routeId");
/* 28 */     int type = model.getInt("type");
/* 29 */     int isNull = model.getInt("isNull");
/* 30 */     String defaultValue = model.getValue("defaultValue");
/* 31 */     String dataType = model.getValueNotEmpty("dataType");
/* 32 */     String name = model.getValueNotEmpty("name");
/* 33 */     String parameterDesc = model.getValue("parameterDesc");
/* 34 */     String maxLength = model.getRequest().getParameter("maxLength");
/* 35 */     ServiceParameterInfo info = new ServiceParameterInfo();
/* 36 */     info.setDataType(dataType);
/* 37 */     info.setDefaultValue(defaultValue);
/* 38 */     info.setIsNull(isNull);
/* 39 */     info.setName(name);
/* 40 */     info.setParameterDesc(parameterDesc);
/* 41 */     info.setRouteInfo(new RouteInfo(routeId));
/* 42 */     info.setType(type);
/* 43 */     info.setMaxLength(null);
/* 44 */     if (!StringUtils.isEmpty(maxLength))
/*    */     {
/* 46 */       info.setMaxLength(Integer.valueOf(StringUtils.toNum(maxLength)));
/*    */     }
/* 48 */     String parameterId = model.getRequest().getParameter("parameterId");
/* 49 */     if (!StringUtils.isEmpty(parameterId))
/*    */     {
/* 51 */       info.setParameterId(parameterId);
/* 52 */       this.serviceParameterService.updateParameterInfo(info);
/* 53 */       return "{success:true}";
/*    */     }
/* 55 */     this.serviceParameterService.saveServiceParameterInfo(info);
/* 56 */     return "{success:true}";
/*    */   }
/*    */ 
/*    */   public String deleteParameterInfo(Model model) {
/* 60 */     String parameterId = model.getValueNotEmpty("parameterId");
/* 61 */     this.serviceParameterService.deleteServiceParameterInfo(parameterId);
/* 62 */     return "{success:true}";
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.handler.ServiceParameterServiceHandler
 * JD-Core Version:    0.6.2
 */