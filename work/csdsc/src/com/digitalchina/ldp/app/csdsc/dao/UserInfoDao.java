package com.digitalchina.ldp.app.csdsc.dao;

import com.digitalchina.ldp.app.csdsc.bean.PerInfoBean;

public interface UserInfoDao {

	public PerInfoBean getUserInfoByUserid(String userId);
	public int editRestPassword(String userId, String oldPassword,String newPassword);
	public abstract int editUserInfo(Object[] paramArrayOfObject);
	
}
