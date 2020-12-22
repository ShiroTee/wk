package com.digitalchina.ldp.app.dms.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.TransManager;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface TransLogManageDao extends BaseDaoSupport

{

	// 分页获取转化日志管理情况列表
	public PageList<TransManager> find(int pageSize, int limit, Map<String, Object> map);

	// 获取Kettle目录的列表
	public List<RDirectoryBean> getDirectoryList();
}
