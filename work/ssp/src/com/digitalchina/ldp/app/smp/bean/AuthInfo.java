/*     */ package com.digitalchina.ldp.app.smp.bean;
/*     */ 
/*     */ import com.digitalchina.ldp.app.ums.bean.UserInfoBean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
/*     */ 
/*     */ @Entity
/*     */ @Table(name="ESB_AUTH_INFO")
/*     */ public class AuthInfo
/*     */   implements Serializable
/*     */ {
/*     */ 
/*     */   @Id
/*     */   @Column(name="AUTH_ID")
/*     */   private String authId;
/*     */ 
/*     */   @ManyToOne
/*     */   @Column(name="USER_ID", length=36, nullable=false)
/*     */   private UserInfoBean user;
/*     */ 
/*     */   @Column(name="ADD_DATE")
/*     */   private Date addDate;
/*     */ 
/*     */   @Column(name="AUTH_STATUS")
/*     */   private int status;
/*     */ 
/*     */   @Column(name="AUTH_KEY", length=20, nullable=false)
/*     */   private String authKey;
/*     */ 
/*     */   public String getAuthKey()
/*     */   {
/*  41 */     return this.authKey;
/*     */   }
/*     */ 
/*     */   public void setAuthKey(String authKey) {
/*  45 */     this.authKey = authKey;
/*     */   }
/*     */ 
/*     */   public int getStatus() {
/*  49 */     return this.status;
/*     */   }
/*     */ 
/*     */   public void setStatus(int status) {
/*  53 */     this.status = status;
/*     */   }
/*     */ 
/*     */   public String getAuthId() {
/*  57 */     return this.authId;
/*     */   }
/*     */ 
/*     */   public void setAuthId(String authId) {
/*  61 */     this.authId = authId;
/*     */   }
/*     */ 
/*     */   public UserInfoBean getUser() {
/*  65 */     return this.user;
/*     */   }
/*     */ 
/*     */   public void setUser(UserInfoBean user) {
/*  69 */     this.user = user;
/*     */   }
/*     */ 
/*     */   public Date getAddDate() {
/*  73 */     return this.addDate;
/*     */   }
/*     */ 
/*     */   public void setAddDate(Date addDate) {
/*  77 */     this.addDate = addDate;
/*     */   }
/*     */ 
/*     */   public static String generateAuthKey(int length, List<Integer> dashPosition)
/*     */   {
/*  87 */     if (dashPosition == null) {
/*  88 */       List list = new ArrayList();
/*  89 */       list.add(Integer.valueOf(4));
/*  90 */       list.add(Integer.valueOf(9));
/*  91 */       list.add(Integer.valueOf(14));
/*  92 */       dashPosition = list;
/*     */     }
/*  94 */     char[] str = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 
/*  95 */       'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
/*  96 */     StringBuffer sb = new StringBuffer();
/*  97 */     Random r = new Random();
/*  98 */     for (int i = 0; i < length; i++) {
/*  99 */       if (dashPosition.contains(Integer.valueOf(i)))
/* 100 */         sb.append("-");
/*     */       else {
/* 102 */         sb.append(str[r.nextInt(str.length)]);
/*     */       }
/*     */     }
/* 105 */     return sb.toString();
/*     */   }
/*     */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.bean.AuthInfo
 * JD-Core Version:    0.6.2
 */