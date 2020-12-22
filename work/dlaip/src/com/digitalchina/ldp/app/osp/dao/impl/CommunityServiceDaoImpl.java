package com.digitalchina.ldp.app.osp.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.osp.bean.CommunityJournalBean;
import com.digitalchina.ldp.app.osp.bean.CommunityReplyBean;
import com.digitalchina.ldp.app.osp.bean.CommunityModuleBean;
import com.digitalchina.ldp.app.osp.bean.CommunitySectionBean;
import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.app.osp.dao.CommunityServiceDao;
import com.digitalchina.ldp.app.osp.defination.USER_COLUMN_DEF;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

@Component
public class CommunityServiceDaoImpl extends BaseDao implements CommunityServiceDao {

	@Override
	public PageList<CommunitySectionBean> getAllSection(int start, int size) {
		return this.createBeanQuery(CommunitySectionBean.class).page(start, size);
	}

	@Override
	public List<CommunityModuleBean> getModuleListBySectionId(String sectionId) {
		return this.createBeanQuery(CommunityModuleBean.class).eq("mSectionId", sectionId).list();
	}

	@Override
	public int getJournalCount(String moduleId) {
		return this.createBeanQuery(CommunityJournalBean.class).eq("jModuleId", moduleId).count();
	}

	@Override
	public CommunityModuleBean getModuleById(String moduleId) {
		return this.createBeanQuery(CommunityModuleBean.class).eq("moduleId", moduleId).uniqueResult();
	}

	@Override
	public CommunityReplyBean getReplyById(String replyId) {
		return this.createBeanQuery(CommunityReplyBean.class).eq("replyId",replyId).uniqueResult();
	}

	@Override
	public PageList<CommunityReplyBean> getReplyListById(int start,int size,String journalId) {
		return this.createBeanQuery(CommunityReplyBean.class).eq("journalId", journalId).page(start, size);
	}

	@Override
	public int getReplyCountById(String journalId) {
		return this.createBeanQuery(CommunityReplyBean.class).eq("journalId", journalId).count();
	}

	@Override
	public CommunityJournalBean getJournalById(String journalId) {
		return this.createBeanQuery(CommunityJournalBean.class).eq("journalId", journalId).uniqueResult();
	}

	@Override
	public PageList<CommunityJournalBean> getJournalList(int start,int size,String moduleId) {
		return this.createBeanQuery(CommunityJournalBean.class).eq("jModuleId", moduleId).sortForDesc("createTime").page(start, size);
	}

	@Override
	public DynamicBean getLastTimeByModuleId(String moduleId) {
		 StringBuilder sb = new StringBuilder();
		 sb.append("select max(create_time) as last_time ");
		 sb.append("from Community_JOURNAL");
		 
		 return this.createDynamicSqlQuery(sb.toString()).uniqueResult();
	}

	@Override
	public void addJournal(CommunityJournalBean journal) {
		this.createExecuteQuery().insert(journal,false);
	}

	@Override
	public void addReply(CommunityReplyBean reply) {
		this.createExecuteQuery().insert(reply,false);
	}

	@Override
	public CommunitySectionBean getSectionById(String sectionId) {
		return this.createBeanQuery(CommunitySectionBean.class).eq("sectionId", sectionId).uniqueResult();
	}

	@Override
	public UserBean getUserById(String userId) {
		return this.createBeanQuery(UserBean.class).eq(USER_COLUMN_DEF.COLUMN_USER_ID, userId).uniqueResult();
	}
	
	public List<CommunityReplyBean> getReplyList(String journalId){
		return this.createBeanQuery(CommunityReplyBean.class).eq("journalId", journalId).sortForDesc("createTime").list();
	}

	@Override
	public PageList<DynamicBean> getCommunityRank(int start, int size) {
		String sql="select count(*) as count ,(select user_name from osp_user_info o where o.user_id=c.poster)  as userName from community_journal  c group by c.poster order by count desc";
		return this.createDynamicSqlQuery(sql).page(start, size);
	}

	@Override
	public List<CommunityModuleBean> getAllModule() {
		return this.createBeanQuery(CommunityModuleBean.class).list();
	}

	@Override
	public List<CommunityJournalBean> getAllJournalById(String moduleId) {
		return this.createBeanQuery(CommunityJournalBean.class).eq("jModuleId", moduleId).list();
	}

}
