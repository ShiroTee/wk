package com.jeecms.rdp.action;

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
public class ServiceApplyAct {
	private static final Logger log = LoggerFactory
			.getLogger(ServiceApplyAct.class);

	public static final String COOKIE_ERROR_REMAINING = "_error_remaining";
	public static final String LOGIN_INPUT = "tpl.loginInput";
	public static final String LOGIN_STATUS = "tpl.loginStatus";
	public static final String SERVID_ARR = "servIdArray";
	public static final String APPLY_ORG = "applyOrg";
	public static final String APPLY_USE = "applyUse";
	public static final String PHONE_NUMBER = "phoneNumber";

	@RequestMapping(value = "/serviceApply.jspx", method = RequestMethod.POST)
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
				return FrontUtils.getTplPath(request, sol, TPLDIR_MEMBER,
						LOGIN_INPUT);
			} else {
				String userId = user.getRdpUserId();
				// 判断登陆用户是否是RDP平台用户
				JSONObject isRdpUserJSON = new JSONObject();
				if (!StringUtils.isBlank(userId)) {
					// 判断登陆用户是否是RDP平台用户
					String isRdpUserURL = "/app/api/service/interfaceImplHandler/isExistUser?UserId="
							+ userId;
					isRdpUserJSON = new JSONObject(RdpUtils.readRdpInterface(
							request, isRdpUserURL, "json"));
				}

				if (StringUtils.isBlank(userId)
						|| isRdpUserJSON.getInt("data") == 0) {
					responseData.put("success", false);
					responseData.put("status", 3);
					ResponseUtils.renderJson(response, responseData.toString());
					return null;
				}

				// 是RDP平台用户，继续提交服务申请
				// 服务ID数组
				String servIdArray = RequestUtils.getQueryParam(request,SERVID_ARR);
				// 申请者所属机构
				String applyOrg = RequestUtils.getQueryParam(request, APPLY_ORG);
				// 申请者电话号码
				String phoneNumber = RequestUtils.getQueryParam(request,PHONE_NUMBER);
				// 申请理由说明
				String applyUse = RequestUtils.getQueryParam(request, APPLY_USE);
				String submitApplyURL = "/app/api/service/smsServiceInterfaceHandler/applyServiceForUser";
				Map<String, String> paraMap = new HashMap<String, String>();
				paraMap.put("userId", userId);
				paraMap.put("serviceIds", servIdArray);
				paraMap.put("applyOrg", applyOrg);
				paraMap.put("phoneNumber", phoneNumber);
				paraMap.put("applyUse", applyUse);
				responseData = new JSONObject(RdpUtils.readRdpInterfacePost(
						request, submitApplyURL, "json", paraMap));

				// StringBuffer url = new StringBuffer();
				// url.append("/rdp/app/api/service/smsServiceInterfaceHandler/applyServiceForUser?&userId="
				// + "fe9f42f7-02ef-4656-9684-7ec5c51266a9");
				// url.append("&serviceIds="
				// +
				// "['tql5c7wxgpip3iokkr3vl0kuelsolsaq','mvp5f7nbxg6h00on04p1xros0xdrd11u','m43fsextw937pi1qhowf9cn7411fwmso','iyxg4c7pf5zxlzw4jjwjf8t7lcrff6ui']");
				// responseData = new JSONObject(RdpUtils.readRdpInterface(
				// request, url.toString(), "json"));
				// //TEST
				// responseData = new JSONObject(
				// "{'data':{'count':0,'list':[{'name': '获取用户下的服务接口','reason': '000002-服务已经被申请'},{'name': '获取服务详细信息','reason': '000002-服务已经被申请'},{'name': '获取目录树','reason': '000002-服务已经被申请'},{'name': '获取所有目录','reason': '000002-服务已经被申请'}]},'success':true}");
				// responseData = new JSONObject("{'count':1,'list':[]}") ;
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
