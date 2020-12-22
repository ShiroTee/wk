package com.digitalchina.ldp.app.sps.handler;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.bean.SuggestionInfo;
import com.digitalchina.ldp.app.sps.service.SuggestionService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class SuggestionHandler extends AbstractHandler {

  @Autowired
  private SuggestionService suggestionService;
  
  /**
   * 获取当前用户所发起的建议列表
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<SuggestionInfo> getMySuggestion(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<SuggestionInfo> list = null;
  //parameter中拿userId或者session中拿
    String user = model.getSystemModel().getUser() == null ? model.getValue("userId") : model.getSystemModel()
        .getUser().getUserId();
    try {
      list = suggestionService.getMySuggestion(user, start, pageSize);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }
  
  /**
   * 提交一个建议
   * @param model
   * @return
   */
  @HttpService
  public String commit(Model model) {
    SuggestionInfo si=new SuggestionInfo();
    si.setUser(model.getValue("user"));
    si.setUserName(model.getValue("userName"));
    si.setUserOrgName(model.getValue("userOrgName"));
    si.setName(model.getValue("name"));
    si.setDescription(model.getValue("description"));
    si.setAttachments(model.getValue("attachments"));
    si.setCommitTime(new Date());
    si.setStatus(RequirementInfo.COMMITTED);
    try {
      //调用service
      suggestionService.add(si);
      return "{success:true}";
    } catch (Exception e) {
      e.printStackTrace();
      return "{success:false}";
    }
  }
  
  /**
   * 提交一个需求反馈
   * @param model
   * @return
   */
  @HttpService
  public String deal(Model model){
    HttpServletRequest request=model.getRequest();
    SuggestionInfo si = new SuggestionInfo();
    si.setId(request.getParameter("id"));
    si.setAdministrator(request.getParameter("dealerOrgName")+" - "+request.getParameter("dealer"));
    si.setDealTime(new Date());
    si.setFeedback(request.getParameter("feedback"));
    si.setStatus(RequirementInfo.PROCESSED);
    try {
      // 调用service
      suggestionService.approve(si);
      return "{success:true}";
    } catch (Exception e) {
      e.printStackTrace();
      return "{success:false}";
    }
  }
  
  /**
   * 带条件查询需求列表
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<SuggestionInfo> querySuggestion(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<SuggestionInfo> list = null;
  //parameter中拿userId或者session中拿
    String name=null;
    try {
      name=URLDecoder.decode(model.getRequest().getParameter("name"),"UTF-8");
    } catch (UnsupportedEncodingException e1) {
      e1.printStackTrace();
    }
    
    try {
      list = suggestionService.queryByName(name, start, pageSize);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }
  
  /**
   * 加载一个指定的实体
   * @param model
   * @return
   */
  @HttpService
  public SuggestionInfo load(Model model){
    return suggestionService.load(model.getValue("id"));
  }
}
