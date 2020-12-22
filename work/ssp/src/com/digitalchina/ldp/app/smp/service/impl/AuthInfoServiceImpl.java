/*    */ package com.digitalchina.ldp.app.smp.service.impl;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.dao.AuthDao;
import com.digitalchina.ldp.app.smp.service.AuthInfoService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
/*    */ 
/*    */ @Service
/*    */ public class AuthInfoServiceImpl extends BaseService
/*    */   implements AuthInfoService
/*    */ {
/*    */ 
/*    */   @Autowired
/*    */   private AuthDao authDao;
/*    */ 
/*    */   public AuthInfo getAuthInfoById(String authId)
/*    */   {
/* 24 */     return null;
/*    */   }
/*    */ 
/*    */   public void saveAuthInfo(AuthInfo auth)
/*    */   {
/*    */   }
/*    */ 
/*    */   public PageList<AuthInfo> getAuthList(int start, int pageSize)
/*    */   {
/* 37 */     BeanQuery query = createBeanQuery(AuthInfo.class);
/* 38 */     query.setJoin(true);
/* 39 */     query.selectFields(new String[] { "authId", "user.userId", "user.name", "user.loginName", "status", "addDate", "authKey" });
/* 40 */     query.sortForDesc(new String[] { "addDate" });
/* 41 */     return query.page(start, pageSize);
/*    */   }
/*    */ 
/*    */   public AuthInfo auth(String authKey, String routeId)
/*    */   {
/* 47 */     AuthInfo auth = this.authDao.get(authKey, routeId);
/* 48 */     if ((auth != null) && (auth.getStatus() == 0))
/*    */     {
/* 50 */       throw new ServiceException("授权被禁用");
/*    */     }
/* 52 */     return auth;
/*    */   }
/*    */ 
/*    */   public PageList<RouteInfo> getAuthForRoutes(String authId, int start, int pageSize)
/*    */   {
/* 60 */     return null;
/*    */   }
/*    */ 
/*    */   public void updateAuthInfo(AuthInfo auth)
/*    */   {
/* 66 */     createExecuteQuery().update(auth);
/*    */   }
/*    */ 
/*    */   public void deleteAuthInfo(String authId)
/*    */   {
/* 72 */     createExecuteQuery().delete(AuthInfo.class, authId);
/*    */   }
/*    */ 
/*    */   public AuthInfo auth_(String userId, String routeId)
/*    */   {
/* 78 */     return null;
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.impl.AuthInfoServiceImpl
 * JD-Core Version:    0.6.2
 */