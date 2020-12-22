package com.digitalchina.ldp.app.dms.dao;

import java.util.Map;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RepositoryLog;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDaoSupport;

@Component
public interface RepositoryLogDao extends BaseDaoSupport

{

	// 分页spoon操作记录情况列表
	public PageList<RepositoryLog> find(int pageSize, int limit,
			Map<String, Object> map);

}
