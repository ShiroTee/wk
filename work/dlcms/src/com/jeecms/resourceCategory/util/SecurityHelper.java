package com.jeecms.resourceCategory.util;

import com.rkk.security.encryption.Des3;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.KeyGenerator;
import java.io.*;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Iterator;
import java.util.List;

public class SecurityHelper {
 
	 private static Logger logger = Logger.getLogger(SecurityHelper.class);   

    private static String hexKey = "B553425D9B61C23BE52CA1168C3312894C4FE9ABC289F251";//密钥
    private static SecurityHelper _instance;
    Key key ;
 
    public SecurityHelper() {
    	 
    }
    public SecurityHelper(String hexKey) {
    	try {
            KeyGenerator _generator = KeyGenerator.getInstance ( "DES" );
            _generator.init( new SecureRandom(hexKey.getBytes()));
             key = _generator.generateKey();
            _generator = null ;
        } catch (Exception e) {
            throw new RuntimeException(
                   "Error: " + e);
        }
    }
 
    /**
      * 加密 String 明文输入 ,String 密文输出
      */
    public static String encrypt(String strMing) {
       byte [] byteMi = null ;
       byte [] byteMing = null ;
       String strMi = "" ;
       BASE64Encoder base64en = new BASE64Encoder();
       try {
           byteMing = strMing.getBytes( "UTF8" );
           byteMi = encrypt(byteMing);
           strMi = base64en.encode(byteMi);
       } catch (Exception e) {
           throw new RuntimeException(
                  "Error: " + e);
       } finally {
           base64en = null ;
           byteMing = null ;
           byteMi = null ;
       }
       return strMi;
    }
 
    /**
      * 解密 以 String 密文输入 ,String 明文输出
      *
      * @param strMi
      * @return
      */
    public static  String decrypt(String strMi) {
       BASE64Decoder base64De = new BASE64Decoder();
       byte [] byteMing = null ;
       byte [] byteMi = null ;
       String strMing = "" ;
       try {
           byteMi = base64De.decodeBuffer(strMi);
           byteMing = decrypt(byteMi);
           strMing = new String(byteMing, "UTF8" );
       } catch (Exception e) {
           throw new RuntimeException(
                  "Error: " + e);
       } finally {
           base64De = null ;
           byteMing = null ;
           byteMi = null ;
       }
       return strMing;
    }
 
    /**
      * 加密以 byte[] 明文输入 ,byte[] 密文输出
      *
      * @param byteS
      * @return
      */
    private static byte [] encrypt( byte [] byteS) {
    	
	  if(null==_instance)
      {
          _instance = new SecurityHelper(SecurityHelper.hexKey);
      }
          
       byte [] byteFina = null ;
       Cipher cipher;
       try {
            cipher = Cipher.getInstance ( "DES" );
          // cipher = Cipher.getInstance("DES/ECB/NoPadding");
          cipher.init(Cipher. ENCRYPT_MODE , _instance.key);
           byteFina = cipher.doFinal(byteS);
       } catch (Exception e) {
           throw new RuntimeException(
                  "Error: " + e);
       } finally {
           cipher = null ;
       }
       return byteFina;
    }
 
    /**
      * 解密以 byte[] 密文输入 , 以 byte[] 明文输出
      *
      * @param byteD
      * @return
      */
    private static byte [] decrypt( byte [] byteD) {
    	
	  if(null==_instance)
      {
         _instance = new SecurityHelper(SecurityHelper.hexKey);
      }
       Cipher cipher;
       byte [] byteFina = null ;
       try {
           cipher = Cipher.getInstance ( "DES" );
           cipher.init(Cipher. DECRYPT_MODE ,_instance.key );
           byteFina = cipher.doFinal(byteD);
       } catch (Exception e) {
           throw new RuntimeException(
                  "Error: " + e);
       } finally {
           cipher = null ;
       }
       return byteFina;
    }
 
