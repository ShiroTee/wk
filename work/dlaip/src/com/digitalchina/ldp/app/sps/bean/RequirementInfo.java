package com.digitalchina.ldp.app.sps.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Table(name = "requirement")
@Entity
public final class RequirementInfo implements Serializable{
	@Transient
	public static final String COMMITTED = "committed";
	@Transient
	public static final String PROCESSED = "processed";
	
	@Id
	@Column(name="id")
	private String id;//ID
	@Column(name="user")
	private String user;
	@Column(name="userName")
  private String userName;
	@Column(name="userOrgName")
	private String userOrgName;
	@Column(name="name")
	private String name;
	@Column(name="description")
	private String description;
	@Column(name="commitTime")
	private Date commitTime;
	@Column(name="status")
	private String status;
	@Column(name="feedback")
	private String feedback;
	@Column(name="dealTime")
	private Date dealTime;
	@Column(name="administrator")
	private String administrator;
	@Column(name="attachments")
	private String attachments;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
	public String getAdministrator() {
		return administrator;
	}
	public void setAdministrator(String administrator) {
		this.administrator = administrator;
	}
	public String getAttachments() {
		return attachments;
	}
	public void setAttachments(String attachments) {
		this.attachments = attachments;
	}
	public String getUserOrgName() {
		return userOrgName;
	}
	public void setUserOrgName(String userOrgName) {
		this.userOrgName = userOrgName;
	}
  public Date getCommitTime() {
    return commitTime;
  }
  public void setCommitTime(Date commitTime) {
    this.commitTime = commitTime;
  }
  public Date getDealTime() {
    return dealTime;
  }
  public void setDealTime(Date dealTime) {
    this.dealTime = dealTime;
  }
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
	
}
