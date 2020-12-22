package com.digitalchina.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 类描述：配置文件工具类
 * 创建人：luo
 * 创建时间：2014-9-25
 */

public class xmlUtil {

    public static String fillStringByArgs(String str, String[] arr) {
        Matcher m = Pattern.compile("\\{(\\d)\\}").matcher(str);
        while (m.find()) {
            str = str.replace(m.group(), arr[Integer.parseInt(m.group(1)) - 1]);
        }
        return str;
    }

    public static String pagingForPeriod(String sql, String Start, String end) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT * FROM (SELECT A.*, ROWNUM RN FROM (");
        sb.append(sql);
        sb.append(")");
        sb.append("A)");
        sb.append(" WHERE RN >= " + Start + " AND RN <= " + end + "");
        return sb.toString();
    }

    public static String pagingForCount(String sql) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT COUNT(*) datacount FROM (");
        sb.append(sql);
        sb.append(")");
        return sb.toString();
    }
}
