package codingcode;// 数据库查询类
//JDBCUtil用于取得连接；JDBCUtil.execute(sql)用于执行SQL，并返回resultset.
import org.apache.commons.dbutils.QueryRunner;

import java.sql.*;

public class JDBCUtil {
    public static Connection conn = null;

    // 建立连接
    static void getConntion() {
        try {
            String driver_class = "oracle.jdbc.driver.OracleDriver";
            String connection_url = "jdbc:oracle:thin:@1.10.4.190:1521/etldb";
            String user_name = "csdsc";
            String db_password = "its78888";
            Class.forName(driver_class);
            conn = DriverManager.getConnection(connection_url, user_name,
                    db_password);
            conn.setAutoCommit(false);
            QueryRunner queryRunner = new QueryRunner();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 查询后，得到数据
    public static ResultSet execute(String sql) throws Exception {
        // 取得连接
        if(conn==null) {
            getConntion();
        }
        // 写SQL
        // 得到一个statment对象
        Statement stmt = conn.createStatement();
        // 得到一个结果集
        ResultSet rs= stmt.executeQuery(sql);
        conn.commit();
        return rs;
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
        return conn;
    }

    public static void setConn(Connection conn) {
        conn = conn;
    }
}