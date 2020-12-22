package com.owen.console.xchange;

import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

import com.dataman.remote.RMICommonMethod;



/**
 * 此接口由节点服务器提供，由中心控制台使用
 * 
 * */
public interface IOwenServer extends RMICommonMethod {


	//测试节点服务器当前是否可用
	public String areYouOK(String str) throws RemoteException;
	
	//由中心控制台调用，启动任务列表中的任务
	public String runTask(List<OwenTask> taskList) throws RemoteException;
	
	//由中心控制台调用，重新启动任务列表中的任务
	public String restartTask(List<OwenTask> taskList) throws RemoteException;
	
	//由中心控制台调用，停止任务列表中的任务
	public String stopTask(List<OwenTask> taskList) throws RemoteException;

	//由中心控制台调用，获任务列表中的任务状态
	public Map<String ,List<OwenTask>> returnStatus(Map<String ,List<OwenTask>> map) throws RemoteException; 

	//由中心控制台调用，获取新的任务列表
	public String getNewTask() throws RemoteException;
}
