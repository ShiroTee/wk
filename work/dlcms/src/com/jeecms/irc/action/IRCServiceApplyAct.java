package com.jeecms.irc.action;

import static com.jeecms.cms.Constants.TPLDIR_MEMBER;
import static com.jeecms.core.action.front.LoginAct.MESSAGE;
import static com.jeecms.core.action.front.LoginAct.RETURN_URL;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.manager.main.CmsUserMng;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.cms.web.FrontUtils;
import com.jeecms.common.web.RequestUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.common.web.session.SessionProvider;
import com.jeecms.core.manager.ConfigMng;
import com.jeecms.irc.common.IRCUtils;
import com.jeecms.rdp.common.RdpUtils;
import com.jeecms.rdp.manager.RdpAuthenticationMng;
import com.jeecms.rdp.manager.RdpUnifiedUserMng;
import com.octo.captcha.service.image.ImageCaptchaService;

/**
 * 服务申请
 * 
 * @author zhyg
 * 
 */
@Controller
public class IRCServiceApplyAct {
	private static final Logger log = LoggerFactory
			.getLogger(IRCServiceApplyAct.class);

	public static final String COOKIE_ERROR_REMAINING = "_error_remaining";
	public static final String LOGIN_INPUT = "tpl.loginInput";
	public static final String LOGIN_STATUS = "tpl.loginStatus";
	public static final String SERVID_ARR = "servIdArray";
	public static final String SERVNAME_ARR = "servNameArray";
	public static final String APPLY_ORG = "applyOrg";
	public static final String PHONE_NUMBER = "phoneNumber";
	public static final String APPLY_USE = "applyUse";

	@RequestMapping(value = "/IRCServiceApply.jspx", method = RequestMethod.POST)
	public String submit(String returnUrl, HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		// 设置站点信息
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		FrontUtils.frontData(request, model, site);

		JSONObject responseData = new JSONObject();
		// 获取用户登陆信息--zhyg
		CmsUser user = CmsUtils.getUser(request);
		// successo为false并且status：0-用户未登陆，1-提交申请失败，2-RDP平台注册申请失败,3-登陆用户不是RDP平台用户，不能申请服务
		// 用户未登陆
		try {
			if (user == null) {
				// responseData.put("success", false);
				// responseData.put("status", 0);
				model.addAttribute(MESSAGE, "true");// 提示用户需要登陆才能进行操作
				model.addAttribute(RETURN_URL, returnUrl);
				return FrontUtils.getTplPath(request, sol, TPLDIR_MEMBER, LOGIN_INPUT);
			} else {
				String userId = user.getRdpUserId();
				String userName = user.getUsername();
				// 判断登陆用户是否是RDP平台用户
				JSONObject isRdpUserJSON = new JSONObject() ;
				if(!StringUtils.isBlank(userId)){
					// 判断登陆用户是否是RDP平台用户
					String isRdpUserURL = "/app/api/service/interfaceImplHandler/isExistUser?UserId="
							+ userId;
					isRdpUserJSON = new JSONObject(
							RdpUtils.readRdpInterface(request, isRdpUserURL, "json"));
				}

				if (StringUtils.isBlank(userId) || isRdpUserJSON.getInt("data")==0) {
					responseData.put("success", false);
					responseData.put("status", 3);
					ResponseUtils.renderJson(response, responseData.toString());
					return null;
				}

				// 是RDP平台用户，继续提交服务申请
				String servIdArray = RequestUtils.getQueryParam(request,SERVID_ARR);
				String servNameArray = RequestUtils.getQueryParam(request,SERVNAME_ARR);
				String applyOrg = RequestUtils.getQueryParam(request,APPLY_ORG);
				String phoneNumber = RequestUtils.getQueryParam(request,PHONE_NUMBER);
				String applyUse = RequestUtils.getQueryParam(request,APPLY_USE);
				String submitApplyURL = "/app/api/service/smsJbpmOperateHandler/applyResource";
				Map<String, String> paraMap = new HashMap<String, String>();
				paraMap.put("userId", userId);
				paraMap.put("resid", servIdArray);
				paraMap.put("RESOURCENAME", servNameArray);
				paraMap.put("phoneNumber", phoneNumber);
				paraMap.put("applyUse", applyUse);
				responseData = new JSONObject(RdpUtils.readRdpInterfacePost(request, submitApplyURL, "json", paraMap));
				//测试
				//responseData = new JSONObject("{'count':0,'list':[{'name':'数字办人口住房信息资源内容发布','reason':'此资源已提交过申请！'},{'name':'人口资源表发布','reason':'此资源已提交过申请！'}]}");
				//responseData = new JSONObject("{'count':2,'list':[]}");
			}
		} catch (IOException e) {
			responseData = applyFailed(responseData, 1);
			e.printStackTrace();
		} catch (JSONException e) {
			responseData = applyFailed(responseData, 2);
			e.printStackTrace();
		}
		ResponseUtils.renderJson(response, responseData.toString());
		return null;
	}

	// 申请失败时，添加失败原因状态
	public JSONObject applyFailed(JSONObject jo, Integer flag) {
		try {
			jo.put("success", false);
			jo.put("status", flag);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jo;
	}
}
