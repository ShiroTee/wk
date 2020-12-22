package com.digitalchina.ldp.app.sps.handler;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.oa.bean.ApprovalComment;
import com.digitalchina.ldp.app.oa.common.util.jbpm.OaOperateUtil;
import com.digitalchina.ldp.app.sps.bean.ApprovalInfo;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.service.ApprovalService;
import com.digitalchina.ldp.app.sps.service.OrganizationService;
import com.digitalchina.ldp.app.sps.service.ResourceCatalogueService;
import com.digitalchina.ldp.app.ums.service.UserInfoManagerService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.UserInfoBean;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

@Component
public class ApprovalHandler extends AbstractHandler {
  @Autowired
  private ApprovalService approvalService;

  @Autowired
  private UserInfoManagerService userInfoManagerService;

  @Autowired
  private ResourceCatalogueService resourceCatalogueService;

  @Autowired
  private OaOperateUtil oaOperateUtil;
  
  @Autowired
  private OrganizationService organizationService;

  /**
   * 处理以service形式过来的 发起申请的操作
   * 
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public String applyBatch(Model model) {
    String[] appliedList = model.getValue("appliedList").split(",");
    String userId = model.getValue("proposerId");
    UserInfoBean user = userInfoManagerService.getUserInfoById(userId);
    String comment = model.getValue("comment");
    String userPhone = model.getValue("userPhone");
    ApprovalInfo ai;
    ResourceCatalogueInfo rci;
    for (int i = 0; i < appliedList.length; i++) {
      rci = resourceCatalogueService.getByResourceId(appliedList[i]);
      ai = new ApprovalInfo();
      ai.setProposerId(user.getUserId());
      ai.setProposerName(user.getName());
      ai.setProposerOrgName(user.getOrgInfo().getOrgName());
      ai.setApplyTime(new Date());
      ai.setAssetId(rci.getResourceId());
      ai.setAssetName(rci.getResourceName());
      ai.setAssetProvider(organizationService.getApprovalOrgByOrgCD(rci.getProvider().getOrgCd()));
      ai.setAssetProviderName(rci.getProvider().getOrgName());
      ai.setComment(comment);
      ai.setProposerPhone(userPhone);
      ai.setApprovalId(generateApprovalId(ai));
      try {
        approvalService.addNewApplication(ai);
      } catch (Exception e) {
        return "{success:false,msg:'" + e.getMessage() + "'}";
      }
    }
    return "{success:true}";
  }

  /**
   * 从门户通过jsonp 发起一个申请
   * 
   * @param model
   * @return S/F
   */
  @HttpService
  public String apply(Model model) {
    String userId = model.getValue("proposerId");
    // 获取用户详细信息.
    UserInfoBean user = userInfoManagerService.getUserInfoById(userId);
    ResourceCatalogueInfo rci = resourceCatalogueService.getByResourceId(model.getValue("assetId"));
    ApprovalInfo ai = new ApprovalInfo();
    ai.setProposerId(user.getUserId());
    ai.setProposerName(user.getName());
    ai.setProposerOrgName(user.getOrgInfo().getOrgName());
    ai.setApplyTime(new Date());
    ai.setAssetId(model.getValue("assetId"));
    ai.setAssetName(rci.getResourceName());
    ai.setAssetProvider(organizationService.getApprovalOrgByOrgCD(rci.getProvider().getOrgCd()));
    ai.setAssetProviderName(rci.getProvider().getOrgName());
    ai.setComment(model.getValue("description"));
    ai.setApprovalId(generateApprovalId(ai));
    ai.setSipUrl(model.getValue("sipUrl"));
    ai.setSipUserName(model.getValue("sipUserName"));
    ai.setSipPassword(model.getValue("sipPassword"));
    ai.setAttachments(model.getValue("attachments"));
    try {
      approvalService.addNewApplication(ai);
      return "{success:true}";
    } catch (Exception e) {
      return "{success:false,msg:'" + e.getMessage() + "'}";
    }
  }

