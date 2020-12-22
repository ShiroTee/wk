package com.jeecms.resourceCategory.action;

import com.alibaba.fastjson.JSON;
import com.jeecms.ajaxservlet.HttpClientUtil;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.resourceCategory.util.ExcelUtils;
import com.jeecms.resourceCategory.util.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ResourceCsdscAct {

    @RequestMapping(value = "/rzlDownLoad", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void RzlDownload(HttpServletRequest request,
                                 HttpServletResponse response) {
        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null)
                return;


            String title = "酒店入住率";
            String[] columnName = {"时间", "特色客栈入住率(%)", "星级酒店入住率(%)", "经济型酒店入住率(%)"};
            String[] columnCode = {"TJYF", "TSMJKZRZL", "XJJDRZL", "JJXJDRZL"};
            Map<String, Object> dataMap = new HashMap<String, Object>();
            String start = request.getParameter("start");
            String end = request.getParameter("end");
            dataMap.put("start",start);
            dataMap.put("end",end);
            String rzlObj = HttpClientUtil.getAipDataPost(
                    request, "/service/api/csdsc/onlineInformationHandler/getRZLFX_EXPORT", "json", dataMap);
            System.out.println(rzlObj);
            Map<String,Object> obj=  JSON.parseObject(rzlObj, Map.class);
            Map<String,Object> rzlMap = (Map<String,Object>)obj.get("data");
            List<Map<String,Object>> rzl=(List<Map<String,Object>>) rzlMap.get("rzl");
            String pathPrefixion = request.getSession().getServletContext().getRealPath("/");
            Map<String,String> map =  ExcelUtils.export(rzl,pathPrefixion,title,columnName,columnCode);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            String userAgent = request.getHeader("User-Agent");
            //针对IE或者以IE为内核的浏览器：
            if (userAgent.contains("MSIE")||userAgent.contains("Trident")) {
                title = java.net.URLEncoder.encode(title, "UTF-8");
            } else {
            //非IE浏览器的处理：
                title = new String(title.getBytes("UTF-8"),"ISO-8859-1");
            }

            response.setHeader("Content-disposition", "attachment;filename="
                    + title + ".xls");

            File file = new File(StringUtils.objToString(map.get("path")));
            FileInputStream inputStream = new FileInputStream(file);

            //3.通过response获取ServletOutputStream对象(out)
            ServletOutputStream out = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) != -1) {
                out.write(buffer, 0, length);
            }

            inputStream.close();
            out.flush();
            out.close();
            file.delete();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return;
    }

    @RequestMapping(value = "/dbhcDownLoad", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void DBHCDownload(HttpServletRequest request,
                            HttpServletResponse response) {
        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null)
                return;
            SimpleDateFormat dateFormater=new SimpleDateFormat("yyyy年MM月dd日hh时mm分ss秒SSS");
            Date date=new Date();
            String time=dateFormater.format(date);
            String title = "低保核查";
            String[] columnName = {"户号", "姓名", "身份证号", "与户主关系", "户籍性质", "户籍地址", "家庭住址", "低保保障类别", "生存状态",
                    "性别", "年龄", "民族", "政治面貌", "就业状况", "婚姻状况", "文化程度", "劳动能力", "健康状况", "月缴公积金数额",
                    "工商注册资金", "房产类型", "房产结构", "房产面积", "房产位置", "月享受社保金额", "是否有车辆", "纳税状态"};

            String[] columnCode = {"HH", "XM", "SFZH", "YHZGX", "HJXZ", "HJDZ", "JTZZ", "DBBZLB", "SCZS",
                    "XB", "NL", "MZ", "ZZMM", "JYZK", "HYZK", "WHCD", "LDNL", "JKZK", "YJGJJSE",
                    "GSZCZJ", "FCLX", "FCJG", "FCMJ", "FCWZ", "YXSSBJE", "SFYCL", "NSQK"};

            Map<String, Object> dataMap = new HashMap<String, Object>();

            String start =request.getParameter("start");
            String end =request.getParameter("end");
            String sfzjhs = request.getParameter("list");

            dataMap.put("start",start);
            dataMap.put("end",end);
            dataMap.put("list",sfzjhs);
            String rzlObj = HttpClientUtil.getAipDataPost(
                    request, "/service/api/csdsc/onlineInformationHandler/getDBHC_Export", "json", dataMap);

            System.out.println(rzlObj);
            Map<String,Object> obj=  JSON.parseObject(rzlObj, Map.class);
            Map<String,Object> dbhcMap = (Map<String,Object>)obj.get("data");
            List<Map<String,Object>> dbhc=(List<Map<String,Object>>) dbhcMap.get("dbhc");
            String pathPrefixion = request.getSession().getServletContext().getRealPath("/");
            Map<String,String> map =  ExcelUtils.export(dbhc,pathPrefixion,title,columnName,columnCode);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            String userAgent = request.getHeader("User-Agent");
            //针对IE或者以IE为内核的浏览器：
            if (userAgent.contains("MSIE")||userAgent.contains("Trident")) {
                title = java.net.URLEncoder.encode(title, "UTF-8");
            } else {
                //非IE浏览器的处理：
                title = new String(title.getBytes("UTF-8"),"ISO-8859-1");
            }

            response.setHeader("Content-disposition", "attachment;filename="
                    + title + ".xls");

            File file = new File(StringUtils.objToString(map.get("path")));
            FileInputStream inputStream = new FileInputStream(file);

            //3.通过response获取ServletOutputStream对象(out)
            ServletOutputStream out = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) != -1) {
                out.write(buffer, 0, length);
            }

            inputStream.close();
            out.flush();
            out.close();
            file.delete();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return;
    }
}
