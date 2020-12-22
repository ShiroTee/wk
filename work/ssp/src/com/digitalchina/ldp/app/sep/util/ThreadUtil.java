package com.digitalchina.ldp.app.sep.util;

import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
public class ThreadUtil
{
	private static final ThreadLocal<RouteLogInfo> ThreadLocal=new ThreadLocal<RouteLogInfo> ();
	public synchronized static void set(RouteLogInfo log)
	{
		ThreadLocal.set(log);
	}
	public synchronized static RouteLogInfo get()
	{
		return ThreadLocal.get();
	}
	public synchronized static void remove()
	{
		ThreadLocal.remove();
	}
}
