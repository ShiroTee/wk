package lucene;

import com.chenlb.mmseg4j.analysis.MaxWordAnalyzer;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.apache.lucene.util.Version;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.*;

public class LuceneUtil {
    private static String dir = "";
    private static Analyzer analyzer = null;
    private static Directory directory = null;
    private static IndexWriter indexWriter = null;
    private static final long daySpan =24 * 60 * 60 * 1000;

    public static void main(String[] args) {
        Map<String,String> map = JDBCUtil.getDIRProperties();
        String dict = map.get("dict");
        dir=map.get("dir");
        analyzer = new MaxWordAnalyzer(new File(dict));
        final LuceneUtil util = new LuceneUtil();
        //得到时间类
        Calendar date = Calendar.getInstance();
        //设置时间为 xx-xx-xx 00:00:00
        date.set(date.get(Calendar.YEAR), date.get(Calendar.MONTH), date.get(Calendar.DATE), 0, 0, 0);

        //得到定时器实例
        Timer t = new Timer();
        t.schedule(new TimerTask() {
            public void run() {
                System.out.println(new Date()+"开始删除索引");
                util.deleteIndexFile();
                System.out.println(new Date()+"删除索引成功");
                System.out.println(new Date()+"开始创建索引");
                util.timeCreateIndex();
                System.out.println(new Date()+"创建索引成功");
            }
        }, date.getTime(), daySpan); //daySpan是一天的毫秒数，也是执行间隔
    }

    private void timeCreateIndex(){
        try{
            QueryRunner queryRunner = new QueryRunner();
            Connection conn = JDBCUtil.getConn();
            List<Map<String,Object>> configs = queryRunner.query(conn,"select * from RKTP_FORM_CONFIG t",new MapListHandler());
            for (Map<String, Object> map : configs) {
                String fields = objToString(map.get("TABLE_FIELD"));
                String tableName = objToString(map.get("TABLE_NAME"));

                String indexSql = "select " + fields + " from " + tableName;
                List<Map<String, Object>> tableData = queryRunner.query(conn, indexSql, new MapListHandler());
                createIndexFile(tableData, tableName);
                System.out.println("表(" + tableName + ")索引完成");
            }
        }catch (Exception e){
            System.out.println("索引创建失败");
            e.printStackTrace();
        }finally{
            JDBCUtil.close();
        }
    }

    private void deleteIndexFile() {
        try {
            directory = new SimpleFSDirectory(new File(dir));
            // 创建的是哪个版本的IndexWriterConfig
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(
                    Version.LUCENE_36, analyzer);
            // 创建系统文件-----
            indexWriter = new IndexWriter(directory, indexWriterConfig);
            indexWriter.deleteAll();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            CloseResource();
        }
    }

    private void createIndexFile(List<Map<String, Object>> data, String tableName) {
        try {
            directory = new SimpleFSDirectory(new File(dir));
            // 创建的是哪个版本的IndexWriterConfig
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(
                    Version.LUCENE_36, analyzer);
            // 创建系统文件-----
            indexWriter = new IndexWriter(directory, indexWriterConfig);
            for (Map<String, Object> map : data) {
                //indexWriter添加索引
                Document doc = new Document();
                for (Map.Entry<String, Object> entry : map.entrySet()) {
                    String key = tableName + "__" + objToString(entry.getKey());
                    String value = objToString(entry.getValue());
                    //文本中添加内容
                    doc.add(new Field(key, value, Store.YES, Index.ANALYZED));
                }
                //添加到索引中去
                indexWriter.addDocument(doc);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            CloseResource();
        }
    }

    private static String objToString(Object o){
        if(o==null){
            return "";
        }else{
            return  o.toString();
        }
    }

    /*
  * 关闭资源
  */
    private static void CloseResource(){
        if (indexWriter != null) {
            try {
                indexWriter.commit();
                indexWriter.close();
                directory.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}