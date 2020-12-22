
package com.owen.server.service.impl;

import java.net.MalformedURLException;
import java.rmi.ConnectException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import com.owen.console.xchange.IOwenServer;
import com.owen.console.xchange.OWEN_VAR;
import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenRunnablePool;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.entity.NodeServer;
import com.owen.server.entity.TasksLogs;
import com.owen.server.pageVar.PageTask;
import com.owen.server.service.ServerService;
import com.owen.server.service.ServiceCallback;
import com.owen.server.util.OwenHelper;

public abstract class AbstractServerService implements ServerService,ServiceCallback<Map<String, List<OwenTask>>> {
	
	private static Logger logger = Logger.getLogger(AbstractServerService.class);

	/**
	 * <节点服务器IP,委办局列表>
	 */
	//protected Map<String, List<OwenOrgnization>> soMap;
	protected Map<String, Map<OwenOrgnization,String>> soMap;
	
	/**
	 * <委办局名称,任务列表>
	 */
	protected Map<String, List<OwenTask>>        otMap;
	
	protected List<NodeServer> nodeList;
	
	
	/**
	 * 
	 * 返回页面所需要的数据
	 * */
	protected List<PageTask> treeList;
	
	protected List<OwenTaskLog> logList;
	
	/**
	 * 周期性任务所属的运行池
	 * 
	 * */
	private OwenRunnablePool runnablePool;
	
	private int newIndex;
	

	
	/**
	 * 中心服务器在启动时，先加载出<节点服务器,委办局列表>这批映射关系
	 * 
	 * @return
	 */
	protected abstract Map<String, Map<OwenOrgnization,String>> fetchServerAndOrgRelationship() throws Exception;
	
	/**
	 * 刷新新的节点服务器信息
	 */
	protected abstract void saveNewKettle(String ip);
	
	/**
	 * 删除无用的节点服务器
	 */
	protected abstract void deleteKettle(String ip);
	
	/**
	 * 查询数据库是否有该节点服务器
	 */
	protected abstract boolean getKettle(String ip);
	
	/**
	 * 中心服务器启动时，先加载出数据库中的所有TasksLogs
	 * 
	 * */
	protected abstract List<TasksLogs> loadLogsList(String param) throws Exception;
	
	
	/**
	 * 通过list中的任务ID，去数据库中查询此任务上次是否有过保存，若有，则将其取出并返回
	 * 
	 * @param list
	 * @return
	 */
	protected abstract List<OwenTask> getLastSavedTasks() throws Exception;
	
	/**
	 *
	 * 通过修改后的otMap来修改数据库中的task数据
	 * 
	 * */
	protected abstract void updateDBTasks(List<OwenTask> list);
	protected abstract List<NodeServer> getAllServers();
	
	public abstract List<TasksLogs> listTasksInfo(String taskId) throws Exception;

	/**
	 * 中心服务器服务类实例化之后必须要调用的初始化方法
	 * 
	 * 一，加载 【节点服务器--委办局列表】 关系
	 * 
	 * 二，初始化 otMap
	 * @throws Exception 
	 * 
	 * 
	 */
	protected void init() throws Exception{
		
		/**
		 * 第一步：加载  【节点服务器--委办局列表】 关系
		 * 
		 * */
		soMap = fetchServerAndOrgRelationship();
		updateTaskListByDB();
		updateTreeTaskListByDB();
		
		if(null == soMap || soMap.isEmpty()){
			logger.info("中心服务器在启动过程中，未加载到任何【节点服务器--委办局列表】的信息");
		}else {
			logger.info("中心服务器在启动过程中，加载出了【" + soMap.size() + "】个【节点服务器--委办局列表】的信息");
		}
		
		/**
		 * 第二步：初始化otMap
		 * 
		 * */
		otMap = new HashMap<String, List<OwenTask>>();
		treeList=new ArrayList<PageTask>();
		nodeList=new ArrayList<NodeServer>();
		
		/**
		 * 第三步：建议服务类跟运行池之间的关系
		 * */
		runnablePool.setService(this);
		
		
		/**
		 * 第四步：所有节点服务器信息
		 * */
		nodeList=getAllServers();
		/*
		//PeriodTaskDynamicInfo ptdi = new PeriodTaskDynamicInfo(runnablePool);
		
		//runnablePool.schdule("1", ptdi, 10, 10);
		TimerTaskDynamicInfo ttdi=new TimerTaskDynamicInfo(this);
		ttdi.start();*/
	}
	
