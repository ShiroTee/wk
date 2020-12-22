package com.digitalchina.ldp.app.osp.service;

import com.digitalchina.ldp.app.osp.bean.CourseBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

/**
 * Created by zhanglei on 15/4/28.
 */
public interface CourseQueryService {
    PageList<CourseBean> listCourseByType(int start, int size, String type);

    CourseBean getCourseById(String id);
    
    public PageList<DynamicBean> QueryCourseRank(int start, int pageSize);
	/**
     * 用户课程排行
     */
}
