package com.digitalchina.ldp.app.csdsc.lucene;

import com.chenlb.mmseg4j.analysis.MaxWordAnalyzer;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.document.Fieldable;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser.Operator;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.highlight.Formatter;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.apache.lucene.util.Version;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.sql.Connection;
import java.util.*;

public class LuceneUtil {
    static String dict = "";
    static String dir = "";
    static Analyzer analyzer = null;
    static final int pageNum=100000;
    public static void main(String[] args) {
        LuceneUtil util = new LuceneUtil();
        Map<String,String> map = JDBCUtil.getDIRProperties();
        dict=map.get("dict");
        dir=map.get("dir");
        analyzer = new MaxWordAnalyzer(new File(dict));
        util.recreateIndex();
//    	final
//    	String isRun = JDBCUtil.getIsRunProperties().get("isrun");
//
//        //得到时间类
//        Calendar date = Calendar.getInstance();
//        date.set(Calendar.HOUR_OF_DAY, 1); //凌晨1点
//        date.set(Calendar.MINUTE, 0);
//        date.set(Calendar.SECOND, 0);
//
//        //如果第一次执行定时任务的时间 小于当前的时间
//        //此时要在 第一次执行定时任务的时间加一天，以便此任务在下个时间点执行。如果不加一天，任务会立即执行。
//        if (date.getTime().before(new Date())) {
//        	 date.add(Calendar.DAY_OF_MONTH, 1);
//        }
//
//        if("true".equals(isRun)){
//        	util.recreateIndex();
//        }
//
//        //一天的毫秒数
//        long daySpan =24 * 60 * 60 * 1000;
//        //得到定时器实例
//        Timer t = new Timer();
//        t.schedule(new TimerTask() {
//            public void run() {
//            	util.recreateIndex();
//            }
//        }, date.getTime(), daySpan); //daySpan是一天的毫秒数，也是执行间隔
    }

    public  void recreateIndex(){
        //删除索引
        this.deleteIndexFile();
        //创建索引
        this.timeCreateIndex();
    }

    public void timeCreateIndex(){
        System.out.println(new Date()+"begin create index");
        QueryRunner queryRunner = new QueryRunner();
        Connection conn = JDBCUtil.getConntion();
        try{
            if(conn==null){
                conn = JDBCUtil.getConntion();
            }
            List<Map<String,Object>> configs = queryRunner.query(conn,"select * from RKTP_FORM_CONFIG t",new MapListHandler());
            for(int i=0 ,len=configs.size(); i<len;i++){
                Map<String,Object> map = configs.get(i);
                String fields =objToString(map.get("TABLE_FIELD"));
                String tableName =objToString(map.get("TABLE_NAME"));
                String countSql =  "select count(*) sum from "+  tableName;
                Map<String,Object> countMap = queryRunner.query(conn,countSql,new MapHandler());
                long sum = Long.parseLong(countMap.get("SUM")==null?"0":countMap.get("SUM").toString());
                long loop = 0;
                if(sum%pageNum==0){
                    loop=sum/pageNum;
                }else{
                    loop=sum/pageNum+1;
                }
                System.out.println(new Date()+"table("+tableName+")，tatal:"+sum+"");
                for(long j=0;j<loop;j++){
                    String indexsql="";
                    if(j==(loop-1)){
                        indexsql = "select " +fields+" from (select r.*,ROWNUM RN from "+  tableName+
                                " r where ROWNUM <="+sum +" ) t where t.RN >"+j*pageNum;
                        if(conn==null){
                            conn = JDBCUtil.getConntion();
                        }
                        List<Map<String,Object>> tabledata = queryRunner.query(conn,indexsql,new MapListHandler());
                        createIndexFile(tabledata,tableName);
                        System.out.println("Already index:"+sum);
                    }else{
                        indexsql = "select " +fields+" from (select r.*,ROWNUM RN from "+  tableName+
                                " r where ROWNUM <="+(j+1)*pageNum +") t where t.RN >"+j*pageNum;
                        if(conn==null){
                            conn = JDBCUtil.getConntion();
                        }
                        List<Map<String,Object>> tabledata = queryRunner.query(conn,indexsql,new MapListHandler());
                        createIndexFile(tabledata,tableName);
                        System.out.println("Already index"+((j+1)*pageNum));
                    }
                }
                System.out.println(new Date()+"  table("+tableName+") index complete");
            }
            System.out.println(new Date()+"  create index is Ok ");
        }catch (Exception e){
            System.out.println(new Date()+"  create index is failed ");
            e.printStackTrace();
        }finally{
            JDBCUtil.close();
        }
    }

    public void deleteIndexFile() {
        System.out.println(new Date()+"  starting delete index");
        IndexWriter indexWriter = null;
        Directory directory = null;
        try {
            directory = new SimpleFSDirectory(new File(dir));
            // 创建的是哪个版本的IndexWriterConfig
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(
                    Version.LUCENE_36, analyzer);
            // 创建系统文件-----
            indexWriter = new IndexWriter(directory, indexWriterConfig);
            indexWriter.deleteAll();
            System.out.println(new Date()+"   delete index is ok ");
        } catch (IOException e) {
            System.out.println(new Date()+"   delete index is failed ");
            e.printStackTrace();
        } finally {
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

    public void createIndexFile(List<Map<String,Object>> data,String tableName) {
        IndexWriter indexWriter = null;
        Directory directory = null;
        try {
            directory = new SimpleFSDirectory(new File(dir));
            // 创建的是哪个版本的IndexWriterConfig
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(
                    Version.LUCENE_36, analyzer);
            // 创建系统文件-----
            indexWriter = new IndexWriter(directory, indexWriterConfig);
            //访问数据库拿数据
            int len = data.size();
            for(int i=0;i<len;i++){
                Map<String,Object> map = data.get(i);
                //indexWriter添加索引
                Document doc = new Document();
                for (Map.Entry<String, Object> entry : map.entrySet())  {
                    String key = tableName+"__"+objToString(entry.getKey());
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

    /* 字段前面添加表名
     */
    public String[] changeField(String[] fields,String tableName){
        int len=fields.length;
        String[] temp = new String[len];
        for(int i=0; i<len;i++ ){
            temp[i] = tableName +"__"+ fields[i];
        }

        return temp;
    }
    public List<Map<String,String>> seacher(String key,String[] fieds){
        List<Map<String,String>> rlist = new ArrayList<Map<String,String>>();
        Directory directory = null;
        IndexReader ir = null;
        IndexSearcher search = null;
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
                    String frament = highlighter.getBestFragment(ts,fieldValue);
                    if(frament == null){
                        frament = fieldValue;
                    }
                    rmap.put(fieldName,frament);
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
            try {
                search.close();
                ir.close();
                directory.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return rlist;
    }

    public boolean isHasData(String queryString,String[] fieds){
        boolean flag = false;
        Directory directory = null;
        IndexReader ir =null;
        IndexSearcher search=null;
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
            try {
                search.close();
                ir.close();
                directory.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return flag;
    }
    public static String objToString(Object o){
        if(o==null){
            return "";
        }else{
            return  o.toString();
        }
    }


}