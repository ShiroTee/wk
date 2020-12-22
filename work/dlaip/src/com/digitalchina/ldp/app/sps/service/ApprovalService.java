package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.oa.bean.ApprovalComment;
import com.digitalchina.ldp.app.sps.bean.ApprovalInfo;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.UserInfoBean;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface ApprovalService
{
	public void addNewApplication(ApprovalInfo ai) throws Exception ;
	public PageList<ApprovalInfo> getMyApplication(String user,String assetName,int start,int pageSize);
	public PageList<ApprovalInfo> getTodoList(UserInfoBean user,int start,int pageSize);
	public PageList<ApprovalInfo> getDoneList(String user,int start,int pageSize);
	public ApprovalInfo load(String id);
	public ApprovalInfo loadDetail(String id);
	public void approve(String approvalId,ApprovalComment ac,String userId) throws Exception;
    public PageList<ApprovalInfo> query(int start, int pageSize, String orgId, String keyWord,
        String order);
    public PageList<DynamicBean> query(int start, int pageSize, String keyWord,
        String order,String proposerOrgId,String ownerOrgId,String timeStart,String timeEnd);
    public boolean isItProcessable(UserInfoBean user, ApprovalInfo bean);
    public int countForAsset(String assetId);
}
