package com.digitalchina.ldp.app.sps.bean;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.digitalchina.ldp.app.oa.bean.ApprovalComment;

@Table(name = "APPROVAL_INFO")
@Entity
public class ApprovalInfo {
	@Transient
	public static final String APPROVED = "同意";
	@Transient
	public static final String REJECT = "不同意";
	@Transient
	public static final String SUCCESS="申请成功";
	@Transient
    public static final String FAILED="申请失败";

	@Id
	@Column(name = "ID")
	private String id;// ID
	@Column(name = "APPROVAL_ID")
	private String approvalId;// 申请流水号,每次申请一个新流水号
	@Column(name = "PROPOSER_ID")
	private String proposerId;// 申请人id
	@Column(name = "PROPOSER_NAME")
	private String proposerName;// 申请人姓名
	@Column(name = "PROPOSER_ORG_NAME")
	private String proposerOrgName;// 申请人部门名称
	@Column(name = "APPLY_TIME")
	private Date applyTime;// 申请时间
	@Column(name = "ASSET_ID")
	private String assetId;// 所申请的资产ID
	@Column(name = "ASSET_NAME")
	private String assetName;// 所申请的资产名称
	@Column(name = "ASSET_PROVIDER")
	private String assetProvider;// 所申请了的资产提供者
	@Column(name = "ASSET_PROVIDER_NAME")
	private String assetProviderName;// 所申请了的资产提供者姓名
	@Column(name = "INFO")
	private String comment;// 申请说明
	@Column(name = "STATUS")
	private String status;// 状态
	@Column(name = "SIP_URL")
	private String sipUrl;//sip 交换方式 目标数据库Url 地址
	@Column(name = "SIP_USERNAME")
	private String sipUserName;//sip 目标数据库 用户名
	@Column(name = "SIP_PASSWORD")
	private String sipPassword;//sip 目标数据库 密码
	@Column(name = "ATTACHMENTS")
	private String attachments;//申请/审核的附件URL 逗号分隔.
	@Column(name = "PROPOSER_PHONE")
	private String proposerPhone;//申请人电话
	@Column(name = "EXECUTION_ID")
	public  String executionId;
	
	//待办任务ID
	@Transient
    public  String taskId;
	//待办任务名称
	@Transient
    public  String activityName;
	//已办任务ID
	
	@Transient
	private List<ApprovalComment> commentList;
	
	public String getSipUrl() {
		return sipUrl;
	}

	public void setSipUrl(String sipUrl) {
		this.sipUrl = sipUrl;
	}

	public String getSipUserName() {
		return sipUserName;
	}

	public void setSipUserName(String sipUserName) {
		this.sipUserName = sipUserName;
	}

	public String getSipPassword() {
		return sipPassword;
	}

	public void setSipPassword(String sipPassword) {
		this.sipPassword = sipPassword;
	}

	public String getAttachments() {
		return attachments;
	}

	public void setAttachments(String attachments) {
		this.attachments = attachments;
	}

	public String getApprovalId() {
		return approvalId;
	}

	public void setApprovalId(String approvalId) {
		this.approvalId = approvalId;
	}

	public String getProposerId() {
		return proposerId;
	}

	public void setProposerId(String proposerId) {
		this.proposerId = proposerId;
	}

	public String getProposerName() {
		return proposerName;
	}

	public void setProposerName(String proposerName) {
		this.proposerName = proposerName;
	}

	public String getProposerOrgName() {
		return proposerOrgName;
	}

	public void setProposerOrgName(String proposerOrgName) {
		this.proposerOrgName = proposerOrgName;
	}

	public Date getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public void setAssetProviderName(String assetProviderName) {
		this.assetProviderName = assetProviderName;
	}

	public String getAssetProviderName() {
		return assetProviderName;
	}

	public void setAssetProvider(String assetProvider) {
		this.assetProvider = assetProvider;
	}

	public String getAssetProvider() {
		return assetProvider;
	}

  public String getProposerPhone() {
    return proposerPhone;
  }

  public void setProposerPhone(String proposerPhone) {
    this.proposerPhone = proposerPhone;
  }

public String getTaskId() {
	return taskId;
}

public void setTaskId(String taskId) {
	this.taskId = taskId;
}

public String getActivityName() {
	return activityName;
}

public void setActivityName(String activityName) {
	this.activityName = activityName;
}

public String getExecutionId() {
	return executionId;
}

public void setExecutionId(String executionId) {
	this.executionId = executionId;
}

public List<ApprovalComment> getCommentList() {
	return commentList;
}

public void setCommentList(List<ApprovalComment> commentList) {
	this.commentList = commentList;
}
  
  
}
