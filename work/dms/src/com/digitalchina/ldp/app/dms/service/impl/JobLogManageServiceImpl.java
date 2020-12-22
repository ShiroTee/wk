package com.digitalchina.ldp.app.dms.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.dms.bean.LogManager;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.JobLogManageDao;
import com.digitalchina.ldp.app.dms.service.JobLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class JobLogManageServiceImpl implements JobLogManageService {

	@Autowired
	private JobLogManageDao jobLogManageDao;

	public PageList<LogManager> find(int pageSize, int limit,Model model) {

		try {
			PageList<LogManager> pageList = jobLogManageDao.find(pageSize, limit,model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("作业日志管理列表异常", e);

		}

	}
	
	public List<RDirectoryBean> getDirectoryList(){
		try {
			List<RDirectoryBean> list = jobLogManageDao.getDirectoryList();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("作业日志管理列表异常", e);

		}
	}

}