	//创建第0层的节点
	protected PageTask createServerLevel(String ip){
		
		//创建0级节点（显示节点服务器的IP） 
		PageTask ipLevel = OwenHelper.newSpecLevelPageTask("0", ip, "false", "false");	
		
		ipLevel.setId(OwenHelper.currentSrvId());
		//将当前的0级PageTask加入树形结构的集合中去
		treeList.add(ipLevel);
		return ipLevel;
	}
	
	//创建第1层节点
	protected void createOrgLevel(String parent,List<OwenTask> taskList,String ip){
		//将任务根据委办局的名称分组（key--->委办局名称      value--->任务列表）
		Map<String, List<OwenTask>> orgGroupedTask = groupTaskByOrgName(taskList);
		
		if(null != orgGroupedTask && !orgGroupedTask.isEmpty()){
			
			Set<String> orgList = orgGroupedTask.keySet();
			
			for (String orgName : orgList) {
				//创建第1层节点（显示委办局的信息）
				PageTask orgLevel = OwenHelper.newSpecLevelPageTask("1", orgName, "false", "false");
				
				orgLevel.setId(OwenHelper.currentOrgId());
				
				orgLevel.setParent(String.valueOf(parent));
				
				treeList.add(orgLevel);
				//调取创建第2层节点的方法，并将自身节点的IP和orgName作为参数传递
				createStageLevel(String.valueOf(orgLevel.getId()),orgGroupedTask.get(orgName),ip,orgLevel);
			}
		}
	}
	//创建第2层节点
	protected void createStageLevel(String parent,List<OwenTask> taskList,String ip,PageTask orgLevel){
		//将任务根据委办局的名称分组（key--->阶段名称      value--->任务列表）
		Map<String, List<OwenTask>> stageGroupedTask = groupTaskByStage(taskList);
		Map<String, List<OwenTask>> newStageTask = clearTaskByStage(stageGroupedTask,ip,orgLevel.getTreeLink());
	
		if(null != newStageTask && !newStageTask.isEmpty()){
			
			Set<String> stageList = newStageTask.keySet();
			for(String stage : stageList){
				
				PageTask stageLevel = OwenHelper.newSpecLevelPageTask("2", stage, "false", "false");
				
				stageLevel.setId(OwenHelper.currentStageId());
				
				stageLevel.setParent(parent);
				
				treeList.add(stageLevel);
				//调取创建第3层节点的方法，并将自身节点的IP和stage作为参数传递
				createTaskLevel(String.valueOf(stageLevel.getId()),newStageTask.get(stage));
			}
		}else if(newStageTask.isEmpty()){
			//删除空节点的委办局
			treeList.remove(orgLevel);
		}
	}
	//创建第3层节点
	protected void createTaskLevel(String parent,List<OwenTask> taskList){
		if(null != taskList && !taskList.isEmpty()){
			for (OwenTask owenTask : taskList) {
				PageTask taskLevel = OwenHelper.newSpecLevelPageTask("3", owenTask.getStage(), "false","true");
				
				OwenHelper.updatePageTask(taskLevel, owenTask);
				taskLevel.setId(OwenHelper.currentTaskId());
				taskLevel.setParent(parent);
				
				if(newIndex > 0){
					treeList.add(newIndex,taskLevel);
				}else{
					treeList.add(taskLevel);
				}
			}
		}
	}
	
