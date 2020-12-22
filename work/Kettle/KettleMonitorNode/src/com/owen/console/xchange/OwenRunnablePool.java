package com.owen.console.xchange;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class OwenRunnablePool {
	
	private ScheduledThreadPoolExecutor scheduler;
	
	private Map<String, ScheduledFuture<?>>  		taskQueue;
	
	public OwenRunnablePool(){
		
		scheduler = new ScheduledThreadPoolExecutor(OWEN_VAR.ORP_SIZE);
		
		taskQueue = new HashMap<String, ScheduledFuture<?>>();
	}
	
	public void schdule(String id,Runnable r,long initDelay,long delay){
			
		
		if(null != taskQueue.get(id)){
			
		}else {
				ScheduledFuture<?> ret = scheduler.scheduleWithFixedDelay(r, initDelay, delay, TimeUnit.MINUTES);
				taskQueue.put(id, ret);
			
		}
	}
	
	public void shutdown(String id) throws Exception{
		
		if(null != taskQueue.get(id)){
			
			
			ScheduledFuture<?> task = taskQueue.get(id);
			
			synchronized(scheduler){
				
				task.cancel(false);

				scheduler.remove((Runnable) task);
					
			}
			
			taskQueue.remove(id);
			
			System.out.println("Task has been finished!");
		}
		
		scheduler.purge();
	}
}
