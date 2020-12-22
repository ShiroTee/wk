package com.digitalchina.decodeServer.count;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by dlms on 2016/9/26.
 */
public class CountDaoImpl  implements CountDao {

    @Override
    public boolean insertSubmitData(CountBean bean) {
        Connection conn = JDBCUtil.getConntion();
        QueryRunner queryRunner = new QueryRunner();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日HH时MM分ss秒SSS");
        String  time = formatter.format(new Date());
        String sql ="insert into olap_wbj_data (org_name,data_count,submit_date,data_type,circle,belong_circle,insert_date) " +
                "values (?,?,?,?,?,?,?)";
        Object[] params={bean.getOrgName(),bean.getDataCount(),bean.getSubmitDate(),bean.getDataType(),
                bean.getCircle(),bean.getBelongCircle(),time};
        int flag= 0;
        try {
            flag = queryRunner.update(conn,sql,params);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return flag==1?true:false;
    }

    @Override
    public  Map<String,Object> getCircle(String dataType,String orgName){
        QueryRunner queryRunner = new QueryRunner();
        Connection conn = JDBCUtil.getConntion();
        String sql ="select t.* from data_submit_date t where t.sjlmc='"+dataType+"' and t.wbjmc = '"+orgName+"'";

        Map<String,Object> circle = new HashMap<String, Object> ();
        try {
            circle= queryRunner.query(conn,sql, new MapHandler());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return circle;
    }
}
