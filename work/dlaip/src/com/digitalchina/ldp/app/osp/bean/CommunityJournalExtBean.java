package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import com.digitalchina.ldp.bean.PageList;

/**
 * 模块扩展
 *
 */
public class CommunityJournalExtBean extends CommunityJournalBean {
	
	private int replyCount;
	
	private UserBean posterUser;
	
	private PageList<CommunityReplyExtBean> replyList;

	private Date lastReplyDate;
	
	public UserBean getPosterUser() {
		return posterUser;
	}

	public void setPosterUser(UserBean posterUser) {
		this.posterUser = posterUser;
	}

	public int getReplyCount() {
		return replyCount;
	}

	public void setReplyCount(int replyCount) {
		this.replyCount = replyCount;
	}

	public PageList<CommunityReplyExtBean> getReplyList() {
		return replyList;
	}

	public void setReplyList(PageList<CommunityReplyExtBean> replyList) {
		this.replyList = replyList;
	}

	public Date getLastReplyDate() {
		return lastReplyDate;
	}

	public void setLastReplyDate(Date lastReplyDate) {
		this.lastReplyDate = lastReplyDate;
	}

}
