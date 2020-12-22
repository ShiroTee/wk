package com.jeecms.resourceCategory.action;

import com.alibaba.fastjson.JSON;
import com.jeecms.resourceCategory.service.FtpService;
import com.jeecms.resourceCategory.util.PropertiesUtil;
import com.jeecms.resourceCategory.util.StringUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Controller
public class FtpCsdscAct {

    @Autowired
    private FtpService ftpService;

    /*
    * ftp上传文件
    */
    @RequestMapping(value = "/submitFtpFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void submitFtpFile(HttpServletRequest request,
                                             HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        String path= StringUtils.objToString(request.getParameter("path"));
        if(path==null ||"".equals(path)){
          path = StringUtils.objToString(request.getSession().getAttribute("ftpPath"));
        }
        System.out.print(path+"------------------");
        Map<String, Object> map =this.ftpService.submitFtpFile(path,request);
        String s=JSON.toJSONString(map);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }

    /*
* ftp加密上传文件
*/
    @RequestMapping(value = "/submitEncodeFtpFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void submitEncodeFtpFile(HttpServletRequest request,
                              HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        try {
            request.setCharacterEncoding("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String path= StringUtils.objToString(request.getParameter("path"));
        String fileName= StringUtils.objToString(request.getParameter("fileName"));
        String fileId= StringUtils.objToString(request.getParameter("fileId"));

        String fileEnd= StringUtils.objToString(request.getParameter("fileEnd"));
        String loaded= StringUtils.objToString(request.getParameter("loaded"));
        String total= StringUtils.objToString(request.getParameter("total"));


        String fileData=getFormData(request);

        if(path==null ||"".equals(path)){
            path = StringUtils.objToString(request.getSession().getAttribute("ftpPath"));
        }
        System.out.println(path+"------------------");
        Map<String, Object> map =this.ftpService.submitEncodeFtpFile(path, request,fileData,fileName,fileId,loaded,fileEnd,total);
        String s=JSON.toJSONString(map);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }

    private String getFormData(HttpServletRequest req){
            DiskFileItemFactory factory = new DiskFileItemFactory();

        // 当上传文件太大时，因为虚拟机能使用的内存是有限的，所以此时要通过临时文件来实现上传文件的保存
        // 此方法是设置是否使用临时文件的临界值（单位：字节）
        factory.setSizeThreshold(102400000);

        // 与上一个结合使用，设置临时文件的路径（绝对路径）
        factory.setRepository(new File(PropertiesUtil.base));

        // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload(factory);
        List<?> items = null;
        try {
            items = upload.parseRequest(req);
        } catch (FileUploadException e) {
            e.printStackTrace();
        }

        Iterator iter = items.iterator();
        while (iter.hasNext()) {
            FileItem item = (FileItem) iter.next();

            if (item.isFormField()) {
                //如果是普通表单字段
                String name = item.getFieldName();
                if(name.equals("fileData")) {
                    String value = null;
                    try {
                        value = item.getString("GBK");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                    return value;
                }
            }
        }
        return "";
    }

    /*
      * 获取加密密钥
      */
    @RequestMapping(value = "/getFtpFileKey", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void getFtpFileKey(HttpServletRequest request,
                            HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        String loginName = StringUtils.objToString(request.getSession().getAttribute("ftpLoginName"));
       String str;
        if(loginName==null ||"".equals(loginName)){
           str ="";
        }else {
            if ("".equals(StringUtils.objToString(request.getSession().getAttribute("key")))){
                str = request.getSession().getId();
                str = str.substring(0, 8) + String.valueOf(System.currentTimeMillis()).substring(0, 8);
                request.getSession().setAttribute("key", str);
            }else {
               str=StringUtils.objToString(request.getSession().getAttribute("key"));
            }
        }

        String s=JSON.toJSONString(str);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }

    /*
    * ftp下载文件
    */
    @RequestMapping(value = "/downLoadFtpFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void downLoadFtpFile(HttpServletRequest request,
                                               HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        String path= request.getParameter("path");
        this.ftpService.downLoadFtpFile(path,request,response);
        return;
    }

    /*
     * 初始化ftp文件列表
     */
    @RequestMapping(value = "/initFtpFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void initFtpFile(HttpServletRequest request,
                                           HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> map =this.ftpService.initFtpFile(request);
        String s=JSON.toJSONString(map);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }

    /*
     * ftp获取文件列表
     */
    @RequestMapping(value = "/getFtpFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void getFtpFile(HttpServletRequest request,
                                          HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> map =this.ftpService.getFtpFile(request);
        String s=JSON.toJSONString(map);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }

    /*
    * ftp返回上一级
    */
    @RequestMapping(value = "/getUpperFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void getUpperFile(HttpServletRequest request,
                           HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> map =this.ftpService.getLastFile(request);
        String s=JSON.toJSONString(map);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }

    /*
   * ftp删除文件
   */
    @RequestMapping(value = "/deleteFile", method = {
            RequestMethod.GET, RequestMethod.POST })
    public void deleteFile(HttpServletRequest request,
                             HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        Boolean flag = this.ftpService.deleteFile(request);
        Map<String ,Boolean> map=new HashMap<String, Boolean>();
        map.put("flag",flag);
        String s=JSON.toJSONString(map);
        try {
            response.getWriter().write(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ;
    }
}
