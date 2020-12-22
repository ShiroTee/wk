package com.jeecms.rdp.action;

import ideabank.sap.IAccount;
import ideabank.sap.UserBean;
import static com.jeecms.cms.Constants.TPLDIR_MEMBER;
import static com.jeecms.core.action.front.LoginAct.MESSAGE;
import static com.jeecms.core.action.front.LoginAct.PROCESS_URL;
import static com.jeecms.core.action.front.LoginAct.RETURN_URL;
import static com.jeecms.core.manager.AuthenticationMng.AUTH_KEY;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import com.jeecms.cms.Constants;
import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.manager.main.CmsUserMng;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.cms.web.FrontUtils;
import com.jeecms.common.security.BadCredentialsException;
import com.jeecms.common.security.UsernameNotFoundException;
import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.web.CookieUtils;
import com.jeecms.common.web.RequestUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.common.web.session.SessionProvider;
import com.jeecms.core.entity.Authentication;
import com.jeecms.core.entity.Config.ConfigLogin;
import com.jeecms.core.manager.ConfigMng;
import com.jeecms.core.web.WebErrors;
import com.jeecms.rdp.manager.RdpAuthenticationMng;
import com.jeecms.rdp.manager.RdpUnifiedUserMng;
import com.octo.captcha.service.CaptchaServiceException;
import com.octo.captcha.service.image.ImageCaptchaService;

@Controller
public class RdpLoginAct
{
	private static final Logger log = LoggerFactory
			.getLogger(RdpLoginAct.class);

	public static final String COOKIE_ERROR_REMAINING = "_error_remaining";
	public static final String LOGIN_INPUT = "tpl.loginInput";
	public static final String LOGIN_STATUS = "tpl.loginStatus";
	public static final String LOGIN_INPUT_ = "tpl.alertlogininput";

	
	/*
	 * 
	 * 跳转到统一登陆页面或者浮框登陆窗口，等待ideabank的CA登陆，登陆使用另外一个方法
	 */
	@RequestMapping(value = "/rdplogin.jspx")
	public String submit(String yhm, String scode, String captcha, String processUrl, String returnUrl,
			String message, HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String username = yhm;
		String password = scode;
		// 这个是处理浮框登陆窗口的特殊判断
		if ("alert".equals(request.getParameter("alertType"))) {
			ResponseUtils.renderJson(response, "{'success':true,'msg':'" + request.getAttribute("original") + "'}");
			return null;
		}

		Integer errorRemaining = rdpUnifiedUserMng.errorRemaining(username);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();

		WebErrors errors = WebErrors.create(request);

		writeCookieErrorRemaining(errorRemaining, request, response, model);
		errors.addErrorString("");
		errors.toModel(model);
		FrontUtils.frontData(request, model, site);
		if (!StringUtils.isBlank(processUrl)) {
			model.addAttribute(PROCESS_URL, processUrl);
		}
		if (!StringUtils.isBlank(returnUrl)) {
			model.addAttribute(RETURN_URL, returnUrl);
		}
		if (!StringUtils.isBlank(message)) {
			model.addAttribute(MESSAGE, message);
		}

		initCa(response, request, model);

		return FrontUtils.getTplPath(request, sol, TPLDIR_MEMBER, LOGIN_INPUT);
	}
	
	/*
	 * ideabank的CA登陆方法
	 */
	@RequestMapping(value = "/rdplogin2.jspx")
	public String submit2(String yhm, String scode, String captcha, String processUrl, String returnUrl,
			String message, HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String username = yhm;
		String password = scode;
		
		returnUrl = "/";
		
		String loginType = request.getParameter("loginType");
		// CA刷新过来没有值，默认设置为0
		if (loginType == null)
			loginType = "0";
		
		Integer errorRemaining = rdpUnifiedUserMng.errorRemaining(username);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		WebErrors errors = WebErrors.create(request);

		// CA认证登录
		if ("0".equals(loginType)) {
			try {
				//boolean flag = false;
				
				IAccount cc = new IAccount(request,response);
				System.out.println("初始化IAccount");
				cc.SetManager(PropertiesUtil.getValueBykey("AAAAServer"), PropertiesUtil.getValueBykey("AAAAServer"), PropertiesUtil.getValueBykey("applyId"), PropertiesUtil.getValueBykey("applyKey"), PropertiesUtil.getValueBykey("appPath"));
				//cc.SetManager("218.4.58.75","218.4.58.75","xxzx01","780272179111425770342092","/");
	            cc.SetExecUrl( PropertiesUtil.getValueBykey("phpPath"));
				
				if(cc.CheckCertLogin()){
					UserBean bean = cc.getUserBean();

					String usernameTemp = bean.getUserID();
					String usernameT[]=usernameTemp.split("\\|");
					System.out.println("CA用户名：" + usernameT[0]);
					//username = "测试2";
					String ip = RequestUtils.getIpAddr(request);
					Authentication auth = rdpAuthMng.login(usernameT[0], ip, request, response, session, loginType);
					removeCookieErrorRemaining(request, response);
					String view = getView(processUrl, returnUrl, auth.getId());
					if (view != null) {
						return view;
					} else {
						FrontUtils.frontData(request, model, site);
						return "redirect:rdplogin.jspx";
					}

				} else {
					errors.addErrorString("CA认证失败！请检查UKEY是否正确插入且是否处于正常服务状态？");
					model.addAttribute("caFlag","caFlag");
				}

			} catch (Exception e) {
				e.printStackTrace();
				errors.addErrorString("CA认证失败！请检查UKEY是否正确插入且是否处于正常服务状态？");
				model.addAttribute("caFlag","caFlag");
			}

		}
		// 普通登录
		else if ("1".equals(loginType)) {
			errors = validateSubmit(username, password, captcha, errorRemaining, request, response);

			if (!errors.hasErrors()) {
				String ip = RequestUtils.getIpAddr(request);
				Authentication auth = null;
				try {
					auth = rdpAuthMng.login(username, password, ip, request, response, session);
				} catch (UsernameNotFoundException e) {
					errors.addError(e.getMessage());
					e.printStackTrace();
				} catch (BadCredentialsException e) {
					errors.addError(e.getMessage());
				}
				removeCookieErrorRemaining(request, response);
				if (auth != null) {
					String view = getView(processUrl, returnUrl, auth.getId());
					if (view != null) {
						return view;
					} else {
						FrontUtils.frontData(request, model, site);
						return "redirect:rdplogin.jspx";
					}
				}
			}
		}

		writeCookieErrorRemaining(errorRemaining, request, response, model);
		errors.toModel(model);
		FrontUtils.frontData(request, model, site);
		if (!StringUtils.isBlank(processUrl)) {
			model.addAttribute(PROCESS_URL, processUrl);
		}
		if (!StringUtils.isBlank(returnUrl)) {
			model.addAttribute(RETURN_URL, returnUrl);
		}
		if (!StringUtils.isBlank(message)) {
			model.addAttribute(MESSAGE, message);
		}

		initCa(response, request, model);

		//return FrontUtils.getTplPath(request, sol, TPLDIR_MEMBER, LOGIN_INPUT);
		return FrontUtils.getTplPath(site.getSolutionPath(),Constants.TPLDIR_INDEX, "首页");
	}

