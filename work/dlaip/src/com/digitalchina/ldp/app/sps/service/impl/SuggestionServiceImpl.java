package com.digitalchina.ldp.app.sps.service.impl;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.bean.SuggestionInfo;
import com.digitalchina.ldp.app.sps.service.SuggestionService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;
@Service
public class SuggestionServiceImpl extends BaseService implements SuggestionService{

  @Override
  public void add(SuggestionInfo suggestionInfo) {
    this.createExecuteQuery().insert(suggestionInfo, false); 
  }

  @Override
  public PageList<SuggestionInfo> getMySuggestion(String user, int start, int pageSize) {
    return this.createBeanQuery(SuggestionInfo.class).eq("user", user).page(start,pageSize);
  }

  @Override
  public PageList<SuggestionInfo> querySuggestion(String user, int start, int pageSize) {
    return this.createBeanQuery(SuggestionInfo.class).eq("user", user).page(start,pageSize);
  }

  @Override
  public void approve(SuggestionInfo suggestionInfo) {
    SuggestionInfo bean=this.createBeanQuery(SuggestionInfo.class).eq("id", suggestionInfo.getId()).uniqueResult();
    bean.setAdministrator(suggestionInfo.getAdministrator());
    bean.setFeedback(suggestionInfo.getFeedback());
    bean.setDealTime(suggestionInfo.getDealTime());
    bean.setStatus(suggestionInfo.getStatus());
    this.createExecuteQuery().update(bean);
    
  }

  @Override
  public void delete(String id) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public PageList<RequirementInfo> getAll(int start, int pageSize) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public PageList<SuggestionInfo> queryByName(String name, int start, int pageSize) {
    return this.createBeanQuery(SuggestionInfo.class).like("name","%"+name+"%").page(start, pageSize);
  }
  
  @Override
  public SuggestionInfo load(String value) {
    return this.createBeanQuery(SuggestionInfo.class).eq("id",value).uniqueResult();
  }
}
