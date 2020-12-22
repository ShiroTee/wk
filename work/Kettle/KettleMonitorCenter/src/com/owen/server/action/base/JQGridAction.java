package com.owen.server.action.base;

import java.util.Collections;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;


public abstract class JQGridAction<T> extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	//获取一个空的序列化的list列表（用于存放界面所需要的信息）
	private List<T> rowList = Collections.emptyList();  
	
	//界面所传递的参数（一个包含了界面上所有字段信息的数组）
	protected String jsonParam;

	//返回一个树形的List<PageList>列表
	protected abstract List<T> listResults(String param) throws Exception;
	
	
	//加载所有任务的列表
	public String refreshTaskList(){
		try {
	         this.setRowList(this.listResults(null));  
	         return SUCCESS;  
		} catch (Exception e) {
			e.printStackTrace();
			this.addActionError(e.getMessage());
			return ERROR;
		}
	}
	//加载所有任务日志的列表
	public String refreshRowList(String taskId){
		try {
			//更具所给taskId，获取相对应的日志信息
	         this.setRowList(this.listResults(taskId));
	         return SUCCESS;  
		} catch (Exception e) {
			e.printStackTrace();
			this.addActionError(e.getMessage());
			return ERROR;
		}
	}

	//get和set方法
	public String getJsonParam() {
		return jsonParam;
	}
	public void setJsonParam(String jsonParam) {
		this.jsonParam = jsonParam;
	}
	public List<T> getRowList() {
		return rowList;
	}
	public void setRowList(List<T> rowList) {
		this.rowList = rowList;
	}


	
}
