package com.jeecms.irc.action;

import static com.jeecms.cms.Constants.TPLDIR_MEMBER;
import static com.jeecms.core.action.front.LoginAct.MESSAGE;
import static com.jeecms.core.action.front.LoginAct.RETURN_URL;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.cms.web.FrontUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.irc.common.IRCUtils;
import com.jeecms.rdp.common.RdpUtils;

/**
 * 服务申请
 * 
 * @author zhyg
 * 
 */
@Controller
public class GetMyIRCServiceAct {
	private static final Logger log = LoggerFactory
			.getLogger(GetMyIRCServiceAct.class);

	public static final String COOKIE_ERROR_REMAINING = "_error_remaining";
	public static final String LOGIN_INPUT = "tpl.loginInput";
	public static final String LOGIN_STATUS = "tpl.loginStatus";
	public static final String SERVID_ARR = "servIdArray";

	@RequestMapping(value = "/getmyircserv.jspx", method = RequestMethod.POST)
	public String submit(String returnUrl, String start, String limit,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap model) {
		// 设置站点信息
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		FrontUtils.frontData(request, model, site);

		JSONObject responseData = new JSONObject();
		// 获取用户登陆信息--zhyg
		CmsUser user = CmsUtils.getUser(request);
		// successo为false并且status：0-用户未登陆，1-提交查询失败，2-RDP平台查询失败,3-登陆用户不是RDP平台用户，不能申请服务
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

				// 是RDP平台用户，继续查询
				String orgId = user.getRdpUserOrgId() ;
				String getMyApplyServerURL = "/app/api/service/irc/ircIrcDataDealHandler/getIrcResourceInfoForPageList?method=JsonReqed&orgId=";
				getMyApplyServerURL += orgId;	//固定测试用户“jsjuser”
				getMyApplyServerURL += "&start=" + start;
				getMyApplyServerURL += "&pagesize=" + limit;
				getMyApplyServerURL += "&auditstatus=" + "yes";	//获取当前登陆用户所有未申请的服务参数值no：所有未申请、yes：所有已申请、不传此参数查询出所有服务列表
				responseData = new JSONObject(RdpUtils.readRdpInterface(request, getMyApplyServerURL, "json"));
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jo;
	}
}
