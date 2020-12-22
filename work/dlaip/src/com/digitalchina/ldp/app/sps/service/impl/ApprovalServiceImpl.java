package com.digitalchina.ldp.app.sps.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.jbpm.api.ProcessInstance;
import org.jbpm.api.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.oa.bean.ApprovalComment;
import com.digitalchina.ldp.app.oa.bean.WfGwUserBean;
import com.digitalchina.ldp.app.oa.common.util.jbpm.OaOperateUtil;
import com.digitalchina.ldp.app.oa.service.WfGwUserService;
import com.digitalchina.ldp.app.smp.bean.AuthAndRouteInfo;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.sps.bean.ApprovalInfo;
import com.digitalchina.ldp.app.sps.dao.ApprovalDao;
import com.digitalchina.ldp.app.sps.service.ApprovalService;
import com.digitalchina.ldp.app.ums.bean.PostInfoBean;
import com.digitalchina.ldp.app.ums.dao.OrgInfoManagerDao;
import com.digitalchina.ldp.app.ums.service.UserInfoManagerService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.UserInfoBean;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import com.digitalchina.ldp.service.BaseService;

@Service
public class ApprovalServiceImpl extends BaseService implements ApprovalService {
  private static final String STATUS_ACCEPTION = "等待受理";
  private static final String STATUS_APPROVAL = "等待审批";
  private static final String STATUS_ACCREDITATION = "等待授权";
  @Autowired
  private OaOperateUtil oaOperateUtil;
  @Autowired
  private UserInfoManagerService userInfoManagerService;
  @Autowired
  private WfGwUserService wfgwUserService;
  @Autowired
  private OrgInfoManagerDao orgInfoManagerDao;
  @Autowired
  private ApprovalDao approvalDao;

  /**
   * 提交一个新的申请
   * 
   * @throws Exception
   */
  @Override
  public void addNewApplication(ApprovalInfo ai) throws Exception {
    // 获取流程的节点定义信息
    // 保存申请的基础信息
    this.createExecuteQuery().insert(ai, false);
    // 更新申请的状态
    // 工作流
    Map<String, Object> taskMap = new HashMap<String, Object>();
    // 先写死，后期配置
    // public String getPostByOrgAndNode(String orgId, String nodeName) {
    // WfGwUserServiceImpl.java
    System.out.println("==================== Process Started =========================");
    System.out.println("Target assetId : " + ai.getAssetId() + "   -----    "
        + ai.getAssetProvider());
    String groupOfAcception = BeanDefineConfigue.getProperty("groupOfAcception");
    System.out.println("groupOfAcception : " + groupOfAcception);

    String groupOfAccreditation = BeanDefineConfigue.getProperty("groupOfAccreditation");
    System.out.println("groupOfAccreditation : " + groupOfAccreditation);
    List<WfGwUserBean> postList =
        wfgwUserService.getPostByOrgAndNode(ai.getAssetProvider(), STATUS_APPROVAL);
    String postForStep2 = "";
    for (WfGwUserBean wfGwUserBean : postList) {
      PostInfoBean postInfo = wfGwUserBean.getPostInfo();
      if (null != postInfo) {
        if (postForStep2.length() == 0) {
          postForStep2 += postInfo.getPostId();
        } else {
          postForStep2 += "," + postInfo.getPostId();
        }
      }
    }
    if (postForStep2.length() == 0) {
      throw new ServiceException("未找到,该资源对应的审批岗");
    }
    System.out.println("groupOfProvider : " + postForStep2);
    taskMap.put("groupOfAcception", groupOfAcception);
    taskMap.put("groupOfProvider", postForStep2);
    taskMap.put("groupOfAccreditation", groupOfAccreditation);
    taskMap.put("me", ai.getProposerId());
    taskMap.put("assetName", ai.getAssetName());
    taskMap.put("processName", "resourceApply-1");
    taskMap.put("ai_id", ai.getId());
    ProcessInstance pi = oaOperateUtil.startAndCompleteTask(taskMap);
    Task t = oaOperateUtil.findTaskByExecutionById(pi.getId()).get(0);
    ai.setStatus(t.getName());
    ai.setExecutionId(pi.getId());
    this.createExecuteQuery().update(ai);
  }

