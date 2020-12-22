package com.digitalchina.ldp.app.ums.callback;

import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.app.ums.service.UserInfoManagerService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.box.Box;
import com.digitalchina.ldp.callback.CallBackFunction;

public class LoginCallback
        implements CallBackFunction
{
    private UserInfoManagerService service;

    public LoginCallback(UserInfoManagerService service)
    {
        this.service = service;
    }

    public void callback(Model model)
    {
        UserInfoBean user = (UserInfoBean)model.getBox("user", UserInfoBean.class).getValue("user");
        this.service.editLoginDate(user);
    }
}