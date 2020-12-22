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
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.service.JobExceptionService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.UserInfoBean;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class KnowledgeHandler extends AbstractExtHandler {
	@Autowired
	private JobExceptionService jobExceptionService;

	@Override
	public ViewModel page(Model model) {
		ViewModel viewModel = new ViewModel("knowledge/knowledgeQuality.jsp", "knowledge/knowledgeQuality.js");
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
		KettleErrors bean = this.jobExceptionService.getKettleErrorsBeanInfo(argsMap);
		downLoadFilePath = bean.getSolveAccessoryPath();
//		//对上传的附件中文名称进行解码
//		try {
//			fileName = java.net.URLDecoder.decode(bean.getSolveAccessoryName(),"GBK");
//		} catch (UnsupportedEncodingException e1) {
//			e1.printStackTrace();
//		}
		fileName = bean.getSolveAccessoryName();
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
	 * 获取数据列表
	 * 
	 * @param argsMap
	 * @return
	 */
	public PageList<KettleErrors> getDataFileList(Model model) {
		model.put("flag", "1");
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<KettleErrors> list = jobExceptionService.find(start, end, model);
		return list;
	}

	public String getLogMessage(Model model) {
		String msg = jobExceptionService.queryLogMessage(model);

		return msg;
	}

	public String solveQuestionData(Model argsMap) throws Exception {
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
		//对上传的附件中文名称进行编码
		//fileName  = java.net.URLEncoder.encode(multipartFile.getOriginalFilename(), "GBK");
		fileName  = multipartFile.getOriginalFilename();


		UserInfoBean userInfo = (UserInfoBean) argsMap.getRequest().getSession().getAttribute("user");
		String userName = null == userInfo ? "" : userInfo.getName();
		// 组装添加的数据
		//argsMap.put("id", new String(argsMap.getValueNotEmpty("solveDataHiddenId").getBytes("ISO-8859-1"),"UTF-8"));
		argsMap.put("id", argsMap.getValueNotEmpty("solveDataHiddenId"));
		KettleErrors dataBean = this.jobExceptionService.getKettleErrorsBean(argsMap);
		Map<String, Object> dataMap = new HashMap<String, Object>();
		//dataMap.put("erroReason", new String(argsMap.getValueNotEmpty("questionDescName").getBytes("ISO-8859-1"),"UTF-8"));
		dataMap.put("erroReason", argsMap.getValueNotEmpty("questionDescName"));
		dataMap.put("clpy", userName);
		//dataMap.put("clff", new String(argsMap.getValueNotEmpty("solveQuestionAnswer").getBytes("ISO-8859-1"),"UTF-8"));
		dataMap.put("clff", argsMap.getValueNotEmpty("solveQuestionAnswer"));
		
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
			dataMap.put("solveAccessoryPath", filePath + "\\" + fileName);
			dataMap.put("solveAccessoryName", fileName);
		}
		dataMap.put("clrq", new Date());
		// 设置问题状态 F未解决 T已经解决
		dataMap.put("clbz", "T");
		this.jobExceptionService.updateKettleErrorsBean(dataBean, dataMap);
		return "{success:true}";
	}

	
	/**
	 * 删除附件
	 * 
	 * @param argsMap
	 * @return
	 */
	public String delDafj(Model argsMap) {
		String ids = argsMap.getValue("solveDataHiddenId");
		jobExceptionService.delDafj(ids);
		return "{success:true}";
	}
	
	
	/**
	 * 删除数据质量问题
	 * 
	 * @param argsMap
	 * @return
	 */
	public String delDataQuality(Model argsMap) {
		String ids = argsMap.getValue("jsonStr");
		String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"", "\'");
		jobExceptionService.delErrorDataBean(reslutStr);
		return "{success:true}";
	}

	/**
	 * 获取某个数据质量知识库数据
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getDataQualityBeanInfo(Model argsMap) {
		KettleErrors bean = jobExceptionService.getKettleErrorsBeanInfo(argsMap);
		String solveAccessoryPath = ""; 
		if(!StringUtils.isEmpty(bean.getSolveAccessoryPath())){
			solveAccessoryPath= bean.getSolveAccessoryPath().replaceAll("\\\\", "/");
		}
		bean.setSolveAccessoryPath(solveAccessoryPath);
		bean.setErrType("tests");
		BaseBean baseBean = new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData = JSON.toJSONString(baseBean);
		return responseData;
	}

	public String importSolutionData(Model argsMap) {
		// 获取需要导入解决方案的数据
		List<KettleErrors> list = this.jobExceptionService.getKnowledegQualityBeanList(argsMap);
		KettleErrors qualityBean = null;
		// 批量导入数据
		for (int i = 0; i < list.size(); i++) {
			qualityBean = list.get(i);
			DataKnowledgeSolutionBean bean = new DataKnowledgeSolutionBean();
			bean.setId(qualityBean.getId());
			bean.setContent(qualityBean.getErroReason());
			bean.setAnswer(qualityBean.getClff());
			bean.setSolutionAccessoryName(qualityBean.getSolveAccessoryName());
			bean.setSolutionAccessoryPath(qualityBean.getSolveAccessoryPath());
			bean.setSubTime(new Date());
			// 设置数据来源类型
			bean.setType("1");
			//设置数据为解决方案
			bean.setMark("1");
			bean.setTitle(qualityBean.getName());
			
			this.jobExceptionService.delDataSolutionBean(bean);
			
			this.jobExceptionService.saveSolutionBean(bean);
		}
		// 导入成功后，需要更新数据是否导入的标志MARK
//		String jsonStr = argsMap.getValue("jsonStr");
//		jsonStr = jsonStr.replace("[", "(").replace("]", ")").replaceAll("\"", "\'");
//		this.jobExceptionService.updateDataQualityBeanMark(jsonStr, "1");
		return "{success:true}";
	}

}
