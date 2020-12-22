package com.digitalchina.ldp.app.dms.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.RepositoryLog;
import com.digitalchina.ldp.app.dms.dao.RepositoryLogDao;
import com.digitalchina.ldp.app.dms.service.RepositoryLogService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class RepositoryLogServiceImpl implements RepositoryLogService {

	@Autowired
	private RepositoryLogDao repositoryLogDao;

	public PageList<RepositoryLog> find(int pageSize, int limit,Model model) {

		try {
			PageList<RepositoryLog> pageList = repositoryLogDao.find(pageSize, limit,model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job运行列表异常", e);

		}

	}

}