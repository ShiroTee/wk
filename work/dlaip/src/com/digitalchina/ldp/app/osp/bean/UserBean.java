package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.*;
import java.util.Date;

@Table(name="OSP_USER_INFO")
@Entity
public class UserBean {
	
	@Id
	@Column(name="USER_ID")
	private String 		userId;
	
	@Column(name="USER_NAME")
	private String 		userName;
	
	@Column(name="LOGIN_NAME")
	private String 		loginName;
	
	@Column(name="LOGIN_PASSWORD")
	private String 		loginPassword;
	
	@Column(name="USER_STATUS")
	private int			userStatus;
	
	@Column(name="USER_LEVEL")
	private int			userLevel;
	
	@Column(name="USER_POINTS")
	private int 		userPoints;
	
	@Column(name="AUTH_KEY")
	private String      authKey;
	
	@Column(name="KEY_CRT_TIME")
	private Date      	keyCrtTime;
	
	@Column(name="KEY_ABORT_TIME")
	private Date		keyAbortTime;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "user_phone")
	private String userPhone;
	
	@Transient
	private Integer serviceCollectCount;//用户收藏的服务总量
	@Transient
	private Integer serviceInvokeCount;//用户调用的服务总量
	@Transient
	private Integer activityCount;//用户参与的活动总数
	@Transient
	private Integer courseCount;//用户相关的教程总量
	@Transient
	private Integer applicationCount;//用户提交的应用总量
	@Transient
	private Integer bbsCount;//用户社区的话题总量

	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public int getUserPoints() {
		return userPoints;
	}
	public void setUserPoints(int userPoints) {
		this.userPoints = userPoints;
	}
	public String getAuthKey() {
		return authKey;
	}
	public void setAuthKey(String authKey) {
		this.authKey = authKey;
	}
	public Date getKeyCrtTime() {
		return keyCrtTime;
	}
	public void setKeyCrtTime(Date keyCrtTime) {
		this.keyCrtTime = keyCrtTime;
	}
	public Date getKeyAbortTime() {
		return keyAbortTime;
	}
	public void setKeyAbortTime(Date keyAbortTime) {
		this.keyAbortTime = keyAbortTime;
	}
	public String getLoginPassword() {
		return loginPassword;
	}
	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}
	public int getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(int userStatus) {
		this.userStatus = userStatus;
	}
	public int getUserLevel() {
		return userLevel;
	}
	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
	}
	public Integer getServiceCollectCount() {
		return serviceCollectCount;
	}
	public void setServiceCollectCount(Integer serviceCollectCount) {
		this.serviceCollectCount = serviceCollectCount;
	}
	public Integer getServiceInvokeCount() {
		return serviceInvokeCount;
	}
	public void setServiceInvokeCount(Integer serviceInvokeCount) {
		this.serviceInvokeCount = serviceInvokeCount;
	}
	public Integer getActivityCount() {
		return activityCount;
	}
	public void setActivityCount(Integer activityCount) {
		this.activityCount = activityCount;
	}
	public Integer getCourseCount() {
		return courseCount;
	}
	public void setCourseCount(Integer courseCount) {
		this.courseCount = courseCount;
	}
	public Integer getApplicationCount() {
		return applicationCount;
	}
	public void setApplicationCount(Integer applicationCount) {
		this.applicationCount = applicationCount;
	}
	public Integer getBbsCount() {
		return bbsCount;
	}
	public void setBbsCount(Integer bbsCount) {
		this.bbsCount = bbsCount;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
}
