package com.digitalchina.ldp.app.csdsc.handler;

import com.digitalchina.ldp.app.csdsc.bean.PerInfoBean;
import com.digitalchina.ldp.app.csdsc.bean.User;
import com.digitalchina.ldp.app.csdsc.service.UserService;
import com.digitalchina.ldp.app.ums.bean.RoleInfoBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

@Component
public class UserInfoHandler extends AbstractHandler
{
	@Autowired
	private UserService userService;
	
	@HttpService
	public User getUserInfo(Model model) {
		DbContextHolder.setDbType("rdp");
		String loginName=model.getValueNotEmpty("loginName");
		if("true".equals(BeanDefineConfigue.getProperty("LOGIN_NAME_IGNORECASE")))
		{
			loginName=loginName.toLowerCase();
		}
		String password=model.getValueNotEmpty("password");
		this.alias("role",RoleInfoBean.class);
        User user = userService.getUserInfo(loginName, password,model.getRequest());

		return user;
	}

	@HttpService
	public String unLockUser(Model model) {
		String loginName=model.getValueNotEmpty("loginName");
		HttpServletRequest request=model.getRequest();
		String ip=getRemoteHost(request);
		String ips="1.10.4.187,1.10.4.172,1.10.4.173,127.0.0.1";
		if(ips.indexOf(ip)>=0){
		ServletContext context=request.getSession().getServletContext();
		context.removeAttribute(loginName);//次数+@#@+第一次登录失败时间+@#@+最后一次登录失败时间
			return "解锁成功";
		}else {
			return "非法操作";
		}
	}

	@HttpService
	public User getUserInfoNotPassword(Model model)
	{
		DbContextHolder.setDbType("rdp");
		String loginName=model.getValueNotEmpty("loginName");
		if("true".equals(BeanDefineConfigue.getProperty("LOGIN_NAME_IGNORECASE")))
		{
			loginName=loginName.toLowerCase();
		}
		this.alias("role",RoleInfoBean.class);
		return userService.getUserInfo(loginName);
	}
	@HttpService
	public PerInfoBean getUserInfoByUserid(Model model)
	{
		DbContextHolder.setDbType("rdp");
		String userId=model.getValueNotEmpty("userId");
		this.alias("role",RoleInfoBean.class);
		return userService.getUserInfoByUserid(userId);
	}

	@HttpService
	public String editUserInfo(Model model) {
		DbContextHolder.setDbType("rdp");
		String userId = model.getValueNotEmpty("userId");
		String userPhone = model.getValue("userPhone");
		String userAddress = model.getValue("userAddress");
		alias("role", RoleInfoBean.class);
		int i = this.userService.editUserInfo(new Object[] { userPhone, userAddress, userId });
		if (i > 0) {
			return "{success:true}";
		}
		return "{success:false}";
	}

	@HttpService
    public String editUserPassword(Model model)
    {
		DbContextHolder.setDbType("rdp");
		String userId = model.getValueNotEmpty("userId");
		String oldPassword = model.getValueNotEmpty("oldPassword");
        String newPassword = model.getValueNotEmpty("newPassword");
        String repeatPassword = model.getValueNotEmpty("repeatPassword");
        oldPassword = StringUtils.SHA256(oldPassword);

        if(repeatPassword.equals(newPassword)){
        	int i = userService.editRestPassword(userId, oldPassword ,StringUtils.SHA256(newPassword));
        	if(i > 0){
        		return "{success:true}";
        	}
        }
        return "{success:false}";
    }
	@HttpService
    public String myCount(Model model)
    {
		DbContextHolder.setDbType("rdp");
		String userId = model.getValueNotEmpty("userId");
		String oldPassword = model.getValueNotEmpty("oldPassword");
        String newPassword = model.getValueNotEmpty("newPassword");
        String repeatPassword = model.getValueNotEmpty("repeatPassword");
        oldPassword = StringUtils.SHA256(oldPassword);

        if(repeatPassword.equals(newPassword)){
        	int i = userService.editRestPassword(userId, oldPassword ,StringUtils.SHA256(newPassword));
        	if(i > 0){
        		return "{success:true}";
        	}
        }
        return "{success:false}";
    }


	public String getRemoteHost(HttpServletRequest request){

		String ip = request.getHeader("x-forwarded-for");

		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){

			ip = request.getHeader("Proxy-Client-IP");

		}

		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){

			ip = request.getHeader("WL-Proxy-Client-IP");

		}

		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){

			ip = request.getRemoteAddr();

		}

		return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;

	}
}
