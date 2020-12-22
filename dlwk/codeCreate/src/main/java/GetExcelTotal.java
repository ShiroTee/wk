/**
 * Created by dlms on 2016/10/10.
 */

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.*;

import java.util.ArrayList;
import java.util.List;

public class GetExcelTotal {
    public static void main(String[] args) throws Exception {

        String filePath="D:/获取文件总行数";
        List<File> files=ListAllFile(new File(filePath));
        int total=0;
        for (File file:files){
         int num= findRealRows(file);
         total=total+num;
        }
        System.out.println(total);
        writeToFile(filePath+"/读取的总数据量.txt",total+"");

    }

    public static void writeToFile(String path,String content){

        try {

            File file = new File(path);

                FileWriter fw = new FileWriter(file,false);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write(content);
                bw.close();
                fw.close();

        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    //遍历所有目录里面的文件
    private static  List<File> ListAllFile(File file){
        File[] fileList = file.listFiles();//将该目录下的所有文件放置在一个File类型的数组中
        List<File> files = new ArrayList<File>();//新建一个文件集合
        for (int i = 0; i < fileList.length; i++) {
            String fileName=fileList[i].getName();
            if(fileName.equals("读取的总数据量.txt")){
                continue;
            }
            if (fileList[i].isFile()) {//判断是否为文件
                if(fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
                    files.add(fileList[i]);
                }
            }else {
                files.addAll(ListAllFile(fileList[i]));
            }
        }
        return files;
    }

    /**
     * 用来得到真实行数
     * @param file
     * @return
     *
     */
    public static int findRealRows(File file) {
        InputStream is = null;
        try {
            is = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String fileType = file.getName().substring(file.getName().lastIndexOf(".") + 1);
        Workbook workbook = null;
        try {
            if (fileType.equalsIgnoreCase("xlsx")) {
              workbook = new XSSFWorkbook(is);
            } else if (fileType.equalsIgnoreCase("xls")) {
                workbook = new HSSFWorkbook(is);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Read the Sheet
       // System.out.println(file.getAbsolutePath());
        Sheet sheet = workbook.getSheetAt(0);
        int row_real =sheet.getLastRowNum();
        return row_real;
    }

}