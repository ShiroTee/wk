package com.digitalchina.ldp.app;
import java.net.ConnectException;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.remoting.RemoteConnectFailureException;
import org.springframework.remoting.RemoteLookupFailureException;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
public class ShutdownServer
{
	public static void main(String[] args)throws ConnectException
	{
		System.out.println("正在关闭SSP服务请稍后...");
		try
		{
			ClassPathXmlApplicationContext factory=new ClassPathXmlApplicationContext("sps_applicationContext.xml");
			RmiRouteManager rmiRouteManager=factory.getBean("rmiRouteManager",RmiRouteManager.class);
			rmiRouteManager.shutdown();
			factory.destroy();
			System.exit(0);
		}
		catch(RemoteConnectFailureException e)
		{
		}
		catch(BeanCreationException e)
		{
			Object o=e.getCause();
			if(!(o instanceof RemoteLookupFailureException))
			{
				System.out.println("关闭服务异常");
				e.printStackTrace();
			}
		}
		System.out.println("success");
		
	}
}
