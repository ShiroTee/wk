package com.owen.server.entity;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import com.owen.server.constance.HBMetaData;

@Entity(name=HBMetaData.HBMD_LOG_TABLE_NAME)
public class TasksLogs {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = HBMetaData.HBMD_LOG_ID, unique = true, nullable = false, precision = 10, scale = 0)

	private int id;
	
	@Column(name=HBMetaData.HBMD_LOG_SRVIP)
	private String srv_ip;
	
	@Column(name=HBMetaData.HBMD_LOG_ORGNAME)
	private String org_name;
	
	@Column(name=HBMetaData.HBMD_LOG_TASKID)
	private String task_id;
	
	@Column(name=HBMetaData.HBMD_LOG_TASKNAME)
	private String task_name;
	
	@Column(name=HBMetaData.HBMD_LOG_START_TIME)
	private Date   start_time;
	
	@Column(name=HBMetaData.HBMD_LOG_END_TIME)
	private Date   end_time;
	
	@Column(name=HBMetaData.HBMD_LOG_ERROR_NUM)
	private int	   error_number;
	
	
	@Lob
    @Basic(fetch = FetchType.EAGER)
    @Column(name=HBMetaData.HBMD_LOG_ERROR_INFO, columnDefinition="CLOB") 
	private String error_info;
	

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
	
}
