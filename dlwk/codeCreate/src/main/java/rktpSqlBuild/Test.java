package rktpSqlBuild;

import java.sql.ResultSet;

//对整个数据库的建立索引；并给每个表添加，表的说明和字段的中文名；方便查询
//索引 Lucene 3.0.2
public class Test {
    private ResultSet rs = null;
    private String tableName;

    public static void main(String[] args) throws Exception {
        //new Test().getAllTableName();
        String data = "1111119999900202029939303";
        System.out.println(data.substring(0,data.length()-1));
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="select table_name,table_query_field from rktp_query_config t where query_field='sfzjh'";
        try {
            rs = JDBCUtil.execute(sql);
        } catch (Exception e) {
          e.printStackTrace();
        }
        while (rs.next()) {

            tableName = rs.getString("TABLE_NAME");
            String field = rs.getString("TABLE_QUERY_FIELD");

            String  insert = "insert into RKTP_QUERY_LINK values" +
                    "('v_rktp_rkjbxx','"+tableName+"','"+field+"','sfzjh','select m.xm,m.xb,m.sfzh,m.mz,m.mlxz,m.hyzk,m.jtgx from v_rktp_rkjbxx m where m.sfzh = ''query_code'' ','XM:姓名,XB:性别,SFZH:身份证号码,MZ:民族,MLXZ:家庭住址,HYZK:婚姻状况,JTGX:和户主关系','人员基本信息')";
            System.out.println("查询Table："+insert);
           JDBCUtil.execute(insert);

        }
    }
}