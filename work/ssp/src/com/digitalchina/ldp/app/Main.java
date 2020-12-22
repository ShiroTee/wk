package com.digitalchina.ldp.app;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.digitalchina.ldp.app.sep.core.RouterManagerImpl;
public class Main
{
	private static final Log logs = LogFactory.getLog(Main.class);
	public static void main(String[] args)
	{
		RouterManagerImpl.run(null,null,null);
		logs.info("SSP服务启动成功....");
		/*
		try
		{
			while(true)
			{
				Thread.sleep(2000);
				System.out.println(Thread.activeCount());
			}
			
		} catch (InterruptedException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
	}
	
}