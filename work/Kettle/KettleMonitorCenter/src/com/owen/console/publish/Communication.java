package com.owen.console.publish;

import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

import com.dataman.remote.RMICommonMethod;
import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;


/**
 * @author OWEN
 *
 * 中心服务器为节点服务器提供的远程方法
 *
 *
 */
public interface Communication extends RMICommonMethod {
	

	/**
	 * 节点服务器通过向中心服务器传递自己的标识，以获取中心服务器为自己分配的机构列表
	 * @param server_id
	 * @return
	 * @throws RemoteException
	 */
	public Map<OwenOrgnization,String> getOrgnizationsByServerId(String server_id) throws RemoteException;

	/**
	 * 节点服务器向中心服务器推送自己所管辖的所有列表列表
	 * @param server_id
	 * @param list
	 * @throws RemoteException
	 */
	public void pushTasksByServerId(String server_id,List<OwenTask> list) throws RemoteException;
	
	/**
	 * 节点服务器向中心服务器推送任务的运行日志
	 * 
	 * */
	public void pushTaskLog(String server_id,List<OwenTaskLog> list ) throws RemoteException;
}
