package com.digitalchina.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Properties;
/**
 * FileEncodeing : UTF-8
 * 配置文件获取通用类
 * @author Hadis_sha
 *
 */
public class InitProperties {
    //public static Properties constantProperties;
    private static ClassLoader classLoader=InitProperties.class.getClassLoader();

    /**
     * 获取默认配置文件
     * @return
     */
    public static Properties initProperties(){
        Properties prop = new Properties();
        InputStream inputStream = null;
        inputStream = classLoader.getResourceAsStream("init.properties");
        if (inputStream == null) {
            System.out.println("文件为空  ");
            return null;
        }
        try {
            prop.load(inputStream);
        } catch (IOException e) {
            System.out.println("Properties载入错误  ");
            return null;
        }
        try {
            inputStream.close();
        } catch (IOException e) {
            System.out.println("文件输入流关闭errror  ");
            return null;
        }
        return prop;
    }

    /**
     * 获取默认配置文件
     * @return
     */
    public static Properties initeErrorProperties(){
        Properties prop = new Properties();
        InputStream inputStream = null;
        inputStream = classLoader.getResourceAsStream("error.ini");
        if (inputStream == null) {
            System.out.println("文件为空  ");
            return null;
        }
        try {
            prop.load(inputStream);
        } catch (IOException e) {
            System.out.println("Properties载入错误  ");
            return null;
        }
        try {
            inputStream.close();
        } catch (IOException e) {
            System.out.println("文件输入流关闭errror  ");
            return null;
        }
        return prop;
    }

