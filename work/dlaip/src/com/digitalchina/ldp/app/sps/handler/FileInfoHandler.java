package com.digitalchina.ldp.app.sps.handler;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.cxf.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.service.ServiceManager;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.handler.AbstractHandler;
@Component
public class FileInfoHandler extends AbstractHandler
{
	/**
	 * 删除数据库记录
	 * @param model
	 * @return
	 */
	@Autowired
	private ServiceManager serviceManager;
	public String deleteRouteInfo(Model model)
	{
		String routeId=model.getValue("routeId");
		serviceManager.deleteRoute(routeId);
		return SUCCESS_JSON;
	}
	//返回文件格式列表
	public List<Map<String,String>> getFileFormatList(Model model)
	{
		String strs=BeanDefineConfigue.getProperty("FILE_FORMAT");
		String arrays[]=strs.split(",");
		Map<String,String> map=null;
		List<Map<String,String>> list=new ArrayList<Map<String,String>>(arrays.length+1);
		map=new HashMap<String,String>();
		map.put("name", "全部");
		map.put("value","");
		list.add(map);
		for(String name:arrays)
		{
			map=new HashMap<String,String>();
			map.put("name",name);
			map.put("value",name);
			list.add(map);
		}
		return list;
	}
	public String deleteFile(Model model)
	{
		String fileName=model.getRequest().getParameter("fileName");
		if(StringUtils.isEmpty(fileName))
		{
			throw new ServiceException("未获取到文件名");
		}
		FTPClient ftpClient = new FTPClient();
		FileInputStream fis = null;

		try
		{
			ftpClient.connect(BeanDefineConfigue.getProperty("ftpURL"));
			if (!ftpClient.login(
					BeanDefineConfigue.getProperty("ftpAdmin"),
					BeanDefineConfigue.getProperty("ftpPassword")))
			{
				throw new ServiceException("FTP连接异常");
			}
			// 设置上传目录
			ftpClient.changeWorkingDirectory(BeanDefineConfigue.getProperty("ftpRootPath"));
			ftpClient.deleteFile(fileName);
			ftpClient.logout();
		} catch (IOException e)
		{
			throw new ServiceException("文件上传异常",e);
		} finally
		{
			IOUtils.closeQuietly(fis);
			try
			{
				if (ftpClient.isConnected())
				{
					ftpClient.disconnect();
				}

			} catch (IOException e)
			{
				throw new ServiceException("关闭FTP连接发生异常！", e);
			}
		}
		return SUCCESS_JSON;
	}
}
