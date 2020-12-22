package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Table(name = "USER_COURSE_COLLECT")
@Entity
public class UserCollectCourseBean extends CourseSimpleBean{
	@Id
	@Column(name = "COLLECT_ID", length = 36, nullable = false)
    private String collectId;//收藏id
	@Column(name = "USER_ID", length = 36, nullable = true)
	private String userId;//用户id
	@Column(name = "COURSE_ID", length = 36, nullable = true)
	private String courseId;//教程id
	@Column(name = "COLLECT_TIME", length = 36, nullable = true)
	private Date collectTime;//收藏时间
	@Column(name = "COLLECT_STATUS", length = 1, nullable = true)
	private String collectStatus;//收藏状态
	
	public String getCollectId() {
		return collectId;
	}
	public void setCollectId(String collectId) {
		this.collectId = collectId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getCourseId() {
		return courseId;
	}
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	public Date getCollectTime() {
		return collectTime;
	}
	public void setCollectTime(Date collectTime) {
		this.collectTime = collectTime;
	}
	public String getCollectStatus() {
		return collectStatus;
	}
	public void setCollectStatus(String collectStatus) {
		this.collectStatus = collectStatus;
	}
	
}
