package com.digitalchina.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

/**
 *
 * FileEncodeing : GBK
 * 图片通用类
 * @author Hadis_sha
 *
 */
public class ImageUtil {
    /**
     * 将图片文件编码后转换为String字符串
     * @param path 图片路径
     * @return
     * @throws IOException
     */
    public static String image2Str(String path) throws IOException{
        File file = new File(path);
        if(!file.exists()||file.isDirectory())
            throw new FileNotFoundException();
        return image2Str(file);
    }
    /**
     * 将图片文件编码后转换为String字符串
     * @param imageFile 图片文件
     * @return
     * @throws IOException
     */
    public static String image2Str(File imageFile) throws IOException{
        FileInputStream fis = new FileInputStream(imageFile);
        String encodeStr=new String(Base64Coder.encode(readByte(fis)));
        return encodeStr;
    }
    /**
     * 将图片文件编码后转换为String字符串
     * @param path 图片路径
     * @return
     * @throws IOException
     */
    public static byte[] image2Byte(String path) throws IOException{
        File file = new File(path);
        if(!file.exists()||file.isDirectory())
            throw new FileNotFoundException();
        return image2Byte(file);
    }
    /**
     * 将图片文件转换为二进制数组
     * @param imageFile 图片文件
     * @return
     * @throws IOException
     */
    public static byte[] image2Byte(File imageFile) throws IOException{
        FileInputStream fis = new FileInputStream(imageFile);
        return readByte(fis);
    }
    /**
     * 将输入流后转换为二进制数组
     * @param fis 输入流
     * @return
     * @throws IOException
     */
    public static byte[] readByte(InputStream fis) throws IOException{
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
     * 将文件编码字符串解码后转换为BufferedImage类型
     * @param imageStr
     * @return
     * @throws Exception
     */
    public static BufferedImage str2Image(String imageStr) throws Exception{
        byte[] bytes = Base64Coder.decode(imageStr);
//		System.out.println(Base64Coder.encode(bytes));
        return byte2Image(bytes);
    }
    /**
     * 将文件编码字符串解码后转换为二进制数组
     * @param imageStr
     * @return
     * @throws Exception
     */
    public static byte[] imageStr2Byte(String imageStr) throws Exception{
        return  Base64Coder.decode(imageStr);
    }
    /**
     * 将文件编码字符串解码后转换为二进制数组
     * @param imageStr
     * @return
     * @throws Exception
     */
    public static InputStream imageStr2InputStream(String imageStr) throws Exception{
        byte[] bytes = Base64Coder.decode(imageStr);
        return  byte2InputStream(bytes);
    }
    /**
     *  将图片二进制数组转换为BufferedImage类型
     * @param bytes
     * @return
     * @throws Exception
     */
    public static BufferedImage byte2Image(byte[] bytes) throws IOException{
        //Convert byte array back to an image file
        //Before is how to change ByteArray back to Image
        ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
        Iterator<?> readers = ImageIO.getImageReadersByFormatName("jpg");

        //ImageIO is a class containing static convenience methods for locating ImageReaders
        //and ImageWriters, and performing simple encoding and decoding.
        ImageReader reader = (ImageReader) readers.next();
        Object source = bis; // File or InputStream, it seems file is OK

        ImageInputStream iis = ImageIO.createImageInputStream(source);//Returns an ImageInputStream that will take its input from the given Object

        reader.setInput(iis, true);
        ImageReadParam param = reader.getDefaultReadParam();

        //got an image file
        Image image = reader.read(0, param);

        BufferedImage bufferedImage = new BufferedImage(image.getWidth(null), image.getHeight(null), BufferedImage.TYPE_INT_RGB);
        //bufferedImage is the RenderedImage to be written
        Graphics2D g2 = bufferedImage.createGraphics();
        g2.drawImage(image, null, null);

        reader.reset();
        image.flush();
        bis.close();
        iis.close();

        return bufferedImage;
    }
    /**
     *  将图片二进制数组转换为BufferedImage类型
     * @param bytes
     * @return
     * @throws Exception
     */
    public static InputStream byte2InputStream(byte[] bytes) throws Exception{
        ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
        return bis;
    }
    /**
     * 将文件编码字符串解码后写入图片文件
     * @param path 要写入的文件地址
     * @param imageStr 文件文本字段
     * @throws Exception
     */
    public static void writeImageFile(String path,String imageStr) throws Exception{
        if(imageStr==null || imageStr.equals(""))return;
        File imageFile = new File(path);
        if(imageFile.exists() && !imageFile.isFile()){
            System.out.println("del=>"+imageFile.delete());//file.delete();
        }
        if(imageFile.getParent()!=null){
            imageFile.getParentFile().mkdirs();
        }
        if(!imageFile.exists())imageFile.createNewFile();
//		ImageIO.write(ImageUtil.str2Image(imageStr), "jpg", imageFile);//
        ByteArrayInputStream bins = new ByteArrayInputStream(ImageUtil.imageStr2Byte(imageStr));
        ImageUtil.writeImage2Local(bins, path);
        imageFile=null;
    }

    public static void writeImage2Local(ByteArrayInputStream bins,String filename) throws IOException{

        File fileOutput = new File(filename);
        FileOutputStream fo = new FileOutputStream(fileOutput);
        int c;
        //读取流并写入到文件中
        while ((c = bins.read()) != -1){
            fo.write(c);
        }
        fo.flush();
        fo.close();
    }
    /**
     * 将图片二进制数组写入图片文件
     * @param path 要写入的文件地址
     * @param imageStr 文件文本字段
     * @throws Exception
     */
    public static void  writeImageFile(String path,byte[] bytes) throws Exception{
        if(bytes==null || bytes.length==0)return;
        File imageFile = new File(path);
        if(imageFile.exists() && !imageFile.isFile()){
            System.out.println("del=>"+imageFile.delete());//file.delete();
        }
        if(imageFile.getParent()!=null){
            imageFile.getParentFile().mkdirs();
        }
        if(!imageFile.exists())imageFile.createNewFile();
        ImageIO.write(ImageUtil.byte2Image(bytes), "jpg", imageFile);
    }
    /**
     * 测试是否图片编码字符串
     * @param imageStr
     * @return
     */
    public static boolean testIsImageStr(String imageStr){
        boolean rs=false;
        byte[] bytes=null;
        try {
            bytes = Base64Coder.decode(imageStr);
            if(bytes!=null){
                rs=true;
            }
        } catch (Exception e) {
            rs=false;
        }
        return rs;
    }
}
