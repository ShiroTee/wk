package com.digitalchina.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
/**
 * 文件通用类，保存读取等
 * @author shahui 2015-3-30
 *
 */
public class FileUtil {

    public static void saveFile(String path,String text) throws IOException{
        saveFile(path,text.getBytes());
    }

    public static void saveFile(String path,byte[] text) throws IOException{
        File file = new File(path);
        if(file.exists() && !file.isFile()){
            System.out.println("del=>"+file.delete());
        }
        if(file.getParent()!=null){
            file.getParentFile().mkdirs();
        }
        if(!file.exists())file.createNewFile();
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(text);
        fo.close();
    }

    /**
     * 将输入流通过ByteArrayOutputStream转换为二进制数组
     * @param fis 输入流
     * @return
     * @throws IOException
     */
    public static byte[] readFileByte(InputStream fis) throws IOException{
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[1024];
        for (int readNum; (readNum = fis.read(buf)) != -1;) {
            bos.write(buf, 0, readNum);
            //no doubt here is 0
            //Writes len bytes from the specified byte array starting at offset
            // off to this byte array output stream.
            System.out.println("read " + readNum + " bytes,");
        }
        byte[] bytes = bos.toByteArray();
        return bytes;
    }
    /**
     * 将文件通过FileInputStream读取转换为二进制数组
     * @param fis 输入流
     * @return
     * @throws IOException
     */
    public static byte[] readFilesByte(String path) throws IOException{
        File file=new File(path);
        if(!file.exists()||file.isDirectory())
            throw new FileNotFoundException();
        FileInputStream fis=new FileInputStream(file);
        return readFilesByte(fis);
    }
    /**
     * 将输入流转换为二进制数组
     * @param fis 输入流
     * @return
     * @throws IOException
     */
    public static byte[] readFilesByte(InputStream fis) throws IOException{
        byte[] buf = new byte[1024];
        StringBuffer sb=new StringBuffer();
        while((fis.read(buf))!=-1){
            sb.append(new String(buf));
            buf=new byte[1024];//重新生成，避免和上次读取的数据重复
        }
        return sb.toString().getBytes();
    }
    /**
     * 利用BufferedReader读取文件
     * @param path
     * @return
     * @throws IOException
     */
    public static String readFileBuffered(String path) throws IOException{
        File file=new File(path);
        if(!file.exists()||file.isDirectory())
            throw new FileNotFoundException();
        return readFileBuffered(file);
    }
    /**
     * 利用BufferedReader读取文件
     * @param path
     * @return
     * @throws IOException
     */
    public static String readFileBuffered(File file) throws IOException{
        BufferedReader br=new BufferedReader(new FileReader(file));
        String temp=null;
        StringBuffer sb=new StringBuffer();
        temp=br.readLine();
        while(temp!=null){
            sb.append(temp+" ");
            temp=br.readLine();
        }
        return sb.toString();
    }
    /**
     * 以文件流的方式复制文件
     * @param src
     * @param dest
     * @throws IOException
     */
    public static void copyFile(String src,String dest) throws IOException{
        FileInputStream in=new FileInputStream(src);
        File file=new File(dest);
        if(!file.exists())
            file.createNewFile();
        FileOutputStream out=new FileOutputStream(file);
        int c;
        byte buffer[]=new byte[1024];
        while((c=in.read(buffer))!=-1){
            for(int i=0;i<c;i++)
                out.write(buffer[i]);
        }
        in.close();
        out.close();
    }
    public static void delFile(String path,String filename){
        File file=new File(path+"/"+filename);
        if(file.exists()&&file.isFile())
            file.delete();
    }
    public static void delDir(String path){
        File dir=new File(path);
        if(dir.exists()){
            File[] tmp=dir.listFiles();
            for(int i=0;i<tmp.length;i++){
                if(tmp[i].isDirectory()){
                    delDir(path+"/"+tmp[i].getName());
                }
                else{
                    tmp[i].delete();
                }
            }
            dir.delete();
        }
    }
}
