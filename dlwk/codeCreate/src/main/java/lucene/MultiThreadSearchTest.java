package lucene;

        import com.chenlb.mmseg4j.analysis.MaxWordAnalyzer;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.apache.lucene.util.Version;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

/**
 * 多线程多索引目录查询测试
 * @author Lanxiaowei
 *
 */
public class MultiThreadSearchTest {

    private static final String dict = "F:\\lucene\\temp\\data";
    //private static final String dir = "/Oracle/Middleware/user_projects/domains/aip/lucene/index";
    private static final String dir = "F:\\\\lucene\\\\temp\\\\index";
    private static Analyzer analyzer = new MaxWordAnalyzer(new File(dict));
    private static Directory directory = null;
    private static IndexReader ir =null;
    private static IndexSearcher search=null;
    public static void main(String[] args) throws InterruptedException, ExecutionException, IOException {
        long start = System.currentTimeMillis();
       List<Map> list = multiThreadAndMultiReaderSearch("赵");
        System.out.println(list.size());
        System.out.println("执行时间:" + (System.currentTimeMillis() - start) + "毫秒");

    }


    private static  List<Map> getField(){
        List<Map> list = new ArrayList<Map>();

        try{
            QueryRunner queryRunner = new QueryRunner();
            Connection conn = JDBCUtil.getConn();
            List<Map<String,Object>> configs = queryRunner.query(conn,"select * from RKTP_FORM_CONFIG t",new MapListHandler());
            for (int i = 0; i < configs.size(); i++) {
                String fields = objToString(configs.get(i).get("TABLE_FIELD"));
                String tableName = objToString(configs.get(i).get("TABLE_NAME"));
                String[] field = fields.split(",");
                field=changeField(field,tableName);
                Map<String,Object> map = new HashMap<String, Object>();
                map.put("field",field);
                map.put("table",tableName);
                list.add(map);
            }
        }catch (Exception e){
            System.out.println("索引查询失败");
            e.printStackTrace();
        }finally{
            JDBCUtil.close();
        }

        return list;
    }

    /* 字段前面添加表名
     */
    public  static String[] changeField(String[] fields,String tableName){
        int len=fields.length;
        String[] temp = new String[len];
        for(int i=0; i<len;i++ ){
            temp[i] = tableName +"__"+ fields[i];
        }

        return temp;
    }

    /**
     * 多索引目录且多线程查询，异步收集查询结果
     * @throws InterruptedException
     * @throws ExecutionException
     * @throws IOException
     */
    public static List<Map> multiThreadAndMultiReaderSearch(final String queryString) {
        int count = 5;
        ExecutorService pool = Executors.newFixedThreadPool(count);
        List<Map> lists = new ArrayList<Map>();
        try{
        directory = new SimpleFSDirectory(new File(dir));
        ir = IndexReader.open(directory);
        search = new IndexSearcher(ir);
        List<Map> list = getField();
        int sum=list.size();
        List<Future<Map>> futures = new ArrayList<Future<Map>>(sum);
        for (int i = 0; i < sum; i++) {
            final String[] fields = (String[])list.get(i).get("field");
            final String tableName = (String)list.get(i).get("table");
            futures.add(pool.submit(new Callable<Map>() {
                public Map call() throws Exception {
                    return isHasData(search, queryString,fields,tableName);
                }
            }));
        }

        //通过Future异步获取线程执行后返回的结果
        for (Future<Map> future : futures) {
              Map map =  future.get();
            boolean  flag=  (Boolean) map.get("flag");
            String table = map.get("table").toString();
           if(flag==true){
               lists.add(map);
               System.out.println(table+"--------"+flag);
           }
        }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } finally {
            //释放线程池资源
            pool.shutdown();
        }


        return lists;
    }

    public static Map isHasData(IndexSearcher search,String queryString,String[] fieds,String tableName){
        boolean flag = false;
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            MultiFieldQueryParser m = new MultiFieldQueryParser(Version.LUCENE_36, fieds, analyzer);
            m.setDefaultOperator(QueryParser.Operator.AND);
            Query query = m.parse(queryString);
            ScoreDoc[] hits = search.search(query, null, 1).scoreDocs;
            if(hits.length==1){
                flag = true;
            }

            map.put("table",tableName);
            map.put("flag",flag);
        } catch (IOException e){
            e.printStackTrace();
        } catch (ParseException e){
            e.printStackTrace();
        }

        return map;
    }

    private static String objToString(Object o){
        if(o==null){
            return "";
        }else{
            return  o.toString();
        }
    }

}

