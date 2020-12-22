package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="quick_comment")
public class QuickCommentBean {

	@Id
	@Column(name="COMMENT_ID")
	private int qcId;
	
	@Column(name="CONTENT")
	private String cotent;
	
	@Column(name="WEB_FLAG")
	private String webFlag;
	
	@Transient
	private int count;

	public int getQcId() {
		return qcId;
	}

	public void setQcId(int qcId) {
		this.qcId = qcId;
	}

	public String getCotent() {
		return cotent;
	}

	public void setCotent(String cotent) {
		this.cotent = cotent;
	}

	public String getWebFlag() {
		return webFlag;
	}

	public void setWebFlag(String webFlag) {
		this.webFlag = webFlag;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
