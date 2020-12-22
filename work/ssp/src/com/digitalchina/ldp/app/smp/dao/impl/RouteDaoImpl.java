/*    */ package com.digitalchina.ldp.app.smp.dao.impl;
/*    */ 
/*    */ import com.digitalchina.ldp.app.smp.dao.RouteDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

/*    */
/*    */
/*    */
/*    */ 
/*    */ @Component
/*    */ public class RouteDaoImpl extends BaseDao
/*    */   implements RouteDao
/*    */ {
/*    */   public void updata(int runningStatus)
/*    */   {
/* 14 */     String sql = "UPDATE ESB_ROUTE_INFO SET RUNNING_STATUS=? WHERE RUNNING_STATUS=? AND ROUTE_STATUS=?";
/* 15 */     createJdbcTemplate().update(sql, new Object[] { Integer.valueOf(runningStatus), Integer.valueOf(1), Integer.valueOf(1) });
/*    */   }
/*    */ 
/*    */   public void update(String routeId, int runningStatus)
/*    */   {
/* 21 */     String sql = "UPDATE ESB_ROUTE_INFO SET RUNNING_STATUS=? WHERE ROUTE_ID=?";
/* 22 */     createJdbcTemplate().update(sql, new Object[] { Integer.valueOf(runningStatus), routeId });
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.dao.impl.RouteDaoImpl
 * JD-Core Version:    0.6.2
 */