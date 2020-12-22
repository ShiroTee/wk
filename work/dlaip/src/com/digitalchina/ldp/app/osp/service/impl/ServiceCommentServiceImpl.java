package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.ServiceCommentBean;
import com.digitalchina.ldp.app.osp.dao.ServiceCommonDao;
import com.digitalchina.ldp.app.osp.service.ServiceCommentService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCommentServiceImpl implements ServiceCommentService {
	@Autowired
	private ServiceCommonDao servicecomment;
	@Override
	public PageList<ServiceCommentBean> getServiceComment(int start, int pageSize,String comm_simp) {
		// TODO Auto-generated method stub
		return servicecomment.QueryServiceComment(start, pageSize,comm_simp);
	}
	@Override
	public void addServiceComment(ServiceCommentBean scb) {
		// TODO Auto-generated method stub
		servicecomment.AddServiceComment(scb);
	}

	@Override
	public List<DynamicBean> getCommSimp(String serviceId) {
		return servicecomment.getCommSimp(serviceId);
	}

}
