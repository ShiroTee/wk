package com.digitalchina.ldp.app.osp.dao;

import com.digitalchina.ldp.app.osp.bean.CourseBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

/**
 * Created by zhanglei on 15/4/28.
 */
public interface CourseQueryDao {
    PageList<CourseBean> listCourseByType(int start, int size, String type);

    CourseBean getCourseById(String id);
    
    public PageList<DynamicBean> queryCourseRank(int start, int pageSize);
}
