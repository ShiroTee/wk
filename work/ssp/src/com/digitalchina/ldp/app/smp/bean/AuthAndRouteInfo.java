/*    */ package com.digitalchina.ldp.app.smp.bean;
/*    */ 
/*    */ import java.io.Serializable;
/*    */ import javax.persistence.Column;
/*    */ import javax.persistence.Entity;
/*    */ import javax.persistence.Id;
/*    */ import javax.persistence.ManyToOne;
/*    */ import javax.persistence.Table;
/*    */ 
/*    */ @Entity
/*    */ @Table(name="ESB_AUTH_ROUTE_INFO")
/*    */ public class AuthAndRouteInfo
/*    */   implements Serializable
/*    */ {
/*    */ 
/*    */   @Id
/*    */   @Column(name="AR_ID")
/*    */   private String arId;
/*    */ 
/*    */   @ManyToOne
/*    */   @Column(name="AUTH_ID", length=36, nullable=false)
/*    */   private AuthInfo auth;
/*    */ 
/*    */   @Column(name="ASSET_ID", length=36, nullable=false)
/*    */   private String assetId;
/*    */ 
/*    */   @Column(name="AR_STATUS")
/*    */   private int status;
/*    */ 
/*    */   public String getArId()
/*    */   {
/* 28 */     return this.arId;
/*    */   }
/*    */ 
/*    */   public void setArId(String arId) {
/* 32 */     this.arId = arId;
/*    */   }
/*    */ 
/*    */   public AuthInfo getAuth() {
/* 36 */     return this.auth;
/*    */   }
/*    */ 
/*    */   public void setAuth(AuthInfo auth) {
/* 40 */     this.auth = auth;
/*    */   }
/*    */ 
/*    */   public int getStatus() {
/* 44 */     return this.status;
/*    */   }
/*    */ 
/*    */   public void setStatus(int status) {
/* 48 */     this.status = status;
/*    */   }
/*    */   public void setAssetId(String assetId) {
/* 51 */     this.assetId = assetId;
/*    */   }
/*    */   public String getAssetId() {
/* 54 */     return this.assetId;
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.bean.AuthAndRouteInfo
 * JD-Core Version:    0.6.2
 */