	@RequestMapping(value = "/logout.jspx")
	public String logout(HttpServletRequest request,
			HttpServletResponse response)
	{
		String authId = (String) session.getAttribute(request, AUTH_KEY);
		if (authId != null)
		{
			rdpAuthMng.deleteById(authId);
			session.logout(request, response);
		}
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		String view = getView(processUrl, returnUrl, authId);
		if (view != null)
		{
			return view;
		} else
		{
			return "redirect:rdplogin.jspx";
		}
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
		} else
		{
			errors.addErrorCode("error.nullCaptcha");
			return errors;
		}
		return errors;
	}

	/**
	 * 获得地址
	 * 
	 * @param processUrl
	 * @param returnUrl
	 * @param authId
	 * @param defaultUrl
	 * @return
	 */
	private String getView(String processUrl, String returnUrl, String authId)
	{
		if (!StringUtils.isBlank(processUrl))
		{
			StringBuilder sb = new StringBuilder("redirect:");
			sb.append(processUrl).append("?").append(AUTH_KEY).append("=")
					.append(authId);
			if (!StringUtils.isBlank(returnUrl))
			{
				sb.append("&").append(RETURN_URL).append("=").append(returnUrl);
			}
			return sb.toString();
		} else if (!StringUtils.isBlank(returnUrl))
		{
			StringBuilder sb = new StringBuilder("redirect:");
			sb.append(returnUrl);
			return sb.toString();
		} else
		{
			return null;
		}
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
	private CmsUserMng cmsUserMng;
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

	private void initCa(HttpServletResponse response,
			HttpServletRequest request, ModelMap model)
	{
		// 设置页面不缓存
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		try
		{

			this.setProperties("appId", request.getSession());
			this.setProperties("authURL", request.getSession());

		} catch (Exception e)
		{

			System.out.println("从配置文件中获得应用标识，网关地址，认证方式发生异常");
		}

		String randNum = generateRandomNum();
		if (randNum == null || randNum.trim().equals(""))
		{
			System.out.println("证书认证数据不完整！");
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}

		/**************************
		 * 第三步 服务端返回认证原文 *
		 **************************/
		// 设置认证原文到session，用于程序向后传递，通讯报文中使用
		request.getSession().setAttribute("original_data", randNum);

		// 设置认证原文到页面，给页面程序提供参数，用于产生认证请求数据包
		request.setAttribute("original", randNum);
		model.addAttribute("original", randNum);
	}

	private String setProperties(String key, HttpSession httpSession)
			throws Exception
	{

		String parentPath = httpSession.getServletContext().getRealPath(
				"/WEB-INF/config/message.properties");

		InputStream in = new FileInputStream(parentPath);
		Properties props = new Properties();
		props.load(in);
		httpSession.setAttribute(key, props.get(key) == null ? null
				: (String) props.get(key));
		return props.get(key) == null ? null : (String) props.get(key);
	}

	private String generateRandomNum()
	{
		/**************************
		 * 第二步 服务端产生认证原文 *
		 **************************/
		String num = "1234567890abcdefghijklmnopqrstopqrstuvwxyz";
		int size = 6;
		char[] charArray = num.toCharArray();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < size; i++)
		{
			sb
					.append(charArray[((int) (Math.random() * 10000) % charArray.length)]);
		}
		return sb.toString();
	}
}
