package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 论坛 主帖 
 */
@SuppressWarnings("serial")
@Table(name = "Community_JOURNAL")
@Entity
public class CommunityJournalBean {
	
	@Id
	@Column(name = "JOURNAL_ID")
	private String journalId;//主贴id
	@Column(name = "JOURNAL_NAME",length = 200)
	private String journalName;//主贴名称
	@Column(name = "JOURNAL_Content",length = 4000)
	private String journalContent;//主贴内容
	@Column(name = "POSTER")
	private String poster;//发帖人
	@Column(name = "CREATE_TIME")
	private Date createTime;//创建时间
	@Column(name = "J_MODULE_ID")
	private String jModuleId;//所属模块id
	
	public String getJournalId() {
		return journalId;
	}
	public void setJournalId(String journalId) {
		this.journalId = journalId;
	}
	public String getJournalName() {
		return journalName;
	}
	public void setJournalName(String journalName) {
		this.journalName = journalName;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getjModuleId() {
		return jModuleId;
	}
	public String getJournalContent() {
		return journalContent;
	}
	public void setJournalContent(String journalContent) {
		this.journalContent = journalContent;
	}
	public void setjModuleId(String jModuleId) {
		this.jModuleId = jModuleId;
	}
	
	
}
