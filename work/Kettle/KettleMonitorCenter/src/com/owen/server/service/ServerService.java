package com.owen.server.service;

import java.util.List;
import java.util.Map;

import com.owen.console.xchange.OwenOrgnization;
import com.owen.console.xchange.OwenTask;
import com.owen.console.xchange.OwenTaskLog;
import com.owen.server.entity.TasksLogs;
import com.owen.server.pageVar.PageTask;

/**
 * 此接口主要定义了两块方法集：
 * 
 *  1，页面ACTION所依赖的相关方法
 *  
 *  2，与节点服务器通信所涉及的相关方法
 * 
 * 
 * @author OWEN
 *
 * @param <PageTask>
 */
public interface ServerService {

	
	/**------------------页面ACTION相关的方法--------------------------*/

	/**
	 * 以无序的方式加载目前已得到的所有任务，并以列表的方式返回
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<PageTask> listTasks() throws Exception;
	
	

	/**
	 * 以多叉树的结构加载目前已得到的所有任务，并以列表返回
	 * 
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<PageTask> listTreeTasks() throws Exception;
	
	

	/**
	 * 更新页面传递过来的任务列表
	 * 
	 * @param taksList
	 * @throws Exception
	 */
	public String  updateTasks(List<PageTask> taskList) throws Exception;
	
	
	/**
	 * 启动任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String startTasks(List<PageTask> taskList) throws Exception;
	
	
	/**
	 * 停止任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String stopTasks(List<PageTask> taskList) throws Exception;
	
	
	/**
	 * 重启任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String reStartTasks(List<PageTask> taskList) throws Exception;
	
	/**
	 * 获取新的任务
	 * 
	 * @param taskList
	 * @return
	 * @throws Exception
	 */
	public String getNewTask() throws Exception;
	
	
	/**------------------远程调用相关的方法--------------------------*/
	
	/**
	 * 节点服务器通过向中心服务器传递自己的标识，以获取中心服务器为自己分配的机构列表
	 * 
	 * 服务于远程调用
	 * 
	 * @param server_id
	 * @return
	 * @throws Exception
	 */
	//public List<OwenOrgnization> getOrgnizationsByServerId(String server_id) throws Exception;
	public Map<OwenOrgnization,String> getOrgnizationsByServerId(String server_id) throws Exception;
	 
	/**
	 * 节点服务器向中心服务器推送自己所管辖的所有列表列表
	 * 
	 * 服务于远程调用
	 * 
	 * @param server_id
	 * @param list
	 * @throws Exception
	 */
	public void pushTasksByServerId(String server_id,List<OwenTask> list) throws Exception;
	
	
	
	/**
	 * 节点服务器向中心服务器推送自己所管辖的所有列表列表
	 */
	public void pushTasksLog(String server_id,List<OwenTaskLog> list) throws Exception;
	
	/**
	 * 
	 * 在加载任务列表传来的信息时，通过数据库先更新数据
	 * 
	 * */
	public void updateTaskListByDB() ;
	
	public void updateTreeTaskListByDB() ;

	

	public List<TasksLogs> listTasksInfo(String taskId) throws Exception;



	public List<PageTask> pageTasks(List<PageTask> pageList);
	
}