  @Override
  public PageList<ApprovalInfo> getDoneList(String user, int start, int pageSize) {
    return null;
  }

  @Override
  public PageList<ApprovalInfo> getMyApplication(String user, String assetName, int start,
      int pageSize) {
    return null;
  }

  @Override
  public PageList<ApprovalInfo> getTodoList(UserInfoBean user, int start, int pageSize) {
    return null;
  }

  @Override
  public ApprovalInfo load(String id) {
    return this.createBeanQuery(ApprovalInfo.class).eq("id", id).uniqueResult();
  }

  @Override
  public ApprovalInfo loadDetail(String id) {
    ApprovalInfo approvalInfo =
        this.createBeanQuery(ApprovalInfo.class).eq("id", id).uniqueResult();
    Map<String, Object> args = new HashMap<String, Object>();
    args.put("executionId", approvalInfo.getExecutionId());
    // 审批列表
    List<ApprovalComment> detailList = oaOperateUtil.findTaskDetail(args);
    UserInfoBean user = null;
    // 获取每次审批的意见和备注
    for (ApprovalComment oaTaskDetailBean : detailList) {
      String taskHisId = oaTaskDetailBean.getTaskId();
      if (null == oaTaskDetailBean.getApproverId()) {
        break;
      }
      user = userInfoManagerService.getUserInfoById(oaTaskDetailBean.getApproverId());
      oaTaskDetailBean.setApproverName(user.getName());
      oaTaskDetailBean.setApproverOrgName(user.getOrgInfo().getOrgName());
      this.oaOperateUtil.getCommentByTaskId(oaTaskDetailBean, taskHisId);
    }
    approvalInfo.setCommentList(detailList);
    return approvalInfo;
  }

  @Override
  public void approve(String approvalId, ApprovalComment ac, String userId) throws Exception {
    try {
      oaOperateUtil.addTaskComment(ac.getTaskId(), ac.getDecision());
      oaOperateUtil.addTaskComment(ac.getTaskId(), ac.getComment());
      oaOperateUtil.completeTask(ac.getTaskId(), ac.getDecision(), userId);
    } catch (NullPointerException npe) {
      throw new Exception("未找到有效的<下一步审批岗位>");
    }
    ApprovalInfo ai = load(approvalId);
    List<Task> tl = oaOperateUtil.findTaskByExecutionById(ai.getExecutionId());
    if (tl.size() > 0) {
      Task t = tl.get(0);
      ai.setStatus(t.getName());
    } else {
      // 已经流转到最后一步
      if (ApprovalInfo.APPROVED.equals(ac.getDecision())) {
        // 上一步为"同意"
        ai.setStatus(ApprovalInfo.SUCCESS);

        // 流程状态为 "申请成功",添加授权信息.
        com.digitalchina.ldp.app.ums.bean.UserInfoBean user =
            this.createBeanQuery(com.digitalchina.ldp.app.ums.bean.UserInfoBean.class)
                .eq("userId", ai.getProposerId()).uniqueResult();
        AuthInfo authInfo;
        // 获取申请用户的详细信息.
        authInfo = this.createBeanQuery(AuthInfo.class).eq("user", user.getUserId()).uniqueResult();
        if (null == authInfo) {
          authInfo = new AuthInfo();
          authInfo.setAddDate(new Date());
          // 生成随机的授权key
          authInfo.setAuthKey(AuthInfo.generateAuthKey(20, null));
          authInfo.setUser(user);
          authInfo.setStatus(1);
          this.createExecuteQuery().insert(authInfo, false);
        }
        AuthAndRouteInfo aari = new AuthAndRouteInfo();
        aari.setAuth(authInfo);
        aari.setAssetId(ai.getAssetId());
        aari.setStatus(1);
        this.createExecuteQuery().insert(aari, false);

      } else if (ApprovalInfo.REJECT.equals(ac.getDecision())) {
        // 上一步为"不同意"
        ai.setStatus(ApprovalInfo.FAILED);
      }
    }
    this.createExecuteQuery().update(ai);
  }

