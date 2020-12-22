package com.owen.console.xchange;


import java.io.Serializable;
import java.util.Date;

public class OwenTaskLog implements Serializable {

	private int id;
	private String srv_ip;
	private String org_name;
	private String task_id;
	private String task_name;
	private Date   start_time;
	private Date   end_time;
	private int	   error_number;
	private String error_info;
	private int task_ststus;
	
	
	

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSrv_ip() {
		return srv_ip;
	}
	public void setSrv_ip(String srv_ip) {
		this.srv_ip = srv_ip;
	}
	public String getOrg_name() {
		return org_name;
	}
	public void setOrg_name(String org_name) {
		this.org_name = org_name;
	}
	public String getTask_id() {
		return task_id;
	}
	public void setTask_id(String task_id) {
		this.task_id = task_id;
	}
	public String getTask_name() {
		return task_name;
	}
	public void setTask_name(String task_name) {
		this.task_name = task_name;
	}
	public Date getStart_time() {
		return start_time;
	}
	public void setStart_time(Date start_time) {
		this.start_time = start_time;
	}
	public Date getEnd_time() {
		return end_time;
	}
	public void setEnd_time(Date end_time) {
		this.end_time = end_time;
	}
	public int getError_number() {
		return error_number;
	}
	public void setError_number(int error_number) {
		this.error_number = error_number;
	}
	public String getError_info() {
		return error_info;
	}
	public void setError_info(String error_info) {
		this.error_info = error_info;
	}
	public int getTask_ststus() {
		return task_ststus;
	}
	public void setTask_ststus(int task_ststus) {
		this.task_ststus = task_ststus;
	}
	
	
}
