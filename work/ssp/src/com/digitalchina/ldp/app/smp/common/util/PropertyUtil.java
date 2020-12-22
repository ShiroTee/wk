/*    */ package com.digitalchina.ldp.app.smp.common.util;
/*    */ 
/*    */ import com.digitalchina.ldp.common.exception.ServiceException;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */
/*    */ 
/*    */ public class PropertyUtil
/*    */ {
/* 13 */   private static final Map<String, Object> propertyMap = new HashMap();
/*    */ 
/*    */   static {
/* 16 */     Properties prop = new Properties();
/* 17 */     InputStream in = Object.class
/* 18 */       .getResourceAsStream("/config/routeConfig.properties");
/*    */     try
/*    */     {
/* 21 */       prop.load(in);
/* 22 */       for (Iterator localIterator = prop.keySet().iterator(); localIterator.hasNext(); ) { Object key = localIterator.next();
/*    */ 
/* 24 */         System.out.println(key + "=" + prop.get(key));
/* 25 */         propertyMap.put(key.toString(), prop.get(key));
/*    */       }
/*    */     }
/*    */     catch (IOException e)
/*    */     {
/* 30 */       throw new ServiceException("读取资源文件异常");
/*    */     }
/*    */     finally
/*    */     {
/*    */       try {
/* 35 */         in.close();
/*    */       }
/*    */       catch (IOException e) {
/* 38 */         e.printStackTrace();
/*    */       }
/*    */     }
/*    */   }
/*    */ 
/*    */   public static <T> T getProperty(String key, Class<T> cla) {
/* 44 */     return cla.cast(propertyMap.get(key));
/*    */   }
/*    */ 
/*    */   public static String getProperty(String key) {
/* 48 */     return (String)getProperty(key, String.class);
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.common.util.PropertyUtil
 * JD-Core Version:    0.6.2
 */