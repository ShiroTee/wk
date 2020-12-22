package com.jeecms.data;

import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.core.entity.UnifiedUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 热点与最新服务
 * Created by zhanglei on 15/11/24.
 */
@Controller
public class HotAndNewService {

    @RequestMapping(value = "/hotAndNewService", method = {RequestMethod.GET, RequestMethod.POST})
    public String resourceCategory(HttpServletRequest request, HttpServletResponse response) {
        UnifiedUser user = (UnifiedUser) request.getSession().getAttribute("rdp_user");
        if (user == null) {
            return "userError";
        }
        request.getSession().setAttribute("platformAdd", PropertiesUtil.getValueBykey("platformAdd"));
        request.getSession().setAttribute("pageSize",  PropertiesUtil.getValueBykey("pageSize") );
		request.getSession().setAttribute("weatherIp", PropertiesUtil.getValueBykey("weatherIp"));
		 
		request.getSession().setAttribute("userId",  user.getRdpUserId() );
		request.getSession().setAttribute("userName", user.getUsername());
		request.getSession().setAttribute("userloginName", user.getRdploginName());
		request.getSession().setAttribute("phone", user.getRdpPhoneNumber());
		request.getSession().setAttribute("rdpRole",user.getRdpRole());
		if(user.getAuthKey()==null||"".equals(user.getAuthKey()))
			request.getSession().setAttribute("authKey","");
		else
		    request.getSession().setAttribute("authKey",user.getAuthKey());
		request.getSession().setAttribute("resources",user.getResources());
        return "hotAndNewService";
    }
}
