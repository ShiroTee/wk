package com.digitalchina.ldp.app.csdsc.service;

import com.digitalchina.ldp.app.csdsc.bean.PerInfoBean;
import com.digitalchina.ldp.app.csdsc.bean.User;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;

import javax.servlet.http.HttpServletRequest;

public interface UserService
{
	public User getUserInfo(String loginName, String password, HttpServletRequest request);
	public User getUserInfo(String loginName);
	public PerInfoBean getUserInfoByUserid(String userId);
	public int editRestPassword(String userId, String oldPassword,String newPassword);
	public abstract int editUserInfo(Object[] paramArrayOfObject);
}
