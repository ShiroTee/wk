package com.digitalchina.ldp.app.sps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.MetaInfo;
import com.digitalchina.ldp.app.sps.dao.MetaInfoDao;
import com.digitalchina.ldp.app.sps.service.MetaInfoService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;
@Service
public class MetaInfoServiceImpl extends BaseService implements MetaInfoService
{

	@Autowired
	private MetaInfoDao metaInfoDao;
	@Override
	public PageList<MetaInfo> getMetaInfos(String resourceId, int start,
			int pageSize)
	{
		List<MetaInfo> list=metaInfoDao.find(resourceId, start, pageSize);
		PageList<MetaInfo> pageList=new PageList<MetaInfo>(list,list.size());
		return pageList;
	}
  @Override
  public PageList<MetaInfo> getPublishedMetaInfos(String resourceId, int start, int pageSize) {
    List<MetaInfo> list=metaInfoDao.findPublished(resourceId, start, pageSize);
    PageList<MetaInfo> pageList=new PageList<MetaInfo>(list,list.size());
    return pageList;
  }

}
