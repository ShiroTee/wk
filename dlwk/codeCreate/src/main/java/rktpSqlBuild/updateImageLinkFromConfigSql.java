package rktpSqlBuild;

import java.sql.ResultSet;

//对整个数据库的建立索引；并给每个表添加，表的说明和字段的中文名；方便查询
//索引 Lucene 3.0.2
public class updateImageLinkFromConfigSql {
    private ResultSet rs = null;
    private String tableName;

    public static void main(String[] args) throws Exception {
        new updateImageLinkFromConfigSql().getAllTableName();
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="select table_name from rktp_query_link t ";
        try {
            rs = JDBCUtil.execute(sql);
        } catch (Exception e) {
          e.printStackTrace();
        }
        while (rs.next()) {

            tableName = rs.getString("TABLE_NAME");
            String configsql="select subject_image from rktp_query_config t  where t.table_name = '"+tableName+"'";
            try {
                 ResultSet rs2 = JDBCUtil.execute(configsql);
                while (rs2.next()){
                    String image = rs2.getString("SUBJECT_IMAGE");
                    String update = "update RKTP_QUERY_LINK set subject_image='"+image+"' where table_name ='"+tableName+"'";
                    System.out.print(update);
                    JDBCUtil.execute(update);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}