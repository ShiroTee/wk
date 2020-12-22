package com.digitalchina.ldp.app.dms.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.dao.LogJobDao;
import com.digitalchina.ldp.app.dms.service.LogJobService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
@Service
public class LogJobServiceImpl implements LogJobService
{

	@Autowired
	private LogJobDao logJobDao;
	public PageList<LogJob> getLogJobList(int start,int pageSize,Model model) 
	{
		try
		{
			return logJobDao.findForPage(LogJob.class, start, pageSize);
		}
		catch(DataAccessException e)
		{
			e.printStackTrace();
			throw new ServiceException("xxxxx",e);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("xxxxx",e);
		}
		
		
	}
	
	
	public PageList<LogJob> getLogJobList(Map<String, Object> fieldsAndValue,int start,int pageSize) 
	{
		try
		{
			return logJobDao.findForPage(LogJob.class, fieldsAndValue, start, pageSize);
		}
		catch(DataAccessException e)
		{
			e.printStackTrace();
			throw new ServiceException("xxxxx",e);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("xxxxx",e);
		}
		
		
	}
}
