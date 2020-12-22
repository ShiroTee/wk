package com.digitalchina.ldp.app.sps.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.smp.bean.AuthAndRouteInfo;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.VoucherInfo;
import com.digitalchina.ldp.app.sps.service.AccreditationService;
import com.digitalchina.ldp.app.sps.service.VoucherService;
import com.digitalchina.ldp.app.ums.bean.UserInfoBean;
import com.digitalchina.ldp.app.ums.service.UserInfoManagerService;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
@Service
public class VoucherServiceImpl extends BaseService implements VoucherService {
  @Autowired
  private AccreditationService accreditationService;
  @Autowired
  private UserInfoManagerService userInfoManagerService;
  
  @Override
  public void addAccreditationForVoucher(String voucherIndex) {
    List<VoucherInfo> list = load(voucherIndex);
    if (list.size() == 0) {
      return;
    }
    String userId = list.get(0).getProposerId();
    AuthInfo authInfo=accreditationService.loadAuthByUser(userId);
    AuthAndRouteInfo aari;
    for (VoucherInfo vi : list) {
      aari = new AuthAndRouteInfo();
      aari.setAuth(authInfo);
//      aari.setAssetId(vi.getAssetId());
      aari.setStatus(1);
      accreditationService.save(aari);
    }
  }

  @Override
  public List<VoucherInfo> load(String voucherIndex) {
    BeanQuery<VoucherInfo> query =
        this.createBeanQuery(VoucherInfo.class).eq("VOUCHER_INDEX", voucherIndex);
    query.setJoin(true);
    return query.list();
  }

  @Override
  public void add(VoucherInfo vi) {
    this.createExecuteQuery().insert(vi, false);
  }

  @Override
  public void saveVoucher(String[] assetList, String voucherIndex,String proposerId) {
    UserInfoBean user = userInfoManagerService.getUserInfoById(proposerId);
    VoucherInfo vi;
    ResourceCatalogueInfo resouce;
    for(String assetId:assetList){
      vi=new VoucherInfo();
      resouce=new ResourceCatalogueInfo();
      resouce.setResourceId(assetId);
      vi.setResource(resouce);
      vi.setVoucherIndex(voucherIndex);
      vi.setProposerId(proposerId);
      vi.setProposerName(user.getName());
      vi.setProposerOrgName(user.getOrgInfo().getOrgName());
      vi.setPrintTie(new Date());
      add(vi);
    }
  }
}