	/**
	 * 判断节点服务器是否已存在
	 * @param ip
	 * @return
	 */
	protected boolean isNewIP(String ip){
		boolean flag=false;
		for(PageTask oldTask : treeList){
			if("0".equals(oldTask.getLevel())){
				if(ip.equals(oldTask.getTreeLink())){
					flag=false;
					break;
				}else{
					flag=true;
				}
			}
		}
		return flag;
	}
	
	protected void createTreeTask(String ip,List<OwenTask> list) throws Exception {
		//获取新流程
		if(treeList.size() > 0 && !isNewIP(ip)){
			boolean flag;
	
			for(OwenTask newTask : list){
				flag=false;
				for(PageTask oldTask : treeList){
				//	System.out.println(oldTask.getTaskName()+"$$");
					if(newTask.getTaskName().equals(oldTask.getTaskName())){
						flag=true;
						break;
					}
				}
				if(!flag){
					for(int i=0;i<treeList.size();i++){
						PageTask p = treeList.get(i);
						if(newTask.getOrgName().equals(p.getOrgName()) && "3".equals(p.getLevel()) && !newTask.getTaskName().equals(p.getTaskName()) && newTask.getStage().equals(p.getStageName())){
						newIndex = treeList.indexOf(p);
						ArrayList<OwenTask> tmplist = new ArrayList<OwenTask>();
						tmplist.add(newTask);
						createTaskLevel(String.valueOf(p.getParent()),tmplist);
						newIndex=-1;
						break;
						}
					}
				}
			}
			return;
		}
//		for(PageTask p:treeList){
//			if(p.getTreeLink().equals(ip)){
//				//treeList= new ArrayList<PageTask>();
//				return;
//			}
//		}
		//创建第0级的服务器列表
		PageTask root = createServerLevel(ip);
		
		//创建第1级的机构列表
		createOrgLevel(String.valueOf(root.getId()),list,root.getTreeLink());
	}

