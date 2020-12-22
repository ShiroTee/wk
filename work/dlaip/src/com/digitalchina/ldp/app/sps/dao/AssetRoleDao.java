package com.digitalchina.ldp.app.sps.dao;

import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.bean.PageList;

public interface AssetRoleDao
{
	public PageList<ResourceCatalogueInfo> find(String roleId,int start,int pageSize);
	public PageList<ResourceCatalogueInfo> query(String roleId,int start,int pageSize);
	public PageList<UserInfoBean> find(String roleId,String appCode,int start,int pageSize);
	public PageList<UserInfoBean> query(String roleId,String appCode,int start,int pageSize);
	public String  getAuthByUserId(String assetId,String userId);
}
