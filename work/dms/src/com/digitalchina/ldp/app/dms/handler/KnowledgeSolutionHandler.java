package com.digitalchina.ldp.app.dms.handler;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dms.service.DataKnowledgeService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class KnowledgeSolutionHandler extends AbstractExtHandler {

	@Autowired
	private DataKnowledgeService dataKnowledgeService;

	public ViewModel page(Model model) {
		ViewModel viewModel = new ViewModel("knowledge/knowledgeSolution.jsp", "knowledge/knowledgeSolution.js");
		return viewModel;
	}

	/**
	 * 文件读取下载
	 * 
	 * @param argsMap
	 */
	public void downloadFile(Model argsMap) {
		InputStream is = null;
		OutputStream os = null;
		String downLoadFilePath = "";
		String fileName = "";
		// 下载的附件 1 是提交附件 2 解决附件 3 是解决方案附件
		DataKnowledgeSolutionBean bean = new DataKnowledgeSolutionBean();
		bean.setId(argsMap.getValue("id"));
		bean = this.dataKnowledgeService.getDataSolutionBean(bean);
		downLoadFilePath = bean.getSolutionAccessoryPath();
		fileName = bean.getSolutionAccessoryName();
		File file = new File(downLoadFilePath);
		HttpServletResponse response = argsMap.getResponse();
		response.reset();
		response.setContentType("application/msword;charset=UTF-8");
		int length = (int) file.length();
		int begin = 0;
		int end = length - 1;
		try {
			byte[] b = new byte[2048];
			is = new BufferedInputStream(new FileInputStream(file));
			os = new BufferedOutputStream(response.getOutputStream());
			//response.addHeader("Content-Disposition", "attachment;filename=\"" + new String(fileName.getBytes("GBK"), "ISO8859_1") + "\"");
			response.addHeader("Content-Disposition", "attachment;filename=\"" + java.net.URLEncoder.encode(fileName, "UTF-8") + "\"");
			// I/O 读写
			for (int i, left = end - begin + 1; left > 0 && ((i = is.read(b, 0, Math.min(b.length, left))) != -1); left -= i) {
				os.write(b, 0, i);
			}
			os.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
				}
			}
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
				}
			}
		}
	}

	/**
	 * 获取解决方案知识库列表
	 * 
	 * @param argsMap
	 * @return
	 */
	public PageList<DataKnowledgeSolutionBean> getKnowledgeSolutionList(Model argsMap) {
		PageList<DataKnowledgeSolutionBean> pageList = dataKnowledgeService.getKnowledgeSolutionFileList(argsMap);
		for (int i = 0; i < pageList.getList().size(); i++) {
			DataKnowledgeSolutionBean bean = pageList.getList().get(i);
			String solutionAccessoryPath = bean.getSolutionAccessoryPath();
			if(!StringUtils.isEmpty(solutionAccessoryPath)){
				solutionAccessoryPath = solutionAccessoryPath.replaceAll("\\\\", "/");
			}
			String typeStr = "0".equals(bean.getType()) ? "手工录入" : "问题库导入";
			bean.setType(typeStr);
			bean.setSolutionAccessoryPath(solutionAccessoryPath);
		}
		return pageList;
	}

	/**
	 * 获取某个解决方案知识数据
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getDataSoultionInfo(Model argsMap) {
		String id = argsMap.getValue("id");
		DataKnowledgeSolutionBean bean = new DataKnowledgeSolutionBean();
		bean.setId(id);
		bean = dataKnowledgeService.getDataSolutionBean(bean);
		String solutionAccessoryPath = bean.getSolutionAccessoryPath();
		if(!StringUtils.isEmpty(solutionAccessoryPath)){
			solutionAccessoryPath = solutionAccessoryPath.replaceAll("\\\\", "/");
			bean.setSolutionAccessoryPath(solutionAccessoryPath);
		}
		BaseBean baseBean = new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData = JSON.toJSONString(baseBean);
		return responseData;
	}

	public String delKnowledgeSolution(Model argsMap) {
		String ids = argsMap.getValue("jsonStr");
		String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"", "\'");
		this.dataKnowledgeService.updateDataQualityBeanMark(reslutStr, "0");
		this.dataKnowledgeService.delKnowledgeSolutionBean(reslutStr);
		// 判定如果是问题库导入的怎需要修改标志
		return "{success:true}";
	}

	public String updateKnowledgeSolution(Model argsMap) throws Exception {
		argsMap.getResponse().setContentType("text/html;charset=utf-8");
		HttpServletRequest request = argsMap.getRequest();
		// 向磁盘写入文件
		String fileName = "";
		String filePath = request.getSession().getServletContext().getRealPath("/") + "/upload/dms/exceptionProcess" + "/" + System.currentTimeMillis();
		MultipartHttpServletRequest re = (MultipartHttpServletRequest) argsMap.getRequest();
		MultipartFile multipartFile=re.getFile("userfile");
		if(multipartFile==null)
		{
			throw new ServiceException("未获取到上传文件");
		}
		//fileName = new String(multipartFile.getOriginalFilename().getBytes("ISO-8859-1"),"UTF-8");
		fileName = multipartFile.getOriginalFilename();

		// 修改数据
		DataKnowledgeSolutionBean dataBean = new DataKnowledgeSolutionBean();

		Map<String, Object> beanMap = new HashMap<String, Object>();
		beanMap.put("subTime", new Date());
		//beanMap.put("title", new String(argsMap.getValueNotEmpty("questionSolutionTitle").getBytes("ISO-8859-1"),"UTF-8"));
		beanMap.put("title", argsMap.getValueNotEmpty("questionSolutionTitle"));
		//beanMap.put("content", new String(argsMap.getValueNotEmpty("questionContent").getBytes("ISO-8859-1"),"UTF-8"));
		beanMap.put("content", argsMap.getValueNotEmpty("questionContent"));
		//beanMap.put("answer", new String(argsMap.getValueNotEmpty("questionAnswer").getBytes("ISO-8859-1"),"UTF-8"));
		beanMap.put("answer", argsMap.getValueNotEmpty("questionAnswer"));
		
		//设置数据是否导入解决方案 0 未导入 1 已导入
		if(!StringUtils.isEmpty(fileName)){
			File file = new File(filePath);
			if (!file.exists()) {
				file.mkdirs();
			}
			String uploadFilePath = filePath+"/"+fileName;
			File zipFile = new File(uploadFilePath);
			try
			{
				multipartFile.transferTo(zipFile);
			} catch (Exception e)
			{
				throw new ServiceException("文件上传异常", e);
			}
			beanMap.put("solutionAccessoryName", fileName);
			beanMap.put("solutionAccessoryPath", filePath + "\\" + fileName);
		}
		dataBean.setId(new String(argsMap.getValueNotEmpty("addQuestionHiddenId").getBytes("ISO-8859-1"),"UTF-8"));
		this.dataKnowledgeService.updateDataSolutionBean(dataBean, beanMap);
		return "{success:true}";
	}

}
