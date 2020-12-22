package com.digitalchina.ldp.app.csdsc.lucene;

import com.chenlb.mmseg4j.analysis.MaxWordAnalyzer;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
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
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.queryParser.QueryParser.Operator;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.apache.lucene.util.Version;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.*;

public class LuceneUtil {
    private static String dir = "";
    private static Analyzer analyzer =null;
    private static Directory directory = null;
    private static IndexReader ir =null;
    private static IndexSearcher search=null;
    //获取配置信息
    static {
       Map<String,String> map= getDIRProperties();
        String dict = map.get("dict");
        dir = map.get("dir");
        analyzer = new MaxWordAnalyzer(new File(dict));
    }

    public static void createIndexFile(List<Map<String,Object>> data,String tableName) {
        IndexWriter indexWriter = null;
        Directory directory = null;
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
                    String key = tableName + "__" + StringUtils.objToString(entry.getKey());
                    String value = StringUtils.objToString(entry.getValue());
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
    public  static String[] changeField(String[] fields,String tableName){
        int len=fields.length;
        String[] temp = new String[len];
        for(int i=0; i<len;i++ ){
            temp[i] = tableName +"__"+ fields[i];
        }

        return temp;
    }
    /*
        查询lucene数据，分页
     */
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
                Map<String,String> rmap = getData(list,highlighter);
               rlist.add(rmap);
            }
            System.out.println("执行时间:" + (System.currentTimeMillis() - start) + "毫秒");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }finally {
            CloseResource();
        }
        return rlist;
    }

    /*
        查询lucene数据，分页
     */
    public static List<Map<String,String>> seacher(String key,String[] fieds,int pageSize,int currentPage){
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
            TopDocs topDocs = search.search(query, 1000);
            int totalCount = topDocs.totalHits;
            ScoreDoc[] hits = topDocs.scoreDocs;
            Formatter formatter = new SimpleHTMLFormatter("<span style='color:red'>","</span>");
            Highlighter highlighter = new Highlighter(formatter, new QueryScorer(query));
            System.out.println("共命中" + hits.length + "条记录");

            //查询起始记录位置
            int begin = pageSize * (currentPage - 1);
            //查询终止记录位置
            int end = Math.min(begin + pageSize, totalCount);

            for(int i=begin;i<end;i++) {
                List<Fieldable> list = search.doc(hits[i].doc).getFields();
                Map<String,String> rmap = getData(list,highlighter);
                rlist.add(rmap);
            }
            System.out.println("执行时间:" + (System.currentTimeMillis() - start) + "毫秒");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } finally {
            CloseResource();
        }
        return rlist;
    }

    /**
     * 多线程查询，异步收集查询结果
     * @throws InterruptedException
     * @throws ExecutionException
     * @throws IOException
     */
    public static List<Map<String,Object>> multiThreadSearch(final String queryString,List<Map<String,Object>> list) {
        int count = 5;
        ExecutorService pool = Executors.newFixedThreadPool(count);
        List<Map<String,Object>> lists = new ArrayList<Map<String,Object>>();
        try{
            directory = new SimpleFSDirectory(new File(dir));
            ir = IndexReader.open(directory);
            search = new IndexSearcher(ir);
            int sum=list.size();
            List<Future<Map>> futures = new ArrayList<Future<Map>>(sum);
            for (int i = 0; i < sum; i++) {
                String[] column = StringUtils.objToString(list.get(i).get("TABLE_FIELD")).toUpperCase().split(",");
                String table = StringUtils.objToString(list.get(i).get("TABLE_NAME"));
                final String[] fields = changeField(column,table);
                final Map tableMap = list.get(i);
                futures.add(pool.submit(new Callable<Map>() {
                    public Map call() throws Exception {
                        return isHasData(search, queryString,fields,tableMap);
                    }
                }));
            }

            //通过Future异步获取线程执行后返回的结果
            for (Future<Map> future : futures) {
                Map rmap =  future.get();
                boolean flag=  (Boolean) rmap.get("flag");
                if(flag==true){
                    Map<String,Object> map = (Map)rmap.get("table");
                    Map<String,Object> subject=new HashMap<String,Object>();
                    subject.put("tableName",map.get("TABLE_NAME"));
                    subject.put("tableDesc",map.get("TABLE_DESC"));
                    subject.put("tableDepartment",map.get("TABLE_DEPARTMENT"));
                    subject.put("tableBelong",map.get("TABLE_BELONG"));
                    subject.put("value",queryString);
                    lists.add(subject);
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
            CloseResource();
        }


        return lists;
    }

    public static Map isHasData(IndexSearcher search,String queryString,String[] fieds,Map tableMap){
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

            map.put("table",tableMap);
            map.put("flag",flag);
        } catch (IOException e){
            e.printStackTrace();
        } catch (ParseException e){
            e.printStackTrace();
        }

        return map;
    }

    /*
        是存在满足查询条件的值
     */
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
        组装查询的结果
     */
    private static Map<String,String> getData(List<Fieldable> list,Highlighter highlighter){
        Map<String,String> rmap = new HashMap<String,String>();
        try {
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

        }catch(IOException e){
            e.printStackTrace();
        } catch (InvalidTokenOffsetsException e) {
            e.printStackTrace();
        }
        return rmap;
    }

    /*
     * 关闭资源
     */
    private static void  CloseResource(){
        try {
            if(search!=null){
                search.close();
            }
            if(ir!=null) {
                ir.close();
            }
            if(directory!=null){
              directory.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /*
        获得lucene索引的存储位置
     */
    private static Map<String,String> getDIRProperties(){
        Map<String,String> map = new HashMap<String,String>();
        Properties p = new Properties();
        try {
            String fileName = "/csdsc/config/sysparam.properties";
            InputStream in = LuceneUtil.class.getResourceAsStream(fileName);
            p.load(in);
            in.close();
            if(p.containsKey("dict")){
                map.put("dict", p.getProperty("dict"));
            }
            if(p.containsKey("dir")){
                map.put("dir", p.getProperty("dir"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }
}