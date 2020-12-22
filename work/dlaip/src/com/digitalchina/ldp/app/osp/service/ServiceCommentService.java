package com.digitalchina.ldp.app.osp.service;


import com.digitalchina.ldp.app.osp.bean.ServiceCommentBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

import java.util.List;


public interface ServiceCommentService {
	
	public PageList<ServiceCommentBean> getServiceComment(int start, int pageSize,String comm_simp);
	
	public void addServiceComment(ServiceCommentBean scb);

	public List<DynamicBean> getCommSimp(String serviceId);
}
