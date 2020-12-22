package com.digitalchina.common.util;
 
/**
* 类描述：字符串工具类
* 创建人： luo
* 创建时间：2014-7-8
* @version    
*/

public class StringUtil {
    
    //判断字符串为空
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }
    
    //判断字符串非空
    public static boolean isNotEmpty(String str) {
        return !StringUtil.isEmpty(str);
    }

    //去除服务器文件路径中的多余标记
    static String trimFilePath(String path) {    
        while(path.indexOf("//")>-1){
            path = path.replace("//", "/");                        
        }
        return path;
    }
    public static boolean isEmptyObj(Object obj)
	{
		if(obj==null)
		{
			return true;
		}
		if(isEmpty(obj.toString()))
		{
			return true;
		}
		return false;
	}
    
	/*
	 * 判断字符串是否为空 return true 为空 return false 不为空
	 */
	public static boolean isNull(String str)
	{
		return str == null ? true : false;
	}
}
