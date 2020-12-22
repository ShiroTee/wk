package com.owen.server.dao;

import java.util.List;

import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.entity.NodeServer;
import com.owen.server.entity.OSRelationShip;
import com.owen.server.entity.Orgnization;
import com.owen.server.entity.TasksLogs;

public interface ServerDao {
	
	public List<NodeServer> getServers() throws Exception;
	
	
	public List<Orgnization> getOrgnizations() throws Exception;
	
	
	public List<OSRelationShip> getOrgSrvRelations() throws Exception;
	
	public List<OwenTask> getLastSavedTasks() throws Exception;
	
	public List<TasksLogs> getTasksLogs(String param) throws Exception;
	
	public void updateDBTasks(List<OwenTask> list) throws Exception;
	
	public void saveTasksLog(List<OwenTaskLog> list) throws Exception;
	
	public void saveNewKettle(String ip);
	
	public void deleteKettle(String ip);
	
	public boolean getKettle(String ip);
}
