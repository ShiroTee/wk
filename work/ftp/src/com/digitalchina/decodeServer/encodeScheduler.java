package com.digitalchina.decodeServer;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleTrigger;
import org.quartz.impl.StdSchedulerFactory;

import com.digitalchina.common.util.StringUtil;
import com.digitalchina.decodeServer.util.ServerPropertiesUtil;

/**
* 类描述：服务调度程序 
* 创建人： luo
* 创建时间：2014-7-11
* @version    
*/
public class encodeScheduler {

	static  Logger log4j = Logger.getLogger(encodeScheduler.class); 
	
	 public static void main(String[] args) throws  Exception {
		  //1、创建JobDetial对象 
		  
	      JobDetail job = newJob(encodeJob.class)
	      .withIdentity("job1", "group1")
	      .build();
	      
	      String	repeatInterval=ServerPropertiesUtil.getValueBykey("encodeRepeatInterval");//间隔时间
	      int repeatTime=60;
	      if(!StringUtil.isEmpty(repeatInterval))
	    	  repeatTime=Integer.parseInt(repeatInterval);
	     //2、创建Trigger对象 
	       
	      SimpleTrigger trigger = newTrigger()
	      .withIdentity("trigger1", "group1")
	      .startAt(new Date())
	      .withSchedule(simpleSchedule().withIntervalInMilliseconds(repeatTime*1000)//设置重复间隔时间 
    	              .repeatForever())//设置重复执行次数 
	               // .withRepeatCount(10)) 
	                  .build();
	       
	      //3、创建Scheduler对象，并配置JobDetail和Trigger对象 
	      
	      SchedulerFactory sf = new StdSchedulerFactory();
	      Scheduler sched = sf.getScheduler();
	   
	      Date ft = sched.scheduleJob(job, trigger);
	     
	      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH时mm分ss秒");  

	      log4j.info(job.getKey().getName() + " 将在 : " + dateFormat.format(ft) + " 时运行.并且重复: "  
	    		             + trigger.getRepeatCount() + " 次, 每次间隔 "  
	    		               + trigger.getRepeatInterval() / 1000 + " 秒");  

	      sched.start();  
	   //   sched.shutdown(true);
		  
	  }
}
