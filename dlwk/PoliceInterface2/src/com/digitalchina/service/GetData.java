package com.digitalchina.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

import com.digitalchina.util.ImageUtil;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.digitalchina.gaInterface.impl.GAInterfaceImpl;
import com.digitalchina.util.StaticUtil;
import sun.plugin2.applet.Applet2ClassLoaderCache;

public class GetData extends Thread{

    private GAInterfaceImpl in = new GAInterfaceImpl();
    private String method;

    public GetData(String method) {
        super(method);
        this.method = method;
    }

    @Override
    public void run() {
        excute(in,method);
    }

    public static void excute(GAInterfaceImpl in,String method){
        String readPath=StaticUtil.getReadFilePath(method);
        String writePath =StaticUtil.getWriteFilePath(method);
        String queryItem=StaticUtil.getQueryItem(method);
        String queryType=StaticUtil.getQueryType(method);
        System.out.println(queryType);
        BufferedReader br=null;
        BufferedWriter writer = null;
        try {
            writer = new BufferedWriter(new FileWriter(new File(writePath),true));
            br=new BufferedReader(new InputStreamReader(new FileInputStream(new File(readPath)),"utf-8"));
            String s="";
            while ((s=br.readLine())!=null) {
                System.out.println(s);
                String xml = in.commonDataQuery(s,queryItem,method,queryType);
                System.out.println(xml);
                if(!"".equals(xml) || xml!=null){
                    String data="";
                    try{
                        data = xmlHandle(xml,method);
                    }catch (NullPointerException e){
                        e.printStackTrace();
                    }catch (Exception e) {
                        e.printStackTrace();
                    }

                    writer.write(data);

                }

            }
            System.out.println(queryItem);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            try {
                if(writer!=null)
                    writer.close();
                if(br!=null)
                    br.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 对接口数据处理，
     * @param xml
     * @return
     * @throws Exception
     */
    public static String xmlHandle(String xml,String dataMethod) throws Exception{

        Map<Integer,String> map=new HashMap<Integer, String>();
        String data="";
        Document doc = null;
        try {
            doc = DocumentHelper.parseText(xml);
        } catch (DocumentException e) {
            e.printStackTrace();
            return null;// null;
        }
        if(doc==null){
            return "";
        }
        Element root=doc.getRootElement();
        if(root==null){

            return "";
        }

        Element method=root.element("Method");
        if(method==null){
            return "";
        }
        Element items=method.element("Items");
        if(items==null){
            return "";
        }
        Element item=items.element("Item");
        if(item==null){
            return "";
        }
        Element dataValue=item.element("Value");
        if(dataValue==null){
            return "";
        }

        Iterator rows = dataValue.elementIterator("Row");
        if(rows==null){

            return "";
        }
        int rownum=0;
        String code="";
        while (rows.hasNext()) {
            Element rowEle = (Element) rows.next();
            Iterator itersElIterator = rowEle.elementIterator();
            int i=1;
            HashMap tmp = new HashMap();
            // 遍历Header节点下的Response节点
            while (itersElIterator.hasNext()) {
                Element dataEle = (Element) itersElIterator.next();
                String text=dataEle.getText();
                if(rownum==0) {
                    System.out.println("返回数据的状态码：" + text);
                }
                if(rownum==0 || text.equals("000"))break;
                if(rownum==0 || text.equals("999")){
                    code=text;
                    break;
                }
                if(rownum==1){
                    map.put(i, text);
                }else{
                    String name = map.get(i);
                    if(dataMethod.equals("YNCZRKCX") || dataMethod.equals("YNCZRK") || dataMethod.equals("YNCZRK")){
                        tmp.put(name, text);
                    }
                    if(!name.equals("XP")){
                        if(i==1){
                            data=data+name+":"+text;
                        }else{
                            data=data+","+name+":"+text;
                        }
                    }
                }
                i++;
            }
            if(i>1 && rownum>1){
                if (dataMethod.equals("YNCZRKCX") || dataMethod.equals("YNCZRK") || dataMethod.equals("YNCZRK")){
                    saveImageFile(tmp);
                }
                data=data+System.getProperty("line.separator");
            }
            if(code.equals("999")){
                break;
            }
            rownum++;
        }
        if(rownum>1){
            System.out.println(data);
            return data;
        }
        return "";
    }

    public static void saveImageFile(HashMap<String, Object> map) {

        String sfzh = "";
        String xm = "";
        for (String key : map.keySet()) {

            if (key.equals("XM")) {
                xm = (String)map.get(key);
            }
            if ((key.equals("SFZH")) || (key.equals("JSZH"))) {
                sfzh = (String)map.get(key);
            }
        }

           String xp=(String)map.get("XP");
            try {
                ImageUtil.writeImageFile(StaticUtil.getFilePath() + sfzh + "-" + xm + ".jpg", xp);
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(sfzh + "writeImage Error!");
            }finally {
                System.out.println(xp);
            }
    }

}
