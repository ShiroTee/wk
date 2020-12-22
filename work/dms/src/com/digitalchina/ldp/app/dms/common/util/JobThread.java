package com.digitalchina.ldp.app.dms.common.util;



import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
import com.digitalchina.ldp.app.dms.service.MonitorDataCollectService;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
/**
 * 工作线程，为每个监控主机分配线程
 * @author scala
 *
 */
public class JobThread implements Runnable
{

	private ProjectInfo projectInfo;
	
	private MonitorDataCollectService monitorDataCollectService;
	public JobThread(ProjectInfo projectInfo,MonitorDataCollectService monitorDataCollectService)
	{
		this.projectInfo=projectInfo;
		this.monitorDataCollectService=monitorDataCollectService;
	}
	@Override
	public void run()
	{
		DbContextHolder.setDbType(Constant.DATE_SOURCE_KEY.dms.name());
		monitorDataCollectService.collect(projectInfo);
	}

}
