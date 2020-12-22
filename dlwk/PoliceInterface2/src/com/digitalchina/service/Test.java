package com.digitalchina.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;


public class Test {

    private static final String basePath ="D:/xxzyzx/txt/";
    /*
     * @param args
     */
    public static void main(String[] args) {
        String methods = "YNCZRK,YNLDCSXX,YNDLLDYXX,YNGYRYLLXX,YNZTRYXX,YNSBRYXX,YNJWLSZSXX,YNSDRYXX,"
                +"YNCLWZCFXX,YNJSY,YNJDC,YNCLWZRYXX,YNESJDCXX,YNSBDWXX,YNSZRYXX,YNWBSWRYXX,"
                +"YNZZRKCX,YNCZRKCX,YNLGXXCX,YNGYRYXX,YNGNLKCX,YNSMZSPXX,YNBDQCXX";
        String[] method = methods.split(",");
        ///保存属性到b.properties文件
        try {
            // 强制要求为属性的键和值使用字符串。返回值是 Hashtable 调用 put 的结果。
            OutputStream fos = new FileOutputStream("init.properties");
            // 将此 Properties 表中的属性列表（键和元素对）写入输出流
            for(int i=0,len=method.length;i<len; i++){
                Properties props = new Properties();
                String m = method[i];
                props.setProperty(m+"QueryItem",m);

                props.setProperty(m+"WriteFile",m+".txt");
                createFile(basePath+m+".txt");
                props.setProperty(m+"ReadFile",m+"-out.txt");
                createFile(basePath+m+"-out.txt");
                props.store(fos,"");
                fos.flush();
            }
            fos.close();
            System.out.println("执行成功");

        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    /**
     * 创建文件
     * @param fileName
     * @return
     */
    public static boolean createFile(String filePath){
        boolean flag=false;
        File file = new File(filePath);
        try{
            if(!file.exists()){
                file.createNewFile();
                flag=true;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return true;
    }

}
