package lucene;

/**
 * Created by dlms on 2016/6/7.
 */

import com.chenlb.mmseg4j.analysis.MaxWordAnalyzer;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.document.Fieldable;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser.Operator;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.apache.lucene.util.Version;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LuceneSearch{
    //private static final String dict = "/Oracle/Middleware/user_projects/domains/aip/lucene/dict";
    private static final String dict = "F:\\lucene\\temp\\data";
    //private static final String dir = "/Oracle/Middleware/user_projects/domains/aip/lucene/index";
    private static final String dir = "F:\\\\lucene\\\\temp\\\\index";
    private static Analyzer analyzer = new MaxWordAnalyzer(new File(dict));
    private static Directory directory = null;
    private static IndexReader ir =null;
    private static IndexSearcher search=null;
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        getField();
        System.out.println("执行时间:" + (System.currentTimeMillis() - start) + "毫秒");
    }


    private static void getField(){
        try{
            QueryRunner queryRunner = new QueryRunner();
            Connection conn = JDBCUtil.getConn();
            int n=0;
            List<Map<String,Object>> configs = queryRunner.query(conn,"select * from RKTP_FORM_CONFIG t ",new MapListHandler());
            for (int i = 0; i < configs.size(); i++) {
                String fields = objToString(configs.get(i).get("TABLE_FIELD"));
                String tableName = objToString(configs.get(i).get("TABLE_NAME"));
                String[] field = fields.split(",");
                field=changeField(field,tableName);
                boolean flag = isHasData("赵",field);
                if(flag==true) {
                    System.out.println("标志：" + flag);
                    n++;
                }
            }
            System.out.println(n);


        }catch (Exception e){
            System.out.println("索引查询失败");
            e.printStackTrace();
        }finally{
            JDBCUtil.close();
        }
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
    public static List<Map<String,String>> seacher(String key,String[] fieds){
        List<Map<String,String>> rlist = new ArrayList<Map<String,String>>();
        try {
            directory = new SimpleFSDirectory(new File(dir));
            System.out.println("查询条件:" + key);
            ir = IndexReader.open(directory);
            long start = System.currentTimeMillis();
            search = new IndexSearcher(ir);
            MultiFieldQueryParser m = new MultiFieldQueryParser(Version.LUCENE_36, fieds, analyzer);
            m.setDefaultOperator(Operator.AND);
            Query query = m.parse(key);
            ScoreDoc[] hits = search.search(query, null, 1000).scoreDocs;
            Formatter formatter = new SimpleHTMLFormatter("<span style='color:red'>","</span>");
            Highlighter highlighter = new Highlighter(formatter, new QueryScorer(query));
            System.out.println("共命中" + hits.length + "条记录");

            for (ScoreDoc scoreDoc : hits) {
                List<Fieldable> list = search.doc(scoreDoc.doc).getFields();
                Map<String,String> rmap = new HashMap<String,String>();
                for (Fieldable fieldable : list) {
                    String fieldName = fieldable.name();
                    String fieldValue = fieldable.stringValue();
                    TokenStream ts = analyzer.tokenStream(fieldName, new StringReader(fieldValue));
                    String fragment = highlighter.getBestFragment(ts,fieldValue);
                    if(fragment == null){
                        fragment = fieldValue;
                    }
                    rmap.put(fieldName,fragment);
                }
                rlist.add(rmap);
            }
            System.out.println("执行时间:" + (System.currentTimeMillis() - start) + "毫秒");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (InvalidTokenOffsetsException e) {
            e.printStackTrace();
        }finally {
            CloseResource();
        }
        return rlist;
    }

    public static boolean isHasData(String queryString,String[] fieds){
        boolean flag = false;
        try {
            directory = new SimpleFSDirectory(new File(dir));
            ir = IndexReader.open(directory);
            search = new IndexSearcher(ir);
            MultiFieldQueryParser m = new MultiFieldQueryParser(Version.LUCENE_36, fieds, analyzer);
            m.setDefaultOperator(Operator.AND);
            Query query = m.parse(queryString);
            ScoreDoc[] hits = search.search(query, null, 1).scoreDocs;
            if(hits.length==1){
                flag = true;
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }finally {
            CloseResource();
        }

        return flag;
    }

    /*
* 关闭资源
*/
    private static void CloseResource(){
            try {
                search.close();
                ir.close();
                directory.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
    }


    private static String objToString(Object o){
        if(o==null){
            return "";
        }else{
            return  o.toString();
        }
    }
}
