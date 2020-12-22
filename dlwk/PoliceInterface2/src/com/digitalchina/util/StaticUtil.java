package com.digitalchina.util;

import com.digitalchina.gaInterface.entity.QueryUser;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
/**
 *
 * FileEncodeing : utf-8
 * 静态数据通用类
 * @author Hadis_sha
 *
 */
public class StaticUtil {

    public static Properties prop=InitProperties.initProperties();
    private static final String basePath ="./txt/";

    private static String writeImage = prop.getProperty("writeImage");

    private static String imageType = prop.getProperty("imageType");


    public static void setProp(Properties propnew){
        prop=propnew;
    }
    public static void refreshProp(Properties propnew){
        prop=InitProperties.getProperties("init.properties");
    }

    private static String excuteMethod =prop.getProperty("excuteMethod");
    public static String getExcuteMethod(){
        excuteMethod =property("excuteMethod");
        return excuteMethod;
    }

    public static String getQueryItem(String method){
        String itemFile =property(method+"QueryItem");
        return itemFile;
    }

    public static String getReadFilePath(String method){
        String readFile =property(method+"ReadFile");
        return basePath+readFile;
    }


    public static String getWriteFilePath(String method){
        String WriteFile =property(method+"WriteFile");
        return basePath+WriteFile;
    }

    public static String getQueryType(String method){
        String WriteFile =property(method+"QueryType");
        return WriteFile;
    }




    //随机获取用户信息循环间隔
    private static String randomNum=prop.getProperty("randomNum");
    public static Integer getRandomNum(){
        return Integer.parseInt(randomNum());
    }
    public static String randomNum(){
        randomNum=property("randomNum","100");
        return randomNum;
    }

    public static Map<Integer,QueryUser> userMap=new HashMap<Integer, QueryUser>();
    static {
        userMap.put(1, new QueryUser("532901197801070010","杨云生","043421"));
        userMap.put(2, new QueryUser("532930197812151512","杨清","042807"));
        userMap.put(3, new QueryUser("532901197703070316","全坤","043398"));
        userMap.put(4, new QueryUser("532901197606111817","杨光瑞","043399"));
        userMap.put(5, new QueryUser("532901198109040012","杨寿斌","043070"));
        userMap.put(6, new QueryUser("532901197705310926","李家华","043364"));
        userMap.put(7, new QueryUser("532901195811110451","苏跃","043058"));
        userMap.put(8, new QueryUser("532901196510053734","李雪松","043437"));
        userMap.put(9, new QueryUser("532901198204274028","张丽英","043288"));
        userMap.put(10, new QueryUser("532901198109102818","陈秀坤","082110"));
        userMap.put(11, new QueryUser("533025197605220029","杞航怡","043138"));
        userMap.put(12, new QueryUser("532901197307041222","董亚萍","043457"));
        userMap.put(13, new QueryUser("53290119571201371X","苏卫国","043326"));
        userMap.put(14, new QueryUser("532901198307223717","张鑫伟","082102"));
        userMap.put(15, new QueryUser("532901195805063716","杨余清","043033"));
        userMap.put(16, new QueryUser("532901198312120026","杨一松","082139"));
        userMap.put(17, new QueryUser("532928198511160039","程曦","082486"));
        userMap.put(18, new QueryUser("532931198508011110","张庆龙","043048"));
        userMap.put(19, new QueryUser("532930196605060314","赵翔","043358"));
        userMap.put(20, new QueryUser("532931197902270319","张劲松","042978"));
        userMap.put(21, new QueryUser("532901198702090061","赵梦曦","082664"));
    }

    /**
     * 获取最大值为num的随机数字
     * @param num
     * @return
     */
    public static Integer getRandom(Integer num){
        int rt=1;
        rt=(int) Math.round(Math.random()*num);
        if(rt==0)rt=getRandom(num);
        return rt;

    }

    /**
     * 获取最大值为num的随机数字
     * @param num
     * @return
     */
    public static QueryUser getRandomUser(){
        return userMap.get(getRandom(21));
    }

    private static String property(String key,String defult){
        String rs=prop.getProperty(key);
        if(rs==null || rs.equals("")){
            rs=defult;
        }
        return rs;
    }
    private static String property(String key){
        String rs=prop.getProperty(key);
        return rs;
    }


    public static String[] getImageType() {
        if ((imageType == null) || (imageType.equals(""))) {
            imageType = "XP";
        }
        return imageType.split(",");
    }

    public static String getFilePath() {

        return basePath;
    }
}
