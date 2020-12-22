package com.digitalchina.ldp.app.dms.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.dms.bean.LogTrans;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.TransDoDao;
import com.digitalchina.ldp.app.dms.service.TransDoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class TransDoServiceImpl implements TransDoService {

	@Autowired
	private TransDoDao transDoDao;

	public PageList<LogTrans> find(int pageSize, int limit,Model model) {

		try {
			PageList<LogTrans> pageList = transDoDao.find(pageSize, limit,model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job运行列表异常", e);

		}

	}
	
	public String queryLogMessage(Model model) {
		try {
			return transDoDao.queryLogMessage(model, model
					.getValue("id"));
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job异常记录列表异常", e);

		}
	}
	
	public List<RDirectoryBean> getDirectoryList(){
		try {
			List<RDirectoryBean> list = transDoDao.getDirectoryList();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job运行列表异常", e);

		}
	}

}