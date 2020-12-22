package com.digitalchina.ldp.app.dms.common.util;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
public class CachLinkList  
{
	public static final ConcurrentLinkedQueue<ProjectInfo> QUEUE=new ConcurrentLinkedQueue<ProjectInfo>();
	public static final ThreadLocal<ProjectInfo> THREAD_LOCAL=new ThreadLocal<ProjectInfo>();
}
