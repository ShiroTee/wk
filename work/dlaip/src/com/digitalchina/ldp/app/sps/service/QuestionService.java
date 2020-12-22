package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.sps.bean.QuestionInfo;
import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.bean.PageList;

public interface QuestionService {
  public PageList<RequirementInfo> getAll(int start, int pageSize);
  
  PageList<QuestionInfo> getMyQuestion(String user, int start, int pageSize);

  void add(QuestionInfo quertionInfo);

  PageList<QuestionInfo> queryQuestion(String user, int start, int pageSize);
  
  public PageList<QuestionInfo> queryByName(String name, int start, int pageSize);

  public void delete(String id);

  public void approve(QuestionInfo requirementInfo);

  public QuestionInfo load(String value);

}
