package com.digitalchina.util;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;
import java.util.Set;

public class DBUtil {


    /**
     * 根据表名创建Insertsql 如果有大数据字段则写入空字段
     * @param tableName 表名
     * @param blobStr 大数据字段
     * @param map 数据集
     * @param prepares 用户后续插入的字段名称
     * @return
     */
    public static String createInsertsql(String tableName,String blobStr,Map<String,Object> map,String...prepares){
        String sql="";
        Set<String> keys=map.keySet();
        StringBuffer colName=new StringBuffer("(");
        StringBuffer colValue=new StringBuffer(" values(");
        int i=1;
        int keyused=0;
        for (String key : keys) {
            for (String prepare : prepares) {
                if(key.equals(prepare)){
                    colName.append(key);
                    colValue.append("?");
                    keyused=1;
                    break;
                }
            }
            if(key.equals(blobStr)){
                colName.append(key);
                colValue.append("empty_blob()");
                keyused=1;
            }
            if(keyused==0){
                colName.append(key);
                colValue.append("'").append(map.get(key)).append("'");
            }
            if(i<keys.size()){
                colName.append(",");
                colValue.append(",");
                i++;
            }
            keyused=0;
        }
        colName.append(")");
        colValue.append(")");
        sql="insert into "+tableName+colName.toString()+colValue.toString();
        return sql;
    }
    /**
     * 根据表名创建Insertsql
     * @param tableName 表名
     * @param map 数据集
     * @param prepares 用户后续插入的字段名称
     * @return
     */
    public static String createInsertsql(String tableName,Map<String,Object> map,String...prepares){
        String sql="";
        Set<String> keys=map.keySet();
        StringBuffer colName=new StringBuffer("(");
        StringBuffer colValue=new StringBuffer(" value(");
        int i=1;
        int keyused=0;
        for (String key : keys) {
            for (String prepare : prepares) {
                if(key.equals(prepare)){
                    colName.append(key);
                    colValue.append("?");
                    keyused=1;
                    break;
                }
            }
            if(keyused==0){
                colName.append(key);
                colValue.append("'").append(map.get(key)).append("'");
            }
            if(i<keys.size()){
                colName.append(",");
                colValue.append(",");
                i++;
            }
            keyused=0;
        }
        colName.append(")");
        colValue.append(")");
        sql="insert into "+tableName+colName.toString()+colValue.toString();
        return sql;
    }
    /**
     * 根据表名创建Updatesql 如果有大数据字段则忽略
     * @param tableName 表名
     * @param whereSql
     * @param blobStr 大数据字段
     * @param map 数据集
     * @param prepares 用户后续插入的字段名称
     * @return
     */
    public static String createUpdatesql(String tableName,String whereSql,String blobStr,Map<String,Object> map,String...prepares){
        String sql="";
        Set<String> keys=map.keySet();
        StringBuffer set=new StringBuffer("");
        int i=1;
        int keyused=0;
        for (String key : keys) {
            for (String prepare : prepares) {
                if(key.equals(prepare)){
                    set.append(key).append("=").append("?");
                    keyused=1;
                    break;
                }
            }
            if(key.equals(blobStr)){
                i++;
                continue;
            }
            if(keyused==0){
                set.append(key).append("='").append(map.get(key)).append("'");
            }
            if(i<keys.size()){
                set.append(",");
                i++;
            }
            keyused=0;
        }
        sql="update "+tableName+" set "+set.toString()+" "+whereSql;
        return sql;
    }
    /**
     * 根据表名创建Updatesql
     * @param tableName 表名
     * @param whereSql
     * @param map 数据集
     * @param prepares 用户后续插入的字段名称
     * @return
     */
    public static String createUpdatesql(String tableName,String whereSql,Map<String,Object> map,String...prepares){
        String sql="";
        Set<String> keys=map.keySet();
        StringBuffer set=new StringBuffer("");
        int i=1;
        int keyused=0;
        for (String key : keys) {
            for (String prepare : prepares) {
                if(key.equals(prepare)){
                    set.append(key).append("=").append("?");
                    keyused=1;
                    break;
                }
            }
            if(keyused==0){
                set.append(key).append("='").append(map.get(key)).append("'");
            }
            if(i<keys.size()){
                set.append(",");
                i++;
            }
            keyused=0;
        }
        sql="update "+tableName+" set "+set.toString()+" "+whereSql;
        return sql;
    }
    public static void close(Statement stmt,ResultSet rs){
        try {
            if(rs!=null){
                rs.close();
            }
            rs=null;
            if(stmt!=null){
                stmt.close();
            }
            stmt=null;
        } catch (SQLException e) {
            System.out.println("close Error");
            e.printStackTrace();
        }
    }
    public static void close(Statement stmt){
        try {
            if(stmt!=null){
                stmt.close();
            }
            stmt=null;
        } catch (SQLException e) {
            System.out.println("close Error");
            e.printStackTrace();
        }
    }
}
