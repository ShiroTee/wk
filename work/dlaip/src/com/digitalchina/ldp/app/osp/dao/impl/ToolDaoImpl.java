package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.bean.ToolBean;
import com.digitalchina.ldp.app.osp.dao.ToolDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ToolDaoImpl extends BaseDao implements ToolDao {

	@Override
	public List<ToolBean> getToolsByKeyWord(String toolName){
		return this.createBeanQuery(ToolBean.class).like("toolName", toolName).list();
	}

	@Override
	public Boolean updateDownloadTime(String toolName) {
		String sql = "update TOOL_INFO set DOWN_COUNT=DOWN_COUNT+1 where TOOL_NAME='" + toolName + "'";
		this.createJdbcTemplate().execute(sql);
		return true;
	}

	@Override
	public PageList<ToolBean> listToolsByDownCount(int start, int size) {
		return this.createBeanQuery(ToolBean.class).sortForDesc("downCount").page(start, size);
	}

}
