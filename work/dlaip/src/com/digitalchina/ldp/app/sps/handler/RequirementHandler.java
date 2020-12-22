package com.digitalchina.ldp.app.sps.handler;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.RequirementInfo;
import com.digitalchina.ldp.app.sps.service.RequirementService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class RequirementHandler extends AbstractHandler {

  @Autowired
  private RequirementService requirementService;

  /**
   * 获取当前用户所发起的申请列表 或者处理以service形式过来的 获取我的申请 的操作
   * 
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<RequirementInfo> getMyRequirement(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<RequirementInfo> list = null;
    // parameter中拿userId或者session中拿
    String user =
        model.getSystemModel().getUser() == null ? model.getValue("userId") : model
            .getSystemModel().getUser().getUserId();
    try {
      list = requirementService.getMyRequirement(user, start, pageSize);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }

  /**
   * 提交一个需求申请
   * 
   * @param model
   * @return
   */
  @HttpService
  public String commit(Model model) {
    HttpServletRequest request=model.getRequest();
    RequirementInfo ri = new RequirementInfo();
    ri.setUser(model.getValue("user"));
    ri.setUserName(model.getValue("userName"));
    ri.setUserOrgName(model.getValue("userOrgName"));
    ri.setName(request.getParameter("name"));
    ri.setDescription(request.getParameter("description"));
    ri.setAttachments(request.getParameter("attachments"));
    ri.setCommitTime(new Date());
    ri.setStatus(RequirementInfo.COMMITTED);
    try {
      // 调用service
      requirementService.add(ri);
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
    RequirementInfo ri = new RequirementInfo();
    ri.setId(request.getParameter("id"));
    ri.setAdministrator(request.getParameter("dealerOrgName")+" - "+request.getParameter("dealer"));
    ri.setDealTime(new Date());
    ri.setFeedback(request.getParameter("feedback"));
    ri.setStatus(RequirementInfo.PROCESSED);
    try {
      // 调用service
      requirementService.approve(ri);
      return "{success:true}";
    } catch (Exception e) {
      e.printStackTrace();
      return "{success:false}";
    }
  }

  /**
   * 带条件查询需求列表
   * 
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<RequirementInfo> queryRequirement(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<RequirementInfo> list = null;
    // parameter中拿userId或者session中拿
    String name = null;
    name=model.getValue("name");
    try {
      list = requirementService.queryByName(name, start, pageSize);
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
  public RequirementInfo load(Model model){
    return requirementService.load(model.getValue("id"));
  }
}
