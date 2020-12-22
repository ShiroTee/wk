package com.jeecms.resourceCategory.action;

import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.util.StringUtils;
import com.jeecms.common.util.jsonUtils;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.resourceCategory.bean.AdviceBean;
import com.jeecms.resourceCategory.bean.PerInfoBean;
import com.jeecms.resourceCategory.service.ApprovalSequenceSer;
import com.jeecms.resourceCategory.util.CsdscUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ResourceCategoryAct {

    @Autowired
    private ApprovalSequenceSer approvalSequenceSer;

    @RequestMapping(value = "/resourceCategoryAct", method = {
            RequestMethod.GET, RequestMethod.POST })
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
            RequestMethod.GET, RequestMethod.POST })
    public String personInformation(HttpServletRequest request,
                                    HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null) {
            return "userError";
        }
        String platformAdd = PropertiesUtil.getValueBykey("platformAdd");
        request.getSession().setAttribute("platformAdd", platformAdd);
        String platformAdd2 = PropertiesUtil.getValueBykey("platformAdd2");
        String url = platformAdd2
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

    @RequestMapping(value = "/myApprovalAct", method = { RequestMethod.GET,
            RequestMethod.POST })
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

    @RequestMapping(value = "/myTodoAct", method = { RequestMethod.GET,
            RequestMethod.POST })
    public String myTodo(HttpServletRequest request,
                         HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null)
            return "userError";
        request.getSession().setAttribute("userId", user.getRdpUserId());
        request.setAttribute("type", request.getParameter("type"));
        request.getSession().setAttribute("pageSize",
                PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd",
                PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp",
                PropertiesUtil.getValueBykey("weatherIp"));
        return "myTodo";
    }

    @RequestMapping(value = "/myCountAct", method = { RequestMethod.GET,
            RequestMethod.POST })
    public String myCount(HttpServletRequest request,
                          HttpServletResponse response) {

        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                "rdp_user");
        if (user == null)
            return "userError";
        request.getSession().setAttribute("userId", user.getRdpUserId());
        request.getSession().setAttribute("pageSize",  PropertiesUtil.getValueBykey("pageSize"));
        request.getSession().setAttribute("platformAdd", PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("weatherIp", PropertiesUtil.getValueBykey("weatherIp"));
        return "myCount";
    }

    @SuppressWarnings("unused")
    @RequestMapping(value = "/myApprovalPrintAct", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void ApprovalPrintAct(HttpServletRequest request,
                                 HttpServletResponse response) {
        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null)
                return;
            String assetList = request.getParameter("id");

            String voucherIndex = approvalSequenceSer.GetApprovalSequence();// 备案号
            String userName = user.getUsername();// 申请人
            String orgName = user.getRdpUserOrg();// 申请部门

            Configuration configuration = new Configuration();

            configuration.setDefaultEncoding("utf-8");
            String path = request.getRealPath("/")
                    + "/WEB-INF/classes/com/jeecms/resourceCategory/template";

            File file = new File(path);
            configuration.setDirectoryForTemplateLoading(file);
            Template t = configuration.getTemplate("spdy.ftl");

            Map<String, Object> dataMap = new HashMap<String, Object>();
            dataMap.put("bah", voucherIndex);
            dataMap.put("xm", userName);
            dataMap.put("sqrbm", orgName);

            List<AdviceBean> adviceList = new ArrayList<AdviceBean>();
            if (assetList != null || !"".equals(assetList)) {
                String ids[] = assetList.split(",");
                if (ids.length >= 1) {
                    for (int i = 0; i < ids.length; i++) {
                        adviceList.add(getAdviceBeanByid(ids[i]));
                    }
                }

            }
            dataMap.put("table3", adviceList);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("Application/vnd.ms-word");

            String name = new String("大理市信息资源申请表".toString().getBytes("GBK"),
                    "ISO-8859-1");
            response.setHeader("Content-disposition", "attachment;filename="
                    + name + ".doc");
            Writer out = response.getWriter();

            t.process(dataMap, out);
            out.flush();
            out.close();
            String url = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/sps/voucherHandler/saveVoucher?assetList="
                    + assetList.substring(0, assetList.length() - 1)
                    + "&voucherIndex=" + voucherIndex + "&proposerId="
                    + user.getRdpUserId();
            String res = PropertiesUtil.getHtmlByUrl(url);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        }
        return;
    }

    @SuppressWarnings("unused")
    @RequestMapping(value = "/myTodoPrintAct", method = { RequestMethod.GET,
            RequestMethod.POST })
    public void TodoPrintAct(HttpServletRequest request,
                             HttpServletResponse response) {

        try {
            UnifiedUser user = (UnifiedUser) request.getSession().getAttribute(
                    "rdp_user");
            if (user == null)
                return;
            String assetList = request.getParameter("id");

            String voucherIndex = approvalSequenceSer.GetApprovalSequence();// 备案号
            String userName = user.getUsername();// 申请人
            String orgName = user.getRdpUserOrg();// 申请部门

            userName = assetList.split(",")[2];
            orgName = assetList.split(",")[1];

            Configuration configuration = new Configuration();

            configuration.setDefaultEncoding("utf-8");
            String path = request.getRealPath("/")
                    + "/WEB-INF/classes/com/jeecms/resourceCategory/template";

            File file = new File(path);
            configuration.setDirectoryForTemplateLoading(file);
            Template t = configuration.getTemplate("spdy.ftl");

            Map<String, Object> dataMap = new HashMap<String, Object>();
            dataMap.put("bah", voucherIndex);
            dataMap.put("xm", userName);
            dataMap.put("sqrbm", orgName);

            List<AdviceBean> adviceList = new ArrayList<AdviceBean>();
            if (assetList != null || !"".equals(assetList)) {
                String ids = assetList.split(",")[0];
                ;
                adviceList.add(getAdviceBeanByid(ids));

            }
            dataMap.put("table3", adviceList);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("Application/vnd.ms-word");

            String name = new String("大理市信息资源申请表".toString().getBytes("GBK"),
                    "ISO-8859-1");
            response.setHeader("Content-disposition", "attachment;filename="
                    + name + ".doc");
            Writer out = response.getWriter();

            t.process(dataMap, out);
            out.flush();
            out.close();
            String url = PropertiesUtil.getValueBykey("platformAdd")
                    + "/service/api/sps/voucherHandler/saveVoucher?assetList="
                    + assetList.substring(0, assetList.length() - 1)
                    + "&voucherIndex=" + voucherIndex + "&proposerId="
                    + user.getRdpUserId();
            String res = PropertiesUtil.getHtmlByUrl(url);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        }

        return;
    }

    private AdviceBean getAdviceBeanByid(String id) {

        String platformAdd = PropertiesUtil.getValueBykey("platformAdd");
        String reqURL = platformAdd
                + "/service/api/sps/approvalHandler/loadDetail?id=" + id;

        String html = PropertiesUtil.getHtmlByUrl(reqURL);
        if (html == null || "".equals(html) || html.indexOf("assetName") == -1)
            return null;

        AdviceBean ab = new AdviceBean();

        String slbm = "";// 受理部门
        String slrq = "";// 受理日期
        String slyj = "";// 受理意见
        String slbz = "";// 受理备注
        String spbm = "";// 审批部门
        String sprq = "";// 审批日期
        String spyj = "";// 审批意见
        String spbz = "";// 审批备注

        JSONObject sesponseJSON = null;
        try {
            sesponseJSON = new JSONObject(html.substring(1, html
                    .length() - 1));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String zymc = null;// 信息资源名称
        try {
            zymc = sesponseJSON.getString("assetName");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String sqsm = "";
        try {
            sqsm = sesponseJSON.getString("comment");
        } catch (JSONException e) {

        }

        String rlsesList = null;
        try {
            rlsesList = sesponseJSON.getJSONArray("commentList").toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        List<Map<String, Object>> rolseArray = jsonUtils.getList(rlsesList);
        for (int i = 0; i < rolseArray.size(); i++) {
            if (i == 1) {
                if (!StringUtils.isEmptyObj(rolseArray.get(i).get(
                        "approverOrgName")))
                    slbm = rolseArray.get(i).get("approverOrgName") + "";// 受理部门
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
                        "approverOrgName")))
                    spbm = rolseArray.get(i).get("approverOrgName") + "";// 审批部门
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

        ab.setSlbm(slbm); // 受理部门
        ab.setSlrq(slrq);// 受理日期
        ab.setSlyj(slyj + "   " + slbz);// 受理意见
        ab.setSpbm(spbm);// 审批部门
        ab.setSprq(sprq);// 审批日期
        ab.setSpyj(spyj + "  " + spbz);// 审批备注
        ab.setSqsm(sqsm);// 申请说明
        ab.setZymc(zymc);// 信息资源名称

        return ab;
    }

    @RequestMapping(value = "/synUserAct", method = { RequestMethod.GET,
            RequestMethod.POST })
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

    //检查url是否可用
    @RequestMapping(value = "/checkUrlAviaible", method = { RequestMethod.GET,
            RequestMethod.POST })
    public void checkUrlAviaible(HttpServletRequest request,HttpServletResponse response){
        //获取url返回信息
       String geograUrl1=PropertiesUtil.getValueBykey("geograUrl1");
       String geograUrl2=PropertiesUtil.getValueBykey("geograUrl2");
        try {
            String result="{url1:\""+geograUrl1+"\",url2:\""+geograUrl2+"\"}";
            PrintWriter out = response.getWriter();
            out.print(result);//给前台返回成功信息
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
