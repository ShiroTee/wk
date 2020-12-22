package codingcode;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by dlms on 2016/7/6.
 */
public class Excute {

    public static void main(String[] args){

        String Method="SPAQXC";
        String desc="食品安全宣传";
        int number=124;
        //查询字段
        Map<String,String> searchParams = new HashMap<String, String>();
        searchParams.put("stmc","社团名称");
        //显示字段的值和方法名
        Map<String,Map<String,String>> showFields = new HashMap<String, Map<String,String>>();

        Map<String,String> daoParams = new HashMap<String, String>();

        //失业保险参保登记信息
        String sqlfyzxry = "select * from FR_YY_SPAQXC t where t.stmc= '\"+stmc+\"'";

        //显示字段的名称对应描述
        Map<String,String> showField = new HashMap<String, String>();
        showField.put("stmc","社团名称");
        showField.put("stdz","社团地址");
        showField.put("fzr","负责人");
        showField.put("lxdh","联系电话");

        daoParams.put(Method,sqlfyzxry);
        showFields.put(Method,showField);

        updateHtmlFile.upadteFront(Method,desc, searchParams,number,showFields);
        updateJavaFile.updateBackFile(Method,desc, searchParams,daoParams);

        System.out.println("执行完成");

    }
}
