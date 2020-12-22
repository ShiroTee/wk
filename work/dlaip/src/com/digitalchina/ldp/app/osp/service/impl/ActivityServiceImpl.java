package com.digitalchina.ldp.app.osp.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.osp.bean.ActivityBean;
import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.app.osp.dao.ActivityServiceDao;
import com.digitalchina.ldp.app.osp.service.ActivityService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;

@Service
public class ActivityServiceImpl extends BaseService implements ActivityService {

	@Autowired
	private ActivityServiceDao activityServiceDao;
	/**
	 * 查询所有查询活动列表（按时间倒序）
	 */
	@Override
	public List<ActivityBean> lookupAllActivity(Model model) {
		return activityServiceDao.lookupAllActivity(model);
	}

	/**
	 * 根据活动id查询活动详情
	 */
	@Override
	public ActivityBean getActivityById(String id) {
		return activityServiceDao.getActivityById(id);
	}

	/**
	 * 按照创建时间分页查询活动详情
	 */
	@Override
	public PageList<ActivityBean> lookupPageActivity(int start, int size) {
		PageList<ActivityBean> result = activityServiceDao.lookupPageActivity(start, size);
		return result;
	}

	/**
	 * 查询所有活动数量
	 */
	@Override
	public int lookupActivityCount(Model model) {
		return activityServiceDao.lookupActivityCount(model);
	}

	@Override
	public void addActivity(String actId, String actName, String actSponsor,
			String actStart, String actEnd, String actDesc, String photoPath,
			String status, Date createTime) throws ParseException {
		ActivityBean activity = new ActivityBean();
		SimpleDateFormat df = new SimpleDateFormat("yy年MM月dd日");
		Date actEndDate = df.parse(actEnd);
		Date actStartDate = df.parse(actStart);
		activity.setActDesc(actDesc);
		activity.setActEnd(actEndDate);
		activity.setActId(actId);
		activity.setActName(actName);
		activity.setActSponsor(actSponsor);
		activity.setActStart(actStartDate);
		activity.setActStatus(status);
		activity.setCreateTime(createTime);
		activity.setPhotoPath(photoPath);
		activityServiceDao.addActivity(activity);
	}

	@Override
	public void updateActivity(String actId, String actName, String sponsor,
			String actStart, String actEnd, String actDesc, String photoPath,
			String status, String createTime) throws ParseException {
		ActivityBean activity = new ActivityBean();
		SimpleDateFormat df = new SimpleDateFormat("yy年MM月dd日");
		Date actStartDate = df.parse(actStart);
		activity.setActStart(actStartDate);
		Date actEndDate = df.parse(actEnd);
		activity.setActEnd(actEndDate);
		if(createTime != null && !"".equals(createTime) && createTime.length() != 0){
			Date createTimeDate = df.parse(createTime);
			activity.setActEnd(createTimeDate);
		}
		activity.setActId(actId);
		activity.setActDesc(actDesc);
		activity.setActId(actId);
		activity.setActName(actName);
		activity.setActSponsor(sponsor);
		activity.setActStatus(status);
		activity.setPhotoPath(photoPath);
		activityServiceDao.updateActivity(activity);
	}

	@Override
	public void deleteActivity(String actId) {
		activityServiceDao.deleteActivity(actId);
	}

}
