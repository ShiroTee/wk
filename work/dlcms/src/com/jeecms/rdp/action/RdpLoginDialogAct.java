package com.jeecms.rdp.action;

import com.alibaba.fastjson.JSON;
import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.cms.web.FrontUtils;
import com.jeecms.common.security.BadCredentialsException;
import com.jeecms.common.security.UsernameNotFoundException;
import com.jeecms.common.web.CookieUtils;
import com.jeecms.common.web.RequestUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.common.web.session.SessionProvider;
import com.jeecms.core.entity.Authentication;
import com.jeecms.core.entity.Config.ConfigLogin;
import com.jeecms.core.manager.ConfigMng;
import com.jeecms.core.web.WebErrors;
import com.jeecms.filter.Des;
import com.jeecms.rdp.manager.RdpAuthenticationMng;
import com.jeecms.rdp.manager.RdpUnifiedUserMng;
import com.octo.captcha.service.CaptchaServiceException;
import com.octo.captcha.service.image.ImageCaptchaService;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import static com.jeecms.core.action.front.LoginAct.*;

@Controller
public class RdpLoginDialogAct
{
	private static final Logger log = LoggerFactory.getLogger(RdpLoginDialogAct.class);

	public static final String COOKIE_ERROR_REMAINING = "_error_remaining";
	public static final String LOGIN_INPUT = "tpl.loginInput";
	public static final String LOGIN_STATUS = "tpl.loginStatus";
	public static final String LOGIN_DIALOG = "tpl.headerregister";
	public static final String ENCODE_KEY = "_UserKey_";


	public static String objToString(Object obj) {
		if(obj!=null) {
			return obj.toString();
		}
		return "";
	}

	@RequestMapping(value = "/rdplogin_dialog.jspx", method = RequestMethod.POST)
	public void submit(String yhm, String scode, String captcha,String key,
			String processUrl, String returnUrl, String message,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap model) {
		String str= objToString(servletContext.getAttribute(key));
		servletContext.removeAttribute(key);
		String username = Des.strDec(yhm, str, str, str);
		String password = Des.strDec(scode, str, str, str);

		CmsUser user = CmsUtils.getUser(request);
		String responseJson = "";
		if (user != null)
		{
			responseJson = "{'success':false,'error':'请勿重复登陆'}";
			request.getSession().setAttribute("ftpLoginName",yhm);
			request.getSession().setAttribute("ftpLoginPW",scode);
			ResponseUtils.renderJson(response, responseJson);
			return ;
		}
		
		Integer errorRemaining = rdpUnifiedUserMng.errorRemaining(username);
		CmsSite site = CmsUtils.getSite(request);
		WebErrors errors = validateSubmit(username, password, captcha,errorRemaining, request, response);
		if (!errors.hasErrors())
		{
			try
			{
				String ip = RequestUtils.getIpAddr(request);
				
				Authentication auth = rdpAuthMng.login(username, password, ip,request, response, session);
				
				removeCookieErrorRemaining(request, response);

				// 返回登陆信息
				String backusername = auth.getUsername();
				request.getSession().setAttribute("ftpLoginName",username);
				request.getSession().setAttribute("ftpLoginPW",password);
				String rdpPhoneNumber = objToString(auth.getRdpPhoneNumber());
				String rdpUserOrg = auth.getRdpUserOrg();
				responseJson = "{'success':true,'username':'" + backusername
				        + "','rdploginName':'" + auth.getRdploginName()
						+ "','rdpPhoneNumber':'" + rdpPhoneNumber
						+ "','rdpRole':'" + auth.getRdpRole()
					    + "','rdpUserOrgId':'" + auth.getRdpUserOrgId()
						+ "','rdpUserOrg':'" + rdpUserOrg + "'}";
				ResponseUtils.renderJson(response, responseJson);
				return ;
			} catch (UsernameNotFoundException e)
			{
				errors.addErrorString(e.getMessage());
				responseJson = "{'success':false,'error':'" + e.getMessage()
				+ "'}";
			} catch (BadCredentialsException e)
			{
				errors.addErrorString(e.getMessage());
				responseJson = "{'success':false,'error':'" + e.getMessage()
						+ "'}";
			}
		}
		else
		{
			errors.addErrorString(errors.getErrors().get(0));
			responseJson = "{'success':false,'error':'" + errors.getErrors().get(0)
					+ "'}";
		}

		// 登录失败
		writeCookieErrorRemaining(errorRemaining, request, response, model);
		errors.toModel(model);
		FrontUtils.frontData(request, model, site);
		if (!StringUtils.isBlank(processUrl))
		{
			model.addAttribute(PROCESS_URL, processUrl);
		}
		if (!StringUtils.isBlank(returnUrl))
		{
			model.addAttribute(RETURN_URL, returnUrl);
		}
		if (!StringUtils.isBlank(message))
		{
			model.addAttribute(MESSAGE, message);
		}
		if (StringUtils.isBlank(responseJson))
		{
			responseJson = "{'success':false,'error':'验证码错误'}";
		}
		ResponseUtils.renderJson(response, responseJson);
		return;
	}

