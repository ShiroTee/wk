package com.owen.server.action.impl;


import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;

import com.owen.server.action.base.JQGridAction;
import com.owen.server.pageVar.PageTask;
import com.owen.server.service.ServerService;

public class TasksAction extends JQGridAction<PageTask> {
	
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		private ServerService serverService;
	
		//返回List<PageList>结构的信息列表，（用于传递给界面）。
		@Override
		protected List<PageTask> listResults(String param) throws Exception {
			return serverService.listTreeTasks();
		}
		
		//给serverService设值
		public void setServerService(ServerService serverService) {
			this.serverService = serverService;
		}
		
		//初始化界面（提供给界面调用的action方法）
		public String pageInit() throws Exception {
			refreshTaskList();
			return SUCCESS;
		}
	
		//获取界面上传递来的任务，并开始执行
		public String startTasks()  throws Exception {
			HttpServletResponse response = ServletActionContext.getResponse();
			//将界面上传递过来的参数数组转化成json格式
			JSONArray ja=JSONArray.fromObject(jsonParam);
			//将转化后的json格式的数据形成集合类型的数据
			@SuppressWarnings("unchecked")
			List<PageTask> pageList=(List<PageTask>) JSONArray.toCollection(ja,PageTask.class);	
			try {
					//调取服务层开始任务的方法
					//String startResult=
							serverService.startTasks(pageList);
					//PrintWriter out = response.getWriter();
					//out.write(startResult);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return SUCCESS;
		}
		
		//获取界面上传递来的任务，并停止
		public String stopTasks()  throws Exception {
			HttpServletResponse response = ServletActionContext.getResponse();
			JSONArray ja=JSONArray.fromObject(jsonParam);
			String result="";
			@SuppressWarnings("unchecked")
			List<PageTask> pageList=(List<PageTask>) JSONArray.toCollection(ja,PageTask.class);	
			try {
					//调取服务层停止任务的方法
					//result=
							serverService.stopTasks(pageList);
					//PrintWriter out = response.getWriter();
					//out.write(result);
				} catch (Exception e) {
					e.printStackTrace();
				}
					return SUCCESS;
				}
		//获取修改后的任务信息
		public String saveTasks()  throws Exception {
			HttpServletResponse response = ServletActionContext.getResponse();
			JSONArray ja=JSONArray.fromObject(jsonParam);
			@SuppressWarnings("unchecked")
			List<PageTask> pageList=(List<PageTask>) JSONArray.toCollection(ja,PageTask.class);	
			String result="";
			try {
				//调取服务层更新任务的方法
				//result=
						serverService.updateTasks(pageList);
				//PrintWriter out = response.getWriter();
				//out.write(result);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return SUCCESS;
		}
		//获取新的任务
		public String getNewTask() throws Exception{
			HttpServletResponse response = ServletActionContext.getResponse();
			//System.out.println("---------------获取新的任务------------------");
			serverService.getNewTask();
			
			return SUCCESS;
		}
}
