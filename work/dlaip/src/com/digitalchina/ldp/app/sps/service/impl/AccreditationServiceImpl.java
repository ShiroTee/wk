package com.digitalchina.ldp.app.sps.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.smp.bean.AuthAndRouteInfo;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.sps.service.AccreditationService;
import com.digitalchina.ldp.service.BaseService;
@Service
public class AccreditationServiceImpl extends BaseService implements AccreditationService {

  @Override
  public AuthInfo loadAuthByUser(String userId) {
    AuthInfo authInfo = this.createBeanQuery(AuthInfo.class).eq("user", userId).uniqueResult();
    //当前用户无授权码,填入授权码.
    // com.digitalchina.ldp.app.ums.bean.UserInfoBean user =
    // this.createBeanQuery(com.digitalchina.ldp.app.ums.bean.UserInfoBean.class)
    // .eq("userId", userId).uniqueResult();
    // if (null == authInfo) {
    // authInfo = new AuthInfo();
    // authInfo.setAddDate(new Date());
    // authInfo.setAuthKey(AuthInfo.generateAuthKey(20, null));
    // authInfo.setUser(user);
    // authInfo.setStatus(1);
    // this.createExecuteQuery().insert(authInfo, false);
    // }
    return authInfo;
  }

  @Override
  public void save(AuthAndRouteInfo aari) {
    this.createExecuteQuery().insert(aari, false);
  }

  public boolean isAuth(String userId,String assetId){
    AuthInfo authInfo=loadAuthByUser(userId);
    if(authInfo==null){
      return false;
    }
    List<AuthAndRouteInfo> list=this.createBeanQuery(AuthAndRouteInfo.class).eq("assetId", assetId).eq("auth",authInfo.getAuthId()).list();
    if(list.size()>0){
      return true;
    }else{
      return false;
    }
  }
}
