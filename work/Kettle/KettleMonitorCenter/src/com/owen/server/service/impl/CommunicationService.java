package com.owen.server.service.impl;

import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

import com.dataman.remote.RMISupport;
import com.owen.console.publish.Communication;
import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.service.ServerService;

public class CommunicationService extends RMISupport implements Communication {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private ServerService serverService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	protected CommunicationService() throws RemoteException {
		super();
	}

	@Override
	public Map<OwenOrgnization,String> getOrgnizationsByServerId(String server_id)
			throws RemoteException {
		
		Map<OwenOrgnization, String> list = null;
		
		try {
			
			list = serverService.getOrgnizationsByServerId(server_id);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			throw new RemoteException(e.getMessage());
		}
		
		return list;
	}

	@Override
	public void pushTasksByServerId(String server_id, List<OwenTask> list)
			throws RemoteException {
		
		try {
			serverService.pushTasksByServerId(server_id, list);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			throw new RemoteException(e.getMessage());
		}
	}
	
	@Override
	public void pushTaskLog(String server_id, List<OwenTaskLog> list)
			throws RemoteException {
		try {
			serverService.pushTasksLog(server_id, list);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
