package com.digitalchina.ldp.app.dms.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="")
public class TestBean implements java.io.Serializable
{
	@Column(name="")
	private String id;
	private String name;
	private String password;
	private String ipAddress;
	@Column(isNotColumn=false)
	private int age;
	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	public String getIpAddress()
	{
		return ipAddress;
	}
	public void setIpAddress(String ipAddress)
	{
		this.ipAddress = ipAddress;
	}
	public int getAge()
	{
		return age;
	}
	public void setAge(int age)
	{
		this.age = age;
	}
}
