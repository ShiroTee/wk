package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.bean.SuggestionInfo;
import com.digitalchina.ldp.bean.PageList;

public interface SuggestionService {
  public PageList<RequirementInfo> getAll(int start, int pageSize);

  public PageList<SuggestionInfo> getMySuggestion(String user, int start, int pageSize);

  public void add(SuggestionInfo suggestionInfo);

  public PageList<SuggestionInfo> querySuggestion(String user, int start, int pageSize);
  
  public PageList<SuggestionInfo> queryByName(String name, int start, int pageSize);

  public void delete(String id);

  public void approve(SuggestionInfo suggestionInfo);

  public SuggestionInfo load(String value);
}
