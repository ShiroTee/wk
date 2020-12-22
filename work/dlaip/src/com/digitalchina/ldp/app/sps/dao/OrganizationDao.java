package com.digitalchina.ldp.app.sps.dao;

import java.util.List;

import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;

public interface OrganizationDao {

  public List<OrganizationInfoBean> loadAllOrganization();

}
