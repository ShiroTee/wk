package com.digitalchina.ldp.app.sps.service.impl;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.QuestionInfo;
import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.service.QuestionService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;

@Service
public class QuestionServiceImpl extends BaseService implements QuestionService{

  @Override
  public void add(QuestionInfo quertionInfo) {
    this.createExecuteQuery().insert(quertionInfo, false); 
  }

  @Override
  public PageList<QuestionInfo> getMyQuestion(String user, int start, int pageSize) {
    return this.createBeanQuery(QuestionInfo.class).eq("user", user).page(start,pageSize);
  }

  @Override
  public PageList<QuestionInfo> queryQuestion(String user, int start, int pageSize) {
    return this.createBeanQuery(QuestionInfo.class).eq("user", user).page(start,pageSize);
  }

  @Override
  public void approve(QuestionInfo questionInfo) {
    QuestionInfo bean=this.createBeanQuery(QuestionInfo.class).eq("id", questionInfo.getId()).uniqueResult();
    bean.setAdministrator(questionInfo.getAdministrator());
    bean.setFeedback(questionInfo.getFeedback());
    bean.setDealTime(questionInfo.getDealTime());
    bean.setStatus(questionInfo.getStatus());
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
  public PageList<QuestionInfo> queryByName(String name, int start, int pageSize) {
    return this.createBeanQuery(QuestionInfo.class).like("name","%"+name+"%").page(start, pageSize);
  }
  
  @Override
  public QuestionInfo load(String value) {
    return this.createBeanQuery(QuestionInfo.class).eq("id",value).uniqueResult();
  }
}