    /**
      * 文件 file 进行加密并保存目标文件 destFile 中
      *
      * @param file
      *             要加密的文件 如 c:/test/srcFile.txt
      * @param destFile
      *             加密后存放的文件名 如 c:/ 加密后文件 .txt
      */
    public  static int encryptFile(File file, File destFile) {
    	
    	InputStream is=null;
    	OutputStream out =null;
    	CipherInputStream cis=null;
    	 if(null==_instance)
         {
            _instance = new SecurityHelper(SecurityHelper.hexKey);
         }
    	try
		{
	       Cipher cipher = Cipher.getInstance ( "DES" );
	       // cipher.init(Cipher.ENCRYPT_MODE, getKey());
	       cipher.init(Cipher. ENCRYPT_MODE , _instance.key );
	       is = new FileInputStream(file);
	       out = new FileOutputStream(destFile);
	       cis = new CipherInputStream(is, cipher);
	       byte [] buffer = new byte [1024];
	       int r;
	       while ((r = cis.read(buffer)) > 0) {
	           out.write(buffer, 0, r);
	       }
	      
		} catch (Exception e)
		{
			logger.error(file.getName()+"加密失败");
			return -1;
		} finally
		{
			// 关闭流
			if (cis != null)
				try {
					cis.close();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
			if (is != null)
				try {
					is.close();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
			if (out != null)
				try {
					out.close();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
		}
		return 1;
    }
 
    /**
      * 文件采用 DES 算法解密文件
      *
      * @param file
      *             已加密的文件 如 c:/ 加密后文件 .txt *
      * @param destFile
      *             解密后存放的文件名 如 c:/ test/ 解密后文件 .txt
      */
    public   static int decryptFile(File file, File dest){
		
    	InputStream is=null;
		OutputStream out =null;
		CipherOutputStream cos=null;
		if(null==_instance)
	     {
	        _instance = new SecurityHelper(SecurityHelper.hexKey);
	     }
		try
		{
	       Cipher cipher = Cipher.getInstance ( "DES" );
	       cipher.init(Cipher. DECRYPT_MODE , _instance.key );
	        is = new FileInputStream(file); 
	        out = new FileOutputStream(dest);
	        cos = new CipherOutputStream(out, cipher);
	       byte [] buffer = new byte [1024];
	       int r;
	       while ((r = is.read(buffer)) >= 0) {
	           cos.write(buffer, 0, r);
	       }
	       
		} catch (Exception e)
		{
			 logger.error(file.getName()+"解密失败");
			return -1;
		} finally
		{
			// 关闭流
			if (cos != null)
				try {
					cos.close();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
			if (is != null)
				try {
					is.close();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
			if (out != null)
				try {
					out.close();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
		}
		return 1;
    }
 
    
    /**
     *  调用第三方解密文件
     *
     * @param file
     *             已加密的文件 如 c:/ 加密后文件 .txt *
     * @param destFile
     *             解密后存放的文件名 如 c:/ test/ 解密后文件 .txt
     */
    
   public   static int otherDecryptFile(File file, File dest){
		
	     Document document = null;
		 XMLWriter writer =null;
		 try {
		    SAXReader saxReader = new SAXReader();
			
			document = saxReader.read(file);  

			List list = document.selectNodes("PantheonMessage/PantheonMessageBody/DATA/UserArea");

			Iterator iter = list.iterator();

			while (iter.hasNext()) {

				Element element = (Element) iter.next();
	
				String temp=element.getText();
				Des3 des3 = new Des3("cabdc56bbd6f5eb39958caa00495a3ad");
			//	System.out.println(des3.decodeStr(temp));
				element.setText(des3.decodeStr(temp));// 设置相应的内容
			} 
			
			//writer = new XMLWriter(new FileWriter(dest));
			writer = new XMLWriter( new OutputStreamWriter(new FileOutputStream(dest.getAbsoluteFile()),"UTF-8"));
			writer.setEscapeText(false);
			writer.write(document);
			writer.flush();
			writer.close();
			
		   }catch (Exception e) {
			    logger.error(file.getName()+"解密失败");
			    return -1;
			}finally
			{
			  if (writer != null)
				try {
					writer.close();
				} catch (IOException e) {
					e.printStackTrace();
				} 
			}
		 return 1; 
    	
    }
    
    public static void main(String[] args)   
    {
    	File  srcFile=new File("F:\\软件\\Project_2010_SP1_XiaZaiBa.zip");
    	File  disFile=new File("E:\\Project_2010_SP1_XiaZaiBa11.zip");
    	
    	
    	File  UUFile=new File("E:\\Project_2010_SP1_XiaZaiBa22.zip");
    	
    	encryptFile(srcFile,disFile);
    	decryptFile(disFile,UUFile);
    }
   
} 