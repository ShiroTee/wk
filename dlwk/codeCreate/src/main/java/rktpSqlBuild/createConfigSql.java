package rktpSqlBuild;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashMap;
import java.util.Map;

//对整个数据库的建立索引；并给每个表添加，表的说明和字段的中文名；方便查询
//索引 Lucene 3.0.2
public class createConfigSql {
    private StringBuilder newsb = new StringBuilder();
    private ResultSet rs = null;
    private ResultSet tempRs = null;
    private ResultSetMetaData rsmd = null;
    private String tableName;
    private static Connection conn = JDBCUtil.getConn();
    private int t=20;
    private final String dataBase = "@jzk";

    public static void main(String[] args) throws Exception {
        new createConfigSql().getAllTableName();
    }

    //查询所有的表，并遍历所有的表；
    public void getAllTableName() throws Exception {
        String sql="  select w.*,decode(substr(w.TABLE_NAME,0,2),'RK','人口','FR','法人','HG','宏观经济','ZX','征信') type from (" +
                "select s.TABLE_NAME,wm_concat(s.COLUMN_NAME) column_name ,wm_concat(s.COMMENTS) comments,min(t1.COMMENTS) tc" +
                "  from user_col_comments@jzk s" +
                "   left join user_tab_comments@jzk t1 on s.TABLE_NAME=t1.TABLE_NAME" +
                "   left join user_tables@jzk t on s.TABLE_NAME=t.TABLE_NAME" +
                " where (s.COLUMN_NAME like '%DHHM%' or s.COLUMN_NAME like '%LXDH%' or  s.COLUMN_NAME like '%LXFS%' " +
                "  or  s.COLUMN_NAME like '%SJHM%' or  s.COLUMN_NAME like '%FRDH%' or" +
                "      s. COLUMN_NAME like '%DH%')" +
                "   and s.TABLE_NAME not like '%$%' and  t.num_rows >1" +
                " group by s.TABLE_NAME）w ";
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
            System.out.println("查询Table："+tableName+"@jzK");
            ResultSet tempRs = getDataFromTable(tableName);
            Map<String,String>  map= createDetailSql(tempRs,tableName+"@JZK",col);
            String ssql=createSubjectSql(tableName+"@JZK",type,col);

           String  insert = "insert into RKTP_QUERY_CONFIG_bak values" +
                   "('"+tableName+"','"+tableComment+"','"+type+"','"+ssql+"','类别,名字,关系,比重,唯一标识','dhhm','"+col+"','ID','"+map.get("dsql")+"','"+map.get("col")+"','')";
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
                String comments =rs.getString("COMMENTS");
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
                    if(comments!=null && comments.indexOf("?")==-1){
                        colDatas=colDatas + comments;
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
    //select 1 category,c.zjhm name,'关联' relation,7 value,c.zjhm uuid from RK_CZDBRYXX@Jzk c where c.sfzhm ='query_code'

    private String createSubjectSql(String tableName,String type,String col){
        String Sql ="select ";
        if("人口".equals(type)){
            Sql=Sql+" 1 category,";
        }else if("法人".equals(type)){
            Sql=Sql+" 2 category,";
        }else if("宏观经济".equals(type)){
            Sql=Sql+" 3 category,";
        }
        t=t+1;
        Sql=Sql+"c.zjhm name,''关联'' relation,"+t+" value,c.zjhm uuid from "+ tableName;
       String[] query=col.split(",");
       String queryCodition="";
       for (int i = 0; i <query.length ; i++) {
           if(i==0) {
               queryCodition = query[i] + "=''query_code'' ";
           }else {
               queryCodition = queryCodition+" and "+query[i] + "=''query_code'' ";
           }
       }
        Sql=Sql+" "+queryCodition;
        return Sql;
    }
}