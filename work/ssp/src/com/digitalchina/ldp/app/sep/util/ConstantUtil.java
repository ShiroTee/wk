package com.digitalchina.ldp.app.sep.util;

import com.digitalchina.ldp.common.util.BeanDefineConfigue;

public class ConstantUtil
{
	public static final String HTTP_REQUEST = "CamelHttpServletRequest";
	public static final String HTTP_RESPONSE = "CamelHttpServletResponse";
	public static final String AUTH_KEY = "authKey";
	public static final String USER_ID = "userId";
	public static final String TIMESTAMP = "timestamp";
	public static final String CAMEL_HTTP_QUERY = "CamelHttpQuery";
	public static final String SOAP_SERVICE_TYPE = "soap";
	public static final String HTTP_SERVICE_TYPE = "http";
	public static final String FTP_SERVICE_TYPE = "ftp";
	public static final String CAMEL_SERVLET_CONTEXT_PATH = "CamelServletContextPath";
	public static final String FTP_USER = BeanDefineConfigue.getProperty("ftpUser");
	public static final String FTP_PASSWORD = BeanDefineConfigue.getProperty("ftpPassword");
	public static final String FTP_DOWNLOAD_BASE_PATH = "/ftp/download/";

}
