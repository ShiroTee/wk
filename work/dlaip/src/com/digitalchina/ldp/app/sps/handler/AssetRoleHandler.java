package com.digitalchina.ldp.app.sps.handler;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.AssetAndRole;
import com.digitalchina.ldp.app.sps.bean.AssetRole;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.UserAndAssetRole;
import com.digitalchina.ldp.app.sps.service.AssetRoleService;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.handler.AbstractHandler;
@Component
public class AssetRoleHandler extends AbstractHandler
{
	@Autowired
	private AssetRoleService assetRoleService;
	/**
	 * 获取资产目录角色列表
	 * @param model
	 * @return
	 */
	public PageList<AssetRole> search(Model model)
	{
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		String roleName=model.getValue("roleName");
		return assetRoleService.getPageList(start, pageSize,roleName);
	}
	/**
	 * 保存资源目录角色信息
	 * @param model
	 * @return
	 */
	public String  saveAssetRoleInfo(Model model)
	{
		String roleName=model.getValue("roleName");
		int status=model.getInt("status");
		String remark=model.getValue("remark");
		AssetRole bean=new AssetRole();
		bean.setCreateDate(new Date());
		bean.setRemark(remark);
		bean.setRoleName(roleName);
		bean.setStatus(status);
		assetRoleService.saveRole(bean);
		return "{success:true}";
	}
	/**
	 * 编辑资源目录角色信息
	 * @param model
	 * @return
	 */
	public String eidtAssetRoleInfo(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		String roleName=model.getValueNotEmpty("roleName");
		String remark=model.getValue("remark");
		int status=model.getInt("status");
		AssetRole bean=new AssetRole();
		bean.setRemark(remark);
		bean.setRoleName(roleName);
		bean.setStatus(status);
		bean.setRoleId(roleId);
		this.assetRoleService.updateRoleInfo(bean);
		return "{success:true}";
	}
	/**
	 * 获取一条资源目录详细信息
	 * @param model
	 * @return
	 */
	public AssetRole getAssetRoleInfo(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		return this.assetRoleService.getAssetRoleInfo(roleId);
	}
	/**
	 * 删除资产角色
	 * @param roleId
	 * @return
	 */
	public String deleteAssetRoleInfo(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		this.assetRoleService.deleteRoleInfo(roleId);
		return "{success:true}";
	}
	public PageList<ResourceCatalogueInfo> getNotInRole(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		PageList<ResourceCatalogueInfo> pageList= this.assetRoleService.getAssetNotInRole(roleId, start, pageSize);
		return pageList;
	}
	//获取roleID绑定的资源目录列表
	public PageList<ResourceCatalogueInfo> getInRole(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		return this.assetRoleService.getAssetInRole(roleId, start, pageSize);
	}
	public String saveRoleAndAsset(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		String assetIds=model.getValue("assetIds");
		String arrays[]=assetIds.equals("")?new String[0]:assetIds.split(",");
		List<AssetAndRole> list=new ArrayList<AssetAndRole>(arrays.length);
		if(arrays.length>0)
		{
			AssetRole role=new AssetRole();
			role.setRoleId(roleId);
			AssetAndRole bean=null;
			ResourceCatalogueInfo resource=null;
			
			for(String assetId:arrays)
			{
				bean=new AssetAndRole();
				resource=new ResourceCatalogueInfo();
				resource.setResourceId(assetId);
				bean.setRole(role);
				bean.setCreateDate(new Date());
				bean.setStatus(1);
				bean.setResource(resource);
				list.add(bean);
			}
		
		}
		this.assetRoleService.saveAssetAndRole(list,roleId);
		return "{success:true}";
	}
	/**
	 * 获取服务管理平台用户列表
	 * @param model
	 * @return
	 */
	public PageList<UserInfoBean> getUserListForSps(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		return this.assetRoleService.getUserListNotInRole(roleId,"sps", start, pageSize);
	}
	/**
	 * 获取与资源目录角色关联的用户列表
	 * @param model
	 * @return
	 */
	public PageList<UserInfoBean> getUserInForRole(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		return this.assetRoleService.getUserListInRole(roleId,"sps", start, pageSize);
	}
	public String saveRoleAndUser(Model model)
	{
		String roleId=model.getValueNotEmpty("roleId");
		String userIds=model.getValue("userIds");
		String arrays[]=userIds.equals("")?new String[0]:userIds.split(",");
		List<UserAndAssetRole> list=new ArrayList<UserAndAssetRole>(arrays.length);
		if(arrays.length>0)
		{
			AssetRole role=new AssetRole();
			role.setRoleId(roleId);
			UserAndAssetRole bean=null;
			UserInfoBean user=null;
			for(String userId:arrays)
			{
				bean=new UserAndAssetRole();
				user=new UserInfoBean();
				user.setUserId(userId);
				bean.setRole(role);
				bean.setCreateDate(new Date());
				bean.setStatus(1);
				bean.setUser(user);
				list.add(bean);
			}
		
		}
		this.assetRoleService.saveUserAndRole(list, roleId);
		return "{success:true}";
	}
}
