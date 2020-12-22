/*     */ package com.digitalchina.ldp.app.smp.bean;
/*     */ 
/*     */ import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.common.util.StringUtils;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */
/*     */ 
/*     */ @Entity
/*     */ @Table(name="ESB_ROUTE_LOG")
/*     */ public class RouteLogInfo
/*     */   implements Serializable
/*     */ {
/*     */ 
/*     */   @Column(name="LOG_ID", length=36)
/*     */   @Id
/*     */   private String logId;
/*     */ 
/*     */   @Column(name="ACCESS_DATE", nullable=false)
/*     */   private Date accessDate;
/*     */ 
/*     */   @Column(name="CONSUMING")
/*     */   private int consuming;
/*     */ 
/*     */   @ManyToOne
/*     */   @Column(name="ROUTE_ID", length=36, nullable=false)
/*     */   private RouteInfo route;
/*     */ 
/*     */   @ManyToOne
/*     */   @Column(name="AUTH_ID", length=36)
/*     */   private AuthInfo auth;
/*     */ 
/*     */   @ManyToOne
/*     */   @Column(name="USER_ID", length=36)
/*     */   private UserInfoBean user;
/*     */ 
/*     */   @Column(name="INPUT", length=4000)
/*     */   private String input;
/*     */ 
/*     */   @Column(name="OUTPUT", length=4000)
/*     */   private String output;
/*     */ 
/*     */   @Column(name="IS_EXCEPTION")
/*     */   private int exception;
/*     */ 
/*     */   @Column(name="ROUTE_NODE", length=20)
/*     */   private String routeNode;
/*     */ 
/*     */   @Column(name="SERVICE_TYPE")
/*     */   private Integer serviceType;
/*     */ 
/*     */   public Integer getServiceType()
/*     */   {
/*  51 */     return this.serviceType;
/*     */   }
/*     */ 
/*     */   public void setServiceType(Integer serviceType) {
/*  55 */     this.serviceType = serviceType;
/*     */   }
/*     */ 
/*     */   public UserInfoBean getUser() {
/*  59 */     return this.user;
/*     */   }
/*     */ 
/*     */   public void setUser(UserInfoBean user) {
/*  63 */     this.user = user;
/*     */   }
/*     */ 
/*     */   public AuthInfo getAuth() {
/*  67 */     return this.auth;
/*     */   }
/*     */ 
/*     */   public void setAuth(AuthInfo auth) {
/*  71 */     this.auth = auth;
/*     */   }
/*     */ 
/*     */   public RouteLogInfo() {
/*  75 */     this.accessDate = new Date();
/*  76 */     this.logId = StringUtils.getPrimarykeyId();
/*     */   }
/*     */ 
/*     */   public String getLogId() {
/*  80 */     return this.logId;
/*     */   }
/*     */ 
/*     */   public void setLogId(String logId) {
/*  84 */     this.logId = logId;
/*     */   }
/*     */ 
/*     */   public Date getAccessDate() {
/*  88 */     return this.accessDate;
/*     */   }
/*     */ 
/*     */   public void setAccessDate(Date accessDate) {
/*  92 */     this.accessDate = accessDate;
/*     */   }
/*     */ 
/*     */   public int getConsuming() {
/*  96 */     return this.consuming;
/*     */   }
/*     */ 
/*     */   public void setConsuming(int consuming) {
/* 100 */     this.consuming = consuming;
/*     */   }
/*     */ 
/*     */   public RouteInfo getRoute() {
/* 104 */     return this.route;
/*     */   }
/*     */ 
/*     */   public void setRoute(RouteInfo route) {
/* 108 */     this.route = route;
/*     */   }
/*     */ 
/*     */   public String getInput() {
/* 112 */     return this.input;
/*     */   }
/*     */ 
/*     */   public void setInput(String input) {
/* 116 */     this.input = input;
/*     */   }
/*     */ 
/*     */   public String getOutput() {
/* 120 */     return this.output;
/*     */   }
/*     */ 
/*     */   public void setOutput(String output) {
/* 124 */     this.output = output;
/*     */   }
/*     */ 
/*     */   public int getException() {
/* 128 */     return this.exception;
/*     */   }
/*     */ 
/*     */   public void setException(int exception) {
/* 132 */     this.exception = exception;
/*     */   }
/*     */ 
/*     */   public String getRouteNode() {
/* 136 */     return this.routeNode;
/*     */   }
/*     */ 
/*     */   public void setRouteNode(String routeNode) {
/* 140 */     this.routeNode = routeNode;
/*     */   }
/*     */ 
/*     */   public String getExceptionMsg(String msg) {
/* 144 */     return msg;
/*     */   }
/*     */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.bean.RouteLogInfo
 * JD-Core Version:    0.6.2
 */