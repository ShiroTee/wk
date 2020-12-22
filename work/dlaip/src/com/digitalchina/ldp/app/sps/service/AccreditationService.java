package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.smp.bean.AuthAndRouteInfo;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;

public interface AccreditationService {

  public AuthInfo loadAuthByUser(String userId);

  public void save(AuthAndRouteInfo aari);
  
  public boolean isAuth(String userId,String assetId);

}
