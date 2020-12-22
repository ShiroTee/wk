package com.digitalchina.ldp.app.sps.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.oa.bean.WfGwUserBean;
import com.digitalchina.ldp.app.oa.common.util.jbpm.OaOperateUtil;
import com.digitalchina.ldp.app.oa.service.WfGwUserService;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.app.ums.bean.PostInfoBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.handler.AbstractHandler;

/**
 * @author 张颖硕
 * 2014-9-9 上午11:08:25
 */
//@Component
public class ApprovalPostConfigHandler  extends AbstractHandler{
	  @Autowired
	  private WfGwUserService wfGwUserService;
	  @Autowired
	  private OaOperateUtil oaOperateUtil;
	  
	  public PageList<WfGwUserBean> findAllApprovalPost(Model model){		    
		  int start = model.getInt("start");
	      int pageSize = model.getInt("limit");
		  String nodeName = model.getValue("nodeName");
		  String orgName = model.getValue("orgName");
		  String postName = model.getValue("postName");
		  Map<String,Object> argMap = new HashMap<String,Object>();
		  argMap.put("nodeName", nodeName);
		  argMap.put("orgName", orgName);
		  argMap.put("postName", postName);

		  return wfGwUserService.findAllApprovalPost(argMap, start, pageSize);
	  }
	  
		public String getAllNodeName(Model model){
			List<String> list =  oaOperateUtil.getActivityNamesByPid("resourceApply-1");
			CreateJson json=new CreateJson();
			for(String str:list)
			{
				//审批岗位配置没有“结束”
				if(!"结束".equals(str)){
					json.add("id",str);
					json.add("name",str);
					json.addToList();
				}
			}
			return json.getResultJson();
		}
		public String getPostsByOrg(Model model){
			String orgId = model.getValue("param_orgid");
			List<PostInfoBean> list = wfGwUserService.getPostsByOrg(orgId, "sps");
			CreateJson json=new CreateJson();
			for(PostInfoBean postInfoBean:list)
			{
				json.add("id",postInfoBean.getPostId());
				json.add("name",postInfoBean.getPostName());
				json.addToList();
			
			}
			return json.getResultJson();
		}
		public String addApprovalPost(Model model){
			String nodeName = model.getValueNotEmpty("nodeCombox1");
			String orgId = model.getValueNotEmpty("orgCombox1");
			String postId = model.getValueNotEmpty("postCombox1");
			WfGwUserBean bean = new WfGwUserBean();
			bean.setNode_name(nodeName);
			OrganizationInfoBean orgbean = new OrganizationInfoBean();
			orgbean.setOrgId(orgId);
			bean.setOrgInfo(orgbean);
			PostInfoBean postbean = new PostInfoBean();
			postbean.setPostId(postId);
			bean.setPostInfo(postbean);
			wfGwUserService.addApprovalPost(bean);
			return "{success:true}";
		}
		
		public String update(Model model){
			String id = model.getValueNotEmpty("id");
			String postId = model.getValueNotEmpty("postCombox1");
			wfGwUserService.update(id, postId);
			return "{success:true}";
		}
		
		public String delete(Model model){
			String ids = model.getValue("jsonData");
			String str[] = ids.split(",");
			wfGwUserService.delete(str);
			
			return "{success:true}";
		}
			  
}

