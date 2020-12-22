package com.owen.server.util;

import java.util.ArrayList;
import java.util.List;

import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.entity.Orgnization;
import com.owen.server.entity.StatusTasks;
import com.owen.server.entity.TasksLogs;
import com.owen.server.pageVar.PageTask;

public class OwenHelper {

	
	private static int srvId=0;
	private static int orgId=1000;
	private static int stageId=100000;
	private static int taskId=1000000;
	
	/*public static List<NodeServer> nodeList = new ArrayList<NodeServer>(){

		private static final long serialVersionUID = 1L;
		
		{
			add(new NodeServer("IOwenServer", "172.17.161.17", "6600"));
			
		}
		
	};
	*/
	
	
	
	/**
	 * 合并任务列表，前者是基础，后者是增量
	 * 
	 * 
	 * @param base
	 * @param add
	 */
	public static void mergeTaskList(List<OwenTask> base,List<OwenTask> add){
		
		for (OwenTask at : add) {
			for (OwenTask bt : base) {
				if(at.getTaskId().equals(bt.getTaskId())){
					bt.reset(at);
				}
			}
		}
	}
	
	

/*	*//**
	 * 通过IP地址获取Kettle运行服务器的远程调用接口
	 * 
	 * @param ip
	 * @return
	 *//*
	public static IOwenServer getKettleNodeServerByIP(String ip){
		
		IOwenServer srv = null;
		
		for (NodeServer nodeServer : nodeList) {
			if(nodeServer.getServer_ip().equals(ip)){
				
				String comUrl = "rmi://" + nodeServer.getServer_ip() + ":" + nodeServer.getServer_port() + "/" + nodeServer.getServer_name();
				//System.out.println("comUrl--"+comUrl);
				try {
					srv = (IOwenServer) Naming.lookup(comUrl);
					
					break;
					
				} catch (MalformedURLException e) {
					
					e.printStackTrace();
				} catch (RemoteException e) {
					
					e.printStackTrace();
				} catch (NotBoundException e) {
					
					e.printStackTrace();
				}
			}
		}
		
		return srv;
	}	*/
	
	
	public static OwenTask fromPageTask(PageTask pt){
		
		OwenTask ot = new OwenTask();
		
		ot.setInterval(pt.getInterval());
		ot.setOrgCode(pt.getOrgCode());
		ot.setOrgName(pt.getOrgName());
		ot.setStage(pt.getStageName());
		ot.setStatus(pt.getStatus());
		ot.setTaskId(pt.getTaskId());
		ot.setTaskName(pt.getTaskName());
		
		return ot;
	}
	
	public static PageTask fromOwenTask(OwenTask ot){
		
		PageTask pt = new PageTask();
		
		pt.setInterval(ot.getInterval());
		pt.setTaskId(ot.getTaskId());
		pt.setTaskName(ot.getTaskName());
		pt.setStageName(ot.getStage());
		pt.setStatus(ot.getStatus());
		pt.setOrgCode(ot.getOrgCode());
		pt.setOrgName(ot.getOrgName());
		
		return pt;
	}
	
	
	public static void updatePageTask(PageTask pt,OwenTask ot){
		
		pt.setInterval(ot.getInterval());
		pt.setTaskId(ot.getTaskId());
		pt.setTaskName(ot.getTaskName());
		pt.setStageName(ot.getStage());
		pt.setStatus(ot.getStatus());
		pt.setOrgCode(ot.getOrgCode());
		pt.setOrgName(ot.getOrgName());
		
	}
	
	
	public static List<OwenTask> fromPageTask(List<PageTask> ptList){
		
		if(null != ptList && !ptList.isEmpty()){
			List<OwenTask> list = new ArrayList<OwenTask>();
			
			for (PageTask pageTask : ptList) {
				list.add(OwenHelper.fromPageTask(pageTask));
			}
			
			return list;
		}
		
		return null;
	}
	
	public static List<PageTask> fromOwenTask(List<OwenTask> otList){
		
		if(null != otList && !otList.isEmpty()){
			List<PageTask> list = new ArrayList<PageTask>();
			
			for (OwenTask OwenTask : otList) {
				list.add(OwenHelper.fromOwenTask(OwenTask));
			}
			
			return list;
		}
		
		return null;
	} 
	
