package com.owen.server.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.dao.ServerDao;
import com.owen.server.entity.NodeServer;
import com.owen.server.entity.OSRelationShip;
import com.owen.server.entity.Orgnization;
import com.owen.server.entity.TasksLogs;
import com.owen.server.pageVar.PageTask;
import com.owen.server.util.OwenHelper;

public class ServerCoreService extends AbstractServerService {

	private ServerDao serverDao;
	
	
	//返回键值对形式的信息（key=服务器IP , value=对应服务器下的委办局名称）
	@Override
	protected Map<String, Map<OwenOrgnization,String>> fetchServerAndOrgRelationship() throws Exception {
		//Map<String, List<OwenOrgnization>> map = new HashMap<String, List<OwenOrgnization>>();
		Map<String, Map<OwenOrgnization,String>> map = new HashMap<String, Map<OwenOrgnization,String>>();
		
		//获取数据库中：委办局和服务器的关系数据、委办局数据、节点服务器的数据
		List<OSRelationShip> repList 	= serverDao.getOrgSrvRelations();
		List<Orgnization> orgList		= serverDao.getOrgnizations();
		List<NodeServer> srvList		= serverDao.getServers();
		
		if(null == repList || repList.isEmpty() || null == orgList || orgList.isEmpty() || null == srvList || srvList.isEmpty()){
			return map;
		}
		
		
		for(OSRelationShip os:repList){
			
			String srv_ip = os.getServer_ip();
			//判断该节点服务器是否存在
			boolean srv_exists = false;
			
			for (NodeServer nodeServer : srvList) {
				if(nodeServer.getServer_ip().equals(srv_ip)){
					srv_exists = true;
					break;
				}
			}
			
			if(srv_exists){
				//若此map中存在此ip
				if(map.containsKey(srv_ip)){
					//获取此IP下的委办局列表
					//List<OwenOrgnization> mapOrgList = map.get(srv_ip);
					Map<OwenOrgnization, String> tmpMap = map.get(srv_ip);
					String orgCode = os.getOrgCode();
					
					for(Orgnization org:orgList){
						if(org.getOrgCode().equals(orgCode)){
							
						OwenOrgnization oorg = OwenHelper.fromHBOrgnization(org);
						oorg.setOrgSvrId(srv_ip);
						//向此IP下的委办局列表添加该委办局信息
						tmpMap.put(oorg, os.getStage_name());
						
						break;
						}
					}
					map.put(srv_ip, tmpMap);
					
				}else {//若当前map中不存在此IP
					//在此IP下新建对应的value(委办局列表)
					Map<OwenOrgnization,String> tmpMap = new HashMap<OwenOrgnization, String>();
					String orgCode = os.getOrgCode();
					
					//遍历委办局信息的列表，如果是该IP下的则加入一个集合中
					for(Orgnization org:orgList){
						if(org.getOrgCode().equals(orgCode)){
							OwenOrgnization oorg = OwenHelper.fromHBOrgnization(org);
							oorg.setOrgSvrId(srv_ip);
							//mapOrgList.add(oorg);
							tmpMap.put(oorg, os.getStage_name());
							break;
						}
					}
					
					//形成IP和委办局的关系型数据
					map.put(srv_ip, tmpMap);
				}
			}
		}
		return map;
	}
	/**
	 * 更新新节点服务器，保存至数据库
	 * @param ip
	 */
	public void saveNewKettle(String ip){
		serverDao.saveNewKettle(ip);
	}
	
	/**
	 * 删除无用的节点服务器
	 */
	public void deleteKettle(String ip){
		serverDao.deleteKettle(ip);
	}

	/**
	 * 查询是否有该节点
	 */
	public boolean getKettle(String ip){
		return serverDao.getKettle(ip);
	}
	
	@Override
	protected List<OwenTask> getLastSavedTasks() {
		
		List<OwenTask> list=null;
		try {
			//获取数据库中task最后一次修改后的数据（数据库中现存的task信息）
			list=serverDao.getLastSavedTasks();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	
	}
	public List<NodeServer> getAllServers(){
		List<NodeServer> list=null;
		try {
			list = serverDao.getServers();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}
	/*
	 * 将修改后的数据保存至数据库
	 * 存在：更新    
	 * 不存在：增加
	 */

	@Override
	protected void updateDBTasks(List<OwenTask> taskList) {
		try {
			serverDao.updateDBTasks(taskList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}
	/**
	 * 
	 * 接收从节点传过来的log信息，将其直接写入数据库中
	 * 
	 * */
	@Override
	public void  pushTasksLog(String server_id,List<OwenTaskLog> list) 
			throws Exception{
		serverDao.saveTasksLog(list);
		logList=list;
		updateMemeryStatus();
		
	}
	
	
	/**
	 * 获取数据库中TaskLog的信息
	 * @return List<TasksLogs>
	 * */
	@Override
	protected List<TasksLogs> loadLogsList(String param) throws Exception {
		List<TasksLogs> taskLogList=serverDao.getTasksLogs(param);
		return taskLogList;
	}
	
	
	
	@Override
	public List<TasksLogs> listTasksInfo(String param) throws Exception {
		return loadLogsList(param);
	}

	@Override
	public List<PageTask> listTasks() throws Exception {
		return null;
	}

	@Override
	public List<PageTask> pageTasks(List<PageTask> pageList) {
		return null;
	}
	//返回树形结构的pageTask信息
	@Override
	public List<PageTask> listTreeTasks() throws Exception {
		List<PageTask> tmpTreeList = new ArrayList<PageTask>();
		for(PageTask p : treeList){
			if("1".equals(p.getLevel()) && p.getTreeLink().indexOf("    ") == -1){
				p.setTreeLink("        "+p.getTreeLink());
			}else if("2".equals(p.getLevel()) && p.getTreeLink().indexOf("    ") == -1){
				p.setTreeLink("               "+p.getTreeLink());
			}else if("3".equals(p.getLevel())){
				p.setTreeLink("");
			}
			tmpTreeList.add(p);
		}
		return tmpTreeList;
	}

	








}
