package com.jeecms.irc.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeecms.common.web.RequestUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.irc.common.IRCUtils;
import com.jeecms.rdp.common.RdpUtils;

/**
 * IRC资源树读取
 * 
 * @author zhyg
 * 
 */
@Controller
public class GetIRCTreeByClassAct {
	private static final Logger log = LoggerFactory
			.getLogger(GetIRCTreeByClassAct.class);

	public static final String COOKIE_ERROR_REMAINING = "_error_remaining";
	public static final String LOGIN_INPUT = "tpl.loginInput";
	public static final String LOGIN_STATUS = "tpl.loginStatus";
	public static final String SERVID_ARR = "servIdArray";

	@RequestMapping(value = "/irc/getIRCTree.jspx", method = RequestMethod.POST)
	public String submit(String returnUrl, HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		//错误编码：irc001:从IRC平台加载树形菜单失败; irc002:根节点ID未找到。
		String node = RequestUtils.getQueryParam(request, "node");
		if(!StringUtils.isBlank(node)){
			String getTreeURL = "/app/api/service/irc/ircIrcDataDealHandler/jsonTree?node="	+ node ;
			try {
				ResponseUtils.renderJson(response, RdpUtils.readRdpInterface(request, getTreeURL, "json")) ;
			} catch (Exception e) {
				//从IRC平台加载树形菜单失败;
				ResponseUtils.renderJson(response, "{'success':false,'error':'irc001'}") ;
				e.printStackTrace();
			}
		}else{
			//节点ID未找到。
			ResponseUtils.renderJson(response, "{'success':false,'error':'irc002'}") ;
		}
		
		//TEST测试，删除
//		String test = "[{'text':'为公众服务','id':'7b3a77a9bec0e702eeec3b3ccee37c0b','leaf':false},{'text':'服务提交方式','id':'98b47339e12160a4c3e67bdcc0adc6c9','leaf':false},{ 'text':'服务提交的支撑','id':'dea6d8d83df55e1a792629d0a7fd1ecc','leaf':false},{ 'text':'政府资源管理','id':'5a115eb37a96d56b65402a1fba2153c9','leaf':false}]";
//		ResponseUtils.renderJson(response, test) ;
		
		return null;
	}
}
