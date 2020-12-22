package com.digitalchina.ldp.app.dms.service;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface JobRunService {

	// job运行情况列表
	public PageList<LogJob> find(int pageSize, int limit, Model model);

	// 方法描述：获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();

}
