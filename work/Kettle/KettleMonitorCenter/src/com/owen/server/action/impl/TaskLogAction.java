package com.owen.server.action.impl;

import java.util.List;

import net.sf.json.JSONArray;

import com.owen.server.action.base.JQGridAction;
import com.owen.server.entity.TasksLogs;
import com.owen.server.pageVar.PageTask;
import com.owen.server.service.ServerService;

public class TaskLogAction extends JQGridAction<TasksLogs>{
	
	private static final long serialVersionUID = 1L;
	private ServerService serverService;
	
	
	//加载任务的日志信息
	public String taskInfoLoad() throws Exception {
		//获取界面上传来的参数并转化成json格式
		JSONArray task=JSONArray.fromObject(jsonParam);
		@SuppressWarnings("unchecked")
		List<PageTask> pageList=(List<PageTask>) JSONArray.toCollection(task,PageTask.class);	
		if(null !=pageList){
			for(PageTask p:pageList){
				refreshRowList(p.getTaskId());
			}
		}	
		return SUCCESS;
	}
	
	
	//返回List<PageList>结构的信息列表，（用于传递给界面）。
	@Override
	protected List<TasksLogs> listResults(String taskId) throws Exception {
		return serverService.listTasksInfo(taskId);
	}
	
	//get（）  and  set()
	public ServerService getServerService() {
		return serverService;
	}
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

}
