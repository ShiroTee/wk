package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name = "USER_ROUTE_COMMENT")
@Entity
public class ServiceCommentBean {


	@Id
	@Column(name = "COMM_ID")
	private String comm_id;
	@Column(name = "USER_ID")
	private String user_id;//用户
	@Column(name = "RES_ID")
	private String res_id;//服务
	@Column(name = "QMID")
	private int quickCommentId;//快速评论序号
	@Column(name = "COMM_DETAIL")
	private String comm_detail;//文字评论内容
	@Column(name = "COMM_TIME")
	private Date comm_time;
	@Column(name = "COMM_STATUS")
	private String comm_status;
	
	@Transient
	private String userName;
	
	public String getComm_id() {
		return comm_id;
	}
	public void setComm_id(String comm_id) {
		this.comm_id = comm_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getRes_id() {
		return res_id;
	}
	public void setRes_id(String res_id) {
		this.res_id = res_id;
	}

	public int getQuickCommentId() {
		return quickCommentId;
	}
	public void setQuickCommentId(int quickCommentId) {
		this.quickCommentId = quickCommentId;
	}
	public String getComm_detail() {
		return comm_detail;
	}
	public void setComm_detail(String comm_detail) {
		this.comm_detail = comm_detail;
	}
	public Date getComm_time() {
		return comm_time;
	}
	public void setComm_time(Date comm_time) {
		this.comm_time = comm_time;
	}
	public String getComm_status() {
		return comm_status;
	}
	public void setComm_status(String comm_status) {
		this.comm_status = comm_status;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
}