  public PageList<ApprovalInfo> loadByOrg(int start, int pageSize, String orgId) {
    return this.createBeanQuery(ApprovalInfo.class).eq("assetProvider", orgId)
        .page(start, pageSize);
  }

  public PageList<ApprovalInfo> loadAll(int start, int pageSize) {
    return this.createBeanQuery(ApprovalInfo.class).page(start, pageSize);
  }

  @Override
  public PageList<DynamicBean> query(int start, int pageSize, String keyWord, String order,
      String proposerOrgId, String ownerOrgId, String timeStart, String timeEnd) {
    PageList<DynamicBean> result =
        approvalDao.query(start, pageSize, keyWord, order, proposerOrgId, ownerOrgId, timeStart,
            timeEnd);
    if ("status".equals(order)) {
      LinkedList<DynamicBean> list = new LinkedList<DynamicBean>(result.getList());
      for (int x = 0; x < list.size(); x++) {
        DynamicBean d = list.get(x);
        if (STATUS_ACCEPTION.equals(d.getValue("status"))) {
          list.remove(x);
          list.addFirst(d);
        }
      }
      result.setList(list);
    }
    return result;
  }

  /**
   * 流程实例查询
   */
  @Override
  public PageList<ApprovalInfo> query(int start, int pageSize, String orgId, String keyWord,
      String order) {
    BeanQuery<ApprovalInfo> query = this.createBeanQuery(ApprovalInfo.class);
    // 常熟市各部门
    String idOfRoot = BeanDefineConfigue.getProperty("ORG_DEFAULT_ID");
    if (!idOfRoot.equals(orgId)) {
      query.eq("assetProvider", orgId);
    }
    if (keyWord != null && !"".equals(keyWord)) {
      if (STATUS_ACCEPTION.contains(keyWord) || STATUS_ACCREDITATION.contains(keyWord)
          || STATUS_APPROVAL.contains(keyWord) || ApprovalInfo.SUCCESS.contains(keyWord)
          || ApprovalInfo.FAILED.contains(keyWord)) {
        query.like("status", keyWord);
      } else {
        query.like("approvalId", keyWord);
      }
    }
    if (order != null && "time".equals(order)) {
      query.sortForDesc("applyTime");
    } else if (order != null && "status".equals(order)) {
      query.sortForAsc(order);
      PageList<ApprovalInfo> pl = query.page(start, pageSize);
      LinkedList<ApprovalInfo> list = new LinkedList<ApprovalInfo>(pl.getList());
      for (int x = 0; x < list.size(); x++) {
        ApprovalInfo ai = list.get(x);
        if (STATUS_ACCEPTION.equals(ai.getStatus())) {
          list.remove(x);
          list.addFirst(ai);
        }
      }
      pl.setList(list);
      return pl;
    }
    return query.page(start, pageSize);
  }

  @Override
  public boolean isItProcessable(UserInfoBean user, ApprovalInfo bean) {
    if (!STATUS_APPROVAL.equals(bean.getStatus())) {
      return true;
    }
    String ids = orgInfoManagerDao.getUserIds(bean.getAssetId(), bean.getAssetProvider());
    if ("".equals(ids) || ids.contains(user.getUserId())) {
      return true;
    } else {
      return false;
    }
  }

  @Override
  public int countForAsset(String assetId) {
    return this.createBeanQuery(ApprovalInfo.class).eq("assetId", assetId).count();
  }
}
