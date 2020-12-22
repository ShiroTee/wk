/*    */ package com.digitalchina.ldp.app.smp.bean;
/*    */ 
/*    */ import javax.persistence.*;
import java.io.Serializable;

/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ 
/*    */ @Table(name="RESPONSE_TEMPLATE")
/*    */ public class ResponseTemplateInfo
/*    */   implements Serializable
/*    */ {
/*    */ 
/*    */   @Transient
/*    */   private static final long serialVersionUID = 1L;
/*    */ 
/*    */   @Column(name="XML_RESPONSE", length=102400)
/*    */   private String xmlResponse;
/*    */ 
/*    */   @Column(name="JSON_RESPONSE", length=102400)
/*    */   private String jsonResponse;
/*    */ 
/*    */   @ManyToOne
/*    */   @Column(name="ROUTE_ID", length=36, nullable=false)
/*    */   private RouteInfo route;
/*    */ 
/*    */   @Id
/*    */   @Column(name="RESPONSE_ID", length=36)
/*    */   private String responseId;
/*    */ 
/*    */   public String getResponseId()
/*    */   {
/* 35 */     return this.responseId;
/*    */   }
/*    */ 
/*    */   public void setResponseId(String responseId) {
/* 39 */     this.responseId = responseId;
/*    */   }
/*    */ 
/*    */   public String getXmlResponse() {
/* 43 */     return this.xmlResponse;
/*    */   }
/*    */ 
/*    */   public void setXmlResponse(String xmlResponse) {
/* 47 */     this.xmlResponse = xmlResponse;
/*    */   }
/*    */ 
/*    */   public String getJsonResponse() {
/* 51 */     return this.jsonResponse;
/*    */   }
/*    */ 
/*    */   public void setJsonResponse(String jsonResponse) {
/* 55 */     this.jsonResponse = jsonResponse;
/*    */   }
/*    */ 
/*    */   public RouteInfo getRoute() {
/* 59 */     return this.route;
/*    */   }
/*    */ 
/*    */   public void setRoute(RouteInfo route) {
/* 63 */     this.route = route;
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo
 * JD-Core Version:    0.6.2
 */