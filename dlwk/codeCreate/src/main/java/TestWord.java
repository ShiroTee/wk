/**
 * Created by dlms on 2016/10/10.
 */

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import java.io.*;

public class TestWord {
    public static void main(String[] args) throws Exception {
//        for (int i = 0; i < 61; i++) {
//            getWordData("C:\\Users\\dlms\\Desktop\\旅馆信息\\旅馆信息" + (i + 1) + ".doc", "C:\\Users\\dlms\\Desktop\\旅馆信息\\data.txt",i);
//        }
        //getWordData("C:\\Users\\dlms\\Desktop\\旅馆信息\\旅馆信息29.doc", "C:\\Users\\dlms\\Desktop\\旅馆信息\\data.txt",0);

        analysisTxtData("C:\\Users\\dlms\\Desktop\\旅馆信息\\items.txt", "C:\\Users\\dlms\\Desktop\\旅馆信息\\data.txt");
    }
    public static void getWordData(String readPath,String writePath,int n){
        System.out.println(readPath);
        BufferedWriter writer=null;
        try{
            FileInputStream in = new FileInputStream(readPath);//载入文档
            POIFSFileSystem pfs = new POIFSFileSystem(in);
            HWPFDocument hwpf = new HWPFDocument(pfs);
            Range range = hwpf.getRange();//得到文档的读取范围
            TableIterator it = new TableIterator(range);
            int y=0;
           writer = new BufferedWriter(new FileWriter(new File(writePath),true));
            //迭代文档中的表格
            while (it.hasNext()) {
                Table tb = it.next();
                String value="";
                String header="";
                //迭代行，默认从0开始
                for (int i = 0; i < tb.numRows(); i++) {
                    TableRow tr = tb.getRow(i);
                    //迭代列，默认从0开始

                    for (int j = 0; j < tr.numCells(); j++) {
                        TableCell td = tr.getCell(j);//取得单元格
                        //取得单元格的内容
                        for(int k=0;k<td.numParagraphs();k++){
                            Paragraph para =td.getParagraph(k);
                            String item = para.text();
                            if(!"".equals(item)){
                                item=item.replace("\r","").replace(" ","");
                                if (item.endsWith("：") || "特种行业许可证号".equals(item)) {
                                    header=header+";"+item.replace("：","");
                                    Paragraph para2 = td.getParagraph(k + 1);
                                    if("单位代码：".equals(item)){
                                        value = value+";单位代码："+"旅馆信息"+(n+1)+"--"+para2.text().replace("\r","").replace(" ","");
                                    }else{
                                        value = value+";"+para2.text().replace("\r","").replace(" ","");
                                    }
                                }else if(item.endsWith("重点单位信息")){
                                    break;
                                }
                            }
                        } //end for
                    }   //end for
                }   //end for
                if(y==0 && n==0){
                    writer.write(header.substring(1,header.length()));
                    writer.newLine();
                }
                if(value.length()>2) {
                    value = value.substring(1, value.length());
                    value = value.replaceAll(";单位代码：","\r\n");
                    value = value.replaceAll("单位代码：","");
                    writer.write(value);
                }
                writer.newLine();
                y++;
                System.out.println("----++++------第i个"+y);
            } //end while
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }//end method
    public static void analysisTxtData(String readPath,String writePath){
        long startTime=System.currentTimeMillis();
        String data = getTxtData(readPath,writePath);
        String[] items= data.split("重点单位信息");
        BufferedWriter writer=null;

        try{
            writer = new BufferedWriter(new FileWriter(new File(writePath),true));
            for (int j = 0; j <items.length ; j++) {
                String[] count= items[j].split("单位信息");
                for (int i = 0; i < count.length; i++) {

                    String item = count[i];
                    item = item.replaceAll("\\t", "");
                    item = item.replaceAll(" ", "");
                    if(item.startsWith("确定时间：")){
                        continue;
                    }
                    item = item.replace("单位代码：", "");
                    item = item.replace("单位名称：", ";");
                    item = item.replace("单位类型：", ";");
                    item = item.replace("单位性质：", ";");
                    item = item.replace("特种行业许可证号", ";");
                    item = item.replace("开业日期：", ";");
                    item = item.replace("停业日期：", ";");
                    item = item.replace("经营范围主营：", ";");
                    item = item.replace("经营范围兼营：", ";");
                    item = item.replace("经营面积(平方米)：", ";");
                    item = item.replace("经营方式：", ";");
                    item = item.replace("营业执照：", ";");
                    item = item.replace("特种行业起始日期：", ";");
                    item = item.replace("特种行业截止日期：", ";");
                    item = item.replace("注册资金(元)：", ";");
                    item = item.replace("单位行业分类：", ";");
                    item = item.replace("联系电话：", ";");
                    item = item.replace("传真：", ";");
                    item = item.replace("法人代表姓名：", ";");
                    item = item.replace("法人代表证件类别：", ";");
                    item = item.replace("法人代表证件号码：", ";");
                    item = item.replace("法人代表联系方式：", ";");
                    item = item.replace("负责人公民身份号码：", ";");
                    item = item.replace("负责人姓名：", ";");
                    item = item.replace("负责人联系方式：", ";");
                    item = item.replace("上级主管部门：", ";");
                    item = item.replace("重点单位标识：", ";");
                    item = item.replace("公安机关分级管辖类别：", ";");
                    item = item.replace("记录标识：", ";");
                    item = item.replace("更新时间：", ";");
                    item = item.replace("注销原因：", ";");
                    item = item.replace("注销日期：", ";");
                    item = item.replace("单位详细地址：", ";");

                    item = item.replace("地址信息", "");
                    item = item.replace("门楼ID：", ";");
                    item = item.replace("社区代码：", ";");
                    item = item.replace("社区名称：", ";");
                    item = item.replace("派出所：", ";");
                    item = item.replace("行政区划：", ";");

                    item = item.replace("受理信息", "");
                    item = item.replace("受理单位：", ";");
                    item = item.replace("受理社区：", ";");
                    item = item.replace("民警编号：", ";");
                    item = item.replace("民警警号：", ";");
                    item = item.replace("民警姓名：", ";");
                    item = item.replace("受理日期：", ";");

                    item = item.replace("附加信息", "");
                    item = item.replace("旅馆编码：", ";");
                    item = item.replace("旅馆状态：", ";");
                    item = item.replace("旅馆星级：", ";");
                    item = item.replace("旅馆栋数（栋）：", ";");
                    item = item.replace("旅馆层数（层）：", ";");
                    item = item.replace("旅馆客房数（间）：", ";");
                    item = item.replace("旅馆床位数（张）：", ";");
                    item = item.replace("是否涉外：", ";");

                    item = item.replaceAll("\\t", "");
                    item = item.replaceAll(" ", "");

                    try {
                        writer.write(item);
                        writer.newLine();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        long endTime=System.currentTimeMillis();
        System.out.println((endTime-startTime)/1000/60);
    }

    public static String getTxtData(String readPath,String writePath){
        System.out.println(readPath);
        BufferedWriter writer=null;
        BufferedReader br=null;
        String content="";
        try {
            writer = new BufferedWriter(new FileWriter(new File(writePath),true));
            br=new BufferedReader(new InputStreamReader(new FileInputStream(new File(readPath)),"utf-8"));
            String read=null;
            while((read=br.readLine())!=null){
                content=content+read;
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return content;
    }

}