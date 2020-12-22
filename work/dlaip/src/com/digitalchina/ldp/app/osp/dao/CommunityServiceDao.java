package com.digitalchina.ldp.app.osp.dao;

import java.util.List;

import com.digitalchina.ldp.app.osp.bean.CommunityJournalBean;
import com.digitalchina.ldp.app.osp.bean.CommunityReplyBean;
import com.digitalchina.ldp.app.osp.bean.CommunityModuleBean;
import com.digitalchina.ldp.app.osp.bean.CommunitySectionBean;
import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface CommunityServiceDao {
	
	public PageList<CommunitySectionBean> getAllSection(int start, int size);
	
	public List<CommunityModuleBean> getModuleListBySectionId(String sectionId);

	public int getJournalCount(String moduleId);

	public CommunityModuleBean getModuleById(String moduleId);

	public CommunityReplyBean getReplyById(String replyId);

	public PageList<CommunityReplyBean> getReplyListById(int start, int size, String journalId);

	public int getReplyCountById(String journalId);

	public CommunityJournalBean getJournalById(String journalId);

	public PageList<CommunityJournalBean> getJournalList(int start, int size, String moduleId);

	public DynamicBean getLastTimeByModuleId(String moduleId);

	public void addJournal(CommunityJournalBean journal);

	public void addReply(CommunityReplyBean reply);

	public CommunitySectionBean getSectionById(String sectionId);

	public UserBean getUserById(String userId);

	public List<CommunityReplyBean> getReplyList(String journalId);
	
	public PageList<DynamicBean> getCommunityRank(int start, int size);

	public List<CommunityModuleBean> getAllModule();

	public List<CommunityJournalBean> getAllJournalById(String moduleId);

}
