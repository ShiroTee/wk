package com.digitalchina.ldp.app.dms.service;

import com.digitalchina.ldp.app.dms.bean.ProjectInfo;






/*
 * 监控数据采集模板
 */
public interface MonitorDataCollectService
{
	public void collect(ProjectInfo p);
	//载入监控主机到监控队列中
	public void load();
}
