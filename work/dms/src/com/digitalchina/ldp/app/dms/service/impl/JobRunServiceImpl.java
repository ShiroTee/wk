package com.digitalchina.ldp.app.dms.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.JobRunDao;
import com.digitalchina.ldp.app.dms.service.JobRunService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class JobRunServiceImpl implements JobRunService {

	@Autowired
	private JobRunDao jobRunDao;

	public PageList<LogJob> find(int pageSize, int limit,Model model) {

		try {
			PageList<LogJob> pageList = jobRunDao.find(pageSize, limit,model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job运行列表异常", e);

		}

	}
	
	public List<RDirectoryBean> getDirectoryList(){
		try {
			List<RDirectoryBean> list = jobRunDao.getDirectoryList();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job运行列表异常", e);

		}
	}

}