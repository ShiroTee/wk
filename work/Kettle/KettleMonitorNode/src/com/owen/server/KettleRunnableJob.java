package com.owen.server;

import java.util.Date;

import org.apache.log4j.Logger;
import org.pentaho.di.core.Result;
import org.pentaho.di.job.Job;

import com.owen.console.xchange.OWEN_VAR;
import com.owen.console.xchange.OwenRunnablePool;
import com.owen.console.xchange.OwenRunnableTask;
import com.owen.console.xchange.OwenTaskLog;

public class KettleRunnableJob extends OwenRunnableTask {

	private static Logger logger = Logger.getLogger(KettleRunnableJob.class);
	
	private Job taskInstance;

	public KettleRunnableJob(Job job,int interval,OwenRunnablePool pool) {
		
		super(pool);
		
		this.taskInstance = job;
		
		this.interval = interval;
		
		this.taskInstance.init();
		
		runLog = new OwenTaskLog();
		
		runLog.setTask_id(taskInstance.getObjectId().getId());
	}


	@Override
	public void execute(int statusCode) throws Exception {
		System.out.println("进入KettleRunnableJob---");
		if(null != taskInstance){
			
			Result resultP = new Result();
			
			runLog.setStart_time(new Date());
			Result resultR=null;
			resultR = taskInstance.execute(0, resultP);

			taskInstance.waitUntilFinished();
			
			runLog.setEnd_time(new Date());
			
			int errorNum = taskInstance.getErrors();
			
			runLog.setError_number(errorNum);
			
			runLog.setError_info(resultR.getLogText());
			/**
			 *设置任务的运行状态 
			 * ① 0：未启动    ②1：运行中   ③2：运行出错已终止
			 * 
			 */
			if(errorNum>0){
				statusCode=2;
			}
				runLog.setTask_ststus(statusCode);
			
		}else {
			logger.info(OWEN_VAR.SURROUND_BRACES(taskInstance.getJobname()) + "当前状态非法，无法执行！");
		}
		System.out.println("完成KettleRunnableJob---");
	}
	
	
}
