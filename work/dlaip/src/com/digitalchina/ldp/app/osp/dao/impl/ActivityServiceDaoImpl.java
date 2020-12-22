package com.digitalchina.ldp.app.osp.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.osp.bean.ActivityBean;
import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.app.osp.dao.ActivityServiceDao;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;

@Component
public class ActivityServiceDaoImpl extends BaseDao implements ActivityServiceDao {

	@Override
	public List<ActivityBean> lookupAllActivity(Model model) {
		return this.createBeanQuery(ActivityBean.class).sortForDesc("createTime").list();
	}

	@Override
	public ActivityBean getActivityById(String id) {
		return this.createBeanQuery(ActivityBean.class).eq("actId", id).uniqueResult();
	}

	@Override
	public PageList<ActivityBean> lookupPageActivity(int start, int size) {
		return this.createBeanQuery(ActivityBean.class).sortForDesc("createTime").page(start, size);
	}

	@Override
	public int lookupActivityCount(Model model) {
		return this.createBeanQuery(ActivityBean.class).sortForDesc("createTime").count();
	}

	@Override
	public void addActivity(ActivityBean activity) {
		this.createExecuteQuery().insert(activity,false);
	}

	@Override
	public void updateActivity(ActivityBean activity) {
		this.createExecuteQuery().update(activity);
	}

	@Override
	public void deleteActivity(String actId) {
		this.createExecuteQuery().delete(ActivityBean.class, actId);
	}

}
