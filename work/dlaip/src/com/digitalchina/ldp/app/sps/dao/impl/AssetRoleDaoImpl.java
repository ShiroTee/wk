package com.digitalchina.ldp.app.sps.dao.impl;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.dao.AssetRoleDao;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;

@Component
public class AssetRoleDaoImpl extends BaseDao implements AssetRoleDao
{

	private static final String SQL_QUERY = "SELECT a.asset_name,a.provider,a.asset_id,a.pub_dt,o.org_nm,o.org_id FROM (SELECT A.* FROM asset A LEFT JOIN ESB_ASSET_ROLE E ON A.asset_id=E.ASSET_ID WHERE A.status=? AND E.ROLE_ID IS NULL OR E.ROLE_ID<>?) a LEFT JOIN arch_org O ON A.provider=O.org_id";
	private static final String SQL_FIND = "SELECT a.asset_name,a.provider,a.asset_id,a.pub_dt,o.org_nm,o.org_id FROM (SELECT A.* FROM asset A LEFT JOIN ESB_ASSET_ROLE E ON A.asset_id=E.ASSET_ID WHERE A.status=? AND E.ROLE_ID=?) a LEFT JOIN arch_org O ON A.provider=O.org_id";
	@Override
	public PageList<ResourceCatalogueInfo> find(String roleId, int start,
			int pageSize)
	{
		return this.createSqlQuery(ResourceCatalogueInfo.class, SQL_QUERY, 1,
				roleId).page(start, pageSize);
	}

	@Override
	public PageList<ResourceCatalogueInfo> query(String roleId, int start,
			int pageSize)
	{
		return this.createSqlQuery(ResourceCatalogueInfo.class, SQL_FIND, 1,
				roleId).page(start, pageSize);
	}

	@Override
	public PageList<UserInfoBean> find(String roleId, String appCode,
			int start, int pageSize)
	{
		StringBuilder sql=new StringBuilder();
		sql.append("select u.* from (SELECT u.USER_NAME,u.USER_ID,u.USER_LOGIN_NAME FROM ");
		sql.append("user_info u INNER JOIN app_user_info_table au ON u.USER_ID = au.USER_ID ");
		sql.append("INNER JOIN app_info_table a ON a.APP_ID = au.APP_ID where a.APP_CODE =? ");
		sql.append("AND u.USER_LEVEL =? ) u left join asset_role_user r on r.user_Id=u.user_Id where r.role_Id is null or r.role_Id<>?");
		return this.createSqlQuery(UserInfoBean.class,sql.toString(),"sps",0,roleId).page(start, pageSize);
	}

	@Override
	public PageList<UserInfoBean> query(String roleId, String appCode,
			int start, int pageSize)
	{
		StringBuilder sql=new StringBuilder();
		sql.append("select u.* from (SELECT u.USER_NAME,u.USER_ID,u.USER_LOGIN_NAME FROM ");
		sql.append("user_info u INNER JOIN app_user_info_table au ON u.USER_ID = au.USER_ID ");
		sql.append("INNER JOIN app_info_table a ON a.APP_ID = au.APP_ID where a.APP_CODE =? ");
		sql.append("AND u.USER_LEVEL =? ) u left join asset_role_user r on r.user_Id=u.user_Id where r.role_Id=?");
		return this.createSqlQuery(UserInfoBean.class,sql.toString(),"sps",0,roleId).page(start, pageSize);
	}

	@Override
	public String getAuthByUserId(String assetId, String userId)
	{
		StringBuilder sql=new StringBuilder();
		sql.append("select b.ASSET_ID as IS_AUTH from asset a left join ");
		sql.append("(select  e.ASSET_ID from (select r.ROLE_ID from asset_role_user r where r.USER_ID=?) ");
		sql.append("a INNER JOIN esb_asset_role e on e.ROLE_ID=a.ROLE_ID) b on a.asset_id=b.ASSET_ID where a.asset_id=?");
		return this.createJdbcTemplate().queryForList(sql.toString(),userId,assetId).isEmpty()?null:"xx";
	}
	
}
