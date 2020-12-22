package com.digitalchina.ldp.app.osp.service.impl;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.osp.bean.CommunityJournalBean;
import com.digitalchina.ldp.app.osp.bean.CommunityJournalExtBean;
import com.digitalchina.ldp.app.osp.bean.CommunityModuleExtBean;
import com.digitalchina.ldp.app.osp.bean.CommunityReplyBean;
import com.digitalchina.ldp.app.osp.bean.CommunityModuleBean;
import com.digitalchina.ldp.app.osp.bean.CommunityReplyExtBean;
import com.digitalchina.ldp.app.osp.bean.CommunitySectionBean;
import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.app.osp.dao.CommunityServiceDao;
import com.digitalchina.ldp.app.osp.service.CommunityService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import com.digitalchina.ldp.service.BaseService;

@Service
public class CommunityServiceImpl extends BaseService implements CommunityService {

	@Autowired
	private CommunityServiceDao communityServiceDao;
	
	@Override
	public PageList<CommunitySectionBean> getAllSection(int start, int size) {
		return communityServiceDao.getAllSection(start, size);
	}

	@Override
	public List<CommunityModuleBean> getModuleListBySectionId(String sectionId) {
		return communityServiceDao.getModuleListBySectionId(sectionId);
	}

	@Override
	public int getJournalCount(String moduleId) {
		return communityServiceDao.getJournalCount(moduleId);
	}

	@Override
	public CommunityModuleBean getModuleById(String moduleId) {
		return communityServiceDao.getModuleById(moduleId);
	}

	@Override
	public CommunityReplyBean getReplyById(String replyId) {
		return communityServiceDao.getReplyById(replyId);
	}

	@Override
	public PageList<CommunityReplyBean> getReplyListById(int start,int size,String journalId) {
		return communityServiceDao.getReplyListById(start,size,journalId);
	}

	@Override
	public int getReplyCountById(String journalId) {
		return communityServiceDao.getReplyCountById(journalId);
	}

	@Override
	public CommunityJournalBean getJournalById(String journalId) {
		return communityServiceDao.getJournalById(journalId);
	}

	@Override
	public PageList<CommunityJournalBean> getJournalList(int start,int size,String moduleId) {
		return communityServiceDao.getJournalList(start,size,moduleId);
	}

	@Override
	public String getLastTimeByModuleId(String moduleId) {
		DynamicBean db = communityServiceDao.getLastTimeByModuleId(moduleId);
		//System.out.println(db.get("last_time"));
		//System.out.println(db.getValue(Date.class, "last_time"));
		String lastTime = db.get("last_time").toString();
		return lastTime;
	}

	@Override
	public void addJournal(String journalId, String journalName,
			Date createTime, String journalContent, String poster,String jModuleId) {
		CommunityJournalBean journal = new CommunityJournalBean();
		journal.setCreateTime(createTime);
		journal.setjModuleId(jModuleId);
		journal.setJournalContent(journalContent);
		journal.setJournalId(journalId);
		journal.setJournalName(journalName);
		journal.setPoster(poster);
		communityServiceDao.addJournal(journal);
	}

	@Override
	public void addReply(String replyId, String replyContent, String userId,
			String journalId, String fReplyId, Date createTime) {
		CommunityReplyBean reply = new CommunityReplyBean();
		reply.setCreateTime(createTime);
		reply.setfReplyId(fReplyId);
		reply.setJournalId(journalId);
		reply.setReplyContent(replyContent);
		reply.setReplyId(replyId);
		reply.setUserId(userId);
		communityServiceDao.addReply(reply);
	}

	@Override
	public List<CommunityModuleExtBean> getExtModuleListBySectionId(
			String sectionId) throws ParseException {
		List<CommunityModuleBean> list = getModuleListBySectionId(sectionId);
		List<CommunityModuleExtBean> extList = new ArrayList<CommunityModuleExtBean>();
		
		for(CommunityModuleBean module : list){
			CommunityModuleExtBean ext = new CommunityModuleExtBean();
			String moduleId = module.getModuleId();
			ext.setModuleId(moduleId);
			ext.setModuleName(module.getModuleName());
			ext.setmSectionId(module.getmSectionId());
			ext.setJournalCount(getJournalCount(moduleId));
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date lastDate = df.parse(getLastTimeByModuleId(moduleId));
			ext.setLastDate(lastDate);
			extList.add(ext);
		}
		return extList;
	}

