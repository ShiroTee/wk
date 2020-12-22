package com.digitalchina.ldp.app.sps.dao;

import com.digitalchina.ldp.app.sps.bean.ApprovalInfo;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface ApprovalDao {
	public PageList<ApprovalInfo> getTodoList(String user,int start,int pageSize);
	
	public PageList<DynamicBean> query(int start, int pageSize,  String keyWord,
        String order,String proposerOrgId,String ownerOrgId,String timeStart,String timeEnd);
}
