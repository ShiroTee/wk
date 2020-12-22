package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

/**
 * 模块扩展
 *
 */
public class CommunityModuleExtBean extends CommunityModuleBean {
	
	private int journalCount;
	
	private Date lastDate;
	
	//贴数
	private int replyCount;
	
	public int getJournalCount() {
		return journalCount;
	}

	public void setJournalCount(int journalCount) {
		this.journalCount = journalCount;
	}

	public Date getLastDate() {
		return lastDate;
	}

	public void setLastDate(Date lastDate) {
		this.lastDate = lastDate;
	}

	public int getReplyCount() {
		return replyCount;
	}

	public void setReplyCount(int replyCount) {
		this.replyCount = replyCount;
	}
}
