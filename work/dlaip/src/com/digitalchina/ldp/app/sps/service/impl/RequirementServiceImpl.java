package com.digitalchina.ldp.app.sps.service.impl;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.service.RequirementService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;
@Service
public class RequirementServiceImpl extends BaseService implements RequirementService {

	@Override
	public PageList<RequirementInfo> getMyRequirement(String user, int start,
			int pageSize) {
		return this.createBeanQuery(RequirementInfo.class).eq("user", user).page(start,pageSize);
	}

	@Override
	public void add(RequirementInfo requirementInfo) {
		this.createExecuteQuery().insert(requirementInfo, false);		
	}

	@Override
	public void approve(RequirementInfo requirementInfo) {
		RequirementInfo target=this.createBeanQuery(RequirementInfo.class).eq("id",requirementInfo.getId()).uniqueResult();
		target.setAdministrator(requirementInfo.getAdministrator());
		target.setDealTime(requirementInfo.getDealTime());
		target.setFeedback(requirementInfo.getFeedback());
		target.setStatus(requirementInfo.getStatus());
		this.createExecuteQuery().update(target);
	}

	@Override
	public void delete(String id) {
		this.createExecuteQuery().delete(RequirementInfo.class, id);		
	}

	@Override
	public PageList<RequirementInfo> getCommitted(int start, int pageSize) {
		return null;
	}

	@Override
	public PageList<RequirementInfo> getAll(int start, int pageSize) {
		return this.createBeanQuery(RequirementInfo.class).page(start,pageSize);
	}

	@Override
	public PageList<RequirementInfo> queryByName(String name,int start,int pageSize) {
		return this.createBeanQuery(RequirementInfo.class).like("name","%"+name+"%").page(start, pageSize);
	}

  @Override
  public RequirementInfo load(String value) {
    return this.createBeanQuery(RequirementInfo.class).eq("id",value).uniqueResult();
  }
	
}
