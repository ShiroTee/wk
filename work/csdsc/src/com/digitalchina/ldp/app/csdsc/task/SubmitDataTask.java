package com.digitalchina.ldp.app.csdsc.task;

import com.digitalchina.ldp.app.csdsc.bean.CategoryRelationBean;
import com.digitalchina.ldp.app.csdsc.bean.StatCategory;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.StatisticsTaskDao;
import com.digitalchina.ldp.app.csdsc.dao.SubmitTaskDao;
import com.digitalchina.ldp.common.util.DbContextHolder;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 委办局数据提交逾期统计任务
 * Created by jiaoshangsen on 20170117.
 */
public class SubmitDataTask {
    @Autowired
    private SubmitTaskDao submitTaskDao;

    @Autowired
    private StatisticsTaskDao statisticsTaskDao;


    public static String objToString(Object obj) {
        if(obj!=null) {
            return obj.toString();
        }
        return "";
    }


    public void wbjDataYQService() {
        System.out.println("wbj data submit task start...");

        DbContextHolder.setDefaultDbType("csdsc");
        //查出基础表的信息
        List<Map<String,Object>> relationList = submitTaskDao.findDataZQ();

        List<Map<String,String>> yqData = new ArrayList<Map<String,String>>();
        List<Map<String,String>> tjData = new ArrayList<Map<String,String>>();
        for (Map<String,Object> map : relationList) {
            String wbj = StringUtils.objToString(map.get("WBJ"));
            String id = StringUtils.objToString(map.get("ID"));
            String xxlmc=StringUtils.objToString(map.get("XXLMC"));
            String zq=StringUtils.objToString(map.get("GXZQ"));
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat formatM = new SimpleDateFormat("yyyy-MM");
            SimpleDateFormat formatY = new SimpleDateFormat("yyyy");
            String date = format.format(new Date());
            String[] dates=date.split("-");
            Calendar c = Calendar.getInstance();
            c.setTime(new Date());
            if("月".equals(zq)){
                c.add(Calendar.MONTH, -1);
                String time = formatM.format(c.getTime())+"-06";
                if("06".equals(dates[2])){
                    compareData(id,wbj,xxlmc,zq,time,date, yqData,tjData);
                }
            }else  if("季度".equals(zq)){
                if(("01".equals(dates[1]) || "04".equals(dates[1])
                        || "07".equals(dates[1]) ||"10".equals(dates[1])) && "06".equals(dates[2])) {
                    c.add(Calendar.MONTH, -3);
                    String time = formatM.format(c.getTime()) + "-06";
                    compareData(id,wbj,xxlmc,zq,time,date, yqData,tjData);
                }
            }else  if("半年".equals(zq)){
                if(("01".equals(dates[1]) || "07".equals(dates[1]))&&"06".equals(dates[2])) {
                    c.add(Calendar.MONTH, -6);
                    String time = formatM.format(c.getTime()) + "-06";
                    compareData(id,wbj,xxlmc,zq,time,date, yqData,tjData);
                }
            }else{//年
                c.add(Calendar.YEAR, -1);
                String time = formatY.format(c.getTime())+"-01-06";
                if("06".equals(dates[2]) && "01".equals(dates[1])){
                    compareData(id,wbj,xxlmc,zq,time,date, yqData,tjData);
                }
            }
        }

        DbContextHolder.setDefaultDbType("csdsc");
        for (Map map : yqData) {
            submitTaskDao.addYQResult(map);
        }

        for (Map map : tjData) {
            submitTaskDao.updateData(map);
        }

        System.out.println("wbj data submit task end...");
    }

    //添加数据
    public void compareData(String id,String wbj,String xxlmc,String zq,String tjrqq, String tjrqz,
                            List<Map<String,String>> yqData, List<Map<String,String>> tjData){
        SimpleDateFormat formatM = new SimpleDateFormat("yyyy-MM");
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.MONTH, -1);
        String tjyf=formatM.format(c.getTime());
        List<Map<String,Object>> submitData = submitTaskDao.findSubmitData(wbj,xxlmc);
        if(submitData.size()>0){//不存在：逾期
            String tjsj = StringUtils.objToString(submitData.get(0).get("TJSJRQ"));
            if("".equals(tjsj)){//空：逾期
                Map<String,String> yq = submitTaskDao.getYQMap(id,wbj,xxlmc,zq,tjrqq,tjrqz,tjyf);
                yqData.add(yq);
            }else{
                if( tjsj.compareTo(tjrqq)>0 && tjsj.compareTo(tjrqz)<=0){
                    Map<String,String> updateData = submitTaskDao.getUpdateMap(wbj,xxlmc,tjrqq,tjrqz,tjsj,tjyf);
                    tjData.add(updateData);
                }else {//不在区间范围内：逾期
                    Map<String,String> yq = submitTaskDao.getYQMap(id,wbj,xxlmc,zq,tjrqq,tjrqz,tjyf);
                    yqData.add(yq);
                }
            }
        }else{
            Map<String,String> yq = submitTaskDao.getYQMap(id,wbj,xxlmc,zq,tjrqq,tjrqz,tjyf);
            yqData.add(yq);
        }
    }

    public void submitDataTime() {
        System.out.println("task start...");
        SimpleDateFormat formatM = new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String tjyf=formatM.format(new Date());
        String tjrq=format.format(new Date());
        DbContextHolder.setDefaultDbType("csdsc");
        List<Map<String,Object>> relationList = submitTaskDao.findDataZQ();

        List<Map<String,String>> statCategoryList = new ArrayList<Map<String,String>>();
        for (Map<String,Object> bean : relationList) {
            DbContextHolder.setDefaultDbType(objToString(bean.get("DATA_SOURCE")));//LASTMODIFY_TIME
            String sql= "select count(1) from "+objToString(bean.get("TABLE_NAME"))+" where Last_ANALYZED > to_date('"+objToString(bean.get("UPDATE_TIME"))+"','yyyy-mm-dd')";
            Object Count = statisticsTaskDao.getSqlResult(sql);
            int sum =Integer.parseInt(Count.toString());
            if(sum>0) {
                HashMap<String, String> map = new HashMap<String, String>();
                DbContextHolder.setDefaultDbType("zxqz");
                Object id = statisticsTaskDao.getSqlResult("SELECT DC_COMMON_SEQ.NEXTVAL FROM DUAL");
                map.put("id", objToString(id));
                map.put("wbj", objToString(bean.get("WBJ")));
                map.put("xxlmc", objToString(bean.get("XXLMC")));
                map.put("gxzq", objToString(bean.get("GXZQ")));
                map.put("tjsjrq", tjrq);
                map.put("sjtjl", objToString(Count));
                map.put("tjrqq", "");
                map.put("tjrqz", "");
                map.put("tjyf", tjyf);

                statCategoryList.add(map);
            }
        }

        DbContextHolder.setDefaultDbType("csdsc");
        for (Map<String,String> statCategory : statCategoryList) {
            statisticsTaskDao.addSubmitDataCountByTimeResult(statCategory);
        }

        System.out.println("task end...");
    }
}