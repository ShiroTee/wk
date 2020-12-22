package com.digitalchina.ldp.app.sps.service;

import java.util.List;

import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;


public interface OrganizationService {

  public List<OrganizationInfoBean> loadAllOrganization();
  public List<OrganizationInfoBean> loadAll();
  
  /**
   * 查询指定orgId 所属的 委办局orgId
   * @return
   */
  public String getApprovalOrgByOrgCD(String orgId);

}
