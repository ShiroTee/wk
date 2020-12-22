/*    */ package com.digitalchina.ldp.app.smp.bean;
/*    */ 
/*    */ import java.io.Serializable;
/*    */ import java.util.Date;
/*    */ import javax.persistence.Column;
/*    */ import javax.persistence.Entity;
/*    */ import javax.persistence.Id;
/*    */ import javax.persistence.Table;
/*    */ import javax.persistence.Transient;
/*    */ 
/*    */ @Entity
/*    */ @Table(name="")
/*    */ public class RouteTypeInfo
/*    */   implements Serializable
/*    */ {
/*    */ 
/*    */   @Transient
/*    */   private static final long serialVersionUID = 857204421182093890L;
/*    */ 
/*    */   @Column(name="ROUTE_TYPE_ID")
/*    */   @Id
/*    */   private String routeTypeId;
/*    */ 
/*    */   @Column(name="ROUTE_TYPE_NAME", length=100, nullable=false)
/*    */   private String routeTypeName;
/*    */ 
/*    */   @Column(name="DESCRIBE", length=512)
/*    */   private String describe;
/*    */ 
/*    */   @Column(name="STATUS", nullable=false)
/*    */   private Integer status;
/*    */ 
/*    */   @Column(name="ADD_DATE", nullable=false)
/*    */   private Date addDate;
/*    */   private RouteTypeInfo pid;
/*    */ 
/*    */   public RouteTypeInfo getPid()
/*    */   {
/* 36 */     return this.pid;
/*    */   }
/*    */ 
/*    */   public void setPid(RouteTypeInfo pid) {
/* 40 */     this.pid = pid;
/*    */   }
/*    */ 
/*    */   public String getRouteTypeId() {
/* 44 */     return this.routeTypeId;
/*    */   }
/*    */ 
/*    */   public void setRouteTypeId(String routeTypeId) {
/* 48 */     this.routeTypeId = routeTypeId;
/*    */   }
/*    */ 
/*    */   public String getRouteTypeName() {
/* 52 */     return this.routeTypeName;
/*    */   }
/*    */ 
/*    */   public void setRouteTypeName(String routeTypeName) {
/* 56 */     this.routeTypeName = routeTypeName;
/*    */   }
/*    */ 
/*    */   public String getDescribe() {
/* 60 */     return this.describe;
/*    */   }
/*    */ 
/*    */   public void setDescribe(String describe) {
/* 64 */     this.describe = describe;
/*    */   }
/*    */ 
/*    */   public Integer getStatus() {
/* 68 */     return this.status;
/*    */   }
/*    */ 
/*    */   public void setStatus(Integer status) {
/* 72 */     this.status = status;
/*    */   }
/*    */ 
/*    */   public Date getAddDate() {
/* 76 */     return this.addDate;
/*    */   }
/*    */ 
/*    */   public void setAddDate(Date addDate) {
/* 80 */     this.addDate = addDate;
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.bean.RouteTypeInfo
 * JD-Core Version:    0.6.2
 */