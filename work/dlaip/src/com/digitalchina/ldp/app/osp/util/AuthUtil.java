package com.digitalchina.ldp.app.osp.util;

import com.digitalchina.ldp.bean.Model;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.Random;

public class AuthUtil {
	public static final String numberChar = "0123456789";

	public static String generateAuthKey() {
 
        Long seed = System.currentTimeMillis();// 获得系统时间，作为生成随机数的种子
 
        StringBuffer sb = new StringBuffer();// 装载生成的随机数
 
        Random random = new Random(seed);// 调用种子生成随机数
 
        for (int i = 0; i < 12; i++) {
 
            sb.append(numberChar.charAt(random.nextInt(numberChar.length())));
        }
 
        return sb.toString();
 
    }

    public static String getIpAddr(Model model) {
        HttpServletRequest request = model.getRequest();
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public static void writeInfo(Model model, Logger logger) {
        String ip = getIpAddr(model);
        String className = Thread.currentThread().getStackTrace()[2].getClassName();
        String methodName = Thread.currentThread().getStackTrace()[2].getMethodName();
        logger.info(ip + " 正在访问 " + className + " 类的 " + methodName + " 方法");
    }
}