  /**
   * 获取当前用户说发起的申请列表 或者处理以service形式过来的 获取我的申请 的操作
   * 
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId"),
   * @return
   */
  @HttpService
  public PageList<ApprovalInfo> getMyApplication(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    String assetName = model.getValue("assetName");
    String userId =
        model.getSystemModel().getUser() == null ? model.getValue("userId") : model
            .getSystemModel().getUser().getUserId();
    // FIXME
    // userId="97f69369-f394-4fd7-a240-390068ec1873";
    PageList<ApprovalInfo> resultPageList = new PageList<ApprovalInfo>();
    try {
      List<ApprovalInfo> resultList = new ArrayList<ApprovalInfo>();
      Map<String, Object> args = new HashMap<String, Object>();
      if (!StringUtils.isEmpty(assetName)) {
        args.put("assetName", assetName);
      }
      PageList<Map<String, Object>> pageList =
          oaOperateUtil.findMyapplyByCondition(start, pageSize, userId, args);
      List<Map<String, Object>> list = pageList.getList();
      ApprovalInfo bean = null;
      // 业务ID主键
      String ai_id = "";
      for (Map<String, Object> map : list) {
        String executionId = (String) map.get("ID_");
        ai_id = oaOperateUtil.getHisVariableByExecutionId(executionId, "ai_id");
        bean = approvalService.load(ai_id);
        resultList.add(bean);
      }
      resultPageList.setList(resultList);
      resultPageList.setCount(pageList.getCount());
    } catch (Exception e) {
      e.printStackTrace();
    }
    return resultPageList;
  }

