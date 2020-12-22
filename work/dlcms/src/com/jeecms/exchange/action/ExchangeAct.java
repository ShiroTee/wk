package com.jeecms.exchange.action;

import static com.jeecms.cms.Constants.TPLDIR_CHANNEL;
import static com.jeecms.cms.Constants.TPLDIR_INDEX;
import static com.jeecms.cms.Constants.TPL_SUFFIX;
import static com.jeecms.core.action.front.LoginAct.MESSAGE;
import static com.jeecms.core.action.front.LoginAct.PROCESS_URL;
import static com.jeecms.core.action.front.LoginAct.RETURN_URL;
import static com.jeecms.core.manager.AuthenticationMng.AUTH_KEY;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.cms.web.FrontUtils;
import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.web.RequestUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.exchange.bean.SubTopicBean;
import com.jeecms.exchange.bean.TopicBean;
import com.jeecms.exchange.comm.Pager;
import com.jeecms.exchange.service.impl.ExchangeServiceImpl;


/**
 * 互动交流
 * @author MagicChu
 *
 */
@Controller
public class ExchangeAct {
	
	@Autowired
	private ExchangeServiceImpl exchangeServiceImpl;

	private static final Logger log = LoggerFactory.getLogger(ExchangeAct.class);
	
	public static final String STATUS = "tpl.loginStatus";
	public static final String INPUT_ = "tpl.alertlogininput";
	
	
	/**
	 * 首页帖子列表
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/zxts/index", method = {RequestMethod.GET,RequestMethod.POST})
	public String exchangeIndex(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		
		//选择页数
		String pageNo=request.getParameter("pno");
		if(pageNo==null||"".equals(pageNo))pageNo = "1";
		//每页显示条数
		String pageSize=PropertiesUtil.getValueBykey("pageSize");
		
		
		//CmsUser user = CmsUtils.getUser(request);
		
		UnifiedUser uuser =(UnifiedUser)request.getSession().getAttribute("rdp_user");
		//设置用户id
		if (uuser != null)
		{
			//return "redirect:index.jhtml";
			model.addAttribute("thisUser",uuser.getUsername());
		}
		//没登陆设置空字符串进去，防止标签报错
		else
		{
			model.addAttribute("thisUser","");
			//return FrontUtils.getTplPath(site.getSolutionPath(),TPLDIR_CHANNEL, "互动交流_登陆验证"); 
		}
		
		model.addAttribute("user",uuser);
		
		Pager pager = exchangeServiceImpl.topicIndex(pageNo,pageSize);
		model.addAttribute("topicsPager",pager);
		
		FrontUtils.frontData(request, model, site);
		
		return FrontUtils.getTplPath(site.getSolutionPath(),TPLDIR_CHANNEL, "目录栏目_互动交流");
		//return "/WEB-INF/t/cms/www/red/channel/目录栏目_互动交流.html";
		//return request + "/" + sol + "/"+ MessageResolver.getMessage(request, name) + TPL_SUFFIX;
		//return "channel/upload";
	}
	
	
	/**
	 * 某个帖子内容
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/topic{topicid}", method = {RequestMethod.GET,RequestMethod.POST})
	public String topic(HttpServletRequest request,
			HttpServletResponse response, ModelMap model,@PathVariable("topicid") String topicid)
	{
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		
		
		//选择页数
		String pageNo=request.getParameter("pno");
		if(pageNo==null||"".equals(pageNo))pageNo = "1";
		//每页显示条数
		String pageSize=PropertiesUtil.getValueBykey("pageSize");
		
		
		//帖子id，用户id从seesion中取
		String userId="";
		//String topicId=request.getParameter("topicId");
		String topicId=topicid;
		
		//CmsUser user = CmsUtils.getUser(request);
		
		UnifiedUser uuser =(UnifiedUser)request.getSession().getAttribute("rdp_user");
		//设置用户id
		if (uuser != null)
		{
			//return "redirect:index.jhtml";
			model.addAttribute("thisUser",uuser.getUsername());
			userId = uuser.getUsername();
		}
		//没登陆设置空字符串进去，防止标签报错
		else
		{
			model.addAttribute("thisUser","");
			//return FrontUtils.getTplPath(site.getSolutionPath(),TPLDIR_CHANNEL, "互动交流_登陆验证"); 
		}
		
		//加入用户判断是否登录
		model.addAttribute("user",uuser);
		
		Pager pager = exchangeServiceImpl.topic(userId, topicId,pageNo,pageSize);
		model.addAttribute("topics",pager);
		model.addAttribute("topicId",topicId);
		
		FrontUtils.frontData(request, model, site);
		//return FrontUtils.getTplPath(site.getSolutionPath(),TPLDIR_CHANNEL, "目录栏目_互动交流");
		
		//如果是楼主删除主题帖，则返回到帖子列表页面
		if(pager.getListBeans().size()==0)
		{
			exchangeIndex(request, response, model);
			return FrontUtils.getTplPath(site.getSolutionPath(),TPLDIR_CHANNEL, "目录栏目_互动交流");
		}
			
		//返回帖子内容页面
		return "/ap/exchage/topic.html";
		//return request + "/" + sol + "/"+ MessageResolver.getMessage(request, name) + TPL_SUFFIX;
		//return "channel/upload";
	}
	
	
	/**
	 * 提交楼中楼回复
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/submitReply", method = {RequestMethod.GET,RequestMethod.POST})
	public String submitReply(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		//CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		UnifiedUser uuser =(UnifiedUser)request.getSession().getAttribute("rdp_user");
		if(uuser==null)
		{
			//发帖失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		else
		{
			//内容，回复人，被回复人，当前楼层id
			String tmsg=request.getParameter("tmsg");
			String fromUser=request.getParameter("fromUser");
			String toUser=request.getParameter("toUser");
			String thisFloorTid=request.getParameter("thisFloorTid");
			
			try {
				exchangeServiceImpl.submitReply(tmsg, fromUser, toUser, thisFloorTid);
				ResponseUtils.renderJson(response, "{'success':true}") ;
			} catch (DataAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//回复楼中楼失败
				ResponseUtils.renderJson(response, "{'success':false}") ;
			}
		}
		return null;
	}
	
	/**
	 * 回帖
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/submitTopic", method = {RequestMethod.GET,RequestMethod.POST})
	public String submitTopic(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		//CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		UnifiedUser uuser =(UnifiedUser)request.getSession().getAttribute("rdp_user");
		if(uuser==null)
		{
			//发帖失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		else
		{
			//内容，回帖人，主题帖id
			String tmsg=request.getParameter("tmsg");
			String fromUser=request.getParameter("fromUser");
			String thisFloorTid=request.getParameter("thisFloorTid");
			
			try {
				exchangeServiceImpl.submitTopic(tmsg, fromUser, thisFloorTid);
				ResponseUtils.renderJson(response, "{'success':true}") ;
			} catch (DataAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//回帖失败
				ResponseUtils.renderJson(response, "{'success':false}") ;
			}
		}
		return null;
	}
	
	
	/**
	 * 发表新帖
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/addTopic", method = {RequestMethod.GET,RequestMethod.POST})
	public String addTopic(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		//CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		UnifiedUser uuser =(UnifiedUser)request.getSession().getAttribute("rdp_user");
		if(uuser==null)
		{
			//发帖失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		else
		{
			//标题，内容，主题帖发帖人
			String tmsg=request.getParameter("tmsg");
			String fromUser=request.getParameter("fromUser");
			String tname=request.getParameter("tname");
			
			try {
				exchangeServiceImpl.addTopic(tmsg, fromUser, tname);
				ResponseUtils.renderJson(response, "{'success':true}") ;
			} catch (DataAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//发帖失败
				ResponseUtils.renderJson(response, "{'success':false}") ;
			}
		}
		return null;
	}
	
	
	/**
	 * 删帖，删回复，删跟帖
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/deleteTopic", method = {RequestMethod.GET,RequestMethod.POST})
	public String deleteTopic(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		//CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		
		UnifiedUser uuser =(UnifiedUser)request.getSession().getAttribute("rdp_user");
		if(uuser==null)
		{
			//发帖失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		else
		{
			//帖子id
			String topicId=request.getParameter("topicId");
			
			try {
				int updateCount = exchangeServiceImpl.deleteTopic(topicId);
				if(updateCount==1)ResponseUtils.renderJson(response, "{'success':true}") ;
				else ResponseUtils.renderJson(response, "{'success':false}") ;
			} catch (DataAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//删帖失败
				ResponseUtils.renderJson(response, "{'success':false}") ;
			}
		}
		return null;
	}
}
