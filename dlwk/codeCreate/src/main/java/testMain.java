import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by dlms on 2017/1/19.
 */
public class testMain {
    public static  void main(String args[]){

      List<String> list=new ArrayList<String>();
        list.add("2016/01/06");
        list.add("2016/02/06");
        list.add("2016/03/06");
        list.add("2016/04/06");
        list.add("2016/05/06");

        list.add("2016/06/06");
        list.add("2016/07/06");
        list.add("2016/08/06");
        list.add("2016/09/06");
        list.add("2016/10/06");

        list.add("2016/11/06");
        list.add("2016/12/06");
        list.add("2016/01/06");
        list.add("2016/04/06");
        list.add("2016/07/06");

        list.add("2016/10/06");
        list.add("2016/07/06");
        list.add("2016/01/06");
        list.add("2016/01/06");
      List<String> zqlist=new ArrayList<String>();
        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("月");

        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("月");

        zqlist.add("月");
        zqlist.add("月");
        zqlist.add("季度");
        zqlist.add("季度");
        zqlist.add("季度");

        zqlist.add("季度");
        zqlist.add("半年");
        zqlist.add("半年");
        zqlist.add("年");

        List<String> tjlist=new ArrayList<String>();
        tjlist.add("2015/12/18");
        tjlist.add("2016/01/07");
        tjlist.add("2016/02/08");
        tjlist.add("2016/03/09");
        tjlist.add("2016/04/10");

        tjlist.add("2016/05/11");
        tjlist.add("2016/06/12");
        tjlist.add("2016/07/13");
        tjlist.add("2016/08/14");
        tjlist.add("2016/09/15");

        tjlist.add("2016/10/16");
        tjlist.add("2016/11/17");
        tjlist.add("2016/01/19");
        tjlist.add("2016/04/20");
        tjlist.add("2016/07/21");

        tjlist.add("2016/10/22");
        tjlist.add("2016/07/23");
        tjlist.add("2016/01/24");
        tjlist.add("2016/01/25");
        SimpleDateFormat formatM = new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat formatY = new SimpleDateFormat("yyyy");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i <zqlist.size() ; i++) {
            String zq= zqlist.get(i);
            String date =list.get(i);
            String tjsj= tjlist.get(i);
            System.out.println();
            System.out.println("周期："+zq);
            System.out.println("当前时间："+date);
            System.out.println("提交时间："+tjsj);

            String[] dates = date.split("/");
            Date d= new Date(date);
            if("月".equals(zq)){
                Calendar c = Calendar.getInstance();
                c.setTime(d);
                c.add(Calendar.MONTH, -1);
                String time = formatM.format(c.getTime())+"-06";
                if("06".equals(dates[2])){
                    System.out.println("统计时间起"+time);
                    System.out.println("统计时间止"+date);
                    Map<String,String> sj= compareYq(tjsj,time,date);
                    if(!sj.isEmpty()){
                        System.out.println("逾期");
                    }else{
                        System.out.println("非逾期");
                    }
                }
            }else  if("季度".equals(zq)){
                if(("01".equals(dates[1]) || "04".equals(dates[1])
                      || "07".equals(dates[1]) ||"10".equals(dates[1])) && "06".equals(dates[2])) {

                    Calendar c = Calendar.getInstance();
                    c.setTime(d);
                c.add(Calendar.MONTH, -3);
                String time = formatM.format(c.getTime()) + "-06";
                    System.out.println("统计时间起"+time);
                    System.out.println("统计时间止"+date);
                    Map<String,String> sj= compareYq(tjsj,time,date);
                    if(!sj.isEmpty()){
                        System.out.println("逾期");
                    }else{
                        System.out.println("非逾期");
                    }
                }
            }else  if("半年".equals(zq)){
                if(("01".equals(dates[1]) || "07".equals(dates[1]))&&"06".equals(dates[2])) {

                    Calendar c = Calendar.getInstance();
                    c.setTime(d);
                    c.add(Calendar.MONTH, -6);
                    String time = formatM.format(c.getTime()) + "-06";
                    System.out.println("统计时间起"+time);
                    System.out.println("统计时间止"+date);
                    Map<String,String> sj= compareYq(tjsj,time,date);
                    if(!sj.isEmpty()){
                        System.out.println("逾期");
                    }else{
                        System.out.println("非逾期");
                    }
                }
            }else {//年
                Calendar c = Calendar.getInstance();
                c.setTime(d);
                c.add(Calendar.YEAR, -1);
                String time = formatY.format(c.getTime()) + "-01-06";
                if("06".equals(dates[2]) && "01".equals(dates[1])) {
                    System.out.println("统计时间起"+time);
                    System.out.println("统计时间止"+date);
                    Map<String,String> sj= compareYq(tjsj,time,date);
                    if(!sj.isEmpty()){
                        System.out.println("逾期");
                    }else{
                        System.out.println("非逾期");
                    }
                }
            }
        }
    }

    public static Map<String,String> compareYq(String tjsj,String time,String date){
        Map<String,String> yq=new HashMap<String, String>();
        if( tjsj.compareTo(time)<0 || tjsj.compareTo(date)>0){
            String[] tjyf=date.split("/");
            yq.put("tjsjq",time);
            yq.put("tjsjz",date);
            yq.put("tjyf",tjyf[0]+"-"+tjyf[1]);
        }
        return yq;
    }

    public static Map<String,String> compare(String tjsj,String time,String date){
        Map<String,String> yq=new HashMap<String, String>();
        if( tjsj.compareTo(time)>=0 || tjsj.compareTo(date)<=0){
            String[] tjyf=date.split("/");
            yq.put("tjsjq",time);
            yq.put("tjsjz",date);
            yq.put("tjyf",tjyf[0]+"-"+tjyf[1]);
        }
        return yq;
    }

}