	public static PageTask newSpecLevelPageTask(String level,String linkName,String expand,String leaf){
		
		PageTask pt = new PageTask();
		pt.setLevel(level);
		pt.setExpanded(expand);
		pt.setTreeLink(linkName);
		pt.setLeaf(leaf);
		pt.setLoaded("true");
		
		return pt;
		
	}
	
	public static OwenOrgnization fromHBOrgnization(Orgnization o){
		OwenOrgnization oo = new OwenOrgnization();
		
		oo.setOrgCode(o.getOrgCode());
		oo.setOrgDesc(o.getOrgDesc());
		oo.setOrgFullName(o.getOrgFullName());
		oo.setOrgMode(o.getxMode());
		oo.setOrgName(o.getOrgName());
		oo.setOrgType(o.getOrgType());
		
		return oo;
	}
	public static StatusTasks OwentaskToStatusTasks(OwenTask o){
		StatusTasks t=new StatusTasks();
		t.setInterval(o.getInterval());
		t.setOrgcode(o.getOrgCode());
		t.setOrgname(o.getOrgName());
		t.setStage(o.getStage());
		t.setStatus(o.getStatus());
		t.setTaskid(o.getTaskId());
		t.setTaskname(o.getTaskName());
		return t;
	}
	public static OwenTask tasksToOwentask(StatusTasks o){
		OwenTask t=new OwenTask();
		t.setInterval(o.getInterval());
		t.setOrgCode(o.getOrgcode());
		t.setOrgName(o.getOrgname());
		t.setStage(o.getStage());
		t.setStatus(o.getStatus());
		t.setTaskId(o.getTaskid());
		t.setTaskName(o.getTaskname());
		return t;
	}
	public static OwenTaskLog taskLogsToOwenTaskLog(TasksLogs o){
		OwenTaskLog owen=new OwenTaskLog();
		owen.setEnd_time(o.getEnd_time());
		owen.setError_info(o.getError_info());
		owen.setError_number(o.getError_number());
		owen.setId(o.getId());
		owen.setOrg_name(o.getOrg_name());
		owen.setSrv_ip(o.getSrv_ip());
		owen.setStart_time(o.getStart_time());
		owen.setTask_id(o.getTask_id());
		owen.setTask_name(o.getTask_id());
		return owen;
	}
	
	public static TasksLogs owenTaskLogTotaskLog(OwenTaskLog owen){
		TasksLogs o=new TasksLogs();
		o.setEnd_time(owen.getEnd_time());
		o.setError_info(owen.getError_info());
		o.setError_number(owen.getError_number());
		o.setId(owen.getId());
		o.setOrg_name(owen.getOrg_name());
		o.setSrv_ip(owen.getSrv_ip());
		o.setStart_time(owen.getStart_time());
		o.setTask_id(owen.getTask_id());
		o.setTask_name(owen.getTask_id());
		return o;
	}
	
	
	public static OwenTask pageTaskToOwenTask(PageTask p){
		OwenTask o=new OwenTask();
		o.setInterval(p.getInterval());
		o.setOrgCode(p.getOrgCode());
		o.setOrgName(p.getOrgName());
		o.setStage(p.getStageName());
		o.setStatus(p.getStatus());
		o.setTaskId(p.getTaskId());
		o.setTaskName(p.getTaskName());
		return o;
	}
	public static PageTask OwenTaskTaskToPage(OwenTask o){
		PageTask p=new PageTask();
		p.setInterval(o.getInterval());
		p.setOrgCode(o.getOrgCode());
		p.setOrgName(o.getOrgName());
		p.setStageName(o.getStage());
		p.setStatus(o.getStatus());
		p.setTaskId(o.getTaskId());
		p.setTaskName(o.getTaskName());
		return p;
	}
	
	public static int currentSrvId(){
		return srvId++;
	}
	public static int currentOrgId(){
		return orgId++;
	}
	public static int currentStageId(){
		return stageId++;
	}
	public static int currentTaskId(){
		return taskId++;
	}
	
	
}
