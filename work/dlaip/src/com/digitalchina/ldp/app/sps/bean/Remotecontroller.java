package com.digitalchina.ldp.app.sps.bean;


import com.digitalchina.ldp.app.smp.service.RmiRouteManager;



/**
 * 远程控制器容器
 * @author python
 *
 */
public class Remotecontroller
{
	private String id;
	private String ipAddress;
	private String name;
	private RmiRouteManager rmiRouteManager;
	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
	}
	public String getIpAddress()
	{
		return ipAddress;
	}
	public void setIpAddress(String ipAddress)
	{
		this.ipAddress = ipAddress;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	public RmiRouteManager getRmiRouteManager()
	{
		return rmiRouteManager;
	}
	public void setRmiRouteManager(RmiRouteManager rmiRouteManager)
	{
		this.rmiRouteManager = rmiRouteManager;
	}
	public static void main(String[] args)
	{
	}
}
