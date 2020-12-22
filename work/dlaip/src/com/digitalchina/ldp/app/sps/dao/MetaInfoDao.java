package com.digitalchina.ldp.app.sps.dao;

import java.util.List;

import com.digitalchina.ldp.app.sps.bean.MetaInfo;

public interface MetaInfoDao
{
	public List<MetaInfo> find(String resourceId,int start,int pageSize);
	
	public List<MetaInfo> findPublished(String resourceId,int start,int pageSize);
}
