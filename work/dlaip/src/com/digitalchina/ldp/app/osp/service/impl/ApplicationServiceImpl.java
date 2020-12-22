package com.digitalchina.ldp.app.osp.service.impl;



import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.osp.dao.ApplicationDao;


import com.digitalchina.ldp.app.osp.bean.ApplicationBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;


import com.digitalchina.ldp.app.osp.service.ApplicationService;

import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;




@Service
public class ApplicationServiceImpl implements ApplicationService {
	

	@Autowired
	private ApplicationDao applicationdao;

	
	public int getNumApplication(){
		return applicationdao.getNumApplication();
	};

	@Override
	public ApplicationBean getApplication(String appId)
	{
		return applicationdao.listApplication(appId);		
	};
	
	@Override
	public PageList<ApplicationBean> getNewApplication(int p,int n)
	{
		PageList<UserAppSubmitBean> listByInvoking = applicationdao.listAppSubmit(p, n);
		
		List<ApplicationBean> listApplication = new ArrayList<ApplicationBean>();
		
		PageList<ApplicationBean> result = new PageList<ApplicationBean>();
		result.setCount(0);
		result.setList(listApplication);

		if (null != listByInvoking && listByInvoking.getCount() > 0) {
			
			List<UserAppSubmitBean> list = listByInvoking.getList();

			int count = 0;

			// 依次读取每个服务的详情
			for (UserAppSubmitBean db : list) {

				String appId = db.getAppId();

				ApplicationBean application = this.getApplication(appId);
				if(null != application){

					listApplication.add(application);

					count++;
				}else{
					applicationdao.updateApplication(db.getSubId());
					return null;
				}
			}

			result.setCount(count);
		}
		return result;
	};
	
	@Override
	public PageList<ApplicationBean> getUserApplication(String userId)
	{
		PageList<UserAppSubmitBean> listByInvoking = applicationdao.listUserAppSubmit(0, 100, userId);
		
		List<ApplicationBean> listApplication = new ArrayList<ApplicationBean>();
		
		PageList<ApplicationBean> result = new PageList<ApplicationBean>();
		result.setCount(0);
		result.setList(listApplication);

		if (null != listByInvoking && listByInvoking.getCount() > 0) {
			
			List<UserAppSubmitBean> list = listByInvoking.getList();

			int count = 0;

			// 依次读取每个服务的详情
			for (UserAppSubmitBean db : list) {

				String appId = db.getAppId();

				ApplicationBean application = this.getApplication(appId);
				if(null != application){

					listApplication.add(application);

					count++;
				}
			}

			result.setCount(count);
		}
		return result;		
	}

	
	public void addUserApplicatio(UserAppSubmitBean uasb,ApplicationBean ab){
		applicationdao.AddUserApplicatio(uasb, ab);
	}

	@Override
	public PageList<DynamicBean> QueryAppRank(int start, int pageSize) {
		// TODO Auto-generated method stub
		return applicationdao.queryAppRank(start, pageSize);
	}
}
