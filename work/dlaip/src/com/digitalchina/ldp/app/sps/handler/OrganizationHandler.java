package com.digitalchina.ldp.app.sps.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.service.OrganizationService;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.app.ums.service.UserInfoManagerService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.UserInfoBean;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class OrganizationHandler extends AbstractHandler {
  @Autowired
  private OrganizationService organizationService;

  @Autowired
  private UserInfoManagerService userInfoManagerService;

  @HttpService
  public List<OrganizationInfoBean> loadAllOrganization() {
    return organizationService.loadAllOrganization();
  }

  @HttpService
  public List<OrganizationInfoBean> loadAll() {
    return organizationService.loadAll();
  }

  /**
   * 根据userId 载入完整user 对象到model.getSystemModel.getUser 中
   * 
   * @param model .getValue("userId")
   * @return
   */
  Model loadUser(Model model) {
    String userId = model.getValue("userId");
    UserInfoBean user = userInfoManagerService.getUserInfoById(userId);
    model.getSystemModel().setUser(user);
    return model;
  }
}
