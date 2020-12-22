package com.digitalchina.ldp.app.sps.service;

import java.util.List;

import com.digitalchina.ldp.app.sps.bean.AssetAndRole;
import com.digitalchina.ldp.app.sps.bean.AssetRole;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.UserAndAssetRole;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.bean.PageList;

/**
 * 资源目录角色管理
 * @author python
 *
 */
public interface AssetRoleService
{
	/**
	 * 获取资源目录角色列表
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<AssetRole> getPageList(int start,int pageSize,String roleName);
	/**
	 * 保存资源目录角色
	 * @param bean
	 */
	public void saveRole(AssetRole bean);
	/**
	 * 修改资源目录角色
	 * @param bean
	 */
	public void updateRoleInfo(AssetRole bean);
	/**
	 * 删除资源目录角色
	 * @param bean
	 */
	public void deleteRoleInfo(String value);
	/**
	 * 获取资产角色详情
	 * @param roleId
	 * @return
	 */
	public AssetRole getAssetRoleInfo(String roleId);
	/**
	 * 获取不在该角色下的资源目录列表
	 * @param roleId
	 * @return
	 */
	public PageList<ResourceCatalogueInfo> getAssetNotInRole(String roleId,int start,int pageSize);
	/**
	 * 获取角色下的资源目录列表
	 * @param roleId
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<ResourceCatalogueInfo> getAssetInRole(String roleId,int start,int pageSize);
	public void saveAssetAndRole(List<AssetAndRole> list,String roleId);
	/**
	 * 获取不属于该角色的用户列表
	 * @param appCode
	 * @param roleId
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<UserInfoBean> getUserListNotInRole(String roleId,String appCode,int start,int pageSize);
	/**
	 * 获取与角色关联的用户列表
	 * @param roleId
	 * @param appCode
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<UserInfoBean> getUserListInRole(String roleId,String appCode,int start,int pageSize);
	public void saveUserAndRole(List<UserAndAssetRole> list,String roleId);
	
}
