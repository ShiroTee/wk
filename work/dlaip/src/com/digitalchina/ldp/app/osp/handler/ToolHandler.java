package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.ToolBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.ToolService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;


/**
 * 工具Handler
 * @author Administrator
 *
 */
@Component
public class ToolHandler extends AbstractHandler{
	private static Logger logger = Logger.getLogger(ToolHandler.class.getName());
	@Autowired
	private ToolService toolService;
	
	/**
	 * 根据关键字匹配工具
	 * @throws UnsupportedEncodingException 
	 */
	@HttpService
	public List<ToolBean> getToolsByKeyWord(Model model) throws UnsupportedEncodingException{
		AuthUtil.writeInfo(model, logger);
		String toolName = model.getValue("toolName");
		return toolService.getToolsByKeyWord(toolName);
	}

	/**
	 * 文件下载
	 */
	@HttpService
	public void downloadFile(Model model) {
		AuthUtil.writeInfo(model, logger);
		model.getResponse().setCharacterEncoding("UTF-8");
		model.getResponse().setContentType("multipart/form-data");

		String fileName = model.getValueNotEmpty("fileName");
		FTPClient ftpClient = new FTPClient();

		try {
			ftpClient.connect(BeanDefineConfigue.getProperty("ftpURL"));
			ftpClient.login(BeanDefineConfigue.getProperty("ftpAdmin"), BeanDefineConfigue.getProperty("ftpPassword"));

			int reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftpClient.disconnect();
				return;
			}
			// 设置文件操作目录
			ftpClient.changeWorkingDirectory(BeanDefineConfigue.getProperty("ftpRootPath"));
			// 设置文件类型，二进制
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			// 设置缓冲区大小
			ftpClient.setBufferSize(3072);
			// 设置字符编码
			ftpClient.setControlEncoding("UTF-8");

			FTPFile[] fs = ftpClient.listFiles();
			for (FTPFile f : fs) {
				if (f.getName().equals(fileName)) {
					// retrieveFile的第一个参数需要是 ISO-8859-1 编码
					String saveAsFileName = new String(f.getName().getBytes("UTF-8"), "ISO-8859-1");
					model.getResponse().setHeader("Content-Disposition", "attachment;fileName=" + saveAsFileName);
					OutputStream os = model.getResponse().getOutputStream();
					ftpClient.retrieveFile(saveAsFileName, os);
					os.flush();
					os.close();
					break;
				}
			}
			//下载次数加一
			try {
				toolService.updateDownloadTime(fileName);
			} catch (Exception e) {
				e.printStackTrace();
			}
			ftpClient.logout();
		} catch (IOException e) {
			throw new ServiceException("文件下载异常", e);
		} finally {
			try {
				if (ftpClient.isConnected()) {
					ftpClient.disconnect();
				}
			} catch (IOException e) {
				throw new ServiceException("关闭FTP连接发生异常！", e);
			}
		}
	}
	
	/**
	 * 根据下载次数获取工具列表
	 */
	@HttpService
	public PageList<ToolBean> listToolsByDownCount(Model model){
		AuthUtil.writeInfo(model, logger);
		 int start = model.getInt(BS_PARAM.BS_START_STR);
	     int size = model.getInt(BS_PARAM.BS_LIMIT_STR);
	     return toolService.listToolsByDownCount(start,size);
	}
}
