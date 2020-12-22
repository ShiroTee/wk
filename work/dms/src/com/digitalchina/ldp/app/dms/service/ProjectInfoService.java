package com.digitalchina.ldp.app.dms.service;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.ProjectInfo;

//主机信息管理
public interface ProjectInfoService
{
	//载入所有主机信息到内存中
	public List<ProjectInfo> loadAll();
}
