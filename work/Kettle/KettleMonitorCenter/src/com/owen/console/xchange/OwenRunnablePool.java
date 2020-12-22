package com.owen.console.xchange;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;
import java.util.concurrent.FutureTask;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.owen.server.service.ServiceCallback;

public class OwenRunnablePool {
	
	private ServiceCallback<Map<String, List<OwenTask>>> service;
	
	private ScheduledThreadPoolExecutor scheduler;
	
	private Map<String, ScheduledFuture<?>>  		taskQueue;
	
	public OwenRunnablePool(){
		
		scheduler = new ScheduledThreadPoolExecutor(OWEN_VAR.ORP_SIZE);
		
		taskQueue = new HashMap<String, ScheduledFuture<?>>();
	}
	
	public void schdule(String id,Runnable r,long initDelay,long delay){
		
		if(null != taskQueue.get(id)){
			
		}else {
		
			synchronized(scheduler){
				
				Future<?> task = new FutureTask<Object>(r, null);
				
				ScheduledFuture<?> ret = scheduler.scheduleWithFixedDelay((Runnable) task, initDelay, delay, TimeUnit.SECONDS);
				
				taskQueue.put(id, ret);
			}
		}
	}
	
	public void shutdown(String id){
		
		if(null != taskQueue.get(id)){
		
			ScheduledFuture<?> task = taskQueue.get(id);
			
			synchronized(scheduler){
				
				task.cancel(true);
				
				scheduler.remove((Runnable) task);
				
			}
			
			taskQueue.remove(id);
		}
		
		scheduler.purge();
	}

	public void setService(ServiceCallback<Map<String, List<OwenTask>>> service) {
		this.service = service;
	}

	public ServiceCallback<Map<String, List<OwenTask>>> getService() {
		return service;
	}
}
