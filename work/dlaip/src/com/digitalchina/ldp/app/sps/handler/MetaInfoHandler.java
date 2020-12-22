package com.digitalchina.ldp.app.sps.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.MetaInfo;
import com.digitalchina.ldp.app.sps.service.MetaInfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
@Component
public class MetaInfoHandler extends AbstractHandler
{
	@Autowired
	private MetaInfoService metaInfoService;
	@HttpService
	public PageList<MetaInfo> getMetaInfoByResourceId(Model model)
	{
		String resourceId=model.getValueNotEmpty("resourceId");
		//int start=model.getInt("start");
		//int pageSize=model.getInt("limit");
		return metaInfoService.getMetaInfos(resourceId, 0, 0);
	}
	
	@HttpService
    public PageList<MetaInfo> getPublishedMetaInfoByResourceId(Model model)
    {
        String resourceId=model.getValueNotEmpty("resourceId");
        return metaInfoService.getPublishedMetaInfos(resourceId, 0, 0);
    }
}
