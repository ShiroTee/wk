package com.jeecms.resourceCategory.service;

import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.common.util.*;
import com.jeecms.resourceCategory.bean.FileBean;
import com.jeecms.resourceCategory.bean.FtpInfoBean;
import com.jeecms.resourceCategory.dao.FtpDao;
import com.jeecms.resourceCategory.dao.FtpUserDao;
import com.jeecms.resourceCategory.util.*;
import com.jeecms.resourceCategory.util.PropertiesUtil;
import com.jeecms.resourceCategory.util.StringUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import static java.io.File.separator;

/**
 * @author 陈超
 *         2014-7-15 下午03:44:01
 */
@Service
public class FtpServiceImpl implements FtpService {

    @Autowired
    private FtpDao ftpDao;

    @Autowired
    private FtpUserDao ftpUserDao;

    final int preChunk=10485760;

    @Override
    public Map<String, Object> submitFtpFile(String path, HttpServletRequest request) {


        DiskFileItemFactory factory = new DiskFileItemFactory();
        // 设置内存缓冲区，超过后写入临时文件
        factory.setSizeThreshold(10240000);
        // 设置临时文件存储位置
        String base = PropertiesUtil.base;
        File file = new File(base);
        if (!file.exists())
            file.mkdirs();
        factory.setRepository(file);
        ServletFileUpload upload = new ServletFileUpload(factory);
        // 设置单个文件的最大上传值
        upload.setFileSizeMax(10002400000l);
        // 设置整个request的最大值
        upload.setSizeMax(10002400000l);
        upload.setHeaderEncoding("UTF-8");
        Map<String, Object> map = new HashMap<String, Object>();
        FtpInfoBean ftpBean = getFtpInfoBean(request);
        try {
            List<?> items = upload.parseRequest(request);
            List<FileItem> listItem = new ArrayList<FileItem>();
            FileItem item = null;
            String fileName = null;
            for (int i = 0; i < items.size(); i++) {//保存文件到本地
                item = (FileItem) items.get(i);
                fileName = base + separator + item.getName();
                // 保存文件
                if (!item.isFormField() && item.getName().length() > 0) {
                    item.write(new File(fileName));
                    listItem.add(item);
                }
            }

          String ftpUser = ftpBean.getUsername();
            if(!ftpUser.equals("admin")) {//如果是管理员则不进行模板对比

                //和模板文件对比
                int itemSize = listItem.size();

                for (int i = 0; i < itemSize; i++) {
                    item = listItem.get(i);
                    String templeteLocalPath = "";
                    String separator = "/";
                    String[] paths = path.split(separator);
                    int len = paths.length;
                    String templeteExcelPath = "";
                    //1.获得模板文件路径
                    if (len > 2 && paths[1].equals("01 文件上传")) {
                        templeteExcelPath = separator + "00 文件数据模板" + separator + paths[2];
                        //2.获得实际模板名称路劲并下载模板文件
                        Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpBean, templeteExcelPath);

                        if (listData.size() > 0) {
                            FileBean templeteFile = listData.get(0);
                            templeteLocalPath = base + "/templete/" + templeteFile.getName();
                            System.out.println("模板路径：" + templeteLocalPath);
                            ftpDao.downloadRemoteFile(templeteFile, ftpBean, base + "/templete/");
                            fileName = base + separator + item.getName();
                            //3.对比文件是否符合模板
                            List<String> list = readExcelTitle(fileName);
                            List<String> listTemplete = readExcelTitle(templeteLocalPath);

                            int titleLen = list.size();
                            if (titleLen == listTemplete.size()) {
                                for (int j = 0; j < titleLen; j++) {
                                    if (!list.get(j).equals(listTemplete.get(j))) {
                                        List<String> listS = new ArrayList<String>();
                                        listS.add("false");
                                        listS.add("数据文件和模板不匹配！");
                                        map.put(item.getName(), listS);

                                        // 保存文件
                                        File localFile = new File(fileName);
                                        localFile.delete();
                                        listItem.remove(item);
                                        break;
                                    }
                                }
                            }
                        } else {
                            System.out.print(path + item.getName() + "的文件模板不存在！");
                            List<String> listS = new ArrayList<String>();
                            listS.add("false");
                            listS.add("文件模板不存在！");
                            map.put(item.getName(), listS);

                            // 保存文件
                            File localFile = new File(fileName);
                            localFile.delete();
                            listItem.remove(item);
                        }
                    } else {
                        //文件路劲不对
                        System.out.print(path + item.getName() + "的上传路径不正确！");
                        List<String> listS = new ArrayList<String>();
                        listS.add("false");
                        listS.add("上传路径不正确！");
                        map.put(item.getName(), listS);

                        // 保存文件
                        File localFile = new File(fileName);
                        localFile.delete();
                        listItem.remove(item);
                    }
                }
            }

            //前面已经修改过listItem,现在重新获取
            int itemSizes = listItem.size();
            for (int i = 0; i < itemSizes; i++) {//保存文件到ftp
                item = listItem.get(i);
                fileName = base + separator + item.getName();
                // 保存文件
                File localFile = new File(fileName);
                FileBean fileBean = ftpDao.fileToFileBean(localFile);
                String flag = ftpDao.uploadLocalFile(fileBean, ftpBean, path,fileName);
                List<String> listS = new ArrayList<String>();
                listS.add(flag);
                map.put(item.getName(), listS);
                localFile.delete();
            }

        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }



