package com.jeecms.resourceCategory.action;

import com.jeecms.common.ExportExcelUtil;
import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.util.StringUtils;
import com.jeecms.common.util.jsonUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.rdp.common.RdpUtils;
import com.jeecms.resourceCategory.bean.AdviceBean;
import com.jeecms.resourceCategory.bean.ConstantInfo;
import com.jeecms.resourceCategory.bean.PerInfoBean;
import com.jeecms.resourceCategory.service.ApprovalSequenceSer;
import com.jeecms.resourceCategory.util.CsdscUtil;
import com.sun.corba.se.impl.orbutil.closure.Constant;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ResourceCategoryAct {

    @Autowired
    private ApprovalSequenceSer approvalSequenceSer;

    @RequestMapping(value = "/resourceCategoryAct", method = {
            RequestMethod.GET, RequestMethod.POST})
    public String resourceCategory(HttpServletRequest request,
                                   HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null)
            return "userError";

        request.getSession().setAttribute("pageSize",
                PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd",
                PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp",
                PropertiesUtil.getValueBykey("weatherIp"));

        request.getSession().setAttribute("userId", user.getRdpUserId());
        request.getSession().setAttribute("userName", user.getUsername());
        request.getSession().setAttribute("userloginName",
                user.getRdploginName());
        request.getSession().setAttribute("phone", user.getRdpPhoneNumber());
        request.getSession().setAttribute("rdpRole", user.getRdpRole());
        if (user.getAuthKey() == null || "".equals(user.getAuthKey()))
            request.getSession().setAttribute("authKey", "");
        else
            request.getSession().setAttribute("authKey", user.getAuthKey());
        request.getSession().setAttribute("resources", user.getResources());

        return "resourceCategory";
    }

    @RequestMapping(value = "/personInformationAct", method = {
            RequestMethod.GET, RequestMethod.POST})
    public String personInformation(HttpServletRequest request,
                                    HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null) {
            return "userError";
        }
        String platformAdd = PropertiesUtil.getValueBykey("platformAdd");
        request.getSession().setAttribute("platformAdd", platformAdd);
        String url = platformAdd
                + "/service/api/csdsc/userInfoHandler/getUserInfoByUserid?userId="
                + user.getRdpUserId();
        try {
            com.alibaba.fastjson.JSONObject parse = com.alibaba.fastjson.JSON
                    .parseObject(CsdscUtil.httpPost(url));
            if (parse.getBooleanValue("success")) {
                PerInfoBean perInfoBean = parse.getObject("data",
                        PerInfoBean.class);

                request.getSession().setAttribute("userId",
                        perInfoBean.getUserId());
                request.getSession().setAttribute("userloginName",
                        perInfoBean.getLoginName());
                request.getSession().setAttribute("userName",
                        perInfoBean.getUserName());
                request.getSession().setAttribute("rdpUserOrg",
                        perInfoBean.getOrgName());
                request.getSession().setAttribute("rdpPhoneNumber",
                        perInfoBean.getUserPhone());
                request.getSession().setAttribute("rdpUnerAddr",
                        perInfoBean.getUserAddress());

                request.getSession().setAttribute("pageSize",
                        PropertiesUtil.getValueBykey("pageSize"));
                request.getSession().setAttribute("platformAdd",
                        PropertiesUtil.getValueBykey("platformAdd"));
                request.getSession().setAttribute("weatherIp",
                        PropertiesUtil.getValueBykey("weatherIp"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "personInformation";
    }

    @RequestMapping(value = "/myCountAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public String myCount(HttpServletRequest request,
                          HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null)
            return "userError";
        request.getSession().setAttribute("userId", user.getRdpUserId());
        request.getSession().setAttribute("pageSize", PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd", PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp", PropertiesUtil.getValueBykey("weatherIp"));
        return "myCount";
    }

    @RequestMapping(value = "/myApprovalAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public String approval(HttpServletRequest request,
                           HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null)
            return "userError";
        request.getSession().setAttribute("userId", user.getRdpUserId());
        request.getSession().setAttribute("pageSize",
                PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd",
                PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp",
                PropertiesUtil.getValueBykey("weatherIp"));

        return "myApproval";
    }

    @RequestMapping(value = "/addDownloadInfo", method = {RequestMethod.GET,
            RequestMethod.POST})
    public void addDownloadInfo(HttpServletRequest request,
                                HttpServletResponse response, String assetId, String assetName,
                                String assetProvider, String assetProvidername, String fileNm,
                                String url, String reason) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null) {
            return;
        }
        String userId = user.getRdpUserId();
        String userName = user.getUsername();
        request.getSession().setAttribute("userId", userId);

        // 设置 HTTP POST 请求参数必须用 NameValuePair 对象
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("userId", userId));
        params.add(new BasicNameValuePair("userName", userName));
        params.add(new BasicNameValuePair("assetId", assetId));
        params.add(new BasicNameValuePair("assetName", assetName));
        params.add(new BasicNameValuePair("assetProvider", assetProvider));
        params.add(new BasicNameValuePair("assetProvidername",
                assetProvidername));
        params.add(new BasicNameValuePair("fileNm", fileNm));
        params.add(new BasicNameValuePair("url", url.substring(0, url
                .indexOf("?"))));
        params.add(new BasicNameValuePair("reason", reason));

        String platformAdd = PropertiesUtil.getValueBykey("platformAdd");
        String platformUrl = platformAdd
                + "/service/api/csdsc/ftpDownloadHandler/addDownloadInfo";
        JSONObject jo = new JSONObject();
        String result = "";
        try {
            result = CsdscUtil.httpPost(platformUrl, params);
        } catch (IOException e) {
            e.printStackTrace();
            jo.put("success", false);
            jo.put("msg", "远程请求发生错误！");
            result = jo.toString();
        }
        ResponseUtils.renderJson(response, result);
    }

    @RequestMapping(value = "/myDownload", method = {RequestMethod.GET,
            RequestMethod.POST})
    public String download(HttpServletRequest request,
                           HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null) {
            return "userError";
        }
        String userId = user.getRdpUserId();
        request.getSession().setAttribute("userId", userId);
        request.getSession().setAttribute("pageSize",
                PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd",
                PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp",
                PropertiesUtil.getValueBykey("weatherIp"));

        if (user.getAuthKey() == null || "".equals(user.getAuthKey()))
            request.getSession().setAttribute("authKey", "");
        else
            request.getSession().setAttribute("authKey", user.getAuthKey());

        return "myDownload";
    }

    @RequestMapping(value = "/downloadHistory", method = {RequestMethod.GET,
            RequestMethod.POST})
    public String downloadHistory(HttpServletRequest request,
                                  HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null) {
            return "userError";
        }
        String userId = user.getRdpUserId();
        request.getSession().setAttribute("userId", userId);
        request.getSession().setAttribute("pageSize",
                PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd",
                PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp",
                PropertiesUtil.getValueBykey("weatherIp"));
        return "downloadHistory";
    }

    @RequestMapping(value = "/myTodoAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public String myTodo(HttpServletRequest request,
                         HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null)
            return "userError";
        request.getSession().setAttribute("userId", user.getRdpUserId());
        request.getSession().setAttribute("userOrgId", user.getRdpUserOrgId());
        request.getSession().setAttribute("userOrgName", user.getRdpUserOrg());
        request.getSession().setAttribute("pageSize",
                PropertiesUtil.getValueBykey("pageSize"));
        request.setAttribute("type", request.getParameter("type"));

        return "myTodo";

    }

    @SuppressWarnings("unused")
    @RequestMapping(value = "/myTodoPrintAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public void TodoPrintAct(HttpServletRequest request,
                             HttpServletResponse response) {

        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null)
                return;
            String assetList = request.getParameter("id");

            String voucherIndex = approvalSequenceSer.GetApprovalSequence();// 备案号

            Configuration configuration = new Configuration();

            configuration.setDefaultEncoding("utf-8");
            String path = request.getRealPath("/")
                    + "/WEB-INF/classes/com/jeecms/resourceCategory/template";

            File file = new File(path);
            configuration.setDirectoryForTemplateLoading(file);
            Template t = configuration.getTemplate("spdy.ftl");

            Map<String, Object> dataMap = new HashMap<String, Object>();
            dataMap.put("bah", voucherIndex);

            List<AdviceBean> adviceList = new ArrayList<AdviceBean>();
            List<String> al = new ArrayList<String>();
            List<String> sqbms = new ArrayList<String>();
            List<String> sqrs = new ArrayList<String>();
            List<String> sqrqs = new ArrayList<String>();

            String assetIds = "";
            if (assetList != null && !"".equals(assetList)) {
                for (int i = 0; i < assetList.split(">>>").length; i++) {
                    al.add(assetList.split(">>>")[i].split(",")[0]);
                    sqbms.add(assetList.split(">>>")[i].split(",")[1]);
                    sqrs.add(assetList.split(">>>")[i].split(",")[2]);
                    sqrqs.add(assetList.split(">>>")[i].split(",")[3]);
                }

                if (al.size() >= 1) {
                    for (int i = 0; i < al.size(); i++) {
                        adviceList.add(getAdviceBeanByid(al.get(i), sqbms
                                .get(i), sqrs.get(i), sqrqs.get(i)));
                        assetIds += al.get(i) + ",";
                    }
                }

            }
            dataMap.put("table3", adviceList);

