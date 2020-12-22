package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 论坛 回帖 
 */
@SuppressWarnings("serial")
@Table(name = "Community_REPLY")
@Entity
public class CommunityReplyBean {
	
	@Id
	@Column(name = "REPLY_ID")
	private String replyId;//回帖id
	@Column(name = "REPLY_CONTENT",length = 4000)
	private String replyContent;//回帖内容
	@Column(name = "USER_ID")
	private String userId;//用户id
	@Column(name = "JOURNAL_ID")
	private String journalId;//帖子id
	@Column(name = "F_REPLY_ID")
	private String fReplyId;//父回帖id
	@Column(name = "CREATE_TIME")
	private Date createTime;//创建时间
	
	public String getReplyId() {
		return replyId;
	}
	public void setReplyId(String replyId) {
		this.replyId = replyId;
	}
	public String getReplyContent() {
		return replyContent;
	}
	public void setReplyContent(String replyContent) {
		this.replyContent = replyContent;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getJournalId() {
		return journalId;
	}
	public void setJournalId(String journalId) {
		this.journalId = journalId;
	}
	public String getfReplyId() {
		return fReplyId;
	}
	public void setfReplyId(String fReplyId) {
		this.fReplyId = fReplyId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
