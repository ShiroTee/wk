package rktpSqlBuild;

import java.sql.ResultSet;

//对整个数据库的建立索引；并给每个表添加，表的说明和字段的中文名；方便查询
//索引 Lucene 3.0.2
public class createLinkFromConfigSql {
    private ResultSet rs = null;
    private String tableName;

    public static void main(String[] args) throws Exception {
        new createLinkFromConfigSql().getAllTableName();
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="select * from rktp_query_config t where query_field='sfzjh'";
        try {
            rs = JDBCUtil.execute(sql);
        } catch (Exception e) {
          e.printStackTrace();
        }
        while (rs.next()) {

            tableName = rs.getString("TABLE_NAME")+"@JZK";
            String desc=rs.getString("TABLE_DESC");
            String query_field = rs.getString("TABLE_QUERY_FIELD");
            String detail_sql=rs.getString("DETAIL_SQL");
            String subject_sql = rs.getString("SUBJECT_SQL");
            String detail_desc=rs.getString("DETAIL_FIELD_DESC");

            String[] s =  detail_sql.split("where");
            if(s.length==1){
                s=detail_sql.split("WHERE");
            }
            String[] d =  subject_sql.split("where");
            if(d.length==1){
                d= subject_sql.split("WHERE");
            }
            String detail_link_sql = s[0]+"where"+d[1];
            detail_link_sql =detail_link_sql.replace("'","''");
            String  insert = "insert into RKTP_QUERY_LINK values" +
                    "('"+tableName+"','v_rktp_rkjbxx','sfzjh','"+query_field+"','"+ detail_link_sql+"','"+detail_desc+"','"+desc+"')";
            System.out.println("查询Table："+insert);
           JDBCUtil.execute(insert);

        }
    }
}