	/**
	 * ①  根据界面上修改的值传递过来的值，来修改内存中otMap的数据
	 * ②  修改数据库中的task任务（存在则修改，不存在则更新）
	 * 
	 * */
	@Override
	public String  updateTasks(List<PageTask> taskList) throws Exception {
		//System.out.println("updateTasks----------");
		String result=reStartTasks(taskList);
		//System.out.println("result-------------"+result);
		if(null!=result){
			return result;
		}else{
			List<OwenTask> list=updateMemory(taskList);
			updateDBTasks(list);
			return "执行成功";
		}
		
	}
	/**
	 * 更新内存(treeList)中的任务数据
	 * 
	 */
	public  List<OwenTask> updateMemory(List<PageTask> taskList){
		//更新treeList
		//PageTask转换为OwnTask
		List<OwenTask> list = OwenHelper.fromPageTask(taskList);
		//将此OwenTask列表返回，提供给数据库，便于修改
		List<OwenTask> newTasks=new ArrayList<OwenTask>();
		for(PageTask p:treeList){//遍历内存中树形结构的PageTask的列表
			//将PageTask转换为OwenTask
			OwenTask owentask=OwenHelper.pageTaskToOwenTask(p);
			for(OwenTask o:list){
				if(null !=owentask.getTaskId() && owentask.getTaskId().equals(o.getTaskId())){
					owentask.setInterval(o.getInterval());
					p.setInterval(o.getInterval());
					newTasks.add(owentask);
				}
			}
		}
		//更新otMap
		Set<String> orgName=otMap.keySet();
		//遍历otMap
		for(String oName:orgName){
			List<OwenTask> olist=otMap.get(oName);
			//遍历对应委办局下面的List<OwenTask>
			for(OwenTask oldTask:olist){
				//遍历界面修改之后传递来的List<OwenTask>
				for(OwenTask newTask:list){
					if(oldTask.getTaskId().equals(newTask.getTaskId())){
						oldTask.setInterval(newTask.getInterval());
					}
				}
			}
		}
		return newTasks;
	}
	/**
	 * 
	 * 更新otMap中的列表通过数据库中对应的信息
	 * 
	 * */
		@Override
		public void updateTaskListByDB() {
			try {
				//源自数据库
				List<OwenTask> DBtasks=getLastSavedTasks();
				//源自内存
				if(null!=otMap){
				Set<String> ip=otMap.keySet();
				for(String orgIp:ip){
					List<OwenTask> memoryList=otMap.get(orgIp);
					for(OwenTask o:memoryList){
						for(OwenTask ot:DBtasks){
							if(o.getTaskId().equals(ot.getTaskId())){
								o.setInterval(o.getInterval());
							}
						}
					}
				}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	
	/**
	 * 
	 * 更新treeList中的列表通过数据库中对应的信息
	 * 
	 **/
	@Override
	public void updateTreeTaskListByDB() {
				try {
					//源自数据库
					List<OwenTask> DBtasks=getLastSavedTasks();
					//源自内存
					if(null!=treeList){
						for(PageTask p:treeList){
							for(OwenTask o:DBtasks){
								if(null!=o && o.getTaskId().equals(p.getTaskId())){
									p.setInterval(o.getInterval());
								}
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
	@Override
	public String startTasks(List<PageTask> taskList) throws Exception {
		
		List<OwenTask> list = OwenHelper.fromPageTask(taskList);
	
		Map<String, List<OwenTask>> groupedTasks = groupTaskByServer(list);
		
		if(null != groupedTasks && !groupedTasks.isEmpty()){
			
			Set<String> ipList = groupedTasks.keySet();
			for (String ip : ipList) {
				IOwenServer nodeSrv = getKettleNodeServerByIP(ip);
				if(nodeSrv==null){
					List<OwenTask> oTasks=otMap.get(ip);
					if(oTasks!=null){
						for(OwenTask o:oTasks){
							for (PageTask p:treeList){
						
								if(null!= p.getTaskId() && p.getTaskId().equals(o.getTaskId())){
									p.setStatus("未执行");
								}
							}
						}
					}
					System.out.println("节点+【"+ip+"】已连接不到服务器");
					//return "此节点+【"+ip+"】已断开，连接发生异常。";
					continue;
				}
				for(OwenTask o:list){
					for(PageTask p:treeList){
							if(o.getTaskId().equals(p.getTaskId())){
								p.setStatus("运行中");
							}
						}
				}
				nodeSrv.runTask(groupedTasks.get(ip));
			}
		}
		return null;
	}
	/**
	 * 通过IP地址获取Kettle运行服务器的远程调用接口
	 * 
	 * @param ip
	 * @return
	 */
	public IOwenServer getKettleNodeServerByIP(String ip){
		
		IOwenServer srv = null;
		nodeList=getAllServers();
		for (NodeServer nodeServer : nodeList) {
			if(nodeServer.getServer_ip().equals(ip)){
				
				String comUrl = "rmi://" + nodeServer.getServer_ip() + ":" + nodeServer.getServer_port() + "/" + nodeServer.getServer_name();
				System.out.println("comUrl--"+comUrl);
				try {
					srv = (IOwenServer) Naming.lookup(comUrl);
					
					break;
					
				} catch (MalformedURLException e) {
					
					e.printStackTrace();
				}
				catch(ConnectException e){
					System.out.println("ConnectException----"+comUrl);
					continue;
					//deleteKettle(nodeServer.getServer_ip());
					//e.printStackTrace();
				} catch (RemoteException e) {
					System.out.println("RemoteException----"+comUrl);
					continue;
					//e.printStackTrace();
				} catch (NotBoundException e) {
					
					e.printStackTrace();
				}
			}
		}
		
		return srv;
	}	
	
	@Override
	public String stopTasks(List<PageTask> taskList) throws Exception {
		
		List<OwenTask> list = OwenHelper.fromPageTask(taskList);
		
		Map<String, List<OwenTask>> groupedTasks = groupTaskByServer(list);
		
		if(null != groupedTasks && !groupedTasks.isEmpty()){
			
			Set<String> ipList = groupedTasks.keySet();
			
			for (String ip : ipList) {
				
				IOwenServer nodeSrv = getKettleNodeServerByIP(ip);
				if(nodeSrv==null){
					List<OwenTask> oTasks=otMap.get(ip);
					if(oTasks!=null){
							for(OwenTask o:oTasks){
								for (PageTask p:treeList){
							
								if(null!= p.getTaskId() && p.getTaskId().equals(o.getTaskId())){
									p.setStatus("未执行");
								}
							}
						}
					}
					
					
					System.out.println("已连接不到服务器");
					return "此节点+【"+ip+"】已断开，连接发生异常。";
				}else{
				String stopResult=nodeSrv.stopTask(groupedTasks.get(ip));
				System.out.println(stopResult);
				if(stopResult.equals("OK") ){
					for (PageTask p:treeList){
						for(PageTask pp:taskList){
							if(pp.getTaskId().equals(p.getTaskId())){
								p.setStatus("未执行");
							}
						}
						
					}
				}
				}
			}
		}
		return null;
	}

	@Override
	public String reStartTasks(List<PageTask> taskList) throws Exception {
		
		List<OwenTask> list = OwenHelper.fromPageTask(taskList);
		
		Map<String, List<OwenTask>> groupedTasks = groupTaskByServer(list);
		
		if(null != groupedTasks && !groupedTasks.isEmpty()){
			
			Set<String> ipList = groupedTasks.keySet();
			
			for (String ip : ipList) {
				
				IOwenServer nodeSrv = getKettleNodeServerByIP(ip);
				List<OwenTask> owenTasks=groupedTasks.get(ip);
				if(nodeSrv==null){
					List<OwenTask> oTasks=otMap.get(ip);
					if(oTasks!=null){
						for(OwenTask o:oTasks){
							for (PageTask p:treeList){
						
								if(null!= p.getTaskId() && p.getTaskId().equals(o.getTaskId())){
									p.setStatus("未执行");
								}
							}
						}
					}
					System.out.println("已连接不到服务器");
					return "此节点+【"+ip+"】已断开，连接发生异常。";
				}
				
				String a=nodeSrv.areYouOK("ABC");
				if(a.equals("OK##ABC")){
					nodeSrv.restartTask(groupedTasks.get(ip));
				}
				
			}
		}
		
		return null;
	}
	
	/**
	 * 获取新的任务
	 * 
	 */
	@Override
	public String getNewTask() throws Exception{
		IOwenServer nodeSrv = null;
		for (NodeServer nodeServer : nodeList) {
			String ip = nodeServer.getServer_ip();
			nodeSrv = getKettleNodeServerByIP(ip);
			if(nodeSrv != null)
				nodeSrv.getNewTask();
		}
		return null;
	}
	
	@Override
	public Map<OwenOrgnization,String> getOrgnizationsByServerId(String server_id)
			throws Exception {
		IPisExist(server_id);

		if(null != soMap && !soMap.isEmpty()){
			
			return soMap.get(server_id);
		}
		return null;
	}

	@Override
	public void pushTasksByServerId(String server_id, List<OwenTask> list)
			throws Exception {
		//System.out.println("-------------------pushTasksByServerId----------------"+list.size());
		if(		!server_id.isEmpty() 	&& 
				null != list 			&& 
				!list.isEmpty() 		
				){
			//System.out.println("listsize1----"+list.size());
			/*
			 * 如果节点服务器推送过自身任务，则更新
			 * 
			 */
			if(otMap.containsKey(server_id)){
				otMap.remove(server_id);
			}
			List<OwenTask> lastSaved = getLastSavedTasks();//??
			
			if(null != lastSaved && !lastSaved.isEmpty()){
				OwenHelper.mergeTaskList(list, lastSaved);
			}
			
			otMap.put(server_id, list);
			//System.out.println("listsize2----"+list.size());
			createTreeTask(server_id,list);
		}
	}
		
	/**
	 * 对无序的任务列表，以服务器IP地址进行重新分组
	 * 
	 * @param list
	 * @return
	 */
	protected Map<String, List<OwenTask>> groupTaskByServer(List<OwenTask> list){
		
		Map<String, List<OwenTask>> retMap = new HashMap<String, List<OwenTask>>();
		
		
		if(null != list && !list.isEmpty()){
			for (OwenTask owenTask : list) {
				String orgName = owenTask.getOrgName();
				String stageName = owenTask.getStage();
				String ip = getServerIPByOrgName(orgName,stageName);
				if(retMap.containsKey(ip)){
					
					List<OwenTask> listOfThisSrv = retMap.get(ip);
					
					listOfThisSrv.add(owenTask);
				}else {
					List<OwenTask> listOfThisSrv = new ArrayList<OwenTask>();
					
					listOfThisSrv.add(owenTask);
					
					retMap.put(ip, listOfThisSrv);
				}
			}
		}
		
		return retMap;
	}
	
	protected Map<String, List<OwenTask>> groupTaskByOrgName(List<OwenTask> list) {
		
		Map<String, List<OwenTask>> retMap = new HashMap<String, List<OwenTask>>();
		
		if(null != list && !list.isEmpty()){
			for (OwenTask owenTask : list) {
				
				String orgName = owenTask.getOrgName();
				
				if(retMap.containsKey(orgName)){
					
					List<OwenTask> listOfThis = retMap.get(orgName);
					
					listOfThis.add(owenTask);
				}else {
					List<OwenTask> listOfThis = new ArrayList<OwenTask>();
					
					listOfThis.add(owenTask);
					
					retMap.put(orgName, listOfThis);
				}
			}
		}
		
		return retMap;
	}
		
	protected Map<String, List<OwenTask>> groupTaskByStage(List<OwenTask> list) {
		
		Map<String, List<OwenTask>> retMap = new HashMap<String, List<OwenTask>>();
		
		if(null != list && !list.isEmpty()){
			for (OwenTask owenTask : list) {
				
				String stageName = owenTask.getStage();
				
				if(retMap.containsKey(stageName)){
					
					List<OwenTask> listOfThis = retMap.get(stageName);
					
					listOfThis.add(owenTask);
				}else {
					List<OwenTask> listOfThis = new ArrayList<OwenTask>();
					
					listOfThis.add(owenTask);
					
					retMap.put(stageName, listOfThis);
				}
			}
		}
		
		return retMap;
	}
	/**
	 * 删除多余的阶段
	 * @param map
	 * @param ip
	 * @param orgName
	 * @return
	 */
	protected Map<String, List<OwenTask>> clearTaskByStage(Map<String, List<OwenTask>> map,String ip,String orgName) {
		Map<OwenOrgnization,String> tmpMap = soMap.get(ip);
		Iterator iter = map.entrySet().iterator();
		while (iter.hasNext()) {
			boolean flag = false;
			Map.Entry entry = (Map.Entry) iter.next();
			String stageName = entry.getKey().toString();
			Iterator iter1 = tmpMap.entrySet().iterator();
			while(iter1.hasNext()){
				Map.Entry entry1 = (Map.Entry) iter1.next();
				OwenOrgnization o = (OwenOrgnization)entry1.getKey();
				if(o.getOrgName().equals(orgName)){
					if(entry1.getValue() != null){
						String stageName1 = entry1.getValue().toString();
						if(stageName.equals(stageName1)){
							flag=true;
							break;
						}
					}
				}
			}
			if(!flag){
				//map.remove(stageName);
				iter.remove();
			}
		}
		return map;
	}
		
	/**
	 * 通过机构名称获取该机构所属于的服务器IP地址
	 * 
	 * @param orgName
	 * @return
	 */
	protected String getServerIPByOrgName(String orgName,String stageName){
		
		if(null != soMap && !soMap.isEmpty()){
			
			Set<String> serverIpList = soMap.keySet();
			
			for (String srvIP : serverIpList) {
				
				Map<OwenOrgnization,String> orgMap = soMap.get(srvIP);
				
				/*for (OwenOrgnization owenOrgnization : orgList) {
					
					if(orgName.equals(owenOrgnization.getOrgName())){
						return srvIP;
					}
				}*/
				Iterator iter = orgMap.entrySet().iterator();
				while (iter.hasNext()) {
					Map.Entry entry = (Map.Entry) iter.next();
					OwenOrgnization org = (OwenOrgnization)entry.getKey();
					String orgStagename = entry.getValue().toString();
					if(org.getOrgName().equals(orgName) && stageName.equals(orgStagename)){
						return srvIP;
					}
				}
			}
		}
		
		return null;
	}
	
	public void setRunnablePool(OwenRunnablePool runnablePool) {
		this.runnablePool = runnablePool;
	}

	/**
	 * 获取节点上跟新的任务执行状态
	 * 更新otMap;
	 * 跟新treeList
	 * 
	 * */
	@Override
	public void setResult(Map<String, List<OwenTask>> data) {
		if(otMap==null){
			return;
		}
		Set<String> orgName=otMap.keySet();
		Set<String> serIp=data.keySet();
		for(String orgN:orgName){
			List<OwenTask> ot=otMap.get(orgN);
			//遍历【内存】中每一个委办局下的Task列表
			for(OwenTask Memorytask:ot){
				
				for(String ip:serIp){
					List<OwenTask> owent=data.get(ip);
					//遍历【从节点服务器获取的】每一个serIP下的Task列表
					for(OwenTask newTask:owent){
						if(null!=newTask && newTask.getTaskId().equals(Memorytask.getTaskId())){
							Memorytask.setStatus(newTask.getStatus());
						}
					}
					//更新treeList中的数据
					//updateMemeryStatus();
				}
			}
		}
 	}

	@Override
	public Map<String, List<OwenTask>> getParam() {
		Map<String, List<OwenTask>> resultMap = new HashMap<String, List<OwenTask>>();
		
		Set<String> srvIpSet=new HashSet<String>();
		if(null==soMap){
			System.out.println("soMap has null");
			return resultMap;
		}
		Iterator iterator=soMap.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry entry=(Map.Entry) iterator.next();
			String key=(String) entry.getKey();
			srvIpSet.add(key);
		}
		
		for(String ipString : srvIpSet){
			//List<OwenOrgnization> orgList = soMap.get(ipString);
			Map<OwenOrgnization,String> orgMap = soMap.get(ipString);
			Iterator iter = orgMap.entrySet().iterator();
			
			while (iter.hasNext()) {
				Map.Entry entry = (Map.Entry) iter.next();
				OwenOrgnization org = (OwenOrgnization)entry.getKey();
			
				String serverIp = org.getOrgSvrId();
				
				List<OwenTask> taskList = otMap.get(serverIp);
				
				if(null != resultMap.get(ipString)){
					resultMap.get(ipString).addAll(taskList);
				}else {
					List<OwenTask> tempList = new ArrayList<OwenTask>();
					if(null==taskList){
						return null;
					}
					tempList.addAll(taskList);
					
					resultMap.put(ipString, tempList);
				}
			}
		}
		return resultMap;
	}
	
	//更新内存中的状态信息
	public void updateMemeryStatus(){
		String statusString="";
		for(OwenTaskLog log:logList){
			for(PageTask pageTask:treeList){
				if(log.getTask_id().equals(pageTask.getTaskId())){
					
					if(log.getTask_ststus()==1){
						statusString="运行中";
					}else if(log.getTask_ststus()==2){
						statusString="任务出错已终止";
					}else{
						statusString="未执行";
					}
					pageTask.setStatus(statusString);
				}
			}
		}
	}
	
	//查询数据库中是否存在serverIP
	public void IPisExist(String serverIP){
		boolean isExist=soMap.containsKey(serverIP);
		
		if(isExist==true){
			OWEN_VAR.SVR_IP=serverIP;
		}else{
			saveNewKettle(serverIP);
			try {
				soMap=fetchServerAndOrgRelationship();
			} catch (Exception e) {
				e.printStackTrace();
			}
			if(!soMap.containsKey(serverIP)){
				System.out.println(serverIP+"此节点服务器没有分配到任务！");
				return;
			}
		}
	}
}
