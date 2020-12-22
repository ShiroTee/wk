package com.digitalchina.ldp.app.sps.service.impl;

import java.util.Date;

import com.digitalchina.ldp.app.sps.bean.AssetInfo;
import com.digitalchina.ldp.app.sps.service.ResourceWebService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;

public class ResourceWebServiceImpl extends BaseService implements ResourceWebService
{

	@Override
	public PageList<AssetInfo> queryByOrg(String orgId, int start,
			int pageSize, String assetName, Date startPubDate, Date endPubDate)
	{
		return null;
	}

	@Override
	public PageList<AssetInfo> queryByOrg(String orgId, String userId,
			int start, int pageSize, String assetName, Date startPubDate,
			Date endPubDate)
	{
		return null;
	}

	@Override
	public PageList<AssetInfo> queryBySubject(String subjectId, int start,
			int pageSize, String assetName, Date startPubDate, Date endPubDate)
	{
		return null;
	}

	@Override
	public PageList<AssetInfo> queryBySubject(String subjectId, String userId,
			int start, int pageSize, String assetName, Date startPubDate,
			Date endPubDate)
	{
		return null;
	}
	
}