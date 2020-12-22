package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.ServiceCommentBean;
import com.digitalchina.ldp.app.osp.common.StringUtils;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.ServiceCommentService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class ServiceCommentHandler extends AbstractHandler {
	private static Logger logger = Logger.getLogger(ServiceCommentHandler.class.getName());
	@Autowired
	private ServiceCommentService servicecommentservice;
	@HttpService
	public List<ServiceCommentBean> getServiceComment(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = model.getInt("start"); //开始编号
		int pageSize = model.getInt("limit"); //取数据条数
		String comm_simp = model.getValueNotEmpty("comm_simp");
		return servicecommentservice.getServiceComment(start, pageSize,comm_simp).getList();
	}
	@HttpService
	public void addServiceComment(Model model){
		AuthUtil.writeInfo(model, logger);
		String user_id = model.getValueNotEmpty("user_id");
		String res_id = model.getValueNotEmpty("res_id");
		String comm_simp = model.getValueNotEmpty("comm_simp");
		String comm_detail = model.getValueNotEmpty("comm_detail");
		String comm_status = model.getValueNotEmpty("comm_status");
		ServiceCommentBean scb = new ServiceCommentBean();
		scb.setComm_detail(comm_detail);
		
		scb.setComm_status(comm_status);
		scb.setComm_time(new Date());
		scb.setRes_id(res_id);
		scb.setUser_id(user_id);
		scb.setComm_id(StringUtils.getPrimarykeyId());
		servicecommentservice.addServiceComment(scb);
	}

	@HttpService
	public List<DynamicBean> getCommSimp(Model model) {
		AuthUtil.writeInfo(model, logger);
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		return servicecommentservice.getCommSimp(serviceId);
	}
}
