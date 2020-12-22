/*    */ package com.digitalchina.ldp.app.smp.common.util;
/*    */ 
/*    */ import com.digitalchina.ldp.common.exception.ServiceException;
/*    */ import java.util.HashMap;
/*    */ import java.util.Map;
/*    */ 
/*    */ public class DictionaryUtil
/*    */ {
/* 11 */   private static final Map<String, Map<String, Object>> dictionaryTable = new HashMap();
/*    */ 
/*    */   public static String getValue(String table, String key) {
/* 14 */     return (String)getValue(table, key, String.class);
/*    */   }
/*    */ 
/*    */   private static Object getValue_(String table, String key) {
/* 18 */     Map tableMap = (Map)dictionaryTable.get(table);
/* 19 */     if (tableMap == null)
/*    */     {
/* 21 */       throw new ServiceException("字典表不存在");
/*    */     }
/* 23 */     Object value = tableMap.get(key);
/* 24 */     if (value == null)
/*    */     {
/* 26 */       throw new ServiceException(tableMap + "[" + key + "]为null");
/*    */     }
/* 28 */     return value;
/*    */   }
/*    */ 
/*    */   public static <T> T getValue(String table, String key, Class<T> cla) {
/* 32 */     return cla.cast(getValue_(table, key));
/*    */   }
/*    */ 
/*    */   public static enum DictionaryEnum {
/* 36 */     DICT_DATAELE_TYPE;
/*    */   }
/*    */ }

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.common.util.DictionaryUtil
 * JD-Core Version:    0.6.2
 */