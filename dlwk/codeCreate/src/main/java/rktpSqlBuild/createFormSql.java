package rktpSqlBuild;

import java.sql.ResultSet;

//对整个数据库的建立索引；并给每个表添加，表的说明和字段的中文名；方便查询
//索引 Lucene 3.0.2
public class createFormSql {
    private ResultSet rs = null;
    private String tableName;

    public static void main(String[] args) throws Exception {
        new createFormSql().getAllTableName();
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="select * from rktp_query_config t where table_name not in ('dlsgaj_clxx'," +
                "'FR_CXGYYQGJSWJSWDJBGXX'," +
                "'FR_CXGYYQGJSWJSWDJXX'," +
                "'FR_DSJFZCHXX'," +
                "'FR_DSJSWDJXX'," +
                "'FR_DWNSRSWDJXX'," +
                "'FR_GAJYZDHXPGMDWXX'," +
                "'FR_GAJYZDHXPYSDWXX'," +
                "'FR_JTJDLYSJYXKXX'," +
                "'RK_AJJAQGLRYXX'," +
                "'RK_AJJDWZYFZRXX'," +
                "'RK_AJJTZZYRYXX'," +
                "'RK_CSZXX'," +
                "'RK_CZDBRYXX'," +
                "'RK_FWZLDJ'," +
                "'RK_FYZXRY'," +
                "'RK_GAJBAYXX'," +
                "'RK_GAJZTRYXX'," +
                "'RK_GGZLZFRYXX'," +
                "'RK_GTJYSWDJXX'," +
                "'RK_HSZYZGZXX'," +
                "'RK_JHSYJSFWRYZYZGZXX'," +
                "'RK_JLFZDXXX'," +
                "'RK_LZZFRYXX'," +
                "'RK_RSJCXJMYLBXCBDJXX'," +
                "'RK_RSJCXJMYLBXJBXX'," +
                "'RK_RSJDWZGYLBXCBDJXX'," +
                "'RK_RSJDWZGYLBXJBXX'," +
                "'RK_RSJRYSYBXCBDJXX'," +
                "'RK_SWRKXX'," +
                "'RK_SYDWRYXX'," +
                "'RK_TBFZDXXX'" +
                "'RK_WSJZYYSZCXX'," +
                "'RK_ZXFYJRYFXX'," +
                "'v_rktp_fcxx'," +
                "'v_rktp_gzdw'," +
                "'v_rktp_hydjxx'," +
                "'v_rktp_lkzdxx'," +
                "'v_rktp_rkjbxx'," +
                "'v_rktp_vehicle')";
        try {
            rs = JDBCUtil.execute(sql);
        } catch (Exception e) {
          e.printStackTrace();
        }
        while (rs.next()) {

            tableName = rs.getString("TABLE_NAME")+"@JZK";
            String desc=rs.getString("TABLE_DESC");
            String belong = rs.getString("TABLE_BELONG");
            String detail_sql=rs.getString("DETAIL_SQL");
            String[] s =  detail_sql.split("select");
            if(s.length==1){
                s=detail_sql.split("SELECT");
            }
            String[] d =  s[1].split("from");
            if(d.length==1){
                d= s[1].split("FROM");
            }


          String  insert = "insert into rktp_form_config values" + "('"+tableName+"','"+desc+"','"+belong+"','"+
                  d[0].replace("'","''").replace("t.","").replace("c.","").replace("s.","").replace(" ","")+"','人社局')";
            System.out.println("查询Table："+insert);
           JDBCUtil.execute(insert);

        }
    }
}