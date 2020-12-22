package com.digitalchina.common.util;

import com.digitalchina.decodeServer.count.CountBean;
import com.digitalchina.decodeServer.count.CountDao;
import com.digitalchina.decodeServer.count.CountDaoImpl;
import org.apache.log4j.Logger;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 类描述：文件工具类
 * 创建人：
 * 创建时间：2014-7-3
 * @version
 */

public class FileUtil {

    static Logger log4j = Logger.getLogger(FileUtil.class);
    //获得本地文件夹根目录
    public static List<String> getFileRoots() {
        List<String> list = new ArrayList<String>();
        try {
            File[] roots = File.listRoots();
            for (int index = 0; index < roots.length; index++) { //Print out each drive/partition
                list.add(roots[index].toString());
            }
        } catch (Exception e) {
            throw new RuntimeException("getFileRoots failed!");
        }
        return list;
    }

    /**
     * 拷贝文件
     *
     * @param sourceFile
     *            ：源文件
     * @param targetFile
     *            :目标文件
     * @throws IOException
     */
    public static void copyFile(File sourceFile, File targetFile)
            throws IOException
    {
        BufferedInputStream inBuff = null;
        BufferedOutputStream outBuff = null;
        try
        {
            // 新建文件输入流并对它进行缓冲
            inBuff = new BufferedInputStream(new FileInputStream(sourceFile));

            // 新建文件输出流并对它进行缓冲
            outBuff = new BufferedOutputStream(new FileOutputStream(targetFile));

            // 缓冲数组
            byte[] b = new byte[1024 * 5];
            int len;
            while ((len = inBuff.read(b)) != -1)
            {
                outBuff.write(b, 0, len);
            }
            // 刷新此缓冲的输出流
            outBuff.flush();
        } catch (Exception e)
        {

        } finally
        {
            // 关闭流
            if (inBuff != null)
                inBuff.close();
            if (outBuff != null)
                outBuff.close();
        }
    }

    /**
     * 复制文件夹
     *
     * @param sourceDir
     *            :源文件夹
     * @param targetDir
     *            :目标文件夹
     * @throws IOException
     */
    public static void copyDirectiory(String sourceDir, String targetDir)
            throws IOException
    {
        // 新建目标目录
        (new File(targetDir)).mkdirs();
        // 获取源文件夹当前下的文件或目录
        File[] file = (new File(sourceDir)).listFiles();
        for (int i = 0; i < file.length; i++)
        {
            if (file[i].isFile())
            {
                // 源文件
                File sourceFile = file[i];
                // 目标文件
                File targetFile = new File(new File(targetDir)
                        .getAbsolutePath()
                        + File.separator + file[i].getName());
                copyFile(sourceFile, targetFile);
            }
            if (file[i].isDirectory())
            {
                // 准备复制的源文件夹
                String dir1 = sourceDir + "/" + file[i].getName();
                // 准备复制的目标文件夹
                String dir2 = targetDir + "/" + file[i].getName();
                copyDirectiory(dir1, dir2);
            }
        }
    }


