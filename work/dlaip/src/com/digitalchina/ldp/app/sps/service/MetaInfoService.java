package com.digitalchina.ldp.app.sps.service;

import com.digitalchina.ldp.app.sps.bean.MetaInfo;
import com.digitalchina.ldp.bean.PageList;

public interface MetaInfoService
{
	public PageList<MetaInfo> getMetaInfos(String resourceId,int start,int pageSize);
	
	
	public PageList<MetaInfo> getPublishedMetaInfos(String resourceId,int start,int pageSize);
}
