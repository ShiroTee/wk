package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.CourseBean;
import com.digitalchina.ldp.app.osp.dao.CourseQueryDao;
import com.digitalchina.ldp.app.osp.service.CourseQueryService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 */
@Service
public class CourseQueryServiceImpl implements CourseQueryService {
    @Autowired
    private CourseQueryDao courseQueryDao;

    @Override
    public PageList<CourseBean> listCourseByType(int start, int size, String type) {
        return courseQueryDao.listCourseByType(start, size, type);
    }

    @Override
    public CourseBean getCourseById(String id) {
        return courseQueryDao.getCourseById(id);
    }

	@Override
	public PageList<DynamicBean> QueryCourseRank(int start, int pageSize) {
		// TODO Auto-generated method stub
		return courseQueryDao.queryCourseRank(start, pageSize);
	}
}