	@Override
	public PageList<CommunityJournalExtBean> getExtJournalList(int start,
			int size, String moduleId) {
		PageList<CommunityJournalBean> list = getJournalList(start, size, moduleId);
		PageList<CommunityJournalExtBean> extList = new PageList<CommunityJournalExtBean>();
		List<CommunityJournalExtBean> l = new ArrayList<CommunityJournalExtBean>();
		
		for(CommunityJournalBean journal : list.getList()){
			CommunityJournalExtBean ext = new CommunityJournalExtBean();
			ext.setCreateTime(journal.getCreateTime());
			ext.setjModuleId(journal.getjModuleId());
			//ext.setJournalContent(journal.getJournalContent());
			ext.setJournalId(journal.getJournalId());
			ext.setJournalName(journal.getJournalName());
			ext.setPoster(journal.getPoster());
			ext.setPosterUser(getUserById(journal.getPoster()));
			ext.setReplyCount(getReplyCountById(journal.getJournalId()));
			ext.setLastReplyDate(getLastReplyDate(journal.getJournalId()));
			l.add(ext);
		}
		for(int i=0; i<l.size() ; i++){
			for(int j=i+1 ; j<l.size();j++){
				if(l.get(j).getLastReplyDate().after(l.get(i).getLastReplyDate())){
					CommunityJournalExtBean tmp = l.get(i);
					l.set(i, l.get(j));
					l.set(j, tmp);
				}
			}
		}
		extList.setList(l);
		extList.setCount(list.getCount());
		return extList;
	}

	@Override
	public CommunitySectionBean getSectionById(String sectionId) {
		return communityServiceDao.getSectionById(sectionId);
	}

	@Override
	public UserBean getUserById(String userId) {
		return communityServiceDao.getUserById(userId);
	}

	@Override
	public CommunityJournalExtBean getExtReplyList(int start,
			int size, String journalId) {
		CommunityJournalBean journal = getJournalById(journalId);
		PageList<CommunityReplyBean> replyList = getReplyListById(start, size, journalId);

		CommunityJournalExtBean ext = new CommunityJournalExtBean();
		ext.setCreateTime(journal.getCreateTime());
		ext.setjModuleId(journal.getjModuleId());
		ext.setJournalContent(journal.getJournalContent());
		ext.setJournalId(journalId);
		ext.setJournalName(journal.getJournalName());
		ext.setPosterUser(getUserById(journal.getPoster()));
		ext.setReplyCount(replyList.getCount());
		
		PageList<CommunityReplyExtBean> replyExtList = new PageList<CommunityReplyExtBean>();
		List<CommunityReplyExtBean> list = new ArrayList<CommunityReplyExtBean>();
		for(CommunityReplyBean reply : replyList.getList()){
			CommunityReplyExtBean r = new CommunityReplyExtBean();
			r.setCreateTime(reply.getCreateTime());
			r.setfReplyId(reply.getfReplyId());
			r.setJournalId(reply.getJournalId());
			r.setReplyContent(reply.getReplyContent());
			r.setReplyId(reply.getReplyId());
			r.setUserId(reply.getUserId());
			r.setReplyUser(getUserById(reply.getUserId()));
			list.add(r);
		}
		for(int i=0 ; i<list.size(); i++){
			for(int j=i+1 ; j<list.size(); j++){
				if(list.get(j).getCreateTime().before(list.get(i).getCreateTime())){
					CommunityReplyExtBean tmp = list.get(i);
					list.set(i, list.get(j));
					list.set(j, tmp);
				}
			}
		}
		replyExtList.setList(list);
		replyExtList.setCount(replyList.getCount());
		ext.setReplyList(replyExtList);
		return ext;
	}
	
	//根据主贴id获得最后回复时间
	public Date getLastReplyDate(String journalId){
		List<CommunityReplyBean> list = communityServiceDao.getReplyList(journalId);
		if(list == null || list.size() == 0){
			return getJournalById(journalId).getCreateTime();
		}
		return list.get(0).getCreateTime();
	}

	@Override
	public PageList<DynamicBean> getCommunityRank(int start,int size) {
		return communityServiceDao.getCommunityRank(start,size);
	}

	@Override
	public List<CommunityModuleExtBean> getExtModuleList() throws ParseException{
		List<CommunityModuleBean> list = communityServiceDao.getAllModule();
		List<CommunityModuleExtBean> extList = new ArrayList<CommunityModuleExtBean>();
		
		for(CommunityModuleBean module : list){
			CommunityModuleExtBean ext = new CommunityModuleExtBean();
			String moduleId = module.getModuleId();
			ext.setModuleId(moduleId);
			ext.setModuleName(module.getModuleName());
			ext.setJournalCount(getJournalCount(moduleId));
			ext.setmSectionId(module.getmSectionId());
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date lastDate = df.parse(getLastTimeByModuleId(moduleId));
			ext.setLastDate(lastDate);
			List<CommunityJournalBean> journalList = getAllJournalById(moduleId);
			int replyCount = 0;
			for(CommunityJournalBean journal : journalList){
				replyCount += getReplyCountById(journal.getJournalId());
			}
			ext.setReplyCount(replyCount);
			extList.add(ext);
		}
		return extList;
	}
	
	//根据模块id获取所有主贴集合
	public List<CommunityJournalBean> getAllJournalById(String moduleId){
		return communityServiceDao.getAllJournalById(moduleId);
	}
	
	
}
