/*     */ package com.digitalchina.ldp.app.smp.bean;
/*     */ 
/*     */ import javax.persistence.*;
import java.io.Serializable;

/*     */
/*     */
/*     */
/*     */
/*     */
/*     */ 
/*     */ @Entity
/*     */ @Table(name="ESB_PARAMETER_INFO")
/*     */ public class ServiceParameterInfo
/*     */   implements Serializable
/*     */ {
/*     */ 
/*     */   @Id
/*     */   @Column(name="PARAMETER_ID")
/*     */   private String parameterId;
/*     */ 
/*     */   @ManyToOne
/*     */   @Column(name="ROUTE_ID", length=36, nullable=false)
/*     */   private RouteInfo routeInfo;
/*     */ 
/*     */   @Column(name="PARAMETER_NAME", length=50, nullable=false)
/*     */   private String name;
/*     */ 
/*     */   @Column(name="DATA_TYPE", length=20, nullable=false)
/*     */   private String dataType;
/*     */ 
/*     */   @Column(name="DEFAULT_VALUE", length=1024)
/*     */   private String defaultValue;
/*     */ 
/*     */   @Column(name="IS_NULL")
/*     */   private int isNull;
/*     */ 
/*     */   @Column(name="PARAMETER_TYPE")
/*     */   private int type;
/*     */ 
/*     */   @Column(name="PARAMETER_DESC", length=1024)
/*     */   private String parameterDesc;
/*     */ 
/*     */   @Column(name="MAX_LENGTH")
/*     */   private Integer maxLength;
/*     */ 
/*     */   public Integer getMaxLength()
/*     */   {
/*  44 */     return this.maxLength;
/*     */   }
/*     */ 
/*     */   public void setMaxLength(Integer maxLength) {
/*  48 */     this.maxLength = maxLength;
/*     */   }
/*     */ 
/*     */   public String getParameterDesc() {
/*  52 */     return this.parameterDesc;
/*     */   }
/*     */ 
/*     */   public void setParameterDesc(String parameterDesc) {
/*  56 */     this.parameterDesc = parameterDesc;
/*     */   }
/*     */ 
/*     */   public String getParameterId() {
/*  60 */     return this.parameterId;
/*     */   }
/*     */ 
/*     */   public void setParameterId(String parameterId) {
/*  64 */     this.parameterId = parameterId;
/*     */   }
/*     */ 
/*     */   public RouteInfo getRouteInfo() {
/*  68 */     return this.routeInfo;
/*     */   }
/*     */ 
/*     */   public void setRouteInfo(RouteInfo routeInfo) {
/*  72 */     this.routeInfo = routeInfo;
/*     */   }
/*     */ 
/*     */   public String getName() {
/*  76 */     return this.name;
/*     */   }
/*     */ 
/*     */   public void setName(String name) {
/*  80 */     this.name = name;
/*     */   }
/*     */ 
/*     */   public String getDataType() {
/*  84 */     return this.dataType;
/*     */   }
/*     */ 
/*     */   public void setDataType(String dataType) {
/*  88 */     this.dataType = dataType;
/*     */   }
/*     */ 
/*     */   public String getDefaultValue() {
/*  92 */     return this.defaultValue;
/*     */   }
/*     */ 
/*     */   public void setDefaultValue(String defaultValue) {
/*  96 */     this.defaultValue = defaultValue;
/*     */   }
/*     */ 
/*     */   public int getIsNull() {
/* 100 */     return this.isNull;
/*     */   }
/*     */ 
/*     */   public void setIsNull(int isNull) {
/* 104 */     this.isNull = isNull;
/*     */   }
/*     */ 
/*     */   public int getType() {
/* 108 */     return this.type;
/*     */   }
/*     */ 
/*     */   public void setType(int type) {
/* 112 */     this.type = type;
/*     */   }
/*     */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo
 * JD-Core Version:    0.6.2
 */