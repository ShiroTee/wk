package com.jeecms.resourceCategory.service;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * @author 陈超
 * 2014-7-15 下午03:43:22
 */
public interface FtpService {

    public Map<String, Object> submitEncodeFtpFile(String path, HttpServletRequest request,String fileData,String filename,
                                                   String fileId,String loaded,String fileEnd,String total);

    public Map<String, Object> submitFtpFile(String path,HttpServletRequest request);

    public void downLoadFtpFile(String path,HttpServletRequest request,HttpServletResponse response);

    public Map<String, Object> initFtpFile(HttpServletRequest request);

    public Map<String, Object> getFtpFile(HttpServletRequest request);

    public Map<String, Object> getLastFile(HttpServletRequest request);

    public Boolean deleteFile(HttpServletRequest request);

}
