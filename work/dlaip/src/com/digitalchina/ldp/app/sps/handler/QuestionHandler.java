package com.digitalchina.ldp.app.sps.handler;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.QuestionInfo;
import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.service.QuestionService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class QuestionHandler extends AbstractHandler {
  @Autowired
  private QuestionService questionService;
  
  /**
   * 获取当前用户所发起的问题列表
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<QuestionInfo> getMyQuestion(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<QuestionInfo> list = null;
  //parameter中拿userId或者session中拿
    String user = model.getSystemModel().getUser() == null ? model.getValue("userId") : model.getSystemModel()
        .getUser().getUserId();
    try {
      list = questionService.getMyQuestion(user, start, pageSize);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }
  
  /**
   * 提交一个问题
   * @param model
   * @return
   */
  @HttpService
  public String commit(Model model) {
    QuestionInfo qi=new QuestionInfo();
    qi.setUser(model.getValue("user"));
    qi.setUserName(model.getValue("userName"));
    qi.setUserOrgName(model.getValue("userOrgName"));
    qi.setName(model.getValue("name"));
    qi.setDescription(model.getValue("description"));
    qi.setAttachments(model.getValue("attachments"));
    qi.setCommitTime(new Date());
    qi.setStatus(RequirementInfo.COMMITTED);
    try {
      //调用service
      questionService.add(qi);
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
    QuestionInfo qi = new QuestionInfo();
    qi.setId(request.getParameter("id"));
    qi.setAdministrator(request.getParameter("dealerOrgName")+" - "+request.getParameter("dealer"));
    qi.setDealTime(new Date());
    qi.setFeedback(request.getParameter("feedback"));
    qi.setStatus(RequirementInfo.PROCESSED);
    try {
      // 调用service
      questionService.approve(qi);
      return "{success:true}";
    } catch (Exception e) {
      e.printStackTrace();
      return "{success:false}";
    }
  }
  
  /**
   * 带条件查询问题列表
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<QuestionInfo> queryQuestion(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<QuestionInfo> list = null;
  //parameter中拿userId或者session中拿
    String name=null;
    try {
      name=URLDecoder.decode(model.getRequest().getParameter("name"),"UTF-8");
    } catch (UnsupportedEncodingException e1) {
      e1.printStackTrace();
    }
    
    try {
      list = questionService.queryByName(name, start, pageSize);
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
  public QuestionInfo load(Model model){
    return questionService.load(model.getValue("id"));
  }
}
