package com.digitalchina.ldp.app.osp.dao;

import java.util.List;

import com.digitalchina.ldp.app.osp.bean.ActivityBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface ActivityServiceDao {
	
	public List<ActivityBean> lookupAllActivity(Model model);
	
	public int lookupActivityCount(Model model);
	
	public ActivityBean getActivityById(String id);

	public PageList<ActivityBean> lookupPageActivity(int start, int size);

	public void addActivity(ActivityBean activity);

	public void updateActivity(ActivityBean activity);

	public void deleteActivity(String actId);
}
