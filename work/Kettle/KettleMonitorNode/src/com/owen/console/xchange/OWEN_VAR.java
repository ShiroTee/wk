package com.owen.console.xchange;

import java.io.File;
import java.io.FileFilter;
import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.Arrays;
import java.util.List;

import com.dataman.config.SystemCollect;
import com.dataman.config.SystemInfo;
import com.dataman.config.SystemManager;
import com.owen.console.publish.Communication;


public final class OWEN_VAR{
	
	protected OWEN_VAR() throws RemoteException {
		super();
	}

	private static Communication console			= null;
	
	public final static String 	IMOK 				= "OK";
	public final static String 	STR_SEP 			= "##";
	public static String 	SVR_IP ; 			
//	= "172.17.150.220";
//	public final static int 	SVR_PORT 			= 6600;
//	public final static String 	SVR_NAME 			= "IOwenServer";
	public final static String 	DEFAULT_INTERVAL 	= "1";
	
	public final static int 	ORP_SIZE 			= 48;
	public final static int		ORP_INITDEALY		= 0;
	public final static int 	ORP_DEFAULTDEALY 	= Integer.parseInt(DEFAULT_INTERVAL)*360;
	
	
	/*public final static String 	CONSOLE_IP 	=null;		
	//= "172.17.150.220";
	public final static int 	CONSOLE_PORT =0;		
	//= 6600;
	public final static String 	CONSOLE_NAME 	=null;	
	//= "Communication";
*/	
	
	
	public final static String	SURROUND_BRACES(String name){
		return "<<" + name + ">>";
	}
	
	
	public final static Communication getConsole() throws MalformedURLException, RemoteException, NotBoundException{
		
		if(null != console){
			
			return console;
			
		}else {
			SystemCollect systemCollection = loadSystemConfig();
			
			//服务端
			SystemInfo server = systemCollection.getOther(Communication.class, "use");
			String serverComUrl = server.getBindAddress();
			console =  (Communication) Naming.lookup(serverComUrl);
			
			//客户端
			SystemInfo client = systemCollection.getSelf();
			SVR_IP = client.getBindIPv4();
			
			return console;
		}
	}
	
	/**
	 * 默认加载当前工程src目录下的systeminfo.xml中配置的关联子系统的信息
	 * */
	private static SystemCollect loadSystemConfig(){
		File filelist = new File(SystemManager.getClassPath());
		List<File> list  =  Arrays.asList(
			filelist.listFiles(
				new FileFilter () {
					public boolean accept(File pathname) {
					    if (pathname.getName().equals(SystemManager.getSystemInfoConfigFileName())){
					        return true;
					    }else{
					    	return false;
					    }
					}
				}
			));
		
		SystemCollect sc = null;
		File f = list.get(0);
		sc = SystemManager.getSystemCollect(f);
		
		if(null == sc){
			System.out.println("!!请在当前工程的src目录下添加systeminfo.xml配置文件，并为其设置正确的系统信息!!");
			return null;
		}else {
			return sc;
		}
	}
}
