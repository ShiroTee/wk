package com.digitalchina.ldp.app.csdsc.lucene;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class JDBCUtil {
    public static Connection conn = null;
    private static String fileName="/dbconfig.properties";
    private static String driver = "";
    private static String url = "";
    private static String username ="";
    private static String password = "";

    // 建立连接
    public static Connection getConntion() {
        getDBProperties();
        try {
            Class.forName(driver);
            conn = DriverManager.getConnection(url,username,password);
        } catch (SQLException ex) {
            ex.printStackTrace();
            System.out.print("获取连接异常");
        } catch (ClassNotFoundException ex) {
            System.out.print("加载驱动出错");
            ex.printStackTrace();;
        }

        return conn;
    }

    static void close() {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static Connection getConn() {
        if(conn==null){
            getConntion();
        }
        return conn;
    }
    public static void getDBProperties(){
        Properties p = new Properties();
        try {
            InputStream in = JDBCUtil.class.getResourceAsStream(fileName);
            p.load(in);
            in.close();
            if(p.containsKey("driver")){
                driver = p.getProperty("driver");
            }
            if(p.containsKey("url")){
                url = p.getProperty("url");
            }
            if(p.containsKey("user")){
                username = p.getProperty("user");
            }
            if(p.containsKey("password")){
                password = p.getProperty("password");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Map<String,String> getDIRProperties(){
        Map<String,String> map = new HashMap<String,String>();
        Properties p = new Properties();
        try {
            InputStream in = JDBCUtil.class.getResourceAsStream(fileName);
            p.load(in);
            in.close();
            if(p.containsKey("dict")){
                map.put("dict", p.getProperty("dict"));
            }
            if(p.containsKey("dir")){
                map.put("dir", p.getProperty("dir"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }

    public static Map<String,String> getIsRunProperties(){
        Map<String,String> map = new HashMap<String,String>();
        Properties p = new Properties();
        try {
            InputStream in = JDBCUtil.class.getResourceAsStream(fileName);
            p.load(in);
            in.close();
            if(p.containsKey("isrun")){
                map.put("isrun", p.getProperty("isrun"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }

}