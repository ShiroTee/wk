package com.digitalchina.ldp.app.osp.service;


import java.text.ParseException;
import java.util.Date;
import java.util.List;

import com.digitalchina.ldp.app.osp.bean.CommunityJournalBean;
import com.digitalchina.ldp.app.osp.bean.CommunityJournalExtBean;
import com.digitalchina.ldp.app.osp.bean.CommunityModuleExtBean;
import com.digitalchina.ldp.app.osp.bean.CommunityReplyBean;
import com.digitalchina.ldp.app.osp.bean.CommunityModuleBean;
import com.digitalchina.ldp.app.osp.bean.CommunitySectionBean;
import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface CommunityService {
	
	public PageList<CommunitySectionBean> getAllSection(int start,int size);
	
	public List<CommunityModuleBean> getModuleListBySectionId(String sectionId);

	public int getJournalCount(String moduleId);

	public CommunityModuleBean getModuleById(String moduleId);

	public CommunityReplyBean getReplyById(String replyId);

	public PageList<CommunityReplyBean> getReplyListById(int start, int size, String journalId);

	public int getReplyCountById(String journalId);

	public CommunityJournalBean getJournalById(String journalId);

	public PageList<CommunityJournalBean> getJournalList(int start, int size, String moduleId);

	public String getLastTimeByModuleId(String moduleId);

	public void addJournal(String journalId, String journalName,
			Date createTime, String journalContent, String poster, String jModuleId);

	public void addReply(String replyId, String replyContent, String userId,
			String journalId, String fReplyId, Date createTime);

	public List<CommunityModuleExtBean> getExtModuleListBySectionId(
			String sectionId) throws ParseException;

	public PageList<CommunityJournalExtBean> getExtJournalList(int start,
			int size, String moduleId);

	public CommunitySectionBean getSectionById(String sectionId);

	public UserBean getUserById(String userId);

	public CommunityJournalExtBean getExtReplyList(int start,
			int size, String journalId);

	public PageList<DynamicBean> getCommunityRank(int start,int size);

	public List<CommunityModuleExtBean> getExtModuleList() throws ParseException;
}