  /**
   * 加载一个指定的申请信息 或者 处理以service形式过来的 获取详细信息的操作
   * 
   * @param model
   * @return
   */
  @HttpService
  public List<ApprovalInfo> load(Model model) {
    ApprovalInfo ai;
    List<ApprovalInfo> list = new ArrayList<ApprovalInfo>();
    try {
      String id = model.getValue("id");
      ai = approvalService.load(id);
      list.add(ai);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }
  /**
   * 
   * @param model
   * @return
   */
  @HttpService
  public PageList<DynamicBean> queryForService(Model model){
    return query(loadUser(model));
  }
  
  /**
   * 流程实例查询
   * @param model
   * @return
   */
  @HttpService
  public PageList<DynamicBean> query(Model model){
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    String keyWord=model.getValue("kw");
    String proposerOrgId=model.getValue("pOid");
    String ownerOrgId=model.getValue("oOid");
    String timeStart=model.getValue("ts");
    String timeEnd=model.getValue("te");
    String order=model.getValue("o");
    try {
      return approvalService.query(start,pageSize,keyWord,order,proposerOrgId,ownerOrgId,timeStart,timeEnd);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @HttpService
  public List<ApprovalInfo> loadDetail(Model model) {
    ApprovalInfo ai;
    List<ApprovalInfo> list = new ArrayList<ApprovalInfo>();
    try {
      String[] ids = model.getValue("id").split(",");
      for (String id : ids) {
        ai = approvalService.loadDetail(id);
        list.add(ai);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return list;
  }

  @HttpService
  public String getTodoQuantityForService(Model model) {
    return getTodoQuantity(loadUser(model));
  }

  @HttpService
  public String getTodoQuantity(Model model) {
    UserInfoBean user = model.getSystemModel().getUser();
    // FIXME FOR TEST
    // user=userInfoManagerService.getUserInfoById("4ef43313-6985-4cd9-9760-939c6a35ef26");
    Map<String, Object> args = new HashMap<String, Object>();
    args.put("userId", user.getUserId());
    PageList<Map<String, Object>> pageList =
        oaOperateUtil.findPersonalTasksByCondition(args, 0, Integer.MAX_VALUE);
    List<Map<String,Object>> list=pageList.getList();
    ApprovalInfo bean = null;
    // 任务ID
    String taskId = null;
    // 任务名称
    // 业务ID主键
    String ai_id = null;
    int count=0;
    for (Map<String, Object> map : list) {
      taskId = StringUtils.objToString(map.get("DBID_"));
      ai_id = StringUtils.objToString(oaOperateUtil.getVariable(taskId, "ai_id"));
      bean = approvalService.load(ai_id);
      if(null!=bean){
        //判定当前用户是否能进行该申请的处理.
        if(approvalService.isItProcessable(user,bean)){
          count++;
        }
      }
    }
    return String.valueOf(count);
  }

  /**
   * 处理以service形式过来的 获取代办列表操作
   * 
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<ApprovalInfo> getTodoListForService(Model model) {
    return getTodoList(loadUser(model));
  }

  /**
   * 获取当前用户的代办列表
   * 
   * @param model.getInt("start"),model.getInt("limit"),model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<ApprovalInfo> getTodoList(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    UserInfoBean user = model.getSystemModel().getUser();
    // FIXME FOR TEST
    // user=userInfoManagerService.getUserInfoById("4ef43313-6985-4cd9-9760-939c6a35ef26");
    try {
      PageList<ApprovalInfo> resultPageList = new PageList<ApprovalInfo>();
      List<ApprovalInfo> resultList = new ArrayList<ApprovalInfo>();
      Map<String, Object> args = new HashMap<String, Object>();
      args.put("userId", user.getUserId());
      PageList<Map<String, Object>> pageList =
          oaOperateUtil.findPersonalTasksByCondition(args, start, pageSize);
      List<Map<String, Object>> list = pageList.getList();
      ApprovalInfo bean = null;
      // 任务ID
      String taskId = "";
      // 任务名称
      // 业务ID主键
      String ai_id = "";
      for (Map<String, Object> map : list) {
        taskId = StringUtils.objToString(map.get("DBID_"));
        ai_id = StringUtils.objToString(oaOperateUtil.getVariable(taskId, "ai_id"));
        bean = approvalService.load(ai_id);
        if(null!=bean){
          //判定当前用户是否能进行该申请的处理.
          if(approvalService.isItProcessable(user,bean)){
            bean.setTaskId(taskId);
            resultList.add(bean);
          }
        }
      }
      resultPageList.setList(resultList);
      resultPageList.setCount(pageList.getCount());
      return resultPageList;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  /**
   * 获取当前用户的已办列表 或者 处理以service形式过来的 获取已办列表操作
   * 
   * @param model.getInt("start"),model.getInt("limit") model.getValue("userId")
   * @return
   */
  @HttpService
  public PageList<ApprovalInfo> getDoneList(Model model) {
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    PageList<ApprovalInfo> resultPageList = new PageList<ApprovalInfo>();
    List<ApprovalInfo> resultList = new ArrayList<ApprovalInfo>();
    String userId =
        model.getSystemModel().getUser() == null ? model.getValue("userId") : model
            .getSystemModel().getUser().getUserId();
    try {
      Map<String, Object> args = new HashMap<String, Object>();
      // FIXME
      // userId="4ef43313-6985-4cd9-9760-939c6a35ef26";
      args.put("userId", userId);
      PageList<String> pageList = oaOperateUtil.findMyapprovalByCondition(start, pageSize, args);
      List<String> list = pageList.getList();
      String ai_id = "";
      for (String executionId : list) {
        // 获取业务数据主键ID
        ai_id = oaOperateUtil.getHisVariableByExecutionId(executionId, "ai_id");
        resultList.add(approvalService.load(ai_id));
      }
      resultPageList.setList(resultList);
      resultPageList.setCount(pageList.getCount());
      return resultPageList;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  /**
   * 处理以service形式过来的 审批操作
   * 
   * @param model.getValue("approvalId") ,model.getValue("status"),
   *        model.getValue("decision"),model.getValue("approvalComment") ,model.getValue("userId")
   * 
   * @return
   */
  @HttpService
  public String dealForService(Model model) {
    return deal(loadUser(model));
  }

  /**
   * 审批指定申请
   * 
   * @param model
   * @return S/F
   */
  @HttpService
  public String deal(Model model) {
    ApprovalComment ac = new ApprovalComment();
    if (ApprovalInfo.APPROVED.equals(model.getValue("decision"))) {
      ac.setDecision(ApprovalInfo.APPROVED);
    } else if (ApprovalInfo.REJECT.equals(model.getValue("decision"))) {
      ac.setDecision(ApprovalInfo.REJECT);
    } else {
      return "{success:false,msg:'未指定审批意向'}";
    }
    String approvalId = model.getValue("approval_Id");
    ac.setTaskId(model.getValue("taskId"));
    ac.setStepName(model.getValue("status"));
    UserInfoBean user = model.getSystemModel().getUser();
    // FIXME FOR TEST
    // user=userInfoManagerService.getUserInfoById("4ef43313-6985-4cd9-9760-939c6a35ef26");
    // model.getSystemModel().setUser(user);
    ac.setApproverId(user.getUserId());
    ac.setApproverName(user.getName());
    ac.setApproverOrgName(user.getOrgInfo().getOrgName());
    ac.setComment(model.getValue("approvalComment"));
    ac.setDealTime(new Date());
    try {
      approvalService.approve(approvalId, ac, model.getSystemModel().getUser().getUserId());
      return "{success:true}";
    } catch (Exception e) {
      e.printStackTrace();
      return "{success:false,msg:'" + e.getMessage() + "'}";
    }
  }

  /**
   * 根据userId 载入完整user 对象到model.getSystemModel.getUser 中
   * 
   * @param model.getValue("userId")
   * @return
   */
  Model loadUser(Model model) {
    String userId = model.getValue("userId");
    UserInfoBean user = userInfoManagerService.getUserInfoById(userId);
    model.getSystemModel().setUser(user);
    return model;
  }

  /**
   * 生成一个申请流水号
   * 
   * @param ai
   * @return
   */
  String generateApprovalId(ApprovalInfo ai) {
    StringBuilder sb = new StringBuilder();
    sb.append(ai.getProposerName()).append("_");
    sb.append(ai.getAssetName()).append("_");
    sb.append(Math.round(Math.random() * 10000));
    return sb.toString();
  }
}
