package com.digitalchina.ldp.app.dms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.dao.TransExceptionDao;
import com.digitalchina.ldp.app.dms.service.TransExceptionService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class TransExceptionServiceImpl implements TransExceptionService {

	@Autowired
	private TransExceptionDao transExceptionDao;

	public PageList<KettleErrors> find(int pageSize, int limit, Model model) {

		try {
			PageList<KettleErrors> pageList = transExceptionDao.find(pageSize,
					limit, model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("trans异常记录列表异常", e);

		}

	}

	public String queryLogMessage(Model model) {
		try {
			return transExceptionDao.queryLogMessage(model, model
					.getValue("id"));
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job异常记录列表异常", e);

		}
	}

}