package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.bean.CourseBean;
import com.digitalchina.ldp.app.osp.dao.CourseQueryDao;
import com.digitalchina.ldp.app.osp.defination.COURSE_COLUMN_DEF;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

import org.springframework.stereotype.Component;

/**
 * Created by zhanglei on 15/4/28.
 */
@Component
public class CourseQueryDaoImpl extends BaseDao implements CourseQueryDao {
    @Override
    public PageList<CourseBean> listCourseByType(int start, int size, String type) {
        return this.createBeanQuery(CourseBean.class).eq(COURSE_COLUMN_DEF.COLUMN_COURSE_TYPE,type).page(start, size);
    }

    @Override
    public CourseBean getCourseById(String id) {
        return this.createBeanQuery(CourseBean.class).eq(COURSE_COLUMN_DEF.COLUMN_COURSE_ID, id).uniqueResult();
    }

	@Override
	public PageList<DynamicBean> queryCourseRank(int start, int pageSize) {
		String sql="select u.course_name,(SELECT COUNT(t.COURSE_ID) FROM USER_COURSE_COLLECT t WHERE T.COURSE_ID=U.COURSE_ID and t.collect_status=1 ) as coursecount from course_info u order by coursecount desc";
		return this.createDynamicSqlQuery(sql).page(start, pageSize);
	}
}
