package com.digitalchina.ldp.app.sps.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.AssetAndRole;
import com.digitalchina.ldp.app.sps.bean.AssetRole;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.UserAndAssetRole;
import com.digitalchina.ldp.app.sps.dao.AssetRoleDao;
import com.digitalchina.ldp.app.sps.service.AssetRoleService;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;

@Service
public class AssetRoleServiceImpl extends BaseService implements AssetRoleService
{

	@Autowired
	private AssetRoleDao assetRoleDao;
	@Override
	public PageList<AssetRole> getPageList(int start, int pageSize,String roleName)
	{
		BeanQuery<AssetRole> query=this.createBeanQuery(AssetRole.class);
		if(!"".equals(roleName))
		{
			query.like("roleName",roleName);
		}
		return query.page(start, pageSize);
	}

	@Override
	public void saveRole(AssetRole bean)
	{
		this.createExecuteQuery().insert(bean,false);
	}

	@Override
	public void updateRoleInfo(AssetRole bean)
	{
		this.createExecuteQuery().update(bean);
	}

	@Override
	public void deleteRoleInfo(String value)
	{
		Map<String,Object> args=new HashMap<String,Object>();
		args.put("role",value);
		this.createExecuteQuery().delete(AssetAndRole.class,args);
		this.createExecuteQuery().delete(AssetRole.class,value);
	}

	@Override
	public AssetRole getAssetRoleInfo(String roleId)
	{
		return this.createBeanQuery(AssetRole.class).eq("roleId",roleId).uniqueResult();
	}

	@Override
	public PageList<ResourceCatalogueInfo> getAssetNotInRole(String roleId,int start,int pageSize)
	{
	
		return assetRoleDao.find(roleId, start, pageSize);
	}

	@Override
	public PageList<ResourceCatalogueInfo> getAssetInRole(String roleId,
			int start, int pageSize)
	{
		return assetRoleDao.query(roleId, start, pageSize);
	}

	@Override
	public void saveAssetAndRole(List<AssetAndRole> list,String roleId)
	{
		Map<String,Object> args=new HashMap<String,Object>();
		args.put("role",roleId);
		this.createExecuteQuery().delete(AssetAndRole.class,args);
		for(AssetAndRole bean:list)
		{
			if(this.createBeanQuery(AssetAndRole.class).eq("role",bean.getRole().getRoleId()).eq("resource",bean.getResource().getResourceId()).count()==0)
			{
				this.createExecuteQuery().insert(bean,false);
			}
		}
	}

	@Override
	public PageList<UserInfoBean> getUserListNotInRole(String roleId,
			String appCode, int start, int pageSize)
	{
		return this.assetRoleDao.find(roleId,appCode, start, pageSize);
	}

	@Override
	public PageList<UserInfoBean> getUserListInRole(String roleId,
			String appCode, int start, int pageSize)
	{
		return this.assetRoleDao.query(roleId,appCode, start, pageSize);
	}

	@Override
	public void saveUserAndRole(List<UserAndAssetRole> list, String roleId)
	{
		Map<String,Object> args=new HashMap<String,Object>();
		args.put("role",roleId);
		this.createExecuteQuery().delete(UserAndAssetRole.class,args);
		for(UserAndAssetRole bean:list)
		{
			if(this.createBeanQuery(UserAndAssetRole.class).eq("role",bean.getRole().getRoleId()).eq("user",bean.getUser().getUserId()).count()==0)
			{
				this.createExecuteQuery().insert(bean,false);
			}
		}
	}
	
}
