package com.digitalchina.ldp.app.osp.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import com.digitalchina.ldp.app.osp.bean.ActivityBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface ActivityService {

	public List<ActivityBean> lookupAllActivity(Model model);
	
	public int lookupActivityCount(Model model);
	
	public ActivityBean getActivityById(String id);
	
	public PageList<ActivityBean> lookupPageActivity(int start, int size);

	public void addActivity(String actId, String actName, String sponsor,
			String actStart, String actEnd, String actDesc, String photoPath,
			String status, Date createTime) throws ParseException;

	public void updateActivity(String actId, String actName, String sponsor,
			String actStart, String actEnd, String actDesc, String photoPath,
			String status, String createTime) throws ParseException;

	public void deleteActivity(String actId);

}
