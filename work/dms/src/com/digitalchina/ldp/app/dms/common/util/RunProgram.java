package com.digitalchina.ldp.app.dms.common.util;
/**
 * 监控主线程
 * @author scala
 *
 */
public class RunProgram
{
	//线程对象
	private ThreadUtil threadUtil;
	public ThreadUtil getThreadUtil()
	{
		return threadUtil;
	}
	public void setThreadUtil(ThreadUtil threadUtil)
	{
		
		this.threadUtil = threadUtil;
		Thread thread=new Thread(threadUtil);
		//启动监控主线程
		thread.start();
		System.out.println("后台监控线程启动...");
	}
}
