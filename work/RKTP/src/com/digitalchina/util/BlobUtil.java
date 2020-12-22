package com.digitalchina.util;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;

/**
 * Created by zhanglei on 15/5/14.
 */
public class BlobUtil {
    /**
     * Blob字段的通用转换
     * 注意可能出现乱码
     *
     * @return 转好的字符串，
     **/
    public static String BlobToString(Blob blob) {
        StringBuffer str = new StringBuffer();
        //使用StringBuffer进行拼接
        InputStream in = null;//输入字节流
        try {
            in = blob.getBinaryStream();
            //一般接下来是把in的字节流写入一个文件中,但这里直接放进字符串
            byte[] buff = new byte[(int) blob.length()];
            //      byte[] buff=new byte[1024];
            //    byte[] b = new byte[blob.getBufferSize()];
            for (int i = 0; (i = in.read(buff)) > 0; ) {
                str = str.append(new String(buff, "ISO-8859-1"));
            }
            return str.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e) {
                System.out.println("转换异常");
                e.printStackTrace();
            }
        }
        return null;
    }


    /**
     * 把Blob类型转换为byte数组类型
     *
     * @param blob
     * @return
     */
    public static byte[] blobToBytes(Blob blob) {

        BufferedInputStream is = null;

        try {
            is = new BufferedInputStream(blob.getBinaryStream());
            byte[] bytes = new byte[(int) blob.length()];
            int len = bytes.length;
            int offset = 0;
            int read;

            while (offset < len && (read = is.read(bytes, offset, len - offset)) >= 0) {
                offset += read;
            }
            return bytes;
        } catch (Exception e) {
            return null;
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException e) {
                return null;
            }
        }
    }
}