//            if(adviceList.size() >=1){
//                // 申请人姓名
//            	System.out.println("=================申请人："+adviceList.get(0).getSqr());
//                dataMap.put("xm",adviceList.get(0).getSqr());
//                // 申请人部门
//                dataMap.put("sqrbm", adviceList.get(0).getSqbm());
//            }
            response.setCharacterEncoding("UTF-8");
            response.setContentType("Application/vnd.ms-word");

            String name = new String("徐州市信息资源申请表".getBytes("GBK"),
                    "ISO-8859-1");
            response.setHeader("Content-disposition", "attachment;filename="
                    + name + ".doc");
            Writer out = response.getWriter();

            t.process(dataMap, out);
            out.flush();
            out.close();
            String url = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/sps/voucherHandler/saveVoucher?assetList="
                    + assetIds.substring(0, assetIds.length() - 1)
                    + "&voucherIndex=" + voucherIndex + "&proposerId="
                    + user.getRdpUserId();
            String res = PropertiesUtil.getHtmlByUrl(url);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        }

    }

    @SuppressWarnings("unused")
    @RequestMapping(value = "/myTodoExportAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public void TodoExportAct(HttpServletRequest request,
                              HttpServletResponse response) {
        try {

            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            String kw = request.getParameter("kw");
            String sqf = request.getParameter("sqf");
            String tgf = request.getParameter("tgf");
            String sqrqstart = request.getParameter("sqrqstart");
            String sqrqend = request.getParameter("sqrqend");
            String s = request.getParameter("s");

            String getDataURL = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/sps/approvalHandler/queryForService?1=1&limit=100000&start=0&o=time";
            getDataURL += "&userId=" + user.getRdpUserId();

            if (kw != null)
                getDataURL += "&kw=" + kw;
            if (sqf != null)
                getDataURL += "&pOcd=" + sqf;
            if (tgf != null)
                getDataURL += "&oOcd=" + tgf;
            if (sqrqstart != null)
                getDataURL += "&ts=" + sqrqstart;
            if (sqrqend != null)
                getDataURL += "&te=" + sqrqend;
            if (s != null)
                getDataURL += "&s=" + s;
            JSONObject IRCServerList = new JSONObject(RdpUtils
                    .readRdpInterface(request, getDataURL, "json"));

            JSONArray ja = IRCServerList.getJSONArray("list");

            List<Map<String, Object>> maplist = new ArrayList<Map<String, Object>>();
            for (int i = 0; i < ja.length(); i++) {
                Map<String, Object> map = new HashMap<String, Object>();
                String proposer_name = (String) ja.getJSONObject(i).get(
                        "proposer_name");
                map.put("proposer_name", proposer_name);

                String proposer_org_name = (String) ja.getJSONObject(i).get(
                        "proposer_org_name");
                map.put("proposer_org_name", proposer_org_name);

                String asset_name = (String) ja.getJSONObject(i).get(
                        "asset_name");
                map.put("asset_name", asset_name);

                String asset_provider_name = (String) ja.getJSONObject(i).get(
                        "asset_provider_name");
                map.put("asset_provider_name", asset_provider_name);

                String apply_time = String.valueOf(ja.getJSONObject(i).get(
                        "apply_time"));
                SimpleDateFormat myFmt2 = new SimpleDateFormat("yyyy-MM-dd");
                long time = Long.valueOf(apply_time);
                apply_time = myFmt2.format(new Date(time));
                map.put("apply_time", apply_time);

                String status = "";
                if (!ja.getJSONObject(i).isNull("status")) {
                    status = (String) ja.getJSONObject(i).get("status");
                }
                map.put("status", status);

                maplist.add(map);
                map = null;
            }

            response.setCharacterEncoding("UTF-8");

            String params[] = {"申请人", "申请单位", "资源名称", "资源提供方", "申请日期", "状态"};
            String keys[] = {"proposer_name", "proposer_org_name",
                    "asset_name", "asset_provider_name", "apply_time", "status"};

            HSSFWorkbook wb = ExportExcelUtil.exportForExcel(params, keys,
                    maplist);
            String name = new String("审批记录".toString().getBytes("GBK"),
                    "ISO-8859-1");
            response.reset();
            response.setContentType("applicationnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;Filename="
                    + name + ".xls");
            OutputStream ouputStream = response.getOutputStream();
            wb.write(ouputStream);
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @SuppressWarnings("unused")
    @RequestMapping(value = "/myProprietaryExportAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public void ProprietaryExportAct(HttpServletRequest request,
                              HttpServletResponse response) {
        try {
            String data = request.getParameter("data");
            int type=Integer.parseInt(request.getParameter("type"));
            List<Map<String,Object>> maplist=null;
            if(""!=data){
                maplist=jsonUtils.getList(data);
            }
            response.setCharacterEncoding("UTF-8");

            String params[]=null;
            String keys[]=null;
            String title=null;
            if(type==1){
            	title=ConstantInfo.name1;
            	params=ConstantInfo.params1;
            	keys=ConstantInfo.keys1;
            }else if(type==2){
            	title=ConstantInfo.name2;
            	params=ConstantInfo.params2;
            	keys=ConstantInfo.keys2;
            }else if(type==3){
            	title=ConstantInfo.name3;
            	params=ConstantInfo.params3;
            	keys=ConstantInfo.keys3;
            }else if(type==4){
            	title=ConstantInfo.name4;
            	params=ConstantInfo.params4;
            	keys=ConstantInfo.keys4;
            }else if(type==5){
            	title=ConstantInfo.name5;
            	params=ConstantInfo.params5;
            	keys=ConstantInfo.keys5;
            }else if(type==6){
            	title=ConstantInfo.name6;
            	params=ConstantInfo.params6;
            	keys=ConstantInfo.keys6;
            }else if(type==7){
            	title=ConstantInfo.name7;
            	params=ConstantInfo.params7;
            	keys=ConstantInfo.keys7;
            }else if(type==8){
            	title=ConstantInfo.name8;
            	params=ConstantInfo.params8;
            	keys=ConstantInfo.keys8;
            }else if(type==9){
            	title=ConstantInfo.name9;
            	params=ConstantInfo.params9;
            	keys=ConstantInfo.keys9;
            }else if(type==10){
            	title=ConstantInfo.name10;
            	params=ConstantInfo.params10;
            	keys=ConstantInfo.keys10;
            }else if(type==11){
            	title=ConstantInfo.name11;
            	params=ConstantInfo.params11;
            	keys=ConstantInfo.keys11;
            }else if(type==12){
            	title=ConstantInfo.name12;
            	params=ConstantInfo.params12;
            	keys=ConstantInfo.keys12;
            }else if(type==13){
            	title=ConstantInfo.name13;
            	params=ConstantInfo.params13;
            	keys=ConstantInfo.keys13;
            }else if(type==14){
            	title=ConstantInfo.name14;
            	params=ConstantInfo.params14;
            	keys=ConstantInfo.keys14;
            }else if(type==15){
            	title=ConstantInfo.name15;
            	params=ConstantInfo.params15;
            	keys=ConstantInfo.keys15;
            }else if(type==16){
            	title=ConstantInfo.name16;
            	params=ConstantInfo.params16;
            	keys=ConstantInfo.keys16;
            }else if(type==17){
            	title=ConstantInfo.name17;
            	params=ConstantInfo.params17;
            	keys=ConstantInfo.keys17;
            }else if(type==18){
            	title=ConstantInfo.name18;
            	params=ConstantInfo.params18;
            	keys=ConstantInfo.keys18;
            }else if(type==19){
            	title=ConstantInfo.name19;
            	params=ConstantInfo.params19;
            	keys=ConstantInfo.keys19;
            }
            
            HSSFWorkbook wb = ExportExcelUtil.exportForExcel(params, keys,
                    maplist);
            String name = new String(title.toString().getBytes("GBK"),
                    "ISO-8859-1");
            response.reset();
            response.setContentType("applicationnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;Filename="
                    + name + ".xls");
            OutputStream ouputStream = response.getOutputStream();
            wb.write(ouputStream);
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/export2Excel", method = {RequestMethod.GET,
            RequestMethod.POST})
    public void export2Excel(HttpServletRequest request,
                             HttpServletResponse response, String flag, String downId) {
        try {

            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null) {
                return;
            }

            String getDataURL = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/csdsc/onlineInformationHandler/downloadStatisticsInfo";

            List<NameValuePair> params = new ArrayList<NameValuePair>();
            if (flag != null) {
                params.add(new BasicNameValuePair("flag", flag));
            }
            if (downId != null) {
                params.add(new BasicNameValuePair("downId", downId));
            }

            String downloadList = CsdscUtil.httpPost(getDataURL, params);
            com.alibaba.fastjson.JSONArray ja = com.alibaba.fastjson.JSONObject
                    .parseArray(downloadList);

            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("Sheet1");
            HSSFRow row = sheet.createRow(0);

            row.createCell(0).setCellValue("统计项名称");
            row.createCell(1).setCellValue("分类");
            row.createCell(2).setCellValue("子统计项名称");
            row.createCell(3).setCellValue("统计数量");

            for (int i = 0; i < ja.size(); i++) {
                com.alibaba.fastjson.JSONObject jsonObject = ja
                        .getJSONObject(i);
                row = sheet.createRow(i + 1);
                for (int j = 0; j < jsonObject.size(); j++) {
                    row.createCell(0).setCellValue(
                            jsonObject.getString("TJXMC"));
                    row.createCell(1).setCellValue(jsonObject.getString("FL"));
                    row.createCell(2)
                            .setCellValue(jsonObject.getString("ZTJX"));
                    row.createCell(3).setCellValue(jsonObject.getString("SM"));
                }
            }

            response.reset();

            String name;
            if (flag != null) {
                name = new String((flag + "库统计项").getBytes("GBK"), "ISO-8859-1");
            } else {
                name = new String("人口法人库统计项".getBytes("GBK"), "ISO-8859-1");
            }

            response.setContentType("applicationnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;Filename="
                    + name + ".xls");
            OutputStream ouputStream = response.getOutputStream();
            wb.write(ouputStream);
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/exportDownloadInfo", method = {
            RequestMethod.GET, RequestMethod.POST})
    public void exportDownloadInfo(HttpServletRequest request,
                                   HttpServletResponse response, String startDate, String endDate,
                                   String fileName, String start, String limit) {
        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null) {
                return;
            }
            String getDataURL = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/csdsc/ftpDownloadHandler/listUserDownloadInfo";
            String userId = user.getRdpUserId();
            request.getSession().setAttribute("userId", userId);

            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("userId", userId));
            params.add(new BasicNameValuePair("startDate", startDate));
            params.add(new BasicNameValuePair("endDate", endDate));
            params.add(new BasicNameValuePair("fileName", fileName == null ? ""
                    : fileName));
            params.add(new BasicNameValuePair("start", start == null ? "0"
                    : start));
            params.add(new BasicNameValuePair("limit", limit == null ? "5000"
                    : limit));

            String downloadList = CsdscUtil.httpPost(getDataURL, params);
            com.alibaba.fastjson.JSONObject ja = com.alibaba.fastjson.JSONObject
                    .parseObject(downloadList);

            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("Sheet1");
            HSSFRow row = sheet.createRow(0);
            HSSFCell cell;

            row.createCell(0).setCellValue("文件名称");
            row.createCell(1).setCellValue("下载地址");
            row.createCell(2).setCellValue("资源名称");
            row.createCell(3).setCellValue("资源提供方");
            row.createCell(4).setCellValue("下载理由");
            row.createCell(5).setCellValue("下载时间");

            com.alibaba.fastjson.JSONArray list = ja.getJSONArray("list");

            CellStyle cellStyle = wb.createCellStyle();
            CreationHelper createHelper = wb.getCreationHelper();
            cellStyle.setDataFormat(createHelper.createDataFormat().getFormat(
                    "yyyy/mm/dd hh:mm:ss"));

            for (int i = 0; i < list.size(); i++) {
                com.alibaba.fastjson.JSONObject jsonObject = list
                        .getJSONObject(i);
                row = sheet.createRow(i + 1);
                for (int j = 0; j < jsonObject.size(); j++) {
                    row.createCell(0).setCellValue(
                            jsonObject.getString("fileNm"));
                    row.createCell(1).setCellValue(jsonObject.getString("url"));
                    row.createCell(2).setCellValue(
                            jsonObject.getString("assetName"));
                    row.createCell(3).setCellValue(
                            jsonObject.getString("assetProvidername"));
                    row.createCell(4).setCellValue(
                            jsonObject.getString("reason"));
                    cell = row.createCell(5);
                    cell
                            .setCellValue(new Date(jsonObject
                                    .getLongValue("time")));
                    cell.setCellStyle(cellStyle);
                }
            }

            response.reset();
            String name = new String("下载记录".toString().getBytes("GBK"),
                    "ISO-8859-1");
            response.setContentType("applicationnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;Filename="
                    + name + ".xls");
            OutputStream ouputStream = response.getOutputStream();
            wb.write(ouputStream);
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/exportDownloadHistory", method = {
            RequestMethod.GET, RequestMethod.POST})
    public void exportDownloadHistory(HttpServletRequest request, HttpServletResponse response,
                                      String fileName, String start, String limit) {
        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null) {
                return;
            }
            String getDataURL = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/csdsc/ftpDownloadHandler/listDownloadHistory";

            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("fileName", fileName == null ? ""
                    : fileName));
            params.add(new BasicNameValuePair("start", start == null ? "0"
                    : start));
            params.add(new BasicNameValuePair("limit", limit == null ? "5000"
                    : limit));

            String history = CsdscUtil.httpPost(getDataURL, params);
            com.alibaba.fastjson.JSONObject ja = com.alibaba.fastjson.JSONObject
                    .parseObject(history);

            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("Sheet1");
            HSSFRow row = sheet.createRow(0);

            row.createCell(0).setCellValue("文件名称");
            row.createCell(1).setCellValue("资源名称");
            row.createCell(2).setCellValue("资源提供方");
            row.createCell(3).setCellValue("下载次数");

            com.alibaba.fastjson.JSONArray list = ja.getJSONArray("list");

            for (int i = 0; i < list.size(); i++) {
                com.alibaba.fastjson.JSONObject jsonObject = list
                        .getJSONObject(i);
                row = sheet.createRow(i + 1);
                for (int j = 0; j < jsonObject.size(); j++) {
                    row.createCell(0).setCellValue(
                            jsonObject.getString("file_nm"));
                    row.createCell(1).setCellValue(
                            jsonObject.getString("asset_name"));
                    row.createCell(2).setCellValue(
                            jsonObject.getString("asset_providername"));
                    row.createCell(3).setCellValue(
                            jsonObject.getString("count"));
                }
            }

            response.reset();
            String name = new String("下载历史".toString().getBytes("GBK"),
                    "ISO-8859-1");
            response.setContentType("applicationnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;Filename="
                    + name + ".xls");
            OutputStream ouputStream = response.getOutputStream();
            wb.write(ouputStream);
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private AdviceBean getAdviceBeanByid(String id, String sqbm, String sqr,
                                         String sqrq) {

        String platformAdd = PropertiesUtil.getValueBykey("platformAdd");
        String reqURL = platformAdd
                + "/service/api/sps/approvalHandler/loadDetail?id=" + id;

        String html = PropertiesUtil.getHtmlByUrl(reqURL);
        if (html == null || "".equals(html) || html.indexOf("assetName") == -1)
            return null;

        AdviceBean ab = new AdviceBean();

        String slr = "";// 受理人
        String slbm = "";// 受理部门
        String slrq = "";// 受理日期
        String slyj = "";// 受理意见
        String slbz = "";// 受理备注
        
        String shbm = "";// 受理部门
        String shrq = "";// 受理日期
        String shyj = "";// 受理意见
        String shbz = "";// 受理备注
        String spr = "";// 审批人
        String spbm = "";// 审批部门
        String sprq = "";// 审批日期
        String spyj = "";// 审批意见
        String spbz = "";// 审批备注

        StringBuilder tempSqzdmc = new StringBuilder();// 申请字段
        String sqzdspzt = "申请";
        StringBuilder tempSpwttzd = new StringBuilder();// 审批未通过字段
        String spwttzt = "未通过";
        StringBuilder tempSpyttzd = new StringBuilder();// 审批通过字段
        String spyttzt = "已通过";

        JSONObject sesponseJSON = new JSONObject(html.substring(1, html
                .length() - 1));

        String zymc = sesponseJSON.getString("assetName");// 信息资源名称

        String sqsm = "";
        try {
            sqsm = sesponseJSON.getString("comment");
        } catch (JSONException e) {
        }
        try {
            String appliedfield = sesponseJSON.getString("appliedfield");
            if (!"".equals(appliedfield) && null != appliedfield) {
                String temp[] = appliedfield.split("@@");

                for (int i = 0; i < temp.length; i++) {
                    if ("1".equals(temp[i].substring(temp[i].length() - 1,
                            temp[i].length()))) {
                        if (i == 0)
                            tempSqzdmc.append(temp[i].substring(0, temp[i]
                                    .length() - 2));
                        else
                            tempSqzdmc.append(" , ").append(
                                    temp[i].substring(0, temp[i].length() - 2));
                    }
                }
            }
        } catch (JSONException e) {
        }
        try {
            String allowedfield = sesponseJSON.getString("allowedfield");
            if (!"".equals(allowedfield) && null != allowedfield) {
                String temp[] = allowedfield.split("@@");
                int k = 0;
                int k1 = 0;
                for (int i = 0; i < temp.length; i++) {
                    if ("0".equals(temp[i].substring(temp[i].length() - 1,
                            temp[i].length()))) {
                        if (k == 0)
                            tempSpwttzd.append(temp[i].substring(0, temp[i]
                                    .length() - 2));
                        else
                            tempSpwttzd.append(" , ").append(
                                    temp[i].substring(0, temp[i].length() - 2));
                        k++;
                    } else if ("1".equals(temp[i].substring(
                            temp[i].length() - 1, temp[i].length()))) {
                        if (k1 == 0)
                            tempSpyttzd.append(temp[i].substring(0, temp[i]
                                    .length() - 2));
                        else
                            tempSpyttzd.append(" , ").append(
                                    temp[i].substring(0, temp[i].length() - 2));
                        k1++;
                    }
                }
            }
        } catch (JSONException e) {

        }

        String rlsesList = sesponseJSON.getJSONArray("commentList").toString();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        List<Map<String, Object>> rolseArray = jsonUtils.getList(rlsesList);
        for (int i = 0; i < rolseArray.size(); i++) {
        	if(i==0){
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get(
                "approverOrgName"))) {
                	System.out.println("=========================:"+rolseArray.get(i).get("approverName") + "");
                   ab.setSqr(rolseArray.get(i).get("approverName") + "");// 审批人
                   ab.setSqbm(rolseArray.get(i).get("approverOrgName") + "");// 审批部门
                }
        		
        	}
            if (i == 1) {
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get(
                        "approverOrgName"))) {
                    // slbm= rolseArray.get(i).get("approverOrgName")+"";//受理部门
                    slbm = "智慧徐州建设领导小组办公室";// modify by wugangd 20150812
                    // 受理部门写死为"信息资源管理中心"
                    slr = rolseArray.get(i).get("approverName") + "";// 受理人
                }
                // slsj= rolseArray.get(i).get("dealTime")+"";//受理日期
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("dealTime"))) {
                    Date date = new Date(Long.valueOf(rolseArray.get(i).get(
                            "dealTime").toString()));
                    slrq = sdf.format(date);
                }
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("decision")))
                    slyj = rolseArray.get(i).get("decision") + "";// 受理意见
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("comment")))
                    slbz = rolseArray.get(i).get("comment") + "";// 受理备注
            }
            if (i == 2) {
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get(
                        "approverOrgName"))) {
                    //spr = rolseArray.get(i).get("approverName") + "";// 审批人
                    shbm = rolseArray.get(i).get("approverOrgName") + "";// 审批部门
                }

                // spsj= rolseArray.get(i).get("dealTime")+"";//审批日期
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("dealTime"))) {
                    Date date = new Date(Long.valueOf(rolseArray.get(i).get(
                            "dealTime").toString()));
                    shrq = sdf.format(date);
                }
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("decision")))
                    shyj = rolseArray.get(i).get("decision") + "";// 审批意见
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("comment")))
                    shbz = rolseArray.get(i).get("comment") + "";// 审批备注
            }
            if (i == 3) {
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get(
                        "approverOrgName"))) {
                    spr = rolseArray.get(i).get("approverName") + "";// 审批人
                    spbm = rolseArray.get(i).get("approverOrgName") + "";// 审批部门
                }

                // spsj= rolseArray.get(i).get("dealTime")+"";//审批日期
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("dealTime"))) {
                    Date date = new Date(Long.valueOf(rolseArray.get(i).get(
                            "dealTime").toString()));
                    sprq = sdf.format(date);
                }
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("decision")))
                    spyj = rolseArray.get(i).get("decision") + "";// 审批意见
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get("comment")))
                    spbz = rolseArray.get(i).get("comment") + "";// 审批备注
            }
        }

