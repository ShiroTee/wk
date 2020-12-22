package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.bean.PageList;

public interface RequirementService {
  public PageList<RequirementInfo> getAll(int start, int pageSize);

  public PageList<RequirementInfo> getMyRequirement(String user, int start, int pageSize);

  public PageList<RequirementInfo> getCommitted(int start, int pageSize);

  public PageList<RequirementInfo> queryByName(String name, int start, int pageSize);

  public void add(RequirementInfo requirementInfo);

  public void delete(String id);

  public void approve(RequirementInfo requirementInfo);

  public RequirementInfo load(String value);

}
