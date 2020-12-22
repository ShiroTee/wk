package com.digitalchina.ldp.app.dms.common.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.digitalchina.ldp.app.dms.bean.DataBaseInfoBean;
import com.digitalchina.ldp.common.constant.Constant;


public class ConnectionUtil
{
	private Connection conn;
	static
	{
		try
		{
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public ConnectionUtil(String ipAddress,String user,String password,int port,String dataBaseName)
	{
		try
		{
			
			StringBuffer url=new StringBuffer("jdbc:oracle:thin:@");
			url.append(ipAddress);
			url.append(":");
			url.append(port);
			url.append(":");
			url.append(dataBaseName);
			DriverManager.setLoginTimeout(10);
			this.conn=DriverManager.getConnection(url.toString(), user, password);
			
		} catch (Exception e)
		{
			
			this.conn=null;
		}
		
	}
	private Connection getConnection()
	{
		return this.conn;
	}
	public DataBaseInfoBean getDataBaseInfo()
	{
		Connection conn=null;
		DataBaseInfoBean bean=null;
		bean=new DataBaseInfoBean();
		try
		{	
			conn=this.getConnection();
			if(conn!=null)
			{
				
				bean.setStatus(Constant.STATUS_TYPE.Y.name());
			}
			else
			{
				bean.setStatus(Constant.STATUS_TYPE.N.name());
				bean.setErrorMsg("数据库连接失败");
			}
		}
		catch(Exception e)
		{
			bean.setStatus(Constant.STATUS_TYPE.N.name());
			bean.setErrorMsg("数据库连接失败");
		}
		finally
		{
			if(conn!=null)
			{
				try
				{
					conn.close();
				} catch (SQLException e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return bean;
		
		
		
		
	}
	
}