//        ab.setSqbm(sqbm);
//        ab.setSqr(sqr);
//        ab.setSqrq(sqrq);

        ab.setSlr(slr); // 受理部门
        ab.setSlbm(slbm); // 受理部门
        ab.setSlrq(slrq);// 受理日期
        ab.setSlyj(slyj + "   " + slbz);// 受理意见
        ab.setSpr(spr); // 受理部门
        ab.setShbm(shbm);// 审核部门
        ab.setShrq(shrq);// 审核日期
        ab.setShyj(shyj + "  " + shbz);// 审核备注
        ab.setSpbm(spbm);// 审批部门
        ab.setSprq(sprq);// 审批日期
        ab.setSpyj(spyj + "  " + spbz);// 审批备注
        ab.setSqsm(sqsm);// 申请说明
        ab.setZymc(zymc);// 信息资源名称

        if (tempSqzdmc.toString().length() > 1) {
            ab.setSqzdmc(tempSqzdmc.toString());
            ab.setSqzdspzt(sqzdspzt);
        } else {
            ab.setSqzdmc("");
            ab.setSqzdspzt("");
        }
        if (tempSpwttzd.toString().length() > 1) {
            ab.setSpwttzd(tempSpwttzd.toString());
            ab.setSpwttzt(spwttzt);
        } else {
            ab.setSpwttzd("");
            ab.setSpwttzt("");
        }
        if (tempSpyttzd.toString().length() > 1) {
            ab.setSpyttzd(tempSpyttzd.toString());
            ab.setSpyttzt(spyttzt);
        } else {
            ab.setSpyttzd("");
            ab.setSpyttzt("");
        }

        return ab;
    }

    @RequestMapping(value = "/synUserAct", method = {RequestMethod.GET,
            RequestMethod.POST})
    public void addUserAct(HttpServletRequest request,
                           HttpServletResponse response) {
        boolean flag = false;
        try {
            String type = request.getParameter("type");
            String username = request.getParameter("username");

            String email = request.getParameter("email");
            String password = request.getParameter("password");
            if ("add".equals(type)) {// 新增
                if (!StringUtils.isEmptyObj(username)
                        && !StringUtils.isEmptyObj(password)) {
                    flag = approvalSequenceSer.save(username, email, password);
                }
            }
            if ("update".equals(type)) {// 修改
                if (!StringUtils.isEmptyObj(username)) {
                    flag = approvalSequenceSer
                            .update(username, email, password);
                }
            }
            if ("del".equals(type)) {// 删除
                if (!StringUtils.isEmptyObj(username)) {
                    flag = approvalSequenceSer.del(username);
                }
            }

        } catch (Exception e) {
        }

        try {
            response.setCharacterEncoding("UTF-8");
            response.getWriter().print("{'success':" + flag + "}");
        } catch (IOException e) {

        }

    }
}