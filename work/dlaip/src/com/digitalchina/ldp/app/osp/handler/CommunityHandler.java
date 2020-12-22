package com.digitalchina.ldp.app.osp.handler;


import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.CommunityService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.app.osp.util.BSUitl;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.*;

/**
 * 社区Handler
 *
 */
@Component
public class CommunityHandler extends AbstractHandler {
	private static Logger logger = Logger.getLogger(CommunityHandler.class.getName());
	@Autowired
	private CommunityService  communityService;

	/**
	 * 查询所有的板块
	 */
	@HttpService
	public PageList<CommunitySectionBean> getAllSection(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = model.getInt("start");
		int size = model.getInt("limit");
		return communityService.getAllSection(start,size);
	}

	/**
	 * 根据板块id查询板块信息
	 */
	@HttpService
	public CommunitySectionBean getSectionById(Model model){
		AuthUtil.writeInfo(model, logger);
		String sectionId = model.getValue("sectionId");
		return communityService.getSectionById(sectionId);
	}

	/**
	 * 根据板块Id查询模块列表
	 */
	@HttpService
	public List<CommunityModuleBean> getModuleListBySectionId(Model model){
		AuthUtil.writeInfo(model, logger);
		String sectionId = model.getValue("sectionId");
		return communityService.getModuleListBySectionId(sectionId);
	}

	/**
	 * 根据板块id查询扩展模块列表
	 * @throws ParseException
	 */
	@HttpService
	public List<CommunityModuleExtBean> getExtModuleListBySectionId(Model model) throws ParseException{
		AuthUtil.writeInfo(model, logger);
		String sectionId = model.getValue("sectionId");
		return communityService.getExtModuleListBySectionId(sectionId);
	}

	/**
	 * 根据板块id查询扩展模块列表
	 * @throws ParseException
	 */
	@HttpService
	public List<CommunityModuleExtBean> getExtModuleList(Model model) throws ParseException{
		return communityService.getExtModuleList();
	}

	/**
	 * 根据模块id查询主贴数
	 */
	@HttpService
	public String getJournalCount(Model model){
		AuthUtil.writeInfo(model, logger);
		String moduleId = model.getValue("moduleId");
		int count = communityService.getJournalCount(moduleId);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("journalCount", count);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据模块id查询主贴最后发表时间
	 */
	@HttpService
	public String getLastTimeByModuleId(Model model){
		AuthUtil.writeInfo(model, logger);
		String moduleId = model.getValue("moduleId");
		String lastTime = communityService.getLastTimeByModuleId(moduleId);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("lastTime", lastTime);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据模块id查询模块详细信息
	 */
	@HttpService
	public CommunityModuleBean getModuleById(Model model){
		AuthUtil.writeInfo(model, logger);
		String moduleId = model.getValue("moduleId");
		return communityService.getModuleById(moduleId);

	}

	/**
	 * 根据模块id查询主贴列表
	 */
	@HttpService
	public PageList<CommunityJournalBean> getJournalList(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = model.getInt("start");
		int size = model.getInt("limit");
		String moduleId = model.getValue("moduleId");
		return communityService.getJournalList(start,size,moduleId);
	}

	/**
	 * 根据模块id查询扩展主贴列表
	 */
	@HttpService
	public PageList<CommunityJournalExtBean> getExtJournalList(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = model.getInt("start");
		int size = model.getInt("limit");
		String moduleId = model.getValue("moduleId");
		return communityService.getExtJournalList(start,size,moduleId);
	}

	/**
	 * 根据主贴id查询主贴及回帖列表
	 */
	@HttpService
	public CommunityJournalExtBean getExtReplyList(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = model.getInt("start");
		int size = model.getInt("limit");
		String journalId = model.getValue("journalId");
		return communityService.getExtReplyList(start,size,journalId);
	}

	/**
	 * 根据主贴id查询主贴详细信息
	 */
	@HttpService
	public CommunityJournalBean getJournalById(Model model){
		AuthUtil.writeInfo(model, logger);
		String journalId = model.getValue("journalId");
		return communityService.getJournalById(journalId);
	}

	/**
	 * 根据主贴id查询回帖数
	 */
	@HttpService
	public String getReplyCountById(Model model){
		AuthUtil.writeInfo(model, logger);
		String journalId = model.getValue("journalId");
		int count = communityService.getReplyCountById(journalId);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("replyCount", count);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据主贴Id查询回帖列表
	 */
	@HttpService
	public PageList<CommunityReplyBean> getReplyListById(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = model.getInt("start");
		int size = model.getInt("limit");
		String journalId = model.getValue("journalId");
		return communityService.getReplyListById(start,size,journalId);
	}

	/**
	 * 根据回帖id查询回帖详细信息
	 */
	@HttpService
	public CommunityReplyBean getReplyById(Model model){
		AuthUtil.writeInfo(model, logger);
		String replyId = model.getValue("replyId");
		return communityService.getReplyById(replyId);
	}

	//发帖
	@HttpService
	public String addJournal(Model model){
		AuthUtil.writeInfo(model, logger);
		String result = "{\"success\":false}";
		String userId = BSUitl.getSessionUserId(model);
		if(null != userId){
			String poster = userId;
			String journalId = UUID.randomUUID().toString();
			String journalName = model.getValue("journalName");
			String journalContent = model.getRequest().getParameter("journalContent");
			Date createTime = new Date();
			String jModuleId = model.getValue("jModuleId");
			result = "{\"success\":true,\"journalId\":\""+journalId+"\"}";
			communityService.addJournal(journalId,journalName,createTime,journalContent,poster,jModuleId);
		}
		return result;
	}

	//回帖
	@HttpService
	public String addReply(Model model){
		AuthUtil.writeInfo(model, logger);
		String result = "{\"success\":false}";
		String userId = BSUitl.getSessionUserId(model);
		if(null != userId){
			result = "{\"success\":true}";
			String replyId =  UUID.randomUUID().toString();
			String replyContent = model.getRequest().getParameter("replyContent");
			String journalId = model.getValue("journalId");
			String fReplyId = model.getValue("fReplyId");
			if(fReplyId == "") fReplyId=replyId;
			Date createTime = new Date();
			communityService.addReply(replyId,replyContent,userId,journalId,fReplyId,createTime);
		}
		return result;
	}

	//根据用户id查询用户
	@HttpService
	public UserBean getUserById(Model model){
		AuthUtil.writeInfo(model, logger);
		String userId = model.getValue("userId");
		return communityService.getUserById(userId);
	}

	//社区互动排行
	@HttpService
	public PageList<DynamicBean> getCommunityRank(Model model){
		AuthUtil.writeInfo(model, logger);
		 int start = model.getInt(BS_PARAM.BS_START_STR);
	     int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
		return communityService.getCommunityRank(start,size);
	}

}
