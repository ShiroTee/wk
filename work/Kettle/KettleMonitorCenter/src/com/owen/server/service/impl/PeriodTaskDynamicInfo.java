package com.owen.server.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.owen.console.xchange.IOwenServer;
import com.owen.console.xchange.OwenRunnablePool;
import com.owen.console.xchange.OwenRunnableTask;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.util.OwenHelper;

public class PeriodTaskDynamicInfo extends OwenRunnableTask {

	public PeriodTaskDynamicInfo(OwenRunnablePool pool) {
		super(pool);
	}

	@Override
	protected void execute() throws Exception {

		Map<String, List<OwenTask>> remoteParam = (Map<String, List<OwenTask>>) holder.getService().getParam();

		Map<String, List<OwenTask>> remoteResult = new HashMap<String, List<OwenTask>>();
		if(null != remoteParam && !remoteParam.isEmpty()){
			List<String> ipList = (List<String>) remoteParam.keySet();
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

		holder.getService().setResult(remoteResult);
	}

	@Override
	protected void writeLog(OwenTaskLog log) throws Exception {
		//nothing to do
	}

	@Override
	protected void dealException(OwenTaskLog log,Exception e) throws Exception {
		//nothing to do
	}
	
	//调用节点里的方法，获取任务的状态
	/*	private Map<String, List<OwenTask>> remoteCall(String ip,List<OwenTask> list) throws Exception{
			
				Map<String,List<OwenTask>> map=new  HashMap<String,List<OwenTask>>();
				map.put(ip, list);
				
				IOwenServer nodeSrv = OwenHelper.getKettleNodeServerByIP(ip);
				//调取节点方法获取结果
				Map<String, List<OwenTask>> resultMap=nodeSrv.returnStatus(map);
				return resultMap;
			
		}*/
}
