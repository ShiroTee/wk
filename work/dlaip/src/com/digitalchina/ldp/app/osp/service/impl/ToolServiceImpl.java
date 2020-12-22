package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.ToolBean;
import com.digitalchina.ldp.app.osp.dao.ToolDao;
import com.digitalchina.ldp.app.osp.service.ToolService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolServiceImpl extends BaseService implements ToolService {
	
	@Autowired
	private ToolDao toolDao;
	
	/**
	 * 根据关键字查询工具
	 */
	@Override
	public List<ToolBean> getToolsByKeyWord(String toolName) {
		return toolDao.getToolsByKeyWord(toolName);
	}

	@Override
	public Boolean updateDownloadTime(String toolName) {
		return toolDao.updateDownloadTime(toolName);
	}

	@Override
	public PageList<ToolBean> listToolsByDownCount(int start, int size) {
		return toolDao.listToolsByDownCount(start,size);
	}

}
