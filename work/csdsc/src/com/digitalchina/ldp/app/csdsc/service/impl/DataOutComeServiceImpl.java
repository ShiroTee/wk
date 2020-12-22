package com.digitalchina.ldp.app.csdsc.service.impl;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitInfoBean;
import com.digitalchina.ldp.app.csdsc.comm.ExcelUtils;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.DataOutComeDao;
import com.digitalchina.ldp.app.csdsc.dao.SubmitTaskDao;
import com.digitalchina.ldp.app.csdsc.service.DataOutComeService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.util.DbContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zhanglei on 15/7/16.
 */
@Service
public class DataOutComeServiceImpl implements DataOutComeService {
    @Autowired
    private DataOutComeDao dataOutComeDao;

    @Autowired
    private SubmitTaskDao submitTaskDao;

    @Override
    public Map<String, Object> getReportByMonth(int year, int month) {
        List<Map<String,Object>> gxsj = this.dataOutComeDao.getAddDataByMonth(year,month);
        List<Map<String,Object>> mygxsj = this.dataOutComeDao.getNotAddDataByMonth(year,month);
        List<Map<String,Object>> yy = this.dataOutComeDao.getApplicationTimesByMonth(year,month);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("gxsj",gxsj);
        map.put("mygxsj",mygxsj);
        map.put("yy",yy);
        return map;
    }

    @Override
    public Map<String, Object> getReportByYear(int year) {
        List<Map<String,Object>> gxsj = this.dataOutComeDao.getAddDataByYear(year);
        List<Map<String,Object>> all = this.dataOutComeDao.getDataByYear(year);
        List<Map<String,Object>> yy = this.dataOutComeDao.getApplicationTimesByYear(year);
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("gxsj",gxsj);
        map.put("all",all);
        map.put("yy",yy);
        return map;
    }

    @Override
    public Pager getUpdateList(int pageNo, int pageSize) {
        return dataOutComeDao.getUpdateList(pageNo, pageSize);
    }

    @Override
    public WbjDataSubmitInfoBean getUpdateInfoById(int id) {
        return dataOutComeDao.getUpdateInfoById(id);
    }
    
    @Override
    public List<Map<String, Object>> getOlapWbjData(Model model) {
    	String type = model.getValue("type");
    	String start = model.getValue("start");
    	String end = model.getValue("end");
        List<Map<String, Object>> list;
        if("1".equals(type)){
            list=dataOutComeDao.getOlapWbjSubmitData(start,end);
        }else{
            list=dataOutComeDao.getOlapWbjApplicationData(start,end);
        }
        return list;
    }

    @Override
    public Map<String, String> getOlapWbjDataExport(Model model) {
        List<Map<String, Object>> list = this.getOlapWbjData(model);
        HttpServletRequest request = model.getRequest();
        SimpleDateFormat dateFormater=new SimpleDateFormat("yyyy年MM月dd日hh时mm分ss秒SSS");
        Date date=new Date();
        String time=dateFormater.format(date);
        String type = model.getValue("type");
        String title = "数据交换统计";
        String[] columnName= {"委办局", "数据类名称", "更新周期", "数据所属区", "提交日期", "提交量"};
        if("0".equals(type)){
            title="应用使用统计";
            columnName=new String[4];
            columnName[0] ="委办局" ;
            columnName[1] = "应用名称";
            columnName[2] = "使用次数";
            columnName[3] = "最后使用时间";
        }

        return ExcelUtils.export(list,request,title,columnName,time);
    }
    
    @Override
    public List<Map<String, Object>> getOlapWdkData() {
        return dataOutComeDao.getOlapWdkData();
    }

    @Override
    public Pager getWbjSubmitData(int pageNo, int pageSize) {
        String sql = "select t.org_name wbjmc,to_number(t.data_num) all_data_count from TJFX_sjlsjszltj t order by all_data_count desc";
        return dataOutComeDao.queryForList(sql, pageNo, pageSize);
    }

