package com.digitalchina.ldp.app.osp.dao;

import com.digitalchina.ldp.app.osp.bean.ServiceCommentBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

import java.util.List;

public interface ServiceCommonDao {
    public PageList<ServiceCommentBean> QueryServiceComment(int start, int pageSize,String comm_simp);
    public void AddServiceComment(ServiceCommentBean scb);

    public List<DynamicBean> getCommSimp(String serviceId);
}
