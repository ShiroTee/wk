package com.digitalchina.ldp.app.csdsc.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;






import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.csdsc.bean.PerInfoBean;
import com.digitalchina.ldp.app.csdsc.bean.User;
import com.digitalchina.ldp.app.csdsc.dao.UserInfoDao;
import com.digitalchina.ldp.app.csdsc.service.UserService;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.ums.bean.PostRoleInfoBean;
import com.digitalchina.ldp.app.ums.bean.RoleInfoBean;
import com.digitalchina.ldp.app.ums.bean.RoleResourceInfoBean;
import com.digitalchina.ldp.app.ums.bean.UserPostInfoBean;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl extends BaseService implements UserService
{  
	@Autowired
    private UserInfoDao userInfoDao;

	@Override
	public User getUserInfo(String loginName, String password, HttpServletRequest request)
	{
		List<String> resources=new ArrayList<String>();
		BeanQuery<User> query=this.createBeanQuery(User.class);
		query.eq("loginName",loginName);
		query.eq("loginPassword",StringUtils.SHA256(password));
		query.setJoin(true);
		query.selectFields("loginName","name","userId","orgInfo.orgId","orgInfo.orgName","phone","status");
		User user=query.uniqueResult();
		ServletContext context=request.getSession().getServletContext();
		Object obj=context.getAttribute(loginName);//次数+@#@+第一次登录失败时间+@#@+最后一次登录失败时间
		String lockInfo= obj==null?"":obj.toString();
		Long current=System.currentTimeMillis();
		if(!"".equals(lockInfo)){
			String[] info= lockInfo.split("@#@");
			int failTimes = Integer.valueOf(info[0]);
			//密码最后一次输错时间到现在
			long userTime=(current-Long.valueOf(info[2]))/1800000;
			if(failTimes>=5 && userTime<=1){//登录错误五次
				throw new ServiceException("账号被禁用");
			}
		}
		if(user==null) {
			if(!"".equals(lockInfo)){//次数+@#@+第一次登录失败时间+@#@+最后一次登录失败时间
				String[] info= lockInfo.split("@#@");
				//密码最后一次输错时间到现在
				long userTime=(current-Long.valueOf(info[2]))/1800000;
				if(userTime>=1){//重新统计
					context.setAttribute(loginName,1+"@#@"+current+"@#@"+current);
				}else {
					int failTime = Integer.valueOf(info[0])+1;
					context.setAttribute(loginName,failTime+"@#@"+info[1]+"@#@"+current);
				}
			}else {
				context.setAttribute(loginName,1+"@#@"+current+"@#@"+current);
			}

			throw new ServiceException("认证失败");
		}
		if(Constant.STATUS_TYPE.N.name().equals(user.getStatus()))
		{
			throw new ServiceException("账号被禁用");
		}
		List<RoleInfoBean> roles=new  ArrayList<RoleInfoBean>();
		user.setRoles(roles);

		context.removeAttribute(loginName);
		
		//获取用户关联的岗位信息
		BeanQuery<UserPostInfoBean> postQuery=this.createBeanQuery(UserPostInfoBean.class);
		postQuery.setJoin(true);
		postQuery.addQueryParameter("user",user.getUserId());
		postQuery.addQueryParameter("status","Y");
		postQuery.selectFields("post.postId");
		BeanQuery<PostRoleInfoBean> roleQuery=null;
		for(UserPostInfoBean p:postQuery.list())
		{
			roleQuery=this.createBeanQuery(PostRoleInfoBean.class);
			roleQuery.addQueryParameter("postInfo",p.getPost().getPostId());
			roleQuery.addQueryParameter("status","Y");
			roleQuery.setJoin(true);
			roleQuery.selectFields("roleInfo.roleId","roleInfo.roleName","roleInfo.app");
			for(PostRoleInfoBean r:roleQuery.list())
			{
				RoleInfoBean ro=new RoleInfoBean();
				ro.setRoleName(r.getRoleInfo().getRoleName());
				if(	r.getRoleInfo().getApp().getAppId().equals("sps"))
				{
					BeanQuery<RoleResourceInfoBean> resourceQuery=this.createBeanQuery(RoleResourceInfoBean.class);
					resourceQuery.setJoin(true);
					resourceQuery.eq("roleInfo",r.getRoleInfo().getRoleId());
					resourceQuery.eq("status","Y");
					resourceQuery.eq("resourceInfo.status","Y");
					resourceQuery.eq("resourceInfo.app",r.getRoleInfo().getApp().getAppId());
					resourceQuery.eq("resourceInfo.resourceType", 4);
					resourceQuery.selectFields("resourceInfo.resourceName");
					for(RoleResourceInfoBean rr:resourceQuery.list())
					{
						
						resources.add(rr.getResourceInfo().getResourceName());
					}
					
				}
				user.getRoles().add(ro);
			}
		}
		user.setResources(resources);
		AuthInfo auth=this.createBeanQuery(AuthInfo.class).eq("user", user.getUserId()).uniqueResult();
		if(auth!=null)
		{
			user.setAuthKey(auth.getAuthKey());
		}
		return user;
	}

	@Override
	public User getUserInfo(String loginName) {
		List<String> resources=new ArrayList<String>();
		BeanQuery<User> query=this.createBeanQuery(User.class);
		query.eq("loginName",loginName);
		query.setJoin(true);
		query.selectFields("loginName","name","userId","orgInfo.orgId","orgInfo.orgName","phone","status");
		User user=query.uniqueResult();
		if(user==null)
		{
			throw new ServiceException("认证失败");
		}
		if(Constant.STATUS_TYPE.N.name().equals(user.getStatus()))
		{
			throw new ServiceException("账号被禁用");
		}
		List<RoleInfoBean> roles=new  ArrayList<RoleInfoBean>();
		user.setRoles(roles);
	

		//获取用户关联的岗位信息
		BeanQuery<UserPostInfoBean> postQuery=this.createBeanQuery(UserPostInfoBean.class);
		postQuery.setJoin(true);
		postQuery.addQueryParameter("user",user.getUserId());
		postQuery.addQueryParameter("status","Y");
		postQuery.selectFields("post.postId");
		BeanQuery<PostRoleInfoBean> roleQuery=null;
		for(UserPostInfoBean p:postQuery.list())
		{
			roleQuery=this.createBeanQuery(PostRoleInfoBean.class);
			roleQuery.addQueryParameter("postInfo",p.getPost().getPostId());
			roleQuery.addQueryParameter("status","Y");
			roleQuery.setJoin(true);
			roleQuery.selectFields("roleInfo.roleId","roleInfo.roleName","roleInfo.app");
			for(PostRoleInfoBean r:roleQuery.list())
			{
				RoleInfoBean ro=new RoleInfoBean();
				ro.setRoleName(r.getRoleInfo().getRoleName());
				if(	r.getRoleInfo().getApp().getAppId().equals("sps"))
				{
					BeanQuery<RoleResourceInfoBean> resourceQuery=this.createBeanQuery(RoleResourceInfoBean.class);
					resourceQuery.setJoin(true);
					resourceQuery.eq("roleInfo",r.getRoleInfo().getRoleId());
					resourceQuery.eq("status","Y");
					resourceQuery.eq("resourceInfo.status","Y");
					resourceQuery.eq("resourceInfo.app",r.getRoleInfo().getApp().getAppId());
					resourceQuery.eq("resourceInfo.resourceType", 4);
					resourceQuery.selectFields("resourceInfo.resourceName");
					for(RoleResourceInfoBean rr:resourceQuery.list())
					{
						
						resources.add(rr.getResourceInfo().getResourceName());
					}
					
				}
				user.getRoles().add(ro);
			}
		}
		user.setResources(resources);
		AuthInfo auth=this.createBeanQuery(AuthInfo.class).eq("user", user.getUserId()).uniqueResult();
		if(auth!=null)
		{
			user.setAuthKey(auth.getAuthKey());
		}
		return user;
	}
	
	
	@Override
	public PerInfoBean getUserInfoByUserid(String userId) {
		 return userInfoDao.getUserInfoByUserid(userId);
	}
	@Override
    public int editRestPassword(String userId,String oldPassword,String newPassword)
    {
		return userInfoDao.editRestPassword(userId,oldPassword,newPassword);
    }

	public int editUserInfo(Object[] values)
	{
		return this.userInfoDao.editUserInfo(values);
	}

}
