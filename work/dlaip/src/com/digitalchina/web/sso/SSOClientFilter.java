package com.digitalchina.web.sso;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.support.WebApplicationContextUtils;

import com.digitalchina.ldp.app.ums.bean.AppUserInfoBean;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.app.ums.dao.AppUserInfoDao;
import com.digitalchina.ldp.app.ums.dao.UserPostInfoDao;
import com.digitalchina.ldp.app.ums.service.UserInfoManagerService;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.exception.ServiceException;

/**
 * 用于单点登录后,aip系统内部登陆.
 * 
 * @author liji
 */
public class SSOClientFilter implements Filter {

	private ServletContext servletContext;

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) arg0;
		UserInfoBean bean = (UserInfoBean) request.getSession().getAttribute(
				Constant.USER_SESSION_ID);
		if (bean == null && request.getRemoteUser() != null) {
			UserInfoManagerService userInfoManagerService = WebApplicationContextUtils
					.getWebApplicationContext(this.servletContext).getBean(
							UserInfoManagerService.class);
			AppUserInfoDao appUserInfoDao = WebApplicationContextUtils
					.getWebApplicationContext(this.servletContext).getBean(
							AppUserInfoDao.class);
			UserPostInfoDao userPostInfoDao = WebApplicationContextUtils
					.getWebApplicationContext(this.servletContext).getBean(
							UserPostInfoDao.class);

			bean = userInfoManagerService.getUserInfoById(request
					.getRemoteUser());

			List<AppUserInfoBean> appList = appUserInfoDao.find(bean
					.getUserId());
			if (appList.isEmpty()) {
				throw new ServiceException("该用户还未分配应用");
			}

			bean.getAppList().clear();
			for (AppUserInfoBean app : appList) {
				app.getApp().setPostList(
						userPostInfoDao.find(app.getApp().getAppId(),
								bean.getUserId()));
				if (!app.getApp().getPostList().isEmpty()) {
					bean.getAppList().add(app.getApp());
				}
				if (app.getIsAdminApp().equals("Y")) {
					bean.setAdminAppId(app.getApp().getAppId());
				}
			}
			request.getSession().setAttribute(Constant.USER_SESSION_ID, bean);
		}
		arg2.doFilter(arg0, arg1);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		this.servletContext = arg0.getServletContext();
	}

}
