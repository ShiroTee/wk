package com.owen.server;

import java.util.List;

import com.owen.console.xchange.OwenTask;



/**
 * @author owen
 *
 * 此类为Kettle服务类的接口定义，目前此服务类只支持三项操作：启动，停止，重启 任务列表
 *
 */
public interface IKetterServerService {

	
	
	/**
	 * 
	 * 启动任务列表中的所有任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String runTask(List<OwenTask> taskList) throws Exception;
	
	/**
	 * 重启任务列表中的所有任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String restartTask(List<OwenTask> taskList) throws Exception;
	
	/**
	 * 停止任务列表中的所有任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String stopTask(List<OwenTask> taskList) throws Exception;
	
	/**
	 * 更新任务列表
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String getNewTask() throws Exception;
}
