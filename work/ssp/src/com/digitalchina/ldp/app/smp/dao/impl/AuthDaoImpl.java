/*    */ package com.digitalchina.ldp.app.smp.dao.impl;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.dao.AuthDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

/*    */
/*    */
/*    */
/*    */
/*    */ 
/*    */ @Component
/*    */ public class AuthDaoImpl extends BaseDao
/*    */   implements AuthDao
/*    */ {
/*    */   public AuthInfo get(String authKey, String routeId)
/*    */   {
/* 15 */     StringBuilder sql = new StringBuilder();
/* 16 */     sql.append("SELECT * FROM (SELECT A.asset_id FROM esb_route_info R INNER JOIN asset A ");
/* 17 */     sql.append("ON R.asset_id = A.asset_id where r.res_id=?) c INNER JOIN (SELECT au.*, ");
/* 18 */     sql.append("er.ASSET_ID FROM esb_auth_info au INNER JOIN esb_auth_route_info er ON   ");
/* 19 */     sql.append("au.AUTH_ID = er.AUTH_ID WHERE au.AUTH_KEY =? ) d on c.asset_id=d.ASSET_ID");
/* 20 */     return (AuthInfo)createSqlQuery(AuthInfo.class, sql.toString(), new Object[] { routeId, authKey }).uniqueResult();
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.dao.impl.AuthDaoImpl
 * JD-Core Version:    0.6.2
 */