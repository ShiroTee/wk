package com.digitalchina.ldp.app.csdsc.dao.impl;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.csdsc.bean.PerInfoBean;
import com.digitalchina.ldp.app.csdsc.dao.UserInfoDao;
import com.digitalchina.ldp.dao.BaseDao;

@Component
public class UserInfoDaoImpl extends BaseDao implements UserInfoDao {

	@Override
	public PerInfoBean getUserInfoByUserid(String userId) {
		String sql = "select USER_ID,USER_LOGIN_NAME,USER_NAME,USER_PHONE,ORG_NM,User_Address from user_info t1,arch_org t2 where user_id = '" + userId + "' AND t1.ORG_ID = t2.ORG_ID";

		return this.createSqlQuery(PerInfoBean.class, sql.toString()).uniqueResult();
	}

	@Override
	public int editRestPassword(String userId, String oldPassword,
			String newPassword) {
		String sql = "update user_info set user_login_password = '"+ newPassword + "' where user_id = '" + userId + "' AND user_login_password = '" + oldPassword + "'";
		return	this.createJdbcTemplate().update(sql);
	}

	public int editUserInfo(Object[] values)
	{
		String sql = "update user_info set user_phone=?, user_address=? where user_id=?";
		return createJdbcTemplate().update(sql, values);
	}

}
