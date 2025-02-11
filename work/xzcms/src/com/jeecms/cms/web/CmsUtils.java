package com.jeecms.cms.web;

import javax.servlet.http.HttpServletRequest;

import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.core.entity.Authentication;
import com.jeecms.core.entity.UnifiedUser;

/**
 * 提供一些CMS系统中使用到的共用方法
 * 
 * 比如获得会员信息,获得后台站点信息
 * 
 * @author liufang
 * 
 */
public class CmsUtils {
	/**
	 * 用户KEY
	 */
	public static final String USER_KEY = "_user_key";
	/**
	 * 站点KEY
	 */
	public static final String SITE_KEY = "_site_key";

	/**
	 * 获得用户
	 * 
	 * @param request
	 * @return
	 */
	public static CmsUser getUser(HttpServletRequest request) {
		return (CmsUser) request.getAttribute(USER_KEY);
	}

	/**
	 * 获得用户ID
	 * 
	 * @param request
	 * @return
	 */
	public static Integer getUserId(HttpServletRequest request) {
		CmsUser user = getUser(request);
		if (user != null) {
			return user.getId();
		} else {
			return null;
		}
	}
	
	/**
	 * 设置用户
	 * 
	 * @param request
	 * @param user
	 */
	public static void setUser(HttpServletRequest request, CmsUser user) {
		request.setAttribute(USER_KEY, user);
	}
	
	/**
	 * 设置rdp用户--zhyg
	 * 
	 * @param request
	 * @param user
	 */
//	public static void setRdpUser(HttpServletRequest request, UnifiedUser rdpUser) {
//		request.setAttribute(USER_KEY, rdpUser);
//	}

	/**
	 * 获得站点
	 * 
	 * @param request
	 * @return
	 */
	public static CmsSite getSite(HttpServletRequest request) {
		return (CmsSite) request.getAttribute(SITE_KEY);
	}

	/**
	 * 设置站点
	 * 
	 * @param request
	 * @param site
	 */
	public static void setSite(HttpServletRequest request, CmsSite site) {
		request.setAttribute(SITE_KEY, site);
	}

	/**
	 * 获得站点ID
	 * 
	 * @param request
	 * @return
	 */
	public static Integer getSiteId(HttpServletRequest request) {
		return getSite(request).getId();
	}
}
