package com.digitalchina.ldp.app.sps.service.impl;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.AssetResInfo;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.ServiceInfo;
import com.digitalchina.ldp.app.sps.service.SynchronizationService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.service.BaseService;
@Service
public class SynchronizationServiceImpl extends BaseService implements SynchronizationService
{

	private static final String RES_TYPE_FILE="1";
	@Override
	public void sync()
	{
		List<AssetResInfo> list=this.createBeanQuery(AssetResInfo.class).list();
		ServiceInfo s=null;
		for(AssetResInfo bean:list)
		{
			//如果不存在相同的主键则进行数据同步操作
			if(this.createBeanQuery(ServiceInfo.class).eq("routeId",bean.getResId()).count()==0)
			{
				
				s=new ServiceInfo();
				s.setRouteDesc(bean.getResDesc());
				s.setRouteId(bean.getResId());
				s.setRouteName(bean.getResName());
				s.setResource(new ResourceCatalogueInfo(bean.getAssetId()));
				s.setPublishDate(new Date());
				/**
				 * 如果资源类型为文件类型，则上传到FTP服务器
				 */
				if(bean.getResType().equals(RES_TYPE_FILE))
				{
					String fileName=new Date().getTime()+"."+bean.getResFormart();
					s.setFileSize(bean.getFileSize());
					s.setFileName(bean.getResName());
					s.setPublishURL(fileName);
					Object o=bean.getFile();
					if(o instanceof Blob)
					{
						try
						{
							((Blob) o).getBinaryStream();
						} catch (SQLException e)
						{
							e.printStackTrace();
							System.out.println("数据操作异常");
							continue;
						}
					}
					else if (o instanceof byte[])
					{
						byte[] digest = (byte[]) o;
						this.uploadFileToFtpServer(fileName, new ByteArrayInputStream(digest));
						s.setPrxoyURL("#");
						s.setRouteType("ftp");
						
					}
					this.createExecuteQuery().insert(s,false);
				}
			}
		}
	}
	private void uploadFileToFtpServer(String fileName,ByteArrayInputStream byteArrayInputStream)
	{
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
			ftpClient.setBufferSize(1024);
			ftpClient.setControlEncoding("GBK");
			FTPClientConfig conf = new FTPClientConfig(FTPClientConfig.SYST_NT);
			conf.setServerLanguageCode("zh");  
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			ftpClient.storeFile(fileName, byteArrayInputStream);
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
	}
}