    @Override
    public String createDataForSubmit(String sjssq){

        String[] checkDate=sjssq.split("-");
        List<Map<String, Object>> list=dataOutComeDao.getNotAddDataByMonth(Integer.parseInt(checkDate[0]),Integer.parseInt(checkDate[1]));

        if(list.size()>0){
            return "已经生成过"+sjssq+"的数据";
        }

        String msg="执行成功";
        try {
            //查出基础表的信息
            List<Map<String, Object>> relationList = submitTaskDao.findDataZQ();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat formatM = new SimpleDateFormat("yyyy-MM");
            SimpleDateFormat formatY = new SimpleDateFormat("yyyy");

            List<Map<String, String>> yqData = new ArrayList<Map<String, String>>();
            List<Map<String, String>> tjData = new ArrayList<Map<String, String>>();
            String[] dates=sjssq.split("-");
            if(dates.length!=2){
                return "日期格式不正确：YYYY-MM";
            }

            for (Map<String, Object> map : relationList) {
                String wbj = StringUtils.objToString(map.get("WBJ"));
                String id = StringUtils.objToString(map.get("ID"));
                String xxlmc = StringUtils.objToString(map.get("XXLMC"));
                String zq = StringUtils.objToString(map.get("GXZQ"));
                Calendar c = Calendar.getInstance();
                c.setTime(formatM.parse(sjssq));
                c.add(Calendar.MONTH, +1);
                String tjTime=formatM.format(c.getTime());
                dates=tjTime.split("-");
                String tjyf="";
                if ("月".equals(zq)) {
                    c.add(Calendar.MONTH, -1);
                    String time = formatM.format(c.getTime());
                    String sjssqDesc=time.replace("-","年")+"月";
                    tjyf=time;
                    compareData(id, wbj, xxlmc, zq, time, tjTime, yqData, tjData,sjssqDesc,tjyf);
                } else if ("季度".equals(zq)) {
                    if ("01".equals(dates[1]) || "04".equals(dates[1])
                            || "07".equals(dates[1]) || "10".equals(dates[1])) {
                        String sjssqDesc=tjTime.split("-")[0]+"年"
                                +(dates[1].equals("01")?"第四季度":(dates[1].equals("04")?"第一季度":(dates[1].equals("07")?"第二季度":"第三季度")));
                        c.add(Calendar.MONTH, -3);
                        String time = formatM.format(c.getTime());
                        c.add(Calendar.MONTH, +2);
                        tjyf=formatM.format(c.getTime());
                        compareData(id, wbj, xxlmc, zq, time, tjTime, yqData, tjData,sjssqDesc,tjyf);
                    }
                } else if ("半年".equals(zq)) {
                    if ("01".equals(dates[1]) || "07".equals(dates[1])) {
                        String sjssqDesc=tjTime.split("-")[0]+"年"
                                +(dates[1].equals("01")?"上半年":"下半年");
                        c.add(Calendar.MONTH, -6);
                        String time = formatM.format(c.getTime());
                        c.add(Calendar.MONTH, +5);
                        tjyf=formatM.format(c.getTime());
                        compareData(id, wbj, xxlmc, zq, time, tjTime, yqData, tjData,sjssqDesc,tjyf);
                    }
                } else {//年
                    c.add(Calendar.YEAR, -1);
                    String time = formatY.format(c.getTime()) + "-01";
                    if ("01".equals(dates[1])) {
                        String sjssqDesc=tjTime.split("-")[0]+"年";
                        tjyf= formatY.format(c.getTime())+"-12";
                        compareData(id, wbj, xxlmc, zq, time, tjTime, yqData, tjData,sjssqDesc,tjyf);
                    }
                }
            }
            /**
             * 处理没有在数据更总表里面的数据
             */
            //--------------------
            Calendar c = Calendar.getInstance();
            c.setTime(formatM.parse(sjssq));
            c.add(Calendar.MONTH, +1);
            String tjTime=formatM.format(c.getTime())+"-06";
            c.add(Calendar.MONTH, -1);
            String time = formatM.format(c.getTime())+"-06";
            String sjssqDesc=time.replace("-","年")+"月";

            List<Map<String,Object>> submitData = submitTaskDao.findDatasNotInSjgzb(sjssqDesc);

            for (Map<String,Object> map:submitData){
                Map<String,String> updateData = submitTaskDao.getUpdateMap(StringUtils.objToString(map.get("WBJ")),StringUtils.objToString(map.get("XXLMC")),tjTime,
                        time,StringUtils.objToString(map.get("TJSJRQ")),StringUtils.objToString(map.get("TJYF")));
                tjData.add(updateData);
            }
            //--------------------

            DbContextHolder.setDefaultDbType("csdsc");
            for (Map map : yqData) {
                submitTaskDao.addYQResult(map);
            }

            for (Map map : tjData) {
                submitTaskDao.updateData(map);
            }
        }catch (Exception e){
            msg="执行失败";
            e.printStackTrace();
        }

        return msg;
    }

    //添加数据
    public void compareData(String id,String wbj,String xxlmc,String zq,String tjrqq, String tjrqz,
                            List<Map<String,String>> yqData, List<Map<String,String>> tjData,String sjssqDesc,String tjyf){

        String qq=tjrqq+"-06";
        String qz=tjrqz+"-06";
        List<Map<String,Object>> submitData = submitTaskDao.findSubmitDatas(wbj,xxlmc,sjssqDesc);
        if(submitData.size()>0){//不存在：逾期
            String tjsj = StringUtils.objToString(submitData.get(0).get("TJSJRQ"));
            Map<String,String> updateData = submitTaskDao.getUpdateMap(wbj,xxlmc,qq,qz,tjsj,tjyf);
            tjData.add(updateData);
        }else{
            Map<String,String> yq = submitTaskDao.getYQMap(id,wbj,xxlmc,zq,qq,qz,tjyf);
            yqData.add(yq);
        }
    }

}