    /**
     * 从二进制文件读取字节数组
     *
     * @param sourceFile
     * @return
     * @throws IOException
     */
    public static byte[] readFile(File sourceFile) {

        if (sourceFile.isFile() && sourceFile.exists()) {
            long fileLength = sourceFile.length();
            if (fileLength > 0) {
                try {
                    BufferedInputStream fis = new BufferedInputStream(
                            new FileInputStream(sourceFile));
                    byte[] b = new byte[(int) fileLength];

                    while (fis.read(b) != -1) {
                    }

                    fis.close();
                    fis = null;

                    return b;
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }
        return null;
    }

    /**
     * 将字节数组读入二进制文件
     *
     * @param targetFile
     * @param content
     * @return
     */
    public static boolean writeBytes(File targetFile, byte[] content) {

        try {
            BufferedOutputStream fos = new BufferedOutputStream(
                    new FileOutputStream(targetFile));

            for (int i = 0; i < content.length - 1; i++) {
                fos.write(content[i]);
            }

            fos.write(content[content.length - 1]); // 写入最后一个字节

            fos.flush();
            fos.close();

            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }



    /**
     * 删除文件夹或文件
     *
     * @param filepath
     * @throws IOException
     */
    public static void del(String filepath) throws IOException
    {
        File f = new File(filepath);// 定义文件路径
        if (f.exists() && f.isDirectory())
        {// 判断是文件还是目录
            if (f.listFiles().length == 0)
            {// 若目录下没有文件则直接删除
                f.delete();
            } else
            {// 若有则把文件放进数组，并判断是否有下级目录
                File delFile[] = f.listFiles();
                int i = f.listFiles().length;
                for (int j = 0; j < i; j++)
                {
                    if (delFile[j].isDirectory())
                    {
                        del(delFile[j].getAbsolutePath());// 递归调用del方法并取得子目录路径
                    }
                    delFile[j].delete();// 删除文件
                }
                f.delete();
            }
        }
    }

    /**
     * 删除文件
     *
     * @param fileName 包含路径的文件名
     */
    public static void delFile(String fileName) {
        try {
            String filePath = fileName;
            java.io.File delFile = new java.io.File(filePath);
            delFile.delete();
        } catch (Exception e) {

            e.printStackTrace();
        }
    }
    /*
     *
     */

    public static void decodeAllFile(String sourceDir, String targetDir,String historyDir)throws Exception
    {
        // 新建目标目录
        (new File(targetDir)).mkdirs();
        (new File(historyDir)).mkdirs();
        // 获取源文件夹当前下的文件或目录

        //	System.out.println(sourceDir+"-------"+targetDir+"======="+historyDir);

        File[] file = (new File(sourceDir)).listFiles();
        for (int i = 0; i < file.length; i++)
        {
            String path = file[i].getAbsolutePath();
            if (file[i].isFile() ) {
                if (path.endsWith(".xls") || path.endsWith(".xlsx")) {

                    DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    //创建时间和修改时间一样
                    Long createTime =file[i].lastModified();
                    Date d = new Date(createTime);
                    String time = format.format(d);

                    // 源文件
                    File sourceFile = file[i];
                    File targetFile = new File(new File(targetDir).getAbsolutePath() + File.separator + file[i].getName());
                    SecurityHelper.decryptFile(sourceFile, targetFile);


                    //拷贝文件到历史文件夹中,并修改文件名
                    String fileName = file[i].getName();
                    String[] name = fileName.split("\\.");
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日HH时MM分ss秒SSS");
                    name[0] = name[0] + "_" + formatter.format(new Date());

                    //保存数据文件的相关属性：时间，数据量
                    boolean flag = saveDataCount(path, targetFile.getAbsolutePath(), time);
                    if(flag==false){
                        System.out.println("数据保存文件失败："+time+file[i].getAbsolutePath());
                    }

                    File historyFile = new File(new File(historyDir).getAbsolutePath() + File.separator + name[0] + "." + name[1]);
                    copyFile(sourceFile, historyFile);
                    log4j.info(formatter.format(new Date()) + ":" + sourceFile.getAbsoluteFile());
                    sourceFile.delete();
                    System.out.println("解密文件："+file[i].getAbsolutePath());
                }else{
                    System.out.println("没有解密文件："+file[i].getAbsolutePath());
                }
            }
            if (file[i].isDirectory())
            {
                // 准备复制的源文件夹
                String dir1 = sourceDir + File.separator  + file[i].getName();
                // 准备复制的结果文件夹
                String dir2 = targetDir + File.separator + file[i].getName();
                // 准备复制的历史文件夹
                String dir3 = historyDir + File.separator  + file[i].getName();
                decodeAllFile(dir1, dir2,dir3);
            }
        }

    }

    public static void encodeAllFile(String sourceDir, String targetDir,String historyDir)throws Exception
    {
        // 新建目标目录
        (new File(targetDir)).mkdirs();
        (new File(historyDir)).mkdirs();
        // 获取源文件夹当前下的文件或目录

        //	System.out.println(sourceDir+"-------"+targetDir+"======="+historyDir);

        File[] file = (new File(sourceDir)).listFiles();
        for (int i = 0; i < file.length; i++)
        {
            if (file[i].isFile())
            {
                // 源文件
                File sourceFile = file[i];
                File targetFile = new File(new File(targetDir).getAbsolutePath()+ File.separator + file[i].getName());

                SecurityHelper.encryptFile(sourceFile, targetFile);

                // 拷贝文件到历史文件夹中
                File historyFile = new File(new File(historyDir).getAbsolutePath()+ File.separator + file[i].getName());
                copyFile(sourceFile, historyFile);
                sourceFile.delete();
            }
            if (file[i].isDirectory())
            {
                // 准备复制的源文件夹
                String dir1 = sourceDir + File.separator  + file[i].getName();
                // 准备复制的结果文件夹
                String dir2 = targetDir + File.separator + file[i].getName();
                // 准备复制的历史文件夹
                String dir3 = historyDir + File.separator  + file[i].getName();
                encodeAllFile(dir1, dir2,dir3);
            }
        }
    }

    private static boolean saveDataCount(String path,String targetFilePath,String createTime){

        boolean flag = false;
        CountDao dao = new CountDaoImpl();
        CountBean bean = new CountBean();
        String[] names = path.split("\\\\");
        int len = names.length;
        if (len >= 4) {
            String dataType = names[len - 2];
            String orgName = names[len - 4];
            Map<String,Object> circles =dao.getCircle(dataType,orgName);
            if(circles!=null) {
                String circle = circles.get("GXZQ") == null ? "" : circles.get("GXZQ").toString();
                String belongCircle = "";
                String[] time = createTime.split("-");
                int month = Integer.parseInt(time[1]);

                if("年".equals(circle)){
                    if("大理市教育局".equals(orgName)){
                        belongCircle=time[0]+"年";
                    }else{
                        belongCircle=Integer.parseInt(time[0])-1+"年";
                    }
                }else if("半年".equals(circle)){
                    if(month<07){
                        belongCircle=time[0]+"年上半年";
                    }else{
                        belongCircle=time[0]+"年下半年";
                    }
                }else if("季".equals(circle)){
                    if(month<3){
                        belongCircle=Integer.parseInt(time[0])-1+"年第四季度";
                    }else if(month<6 && month>3){
                        belongCircle=time[0]+"年第一季度";
                    }else if(month<9 && month>6){
                        belongCircle=time[0]+"年第二季度";
                    }else{
                        belongCircle=time[0]+"年第三季度";
                    }
                }else if("月".equals(circle)){
                    if(month==1){
                        belongCircle=Integer.parseInt(time[0])-1+"年12月";
                    }else{
                        belongCircle=time[0]+"年"+(Integer.parseInt(time[1])-1)+"月";
                    }
                }                bean.setDataType(dataType);
                bean.setOrgName(dataType);
                bean.setCircle(circle);
                bean.setBelongCircle(belongCircle);
                bean.setDataCount(getTotalRows(targetFilePath) + "");
                bean.setSubmitDate(createTime);
                System.out.println("数量" + bean.getDataCount() + ";创建时间：" + bean.getSubmitDate());
                flag = dao.insertSubmitData(bean);
            }
        }
        return flag;
    }

    /**
     * 用来得到真实行数
     * @param path
     * @return
     *
     */
    public static int getTotalRows(String path) {
        Workbook workBook = null;
        FileInputStream fin = null;
        try {
            fin = new FileInputStream(path);
            workBook = WorkbookFactory.create(fin);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }finally {
            try {
                fin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        Sheet sheet = workBook.getSheetAt(0);
        int lastRowNum = sheet.getLastRowNum();
        return lastRowNum;
    }

}