    /**
     * 输入FilePath 相对路径,获取默认配置文件
     * @param filePath
     * @return Properties
     */
    public static Properties initProperties(String filePath) {
        Properties prop = new Properties();
        InputStream inputStream = null;
        inputStream = classLoader.getResourceAsStream(filePath);
        if (inputStream == null) {
            System.out.println("文件为空  ");
            return null;
        }
        try {
            prop.load(inputStream);
        } catch (IOException e) {
            System.out.println("Properties载入错误  ");
            return null;
        }
        try {
            inputStream.close();
        } catch (IOException e) {
            System.out.println("文件输入流关闭errror  ");
            return null;
        }
        return prop;
    }
    /**
     * 输入FilePath
     * 相对JAR文件的path
     * @param filePath
     * @return Properties
     */
    public static Properties getProperties(String filePath) {
        Properties prop = new Properties();
        File file=null;
        FileInputStream inputStream = null;
        try {
//			System.out.println("filePath:"+filePath);
            URI uri=getUri(filePath);
//			System.out.println("uri:"+uri);
            if(uri!=null)
                file=new File(uri);
            //判断文件存在与否，是否是标准文件（文件不存在，或不是标准文件，读取默认配置文件）
            if(file==null || !file.exists() || !file.isFile()){
                prop=initProperties();
            }else{
                inputStream = new FileInputStream(file);
                prop.load(inputStream);
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }finally {
            try {
                if(inputStream != null) {
                    inputStream.close();
                    inputStream = null;
                }
            } catch(InterruptedIOException ignore) {
                Thread.currentThread().interrupt();
            } catch(Throwable ignore) {
                ignore.printStackTrace();
            }
        }
        return prop;
    }

    /**
     * 读取配置文件 filePath
     * 相对JAR文件的path
     * @param filePath
     * @return Properties
     */
    public static Properties readProperties(String filePath) {
        Properties prop = new Properties();
        File file=null;
        FileReader read =null;
        try {
            URI uri=getUri(filePath);
            System.out.println(uri);
            if(uri!=null)
                file=new File(uri);
            //判断文件存在与否，是否是标准文件（文件不存在，或不是标准文件，读取默认配置文件）
            if(file==null || !file.exists() || !file.isFile()){
                prop=initProperties();
            }else{
                read=new FileReader(filePath);
                prop.load(read);
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }finally {
            try {
                if(read != null) {
                    read.close();
                    read =null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return prop;
    }
    /**
     * 写入配置文件 filePath：相对path
     * @param filePath
     * @param prop
     */
    public static void writeProperties(String filePath,Properties prop) {
        File file=null;
        FileWriter write=null;
        try {
            //System.out.println(classLoader.getResource("").toString());
            file=new File(getFileUri(filePath));
//			System.out.println("URI=>"+file.toURI()+" \nAbsolutePath=>"+file.getAbsolutePath()+" \nName=>"+file.getName()+" \nParent=>"+file.getParent()+" \nPath=>"+file.getPath());
            //判断文件存在与否，是否是标准文件（存在但不是标准文件执行删除
            if(file.exists() && !file.isFile()){
                //file.delete();
                System.out.println("del=>"+file.delete());
            }
            if(file.getParent()!=null){
                file.getParentFile().mkdirs();
            }
            write=new FileWriter(file);
            prop.store(write, filePath);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(write != null) {
                    write.close();
                    write=null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * 写入配置文件 filename
     * @param filePath
     * @param prop
     */
    public static boolean writeProperties(String filename,Properties prop, String comments) {
        File file=null;
        FileWriter write=null;
        FileOutputStream fileOut=null;
        try {
            //System.out.println(classLoader.getResource("").toString());
            file=new File(getFileUri(filename));
            System.out.println("URI=>"+file.toURI()+" \nAbsolutePath=>"+file.getAbsolutePath()+" \nName=>"+file.getName()+" \nParent=>"+file.getParent()+" \nPath=>"+file.getPath());
            //判断文件存在与否，是否是标准文件（存在但不是标准文件执行删除
            if(file.exists() && !file.isFile()){
                //file.delete();
                System.out.println("del=>"+file.delete());
            }
            if(file.getParent()!=null){
                file.getParentFile().mkdirs();
            }
            if(!file.exists())file.createNewFile();
//			write=new FileWriter(file);
            fileOut = new FileOutputStream(file);
//			prop.store(write, comments);
            prop.store(fileOut, comments);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            try {
                if(write != null) {
                    write.close();
                    write=null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }
    /**
     * 保存配置文件
     * @param filePath 保存路径
     * @param prop 配置文件内容
     * @param comments 配置文件描述
     */
    public static void saveProperties(String filePath,Properties prop, String comments) {
        File file=null;
        FileOutputStream fileOut=null;
        try {
            file=new File(filePath);
            //System.out.println("URI=>"+file.toURI()+" \nAbsolutePath=>"+file.getAbsolutePath()+" \nName=>"+file.getName()+" \nParent=>"+file.getParent()+" \nPath=>"+file.getPath());
            if(file.exists() && !file.isFile()){
                file.delete();
            }
            if(file.getParent()!=null){
                file.getParentFile().mkdirs();
            }
            fileOut = new FileOutputStream(file);
            prop.store(fileOut, comments);
            //fileOut.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(fileOut != null) {
                    fileOut.close();
                    fileOut=null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * 获取读取文件的URI，如果没有，返回NULL
     * @param filePath
     * @return
     * @throws URISyntaxException
     */
    private static URI getUri(String filePath) throws URISyntaxException{
        URI uri=null;
        URL pathUrl=classLoader.getResource(filePath);
//		System.out.println("pathUrl:"+pathUrl);
        if(pathUrl==null){
            String s=filePath.substring(filePath.lastIndexOf("."));
            if(s.equals(".properties") || s.equals("properties"))return null;
            String defultFilePath=filePath.substring(0,filePath.lastIndexOf("."))+".properties";
            uri=getUri(defultFilePath);
        }else{
            uri=pathUrl.toURI();
        }
        return uri;
    }
    /**
     * 获取写入文件的URI，如果没有，返回相对JAR路径的URI
     * @param filePath
     * @return
     * @throws URISyntaxException
     */
    private static URI getFileUri(String filePath) throws URISyntaxException {
        URI uri=null;
        URL pathUrl=classLoader.getResource(filePath);
//		System.out.println("pathUrl:"+pathUrl);
        if(pathUrl==null){
            uri=new URI(classLoader.getResource("").toString()+filePath);
        }else{
            uri=pathUrl.toURI();
        }
        return uri;
    }


}
