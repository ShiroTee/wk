package com.jeecms.cms.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.manager.main.CmsSiteMng;
import com.jeecms.cms.manager.main.CmsUserMng;
import com.jeecms.common.web.session.SessionProvider;
import com.jeecms.core.entity.Authentication;
import com.jeecms.core.entity.UnifiedUser;
import com.jeecms.core.manager.AuthenticationMng;

/**
 * CMS上下文信息拦截器
 * 
 * 包括登录信息、权限信息、站点信息
 * 
 * @author liufang
 * 
 */
public class FrontContextInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler)
			throws ServletException {
		CmsSite site = null;
		List<CmsSite> list = cmsSiteMng.getListFromCache();
		int size = list.size();
		if (size == 0) {
			throw new RuntimeException("no site record in database!");
		} else if (size == 1) {
			site = list.get(0);
		} else {
			String server = request.getServerName();
			String alias, redirect;
			for (CmsSite s : list) {
				// 检查域名
				if (s.getDomain().equals(server)) {
					site = s;
					break;
				}
				// 检查域名别名
				alias = s.getDomainAlias();
				if (!StringUtils.isBlank(alias)) {
					for (String a : StringUtils.split(alias, ',')) {
						if (a.equals(server)) {
							site = s;
							break;
						}
					}
				}
				// 检查重定向
				redirect = s.getDomainRedirect();
				if (!StringUtils.isBlank(redirect)) {
					for (String r : StringUtils.split(redirect, ',')) {
						if (r.equals(server)) {
							try {
								response.sendRedirect(s.getUrl());
							} catch (IOException e) {
								throw new RuntimeException(e);
							}
							return false;
						}
					}
				}
			}
			if (site == null) {
				throw new SiteNotFoundException(server);
			}
		}
		//向request中存入site信息，site中存的是站点所有信息。
		CmsUtils.setSite(request, site);
		
 // System.out.println("url------------"+request.getRequestURI());
 
       
		CmsUser user = null;
		UnifiedUser rdpUser = null;
		
		rdpUser= (UnifiedUser) session.getAttribute(request, "rdp_user");
	 
		if(rdpUser!=null)
		{
			user = new CmsUser() ;
			user.setId(rdpUser.getId());
			user.setRdpUserId(rdpUser.getRdpUserId());
			user.setRdpPhoneNumber(rdpUser.getRdpPhoneNumber());
			user.setRdpUserOrg(rdpUser.getRdpUserOrg());
			user.setRdpUserOrgId(rdpUser.getRdpUserOrgId());
			user.setRdploginName(rdpUser.getRdploginName());
			user.setRdpRole(rdpUser.getRdpRole());
			
			user.setUsername(rdpUser.getUsername());
			user.setEmail(rdpUser.getEmail());
			user.setRegisterTime(rdpUser.getRegisterTime());
			user.setRegisterIp(rdpUser.getRegisterIp());
			user.setLastLoginTime(rdpUser.getLastLoginTime());
			user.setLastLoginIp(rdpUser.getLastLoginIp());
			user.setLoginCount(rdpUser.getLoginCount());
			user.setRank(0);
			user.setUploadTotal(new Long(0)) ;
			user.setUploadSize(0);
			user.setUploadDate(null);
			user.setAdmin(false);
			user.setViewonlyAdmin(false);
			user.setSelfAdmin(false);
			user.setDisabled(false);
			CmsUtils.setUser(request, user);

			//System.out.println("url------------"+rdpUser.getRdpPhoneNumber()+"#"+rdpUser.getRdpRole()+"#"+rdpUser.getUsername());
		}
		/*
		Integer userId = authMng.retrieveUserIdFromSession(session, request);
		if (userId != null) {
			user = cmsUserMng.findById(userId);
		}
		if (user != null) {
			CmsUtils.setUser(request, user);
		}else{
			rdpUser = authMng.retrieveRdpUserFromSession(session, request, (String)session.getAttribute(request, "auth_key"));
			if(rdpUser != null){
				user = new CmsUser() ;
				user.setId(rdpUser.getId()) ;
				user.setRdpUserId(rdpUser.getRdpUserId()) ;
				user.setRdpPhoneNumber(rdpUser.getRdpPhoneNumber()) ;
				user.setRdpUserOrg(rdpUser.getRdpUserOrg()) ;
				user.setRdpUserOrgId(rdpUser.getRdpUserOrgId()) ;
				user.setUsername(rdpUser.getUsername()) ;
				user.setEmail(rdpUser.getEmail()) ;
				user.setRegisterTime(rdpUser.getRegisterTime()) ;
				user.setRegisterIp(rdpUser.getRegisterIp()) ;
				user.setLastLoginTime(rdpUser.getLastLoginTime()) ;
				user.setLastLoginIp(rdpUser.getLastLoginIp()) ;
				user.setLoginCount(rdpUser.getLoginCount()) ;
				user.setRank(0) ;
				user.setUploadTotal(new Long(0)) ;
				user.setUploadSize(0) ;
				user.setUploadDate(null) ;
				user.setAdmin(false) ;
				user.setViewonlyAdmin(false) ;
				user.setSelfAdmin(false) ;
				user.setDisabled(false) ;
				CmsUtils.setUser(request, user);
			}
		}*/
		
		return true;
	}

	private SessionProvider session;
	private CmsSiteMng cmsSiteMng;
	private CmsUserMng cmsUserMng;
	private AuthenticationMng authMng;

	@Autowired
	public void setSession(SessionProvider session) {
		this.session = session;
	}

	@Autowired
	public void setCmsSiteMng(CmsSiteMng cmsSiteMng) {
		this.cmsSiteMng = cmsSiteMng;
	}

	@Autowired
	public void setCmsUserMng(CmsUserMng cmsUserMng) {
		this.cmsUserMng = cmsUserMng;
	}

	@Autowired
	public void setAuthMng(AuthenticationMng authMng) {
		this.authMng = authMng;
	}
}