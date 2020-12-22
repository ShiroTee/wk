import java.util.ArrayList;
import java.util.List;

/**
 * Created by dlms on 2017/1/22.
 */
public class MainEqual {
    public static  void main(String args[]){
        List<Integer> list=new ArrayList<Integer>();
        String sql="    insert " +
                "    into" +
                "        NCE_RK_SYJGBZRYJBXX_BIANB" +
                "        &＃40;ID, DWMC, JGKS, XM, XB, CSRQ, SFZH, GWLB, RYZS, RYFL, BZJFXS, LDZWMC, LDZWCC, FLDZW, RXZSJ, ZY, JRBDWXS, JRBDWSJ, GZLY, ZC, WHCD, BRSF, BZ&＃41; values&＃40;&＃39;19094898&＃39;, &＃39;大理市规划编制与信息中心&＃39;, &＃39;规划编制与信息中心&＃39;, &＃39;彭芝丽&＃39;, &＃39;女&＃39;, &＃39;1991-10-3&＃39;, &＃39;532901199110031441&＃39;, &＃39;专业技术岗位&＃39;, &＃39;在岗&＃39;, &＃39;非领导人员&＃39;, &＃39;全额拨款&＃39;, null, null, null, null, &＃39;网络工程&＃39;, &＃39;事业单位招聘&＃39;, &＃39;2015-10-15&＃39;, &＃39;（1）财政工资统发&＃39;, null, &＃39;本科&＃39;, null, null&＃41;";
       sql= sql.replaceAll("&＃40;","(");
        sql= sql.replaceAll("&＃41;",")");
        sql= sql.replaceAll("&＃39;","'");
       System.out.println(sql);

    }



    public static void getOrder(List<Integer> list ){
        int len=list.size();
        for (int i = 0; i <len-1 ; i++) {
            int n=list.get(i);
            int m=list.get(i+1);
            if(n==m){
                System.out.println("["+i+","+(i+1)+"]");
                i=i+1;
                if(i==len-2){
                    System.out.println("["+i+","+i+"]");
                }
            }else {
                if(len-1==i+1){
                    System.out.println("["+i+","+i+"]");
                    System.out.println("["+(i+1)+","+(i+1)+"]");
                }else {
                    System.out.println("["+i+","+i+"]");
                }
            }
        }
    }
    }
