package com.digitalchina.ldp.app.sps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.dao.OrganizationDao;
import com.digitalchina.ldp.app.sps.service.OrganizationService;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.service.BaseService;

@Service
public class OrganizationServiceImpl extends BaseService implements OrganizationService {
  @Autowired
  private OrganizationDao organizationDao;

  @Override
  public List<OrganizationInfoBean> loadAllOrganization() {
    return organizationDao.loadAllOrganization();
  }

  @Override
  public List<OrganizationInfoBean> loadAll() {
    return this.createBeanQuery(OrganizationInfoBean.class).list();
  }

  /**
   * 根据传入的org_cd 查找该机构的所属单位(委办局) 的orgId
   * 用于 匹配资源目录挂接在科室的情况下, 其审批由委办局相应角色来进行的.
   */
  @Override
  public String getApprovalOrgByOrgCD(String orgCD) {
    if (orgCD == null || orgCD.length() < 2) {
      throw new RuntimeException("未定义的资产目录持有单位");
    }
    String cd = orgCD.substring(0, 2);
    OrganizationInfoBean oib=this.createBeanQuery(OrganizationInfoBean.class).eq("orgCd", cd).uniqueResult();
    if(oib!=null){
      return oib.getOrgId();
    }
    return null;
  }
}
