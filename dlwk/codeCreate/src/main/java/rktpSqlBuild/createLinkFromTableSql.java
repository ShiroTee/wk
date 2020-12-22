package rktpSqlBuild;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashMap;
import java.util.Map;

//对整个数据库的建立索引；并给每个表添加，表的说明和字段的中文名；方便查询
//索引 Lucene 3.0.2
public class createLinkFromTableSql {
    private StringBuilder newsb = new StringBuilder();
    private ResultSet rs = null;
    private ResultSet tempRs = null;
    private ResultSetMetaData rsmd = null;
    private String tableName;
    private static Connection conn = JDBCUtil.getConn();
    private int t=20;

    public static void main(String[] args) throws Exception {
        new createLinkFromTableSql().getAllTableName();
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="select s.*,decode(substr(s.TABLE_NAME,0,2),'RK','人口','FR','法人','HG','宏观经济') type " +
                "from (select c.TABLE_NAME, wm_concat(c.COLUMN_NAME) COLUMN_NAME, wm_concat(c.COMMENTS) COMMENTS ,min(t.COMMENTS) tc" +
                "  from user_col_comments@jzk c" +
                "    left join user_tab_comments@jzk t" +
                "    on t.TABLE_NAME = c.TABLE_NAME" +
                " where (COLUMN_NAME like '%SFHM%' or COLUMN_NAME like '%SFZH%' or" +
                "       COLUMN_NAME like '%ZJHM%' or COLUMN_NAME like '%SF%')" +
                "   and c.TABLE_NAME not like '%$%' and c.TABLE_NAME not in ('RK_LHDJXX'," +
                "                            'RK_JHDJXX'," +
                "                            'RK_CZRK'," +
                "                            'RK_RKJBXX'," +
                "                            'RK_CZDBRYXX'," +
                "                            'YYZC_DBHC_2'," +
                "                            'YYZC_DBHC_1','FR_FRJBXX_1','IMPCZ')" +
                " group by c.TABLE_NAME) s";
        try {
            rs = JDBCUtil.execute(sql);
        } catch (Exception e) {
          e.printStackTrace();
        }
        while (rs.next()) {

            tableName = rs.getString("TABLE_NAME");
            String col=rs.getString("COLUMN_NAME");
            String type=rs.getString("TYPE");
            String tableComment=rs.getString("TC");
            System.out.println("");
            System.out.println("查询Table："+tableName+"@JZK");
            ResultSet tempRs = getDataFromTable(tableName);
            Map<String,String>  map= createDetailSql(tempRs,tableName+"@JZK",col);

          String  insert = "insert into RKTP_QUERY_LINK values" + "('"+tableName+"','v_rktp_rkjbxx','sfzjh','test','"+map.get("dsql")+"','"+map.get("col")+"','"+tableComment+"')";
            System.out.println("查询Table："+insert);
           JDBCUtil.execute(insert);

        }
    }

    // 取得表的数据
    public ResultSet getDataFromTable(String tableName) throws Exception {
        String sql = "select * from user_col_comments@jzk t where t.TABLE_NAME = '" + tableName+"'";
        //System.out.println("查询列SQL："+sql);
        return JDBCUtil.execute(sql);
    }

    //对特定表的记录，采用特定writer，索引
    //该方法是lucene的indexer的关键方法
    private Map<String,String> createDetailSql(ResultSet rs, String tableName, String col)
            throws Exception {
        Map<String,String> map =new HashMap<String, String>();
        if (rs == null) {
            return map;
        }
        String[] query=col.split(",");
        String cols="";
        String colDatas ="";
        int j=0;
        while (rs.next()) {
                String columnName = rs.getString("COLUMN_NAME");
                if("CREATE_TIME".equals(columnName) || "LASTMODIFY_TIME".equals(columnName)|| "ORG_CODE".equals(columnName)
                        || "BATCH_NO".equals(columnName)|| "STAGE_FLAG".equals(columnName)|| "ADU_FLAG".equals(columnName)
                        || "CARRIER_TYPE".equals(columnName)|| "CARRIER_NAME".equals(columnName)){

                }else{
                    if(j==0){
                        cols=cols+columnName;
                        colDatas=colDatas+columnName+":";
                    }else {
                        cols=cols+","+columnName;
                        colDatas=colDatas+","+columnName+":";
                    }
                    j++;
                }
        }
        String queryCodition="";
        for (int i = 0; i <query.length ; i++) {
            if(i==0) {
                queryCodition = query[i] + "=''query_code'' ";
            }else {
                queryCodition = queryCodition+" and "+query[i] + "=''query_code'' ";
            }
        }
       String  sql= "select "+cols+" from "+tableName+" where "+queryCodition;
        map.put("dsql",sql);
        map.put("col",colDatas);
       return map;
    }

}