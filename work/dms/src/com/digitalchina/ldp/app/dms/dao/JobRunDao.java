package com.digitalchina.ldp.app.dms.dao;

import java.util.List;

import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface JobRunDao extends BaseDaoSupport

{

	// 分页获取服务列表
	public PageList<LogJob> find(int pageSize, int limit, Model model);
	
	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();
}
