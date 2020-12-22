package com.digitalchina.ldp.app.dms.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.TransManager;
import com.digitalchina.ldp.app.dms.dao.TransLogManageDao;
import com.digitalchina.ldp.app.dms.service.TransLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class TransLogManageServiceImpl implements TransLogManageService {

	@Autowired
	private TransLogManageDao transLogManageDao;

	public PageList<TransManager> find(int pageSize, int limit,Model model) {

		try {
			PageList<TransManager> pageList = transLogManageDao.find(pageSize, limit,model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("转化日志管理列表异常", e);

		}

	}
	
	public List<RDirectoryBean> getDirectoryList(){
		try {
			List<RDirectoryBean> list = transLogManageDao.getDirectoryList();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("转化日志管理列表异常", e);

		}
	}

}