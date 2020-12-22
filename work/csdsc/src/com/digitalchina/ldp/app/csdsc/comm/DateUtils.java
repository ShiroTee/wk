package com.digitalchina.ldp.app.csdsc.comm;

import java.util.Calendar;
import java.util.Date;

/**
 * 日期功能类
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-24
 */
public class DateUtils {
	
	public static Date lastMonth(Date currentDate)
    {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.MONTH, -1);
        return calendar.getTime();
    }
	public static Date getMonthFirstDay()
    {
        // SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

        Calendar curCal = Calendar.getInstance();
        curCal.set(Calendar.DAY_OF_MONTH, 1);
        Date date = curCal.getTime();
        return date;
    }


}

