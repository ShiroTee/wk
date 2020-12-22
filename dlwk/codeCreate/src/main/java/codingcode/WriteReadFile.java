package codingcode;

/**
 * Created by dlms on 2016/7/5.
 */
import java.io.*;


/**
 *
 * 功能描述：创建TXT文件并进行读、写、修改操作
 *
 * @author <a href="mailto:zhanghhui@126.com">KenZhang</a>
 * @version 1.0
 * Creation date: 2007-12-18 - 下午06:48:45
 */
public class WriteReadFile {

    /**
     * 读取文本文件.
     *
     */
    public static String readFile(String pathAndFileName){
        String read;
        String readStr="";
        FileReader fileread;
        BufferedReader bufread;
        try {
            File filename = new File(pathAndFileName);
            fileread = new FileReader(filename);
            bufread = new BufferedReader(fileread);
            try {
                while ((read = bufread.readLine()) != null) {
                    readStr = readStr + read+ "\r\n";
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return readStr;
    }

    /**
     * 写文件.
     *
     */
    public static void writeFile(String content,String pathAndFileName){
        try {
            BufferedWriter br = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(pathAndFileName), "utf-8"));
            br.write(content);
            br.newLine();
            br.flush();
            br.close();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

    /**
     * 将文件中指定内容的第一行替换为其它内容.
     *
     * @param oldStr
     *            查找内容
     * @param replaceStr
     *            替换内容
     */
    public static void replaceByStr(String path,String oldStr,String replaceStr) {
        String temp = "";
        try {
            File file = new File(path);
            FileInputStream fis = new FileInputStream(file);
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);
            StringBuffer buf = new StringBuffer();

            // 保存该行前面的内容
            for (int j = 1; (temp = br.readLine()) != null
                    && !temp.equals(oldStr); j++) {
                buf = buf.append(temp);
                buf = buf.append(System.getProperty("line.separator"));
            }

            // 将内容插入
            buf = buf.append(replaceStr);

            // 保存该行后面的内容
            while ((temp = br.readLine()) != null) {
                buf = buf.append(System.getProperty("line.separator"));
                buf = buf.append(temp);
            }

            br.close();
            FileOutputStream fos = new FileOutputStream(file);
            PrintWriter pw = new PrintWriter(fos);
            pw.write(buf.toString().toCharArray());
            pw.flush();
            pw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}