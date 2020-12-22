package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Table(name = "USER_ACTIVITY_JOIN")
@Entity
public class UserActivityJoinBean {
	 @Id
	 @Column(name="JOIN_ID")
	 private String joinId;//用户参加活动Id
	 @Column(name="USER_ID")
	 private String userId;//用户Id
	 @Column(name="ACT_ID")
	 private String actId;//活动Id
	 @Column(name="JOIN_TIME")
	 private Date joinTime;//参加时间
	 @Column(name="JOIN_STATUS")
	 private String joinStatus;//参加状态
	 
	public String getJoinId() {
		return joinId;
	}
	public void setJoinId(String joinId) {
		this.joinId = joinId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getActId() {
		return actId;
	}
	public void setActId(String actId) {
		this.actId = actId;
	}
	public Date getJoinTime() {
		return joinTime;
	}
	public void setJoinTime(Date joinTime) {
		this.joinTime = joinTime;
	}
	public String getJoinStatus() {
		return joinStatus;
	}
	public void setJoinStatus(String joinStatus) {
		this.joinStatus = joinStatus;
	}
	 
	 
}
