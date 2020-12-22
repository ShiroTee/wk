package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.CourseBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.CourseQueryService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 读取教程的Handler
 * Created by zhanglei on 15/4/28.
 */
@Component
public class CourseHandler extends AbstractHandler {
    private static Logger logger = Logger.getLogger(CourseHandler.class.getName());
    @Autowired
    private CourseQueryService courseQueryService;

    /**
     * 按教程类型获取教程列表
     */
    @HttpService
    public PageList<CourseBean> getCourseByType(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt(BS_PARAM.BS_START_STR);
        int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
        String type = model.getValueNotEmpty("couresType");
        return courseQueryService.listCourseByType(start, size, type);
    }

    /**
     * 单一教程详情查询
     */
    @HttpService
    public CourseBean getCourseById(Model model) {
        AuthUtil.writeInfo(model, logger);
        String id = model.getValueNotEmpty("courseId");
        return courseQueryService.getCourseById(id);
    }

    /**
     * 根据字母检索esb_route_info表的publish_url字段中以检索字母打头的
     */
    @HttpService
    public PageList<DynamicBean> getCourseRank(Model model){
        AuthUtil.writeInfo(model, logger);
		int start = model.getInt(BS_PARAM.BS_START_STR); //开始编号
		int pageSize = model.getInt(BS_PARAM.BS_LIMIT_STR); //取数据条数
		return courseQueryService.QueryCourseRank(start, pageSize);		
	}

}