    @Override
    public Map<String, Object> submitEncodeFtpFile(String path, HttpServletRequest request,String fileData,String filename,
                                                   String fileId,String loaded,String fileEnd,String total) {

        //ftp文件
        String ftpFileName=filename;
        Map<String, Object> map = new HashMap<String, Object>();
        String base = PropertiesUtil.base;
        File file = new File(base+"/"+filename);

        if (!file.exists())
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        OutputStreamWriter oStreamWriter=null;

        byte[] deBase64buffer = Base64.decodeBase64(fileData.getBytes());//先用base64解密
        //获取解密秘钥
        String str=StringUtils.objToString(request.getSession().getAttribute("key"));


        try {
            byte[] deBuffer = AES.decrypt(deBase64buffer, str.getBytes("UTF-8"),
                    false, str.getBytes("UTF-8"));
            System.out.println("数据解密之后长度："+deBuffer.length);

            oStreamWriter = new OutputStreamWriter(new FileOutputStream(file, true),"ISO8859-1");
            oStreamWriter.write(new String(Base64.decodeBase64(new String(deBuffer).split("base64,")[1].getBytes()),"ISO8859-1"));
            oStreamWriter.flush();


        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            map.put("uploadSuccess",false);
            map.put("msg", "文件上传失败！");
        }catch (FileNotFoundException e) {
            e.printStackTrace();
            map.put("uploadSuccess",false);
            map.put("msg", "文件上传失败！");
        }catch (IOException e) {
            e.printStackTrace();
            map.put("uploadSuccess",false);
            map.put("msg", "文件上传失败！");
        }finally {
            try {
                if(oStreamWriter!=null) {
                    oStreamWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
                map.put("uploadSuccess",false);
                map.put("msg", "文件上传失败！");
            }
        }

        FtpInfoBean ftpBean=new FtpInfoBean();
        boolean isMatch=true;
        if("1".equals(fileEnd)){//文件上传完成


            if(filename.length()>0)
            {
                ftpFileName=ftpDao.getNewFileName(filename);
            }

             ftpBean = getFtpInfoBean(request);
            try {

                String ftpUser = ftpBean.getUsername();
                if(!ftpUser.equals("admin")  && !ftpUser.equals("development")) {//如果是管理员则不进行模板对比

                    String templeteLocalPath = "";
                    String separator = "/";
                    String[] paths = path.split(separator);
                    int len = paths.length;
                    String FileName = "";
                    String templeteExcelPath = "";
                    //1.获得模板文件路径
                    if (len > 2 && paths[1].equals("01 文件上传")) {
                        templeteExcelPath = separator + "00 文件数据模板" + separator + paths[2];
                        //2.获得实际模板名称路劲并下载模板文件
                        Vector<FileBean> listData = FtpUtil.getTrimedFileList(ftpBean, templeteExcelPath);

                        if (listData.size() > 0) {
                            //下载模板
                            FileBean templeteFile = listData.get(0);
                            File dir = new File(base + "/templete/");
                            if (!dir.exists()) {
                                dir.mkdir();
                            }
                            ftpDao.downloadRemoteFile(templeteFile, ftpBean, base + "/templete/");

                            templeteLocalPath = base + "/templete/" + templeteFile.getName();
                            System.out.println("模板路径：" + templeteLocalPath);
                            FileName = base + separator + filename;
                            List<String> list =new ArrayList<String>();
                            List<String> listTemplete=new ArrayList<String>();
                            //3.对比文件是否符合模板
                            try {
                                 list = readExcelTitle(FileName);
                                 if(list.size()<=0){
                                     map.put("uploadSuccess",false);
                                     map.put("msg", "文件不能为空！");
                                     return map;
                                 }
                                 listTemplete = readExcelTitle(templeteLocalPath);
                            }catch (OutOfMemoryError e){
                                e.printStackTrace();
                                map.put("uploadSuccess",false);
                                map.put("msg", "文件上传失败！文件过大！");
                                return map;
                            }

                            int titleLen = list.size();
                            if (titleLen == listTemplete.size()) {
                                for (int j = 0; j < titleLen; j++) {
                                    if (!list.get(j).equals(listTemplete.get(j))) {
                                        map.put("uploadSuccess", "false");
                                        map.put("isLoaded",loaded);
                                        map.put("msg", "数据文件和模板不匹配！");

                                        // 删除文件
                                        File localFile = new File(FileName);
                                        localFile.delete();
                                        isMatch = false;
                                        break;
                                    }
                                }
                            }else {
                                map.put("uploadSuccess", "false");
                                map.put("isLoaded",loaded);
                                map.put("msg", "数据文件和模板不匹配！");

                                // 删除文件
                                File localFile = new File(FileName);
                                localFile.delete();
                                isMatch = false;
                            }
                        } else {
                            System.out.print(path + filename + "的文件模板不存在！");
                            map.put("uploadSuccess", "false");
                            map.put("isLoaded",loaded);
                            map.put("msg", "文件模板不存在！");

                            // 保存文件
                            File localFile = new File(filename);
                            localFile.delete();
                            isMatch = false;
                        }
                    } else {
                        //文件路劲不对
                        System.out.print(path + filename + "的上传路径不正确！");
                        map.put("uploadSuccess", "false");
                        map.put("isLoaded",loaded);
                        map.put("msg", "上传路径不正确！");

                        // 保存文件
                        File localFile = new File(FileName);
                        localFile.delete();
                        isMatch = false;
                    }

                    //保存文件到ftp
                    if (isMatch == true) {
                        File localFile = new File(FileName);
                        FileBean fileBean = ftpDao.fileToFileBean(localFile);
                        String flag = ftpDao.uploadLocalFile(fileBean, ftpBean, path,ftpFileName);
                        map.put("uploadSuccess", flag);
                        map.put("isLoaded",loaded);
                        if(!"OK".equals(flag)){
                            map.put("msg", "上传文件到ftp失败！");
                        }

                        localFile.delete();

                    }
                }

            }catch (IOException e2) {
                e2.printStackTrace();

                map.put("uploadSuccess",false);
                map.put("msg", "文件上传失败！");
                return map;
            } catch (Exception e3) {
                e3.printStackTrace();
                map.put("uploadSuccess",false);
                map.put("msg", "文件上传失败！");
                return map;
            }
        }else {
            map.put("uploadSuccess",true);
            map.put("isLoaded",loaded);
        }

            if("1".equals(fileEnd)) {//文件上传完成
                String desc = "上传文件"+filename+"("+total+")到ftp,上传后的文件名为"+ftpFileName;
                addFtplog(ftpBean.getUsername(),
                        desc,request,"上传文件");
            }


        return map;
    }


    @Override
    public void downLoadFtpFile(String filePath, HttpServletRequest request, HttpServletResponse response) {

        FtpInfoBean ftp = getFtpInfoBean(request);
        String path = filePath;
        String separator = "/";
        int pos = path.lastIndexOf(separator);
        String name = "";
        if (pos > 0) {
            path = path.substring(0, pos);
            name = filePath.substring(pos + 1, filePath.length());
        } else {
            path = path.substring(0, pos + 1);
            name = filePath.substring(pos + 1, filePath.length());
        }
        FileBean fb = new FileBean();
        fb.setPath(path);
        fb.setName(name);

        String pathPrefixion = request.getSession().getServletContext().getRealPath("/")+"/download/";

        File dir = new File(pathPrefixion);
        if (!dir.exists()) {
            dir.mkdir();
        }
        ftpDao.downloadRemoteFile(fb, ftp, pathPrefixion);

        try {
            String title = name;
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            String userAgent = request.getHeader("User-Agent");
            //针对IE或者以IE为内核的浏览器：
            if (userAgent.contains("MSIE") || userAgent.contains("Trident")) {
                title = java.net.URLEncoder.encode(title, "UTF-8");
            } else {
                //非IE浏览器的处理：
                title = new String(title.getBytes("UTF-8"), "ISO-8859-1");
            }

            response.setHeader("Content-disposition", "attachment;filename="
                    + title);

            File file = new File(pathPrefixion + name);
            if (!file.exists()) {
                try {
                    file.createNewFile();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
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

        addFtplog(ftp.getUsername(),
                    "从ftp下载文件" + filePath, request, "下载文件");


        return;
    }

    @Override
    public Map<String, Object> initFtpFile(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        FtpInfoBean ftp = getFtpInfoBean(request);
        String loginName = StringUtils.objToString(request.getSession().getAttribute("ftpLoginName"));
        CmsUser user = CmsUtils.getUser(request);
        map.put("ftpIsLogin", false);//没有权限
        map.put("webIsLogin", false);//没有登录

        if (loginName != null && !"".equals(loginName) || user!=null) {
            map.put("webIsLogin", true);
            if (ftp != null && FtpUtil.isValid(ftp)) {
                map.put("ftpIsLogin", true);
                Map<String, Object> map1 = ftpDao.loginRemoteServer(ftp);
                map.putAll(map1);
            }
        }

        addFtplog(ftp.getUsername(),
                "获取ftp[/]文件列表", request, "获取文件列表");

        return map;
    }


    @Override
    public Map<String, Object> getFtpFile(HttpServletRequest request) {
        String path = request.getParameter("path");

        request.getSession().setAttribute("ftpPath", path);
        FtpInfoBean ftp = getFtpInfoBean(request);
        Map<String, Object> map = ftpDao.refreshRemoteFiles(ftp, path);

        addFtplog(ftp.getUsername(),
                "获取ftp["+path+"]文件列表", request, "获取文件列表");

        return map;
    }

    //返回上一级
    @Override
    public Map<String, Object> getLastFile(HttpServletRequest request) {
        String path = request.getParameter("path");

        FtpInfoBean ftp = getFtpInfoBean(request);
        Map<String, Object> map = ftpDao.remoteUpper(ftp, path);

        addFtplog(ftp.getUsername(),
                "获取ftp["+path+"]文件列表", request, "获取文件列表");
        return map;
    }
    //删除ftp文件
    @Override
    public Boolean deleteFile(HttpServletRequest request) {
        String filePath = request.getParameter("path");
        FtpInfoBean ftpLogin = getFtpInfoBean(request);
        String path = filePath;
        int pos = path.lastIndexOf(separator);
        String name = "";
        if (pos > 0) {
            path = path.substring(0, pos);
            name = filePath.substring(pos + 1, filePath.length());
        } else {
            path = path.substring(0, pos + 1);
            name = filePath.substring(pos + 2, filePath.length());
        }
        FileBean fb = new FileBean();
        fb.setPath(path);
        fb.setName(name);
        fb.setType(FileBean.FileType.file);
        Boolean flag = ftpDao.deleteRemoteFile(fb, ftpLogin);
        if(flag) {
            addFtplog(ftpLogin.getUsername(),
                    "成功删除文件[" + filePath+"]", request, "删除文件");
        }else {
            addFtplog(ftpLogin.getUsername(),
                    "删除文件[" + filePath+"]失败", request, "删除文件");
        }

        return flag;
    }


    public FtpInfoBean getFtpInfoBean(HttpServletRequest request) {
        FtpInfoBean ftp = new FtpInfoBean();
        String loginName = StringUtils.objToString(request.getSession().getAttribute("ftpLoginName"));
        ftp.setIp(PropertiesUtil.getValueBykey("ftpIP"));
        ftp.setPort(Integer.parseInt(PropertiesUtil.getValueBykey("ftpPort")));
        if (loginName != null && !"".equals(loginName)) {
            List<Map<String, Object>> list = ftpUserDao.findByName(loginName);
            if (list.size() > 0) {
                ftp.setUsername(StringUtils.objToString(list.get(0).get("FTP_USER_NAME")));
                ftp.setPassword(StringUtils.objToString(list.get(0).get("FTP_USER_PASSWORD")));
            }else {
                ftp.setUsername(loginName);
                ftp.setPassword(StringUtils.objToString(request.getSession().getAttribute("ftpLoginPW")));
            }
        }
        return ftp;
    }


    /**
     * 读取excel表格表头数据
     *
     * @param path the path of the excel file
     * @return
     * @throws IOException
     */
    public List<String> readExcelTitle(String path) throws IOException {
        System.out.println(path);
        String fileType = path.substring(path.lastIndexOf(".") + 1);
        File file=new File(path);

        InputStream is = new FileInputStream(file);
        Workbook workbook = null;
        if (fileType.equalsIgnoreCase("xlsx")) {
            workbook = new XSSFWorkbook(is);
        } else if (fileType.equalsIgnoreCase("xls")) {
            workbook = new HSSFWorkbook(is);
        }
        List<String> list = new ArrayList<String>();
        // Read the Sheet
        Sheet Sheet = workbook.getSheetAt(0);
        // Read the Row
        Row row = Sheet.getRow(Sheet.getFirstRowNum());
        if (row != null) {

                int cols = row.getLastCellNum();
                for (int j = 0; j < cols; j++) {
                    Cell cell = row.getCell(j);
                    String data =getJavaValue(cell);
                    list.add(data);
                }
        }
        file=null;
        workbook=null;
        is.close();

        return list;
    }
    /**
     * @param cell
     *            XSSFCell类型单元格
     * @return 返回Object类型值
     */
    public  String getJavaValue(Cell cell) {
        Object o = null;
        int cellType = cell.getCellType();
        switch (cellType) {
            case XSSFCell.CELL_TYPE_BLANK:
                o = "";
                break;
            case XSSFCell.CELL_TYPE_BOOLEAN:
                o = cell.getBooleanCellValue();
                break;
            case XSSFCell.CELL_TYPE_ERROR:
                o = "Bad value!";
                break;
            case XSSFCell.CELL_TYPE_NUMERIC:
                o = getValueOfNumericCell(cell);
                break;
            case XSSFCell.CELL_TYPE_FORMULA:
                try {
                    o = getValueOfNumericCell(cell);
                } catch (IllegalStateException e) {
                    try {
                        o = cell.getRichStringCellValue().toString();
                    } catch (IllegalStateException e2) {
                        o = "";
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            default:
                o = cell.getRichStringCellValue().getString();
        }
        return String.valueOf(o);
    }
    // 获取数字类型的cell值
    private static Object getValueOfNumericCell(Cell cell) {
        Boolean isDate = DateUtil.isCellDateFormatted(cell);
        Double d = cell.getNumericCellValue();
        Object o = null;
        if (isDate) {
            o = DateFormat.getDateTimeInstance()
                    .format(cell.getDateCellValue());
        } else {
            o = getRealStringValueOfDouble(d);
        }
        return o;
    }

    // 处理科学计数法与普通计数法的字符串显示，尽最大努力保持精度
    private static String getRealStringValueOfDouble(Double d) {
        String doubleStr = d.toString();
        boolean b = doubleStr.contains("E");
        int indexOfPoint = doubleStr.indexOf('.');
        if (b) {
            int indexOfE = doubleStr.indexOf('E');
            // 小数部分
            BigInteger xs = new BigInteger(doubleStr.substring(indexOfPoint
                    + BigInteger.ONE.intValue(), indexOfE));
            // 指数
            int pow = Integer.valueOf(doubleStr.substring(indexOfE
                    + BigInteger.ONE.intValue()));
            int xsLen = xs.toByteArray().length;
            int scale = xsLen - pow > 0 ? xsLen - pow : 0;
            doubleStr = String.format("%." + scale + "f", d);
        } else {
            java.util.regex.Pattern p = Pattern.compile(".0$");
            java.util.regex.Matcher m = p.matcher(doubleStr);
            if (m.find()) {
                doubleStr = doubleStr.replace(".0", "");
            }
        }
        return doubleStr;
    }

    public void addFtplog(String  webUserName,
                          String desc,HttpServletRequest request,String type){
        try{
        //写入日志
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String uploadTime = format.format(new Date());
        String ftpUserName = StringUtils.objToString(request.getSession().getAttribute("ftpLoginName"));

        Random ran = new Random(System.currentTimeMillis());
        Long uuid = Math.abs(ran.nextLong());

        String platformAdd = com.jeecms.common.util.PropertiesUtil.getValueBykey("platformAdd2");//"http://10.6.10.187:8080/aip";//
        String writeLogURL = platformAdd + "/service/api/csdsc/onlineInformationHandler/addFtpUploadFileLog";
//        String param = "?uuid=" + uuid + "&webUserName=" + webUserName + "&uploadOriginFileName=" + uploadOriginFileName + "&ftpUserName="
//                + ftpUserName + "&uploadTime=" + uploadTime + "&uploadFileName=" + uploadFileName + "&fileSize=" + fileSize;
        com.jeecms.common.util.PropertiesUtil.setFtpLog(writeLogURL,uuid,webUserName,desc,ftpUserName,uploadTime,type);
    } catch (Exception e3) {
        e3.printStackTrace();
    }
    }

}