	private WebErrors validateSubmit(String username, String password,
			String captcha, Integer errorRemaining, HttpServletRequest request,
			HttpServletResponse response)
	{
		WebErrors errors = WebErrors.create(request);
		if (errors.ifOutOfLength(username, "用户名", 1, 100))
		{
			return errors;
		}
		if (errors.ifOutOfLength(password, "密码", 1, 32))
		{
			return errors;
		}
		// 如果输入了验证码，那么必须验证；如果没有输入验证码，则根据当前用户判断是否需要验证码。
		if (!StringUtils.isBlank(captcha)
				|| (errorRemaining != null && errorRemaining < 0))
		{
			if (errors.ifBlank(captcha, "captcha", 100))
			{
				return errors;
			}
			try
			{
				if (!imageCaptchaService.validateResponseForID(session
						.getSessionId(request, response), captcha))
				{
					errors.addErrorCode("error.invalidCaptcha");
					return errors;
				}
			} catch (CaptchaServiceException e)
			{
				errors.addErrorCode("error.exceptionCaptcha");
				log.warn("", e);
				return errors;
			}
		}
		return errors;
	}

	private void writeCookieErrorRemaining(Integer userErrorRemaining,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap model)
	{
		// 所有访问的页面都需要写一个cookie，这样可以判断已经登录了几次。
		Integer errorRemaining = getCookieErrorRemaining(request, response);
		ConfigLogin configLogin = configMng.getConfigLogin();
		Integer errorInterval = configLogin.getErrorInterval();
		if (userErrorRemaining != null
				&& (errorRemaining == null || userErrorRemaining < errorRemaining))
		{
			errorRemaining = userErrorRemaining;
		}
		int maxErrorTimes = configLogin.getErrorTimes();
		if (errorRemaining == null || errorRemaining > maxErrorTimes)
		{
			errorRemaining = maxErrorTimes;
		} else if (errorRemaining <= 0)
		{
			errorRemaining = 0;
		} else
		{
			errorRemaining--;
		}
		model.addAttribute("errorRemaining", errorRemaining);
		CookieUtils.addCookie(request, response, COOKIE_ERROR_REMAINING,
				errorRemaining.toString(), errorInterval * 60, null);
	}


	/*
  * 获取加密密钥
  */
	@RequestMapping(value = "/getUserKey.jspx", method = {
			RequestMethod.GET, RequestMethod.POST })
	public void getUserKey(HttpServletRequest request,
							  HttpServletResponse response){
		response.setCharacterEncoding("UTF-8");

		String sessionId = request.getSession().getId()
                .replace("!","").replace("_","")
                .replace("-","").substring(0, 16);
		String str = sessionId.substring(0, 8) + String.valueOf(System.currentTimeMillis()).substring(0, 8);
		servletContext.setAttribute(sessionId, str);
		//增加sessionid
		str=str+"_@@_"+sessionId;

		String s= JSON.toJSONString(str);
		try {
			response.getWriter().write(s);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ;
	}

	private Integer getCookieErrorRemaining(HttpServletRequest request,
			HttpServletResponse response)
	{
		Cookie cookie = CookieUtils.getCookie(request, COOKIE_ERROR_REMAINING);
		if (cookie != null)
		{
			String value = cookie.getValue();
			if (NumberUtils.isDigits(value))
			{
				return Integer.parseInt(value);
			}
		}
		return null;
	}

	private void removeCookieErrorRemaining(HttpServletRequest request,
			HttpServletResponse response)
	{
		CookieUtils.cancleCookie(request, response, COOKIE_ERROR_REMAINING,
				null);
	}

	@Autowired
	private ConfigMng configMng;
	@Autowired
	private RdpAuthenticationMng rdpAuthMng;
	@Autowired
	private RdpUnifiedUserMng rdpUnifiedUserMng;
	@Autowired
	private ImageCaptchaService imageCaptchaService;
	@Autowired
	private SessionProvider session;
	@Autowired
	private ServletContext servletContext;
}
