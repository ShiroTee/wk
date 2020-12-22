package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "user_route_collect")
@Entity
public class UserCollectService  extends ServiceSimpleBean{
	@Id
	@Column(name = "COLLECT_ID", length = 36, nullable = false)
    private String collectId;//收藏id
	@Column(name = "USER_ID", length = 36, nullable = true)
	private String userId;//用户id
	@Column(name = "RES_ID", length = 36, nullable = true)
	private String resId;//服务id
	@Column(name = "COLLECT_TIME", length = 36, nullable = true)
	private Date collectTime;//创建时间
	@Column(name = "COLLECT_STATUS", length = 36, nullable = true)
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
	public String getResId() {
		return resId;
	}
	public void setResId(String resId) {
		this.resId = resId;
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
