package com.digitalchina.ldp.app.dms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
import com.digitalchina.ldp.app.dms.common.util.CachLinkList;
import com.digitalchina.ldp.app.dms.dao.ProjectInfoDao;
import com.digitalchina.ldp.app.dms.service.ProjectInfoService;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.exception.ServiceException;
@Service
public class ProjectInfoServiceImpl implements ProjectInfoService
{

	@Autowired
	private ProjectInfoDao projectInfoDao;
	@Override
	public List<ProjectInfo> loadAll()
	{
		Map<String,Object> argsMap=new HashMap<String,Object>();
		try
		{
			argsMap.put("status",Constant.STATUS_TYPE.Y.name());
			List<ProjectInfo> list=projectInfoDao.find(ProjectInfo.class, argsMap);
			//将数据读入到缓存队列中
			CachLinkList.QUEUE.addAll(list);
			return list;
		}
		catch(DataAccessException e)
		{
			throw new ServiceException("载入监控队列异常",e);
		}
	
	}

}
