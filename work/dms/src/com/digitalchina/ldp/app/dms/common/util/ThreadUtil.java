package com.digitalchina.ldp.app.dms.common.util;



import java.util.ArrayList;
import java.util.List;

import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
import com.digitalchina.ldp.app.dms.service.MonitorDataCollectService;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;

/**
 * 子线程调度
 * @author scala
 *
 */

public class ThreadUtil implements Runnable
{

	
	private MonitorDataCollectService monitorDataCollectService;
	public void setMonitorDataCollectService(
			MonitorDataCollectService monitorDataCollectService)
	{
		this.monitorDataCollectService = monitorDataCollectService;
	}
	@Override
	public void run()
	
	{	
		//切换数据源。数据源切换只能在同一个线程中有效(ThreadLocal)
		DbContextHolder.setDbType(Constant.DATE_SOURCE_KEY.dms.name());
		//从数据库从载入监控主机到监控队列
		monitorDataCollectService.load();
		//死循环，由主线程控制
		while(true)
		{
			ProjectInfo p=null;
			List<ProjectInfo> list=new ArrayList<ProjectInfo>();
			//依次把监控主机从监控队列中剔除
			while((p=CachLinkList.QUEUE.poll())!=null)
			{
				//克隆监控主机对象(对象克隆)
				ProjectInfo p2=(ProjectInfo)p.clone();
				Thread thread=new Thread(new JobThread(p,this.monitorDataCollectService),"thread-"+p.getId());
				list.add(p2);
				//启动子线程，为每个主机分配一个线程
				thread.start();
				try
				{
					//子线程休眠
					Thread.sleep(500);
				} catch (InterruptedException e)
				{
				}
			}
			//完成一个监控，复制监控卡队列
			CachLinkList.QUEUE.addAll(list);
			try
			{
				//主线程休眠，该事件作为下一次监控时间
				Thread.sleep(2000*60*10);
			}
			catch(Exception e)
			{
				
			}
			
		}
		
	}

}
