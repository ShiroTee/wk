package com.owen.server.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.entity.TasksLogs;
import com.owen.server.pageVar.PageTask;
import com.owen.server.service.ServiceCallback;

public class TimerTaskDynamicInfo{
	private ServiceCallback<Map<String, List<OwenTask>>> serviceCallback;
	public TimerTaskDynamicInfo(ServiceCallback<Map<String, List<OwenTask>>> server){
		this.serviceCallback=server;
	}
	public  void start() {
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
		        public void run() {
		           try {
					execute();
				} catch (Exception e) {
					e.printStackTrace();
				}
		        }
		}, 10000 , 10000);
	}
	
	
	public   void execute() throws Exception {
		
		Map<String, List<OwenTask>> remoteParam = serviceCallback.getParam();

		Map<String, List<OwenTask>> remoteResult = new HashMap<String, List<OwenTask>>();
		if(null != remoteParam && !remoteParam.isEmpty()){
			//List<String> ipList = (List<String>) remoteParam.keySet();
			List<String> ipList = new ArrayList<String>();
			
			Iterator iterator=remoteParam.entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry entry=(Map.Entry) iterator.next();
				String key=(String) entry.getKey();
				ipList.add(key);
			}
			
			for(String ip:ipList){
				List<OwenTask> taskList = remoteParam.get(ip);
			
				Map<String, List<OwenTask>> result=new HashMap<String, List<OwenTask>>();
				List<OwenTask> a=new ArrayList<OwenTask>();
				OwenTask o=new OwenTask();
				o.setTaskId("611");
				o.setStatus("运行中");
				a.add(o);
				
				result.put("172.17.161.17", a);
				remoteResult.putAll(result);
			}
		}
		serviceCallback.setResult(remoteResult);
	}


	
}
