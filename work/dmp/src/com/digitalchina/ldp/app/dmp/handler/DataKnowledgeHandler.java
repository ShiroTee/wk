package com.digitalchina.ldp.app.dmp.handler;

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
import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeQualityBean;
import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dmp.common.CommonDataUtil;
import com.digitalchina.ldp.app.dmp.service.DataFileService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.UserInfoBean;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
@Component
public class DataKnowledgeHandler extends AbstractExtHandler {
	
	@Autowired
	private DataFileService dataFileService;
	
	/**
	 * 添加数据质量问题
	 * @param argsMap
	 * @return
	 * @throws Exception
	 */
	public String addDataQuality(Model argsMap) throws Exception{
		argsMap.getResponse().setContentType("text/html;charset=utf-8");
		HttpServletRequest request = argsMap.getRequest();
		//向磁盘写入文件
		String fileName = "";
		String filePath = request.getSession().getServletContext().getRealPath("/")+"/upload/dmp/question/"+System.currentTimeMillis();
		MultipartHttpServletRequest re = (MultipartHttpServletRequest) argsMap.getRequest();
		MultipartFile multipartFile=re.getFile("userfile");
		if(multipartFile==null)
		{
			throw new ServiceException("未获取到上传文件");
		}
		//fileName = new String(multipartFile.getOriginalFilename().getBytes("ISO8859-1"),"UTF-8");
		fileName = multipartFile.getOriginalFilename();
		
		//组装添加的数据
		DataKnowledgeQualityBean dataBean = new DataKnowledgeQualityBean();
		dataBean.setId(StringUtils.getRandmStr(16));
		dataBean.setSubTime(new Date());
		dataBean.setSubUser("admin");
		//dataBean.setRank(new String(argsMap.getValueNotEmpty("questionRank").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setRank(argsMap.getValueNotEmpty("questionRank"));
		//dataBean.setTitle(new String(argsMap.getValueNotEmpty("questionTitle").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setTitle(argsMap.getValueNotEmpty("questionTitle"));
		dataBean.setSubAccessoryName(fileName);
		//设置问题状态 0 未解决 1 已经解决
		dataBean.setStatus("0");
		//dataBean.setDataFrom(new String(argsMap.getValueNotEmpty("questionFrom").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setDataFrom(argsMap.getValueNotEmpty("questionFrom"));
		//dataBean.setContent(new String(argsMap.getValueNotEmpty("questionDesc").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setContent(argsMap.getValueNotEmpty("questionDesc"));
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
			dataBean.setSubAccessoryPath(uploadFilePath);
		}
		dataBean.setMark("0");
		this.dataFileService.save(dataBean);
		return "{success:true}";
	}
	
	/**
	 * 获取数据列表
	 * @param argsMap
	 * @return
	 */
	public PageList<DataKnowledgeQualityBean> getDataFileList(Model argsMap){
		PageList<DataKnowledgeQualityBean> pageList = dataFileService.getUploadDataFileList(argsMap);
		for (int i = 0; i < pageList.getList().size(); i++) {
			DataKnowledgeQualityBean bean = pageList.getList().get(i);
			String subAccessoryPath = "";
			if(!StringUtils.isEmpty(bean.getSubAccessoryPath())){
				subAccessoryPath = bean.getSubAccessoryPath().replaceAll("\\\\", "/");
			}
			bean.setSubAccessoryPath(subAccessoryPath);
			bean.setDataFrom(CommonDataUtil.getDataFrom(bean.getDataFrom()));
			if(!StringUtils.isEmpty(bean.getSolveAccessoryPath())){
				String solveAccessoryPath = bean.getSolveAccessoryPath().replaceAll("\\\\", "/");
				bean.setSolveAccessoryPath(solveAccessoryPath);
			}
		}
		return pageList;
	}
	
	/**
	 * 删除附件
	 * 
	 * @param argsMap
	 * @return
	 */
	public String delDafj(Model argsMap) {
		String ids = argsMap.getValue("solveDataHiddenId");
		dataFileService.delDafj(ids);
		return "{success:true}";
	}
	
	
	/**
	 * 删除数据质量问题
	 * @param argsMap
	 * @return
	 */
	public String delDataQuality(Model argsMap){
		String ids = argsMap.getValue("jsonStr");
		String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
		dataFileService.delDataQuality(reslutStr);
		return "{success:true}";
	}
	
	/**
	 * 文件读取下载
	 * @param argsMap
	 */
	public void downloadFile(Model argsMap){
		InputStream is  = null;
        OutputStream os = null;
        String type = argsMap.getValue("type");
        String downLoadFilePath = "";
        String fileName = "";
        //下载的附件 1 是提交附件  2 解决附件 3 是解决方案附件 4 是问题附件
        if("1".equals(type)){
        	DataKnowledgeQualityBean bean = this.dataFileService.getKnowledgeQualityBean(argsMap);
        	downLoadFilePath = bean.getSubAccessoryPath();
        	fileName = bean.getSubAccessoryName();
        }else if("2".equals(type)){
        	DataKnowledgeQualityBean bean = this.dataFileService.getKnowledgeQualityBean(argsMap);
        	downLoadFilePath = bean.getSolveAccessoryPath();
        	fileName = bean.getSolveAccessoryName();
        }else if("3".equals(type)){
        	DataKnowledgeSolutionBean bean = this.dataFileService.getSolutionAccessoryPath(argsMap);
        	downLoadFilePath = bean.getSolutionAccessoryPath();
        	fileName = bean.getSolutionAccessoryName();
        }else {
        	DataKnowledgeSolutionBean bean = this.dataFileService.getSolutionAccessoryPath(argsMap);
        	downLoadFilePath = bean.getSubAccessoryPath();
        	fileName = bean.getSubAccessoryName();
        }
        File file = new File(downLoadFilePath);
        HttpServletResponse response = argsMap.getResponse();
        response.reset();
		response.setContentType("application/msword;charset=UTF-8");
        int length  = (int)file.length();
        int begin  = 0;
        int end = length - 1;
		try
        {
            byte[] b = new byte[2048];
            is = new BufferedInputStream(new FileInputStream(file));
            os = new BufferedOutputStream(response.getOutputStream());
            //response.addHeader("Content-Disposition", "attachment;filename=\"" + new String(fileName.getBytes("GBK"), "ISO8859_1") + "\"");
            response.addHeader("Content-Disposition", "attachment;filename=\"" + java.net.URLEncoder.encode(fileName, "UTF-8") + "\"");
            // I/O 读写
            for(int i, left = end - begin + 1; left > 0 && ((i = is.read(b, 0, Math.min(b.length, left))) != -1); left -= i){
            	os.write(b, 0, i);
            }
            os.flush();
        } catch (Exception e) {
			e.printStackTrace();
		}
        finally
        {
            if(is != null) {try{is.close();} catch(IOException e) {}}
            if(os != null) {try{os.close();} catch(IOException e) {}}
        }
	}
	
	/**
	 * 录入解决方案知识库
	 * @param argsMap
	 * @return
	 * @throws Exception
	 */
	public String addKnowledgeSolution(Model argsMap) throws Exception{
		argsMap.getRequest().setCharacterEncoding("utf-8");
		argsMap.getResponse().setContentType("text/html;charset=utf-8");
		HttpServletRequest request = argsMap.getRequest();
		//向磁盘写入文件
		String fileName = "";
		String filePath = request.getSession().getServletContext().getRealPath("/")+"/upload/dmp/question/"+System.currentTimeMillis();
		MultipartHttpServletRequest re = (MultipartHttpServletRequest) argsMap.getRequest();
		MultipartFile multipartFile=re.getFile("userfile");
		if(multipartFile==null)
		{
			throw new ServiceException("未获取到上传文件");
		}
		//fileName = new String(multipartFile.getOriginalFilename().getBytes("ISO8859-1"),"UTF-8");
		fileName = multipartFile.getOriginalFilename();
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
		}
		
		//组装添加的数据
		DataKnowledgeSolutionBean dataBean = new DataKnowledgeSolutionBean();
		dataBean.setId(StringUtils.getRandmStr(16));
		dataBean.setSubTime(new Date());
		//dataBean.setTitle(new String(argsMap.getValueNotEmpty("questionSolutionTitle").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setTitle(argsMap.getValueNotEmpty("questionSolutionTitle"));
		dataBean.setSolutionAccessoryName(fileName);
		//设置问题类型，0 手工录入 1 第三方导入
		dataBean.setType("0");
		dataBean.setSolutionAccessoryPath(filePath+"/"+fileName);
		//dataBean.setContent(new String(argsMap.getValueNotEmpty("questionContent").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setContent(argsMap.getValueNotEmpty("questionContent"));
		//dataBean.setAnswer(new String(argsMap.getValueNotEmpty("questionAnswer").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setAnswer(argsMap.getValueNotEmpty("questionAnswer"));
		this.dataFileService.saveSolutionBean(dataBean);
		return "{success:true}";
	}
	
	/**
	 * 获取解决方案知识库列表
	 * @param argsMap
	 * @return
	 */
	public PageList<DataKnowledgeSolutionBean> getKnowledgeSolutionList(Model argsMap){
		PageList<DataKnowledgeSolutionBean> pageList = dataFileService.getKnowledgeSolutionFileList(argsMap);
		for (int i = 0; i < pageList.getList().size(); i++) {
			DataKnowledgeSolutionBean bean = pageList.getList().get(i);
			if(!StringUtils.isEmpty(bean.getContent())){
				bean.setContent(bean.getContent().replaceAll("\r\n", " "));
			}
			String solutionAccessoryPath = bean.getSolutionAccessoryPath();
			if(!StringUtils.isEmpty(solutionAccessoryPath)){
				solutionAccessoryPath = solutionAccessoryPath.replaceAll("\\\\", "/");
				bean.setSolutionAccessoryPath(solutionAccessoryPath);
			}
			
			String subAccessoryPath = bean.getSubAccessoryPath();
			if(!StringUtils.isEmpty(subAccessoryPath)){
				subAccessoryPath = subAccessoryPath.replaceAll("\\\\", "/");
				bean.setSubAccessoryPath(subAccessoryPath);
			}
			
			
			String typeStr = "0".equals(bean.getType()) ? "手工录入" : "问题库导入";
			bean.setType(typeStr);
			bean.setSolutionAccessoryPath(solutionAccessoryPath);
			bean.setSubAccessoryPath(subAccessoryPath);
		}
		return pageList;
	}
	
	public String delKnowledgeSolution(Model argsMap){
		String ids = argsMap.getValue("jsonStr");
		String reslutStr = ids.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
		this.dataFileService.delKnowledgeSolutionBean(reslutStr);
		//判定如果是问题库导入的怎需要修改标志
		this.dataFileService.updateDataQualityBeanMark(reslutStr,"0");
		return "{success:true}";
	}
	
	
	public String importSolutionData(Model argsMap){
		//获取需要导入解决方案的数据
		List<DataKnowledgeQualityBean> list = this.dataFileService.getKnowledegQualityBeanList(argsMap);
		DataKnowledgeQualityBean qualityBean = null;
		//批量导入数据
		for (int i = 0; i < list.size(); i++) {
			qualityBean = list.get(i);
			DataKnowledgeSolutionBean bean = new DataKnowledgeSolutionBean();
			bean.setId(qualityBean.getId());
			bean.setContent(qualityBean.getContent());
			bean.setAnswer(qualityBean.getSolveContent());
			bean.setSolutionAccessoryName(qualityBean.getSolveAccessoryName());
			bean.setSolutionAccessoryPath(qualityBean.getSolveAccessoryPath());
			
			bean.setSubAccessoryName(qualityBean.getSubAccessoryName());
			bean.setSubAccessoryPath(qualityBean.getSubAccessoryPath());
			
			bean.setSubTime(new Date());
			//设施数据来源类型
			bean.setType("1");
			bean.setTitle(qualityBean.getTitle());
			
			this.dataFileService.delDataSolutionBean(bean);
			
			this.dataFileService.saveSolutionBean(bean);
		}
		//导入成功后，需要更新数据是否导入的标志MARK
//		String jsonStr = argsMap.getValue("jsonStr");
//		jsonStr = jsonStr.replace("[", "(").replace("]", ")").replaceAll("\"","\'");
//		this.dataFileService.updateDataQualityBeanMark(jsonStr,"1");
		return "{success:true}";
	}
	
	/**
	 * 获取某个解决方案知识数据
	 * @param argsMap
	 * @return
	 */
	public String getDataSoultionInfo(Model argsMap){
		String id = argsMap.getValue("id");
		DataKnowledgeSolutionBean bean = new DataKnowledgeSolutionBean();
		bean.setId(id);
		bean = dataFileService.getDataSolutionBean(bean);
		
		String solutionAccessoryPath = bean.getSolutionAccessoryPath();
		if(!StringUtils.isEmpty(solutionAccessoryPath)){
			solutionAccessoryPath = solutionAccessoryPath.replaceAll("\\\\", "/");
			bean.setSolutionAccessoryPath(solutionAccessoryPath);
		}
		
		String subAccessoryPath = bean.getSubAccessoryPath();
		if(!StringUtils.isEmpty(subAccessoryPath)){
			subAccessoryPath = subAccessoryPath.replaceAll("\\\\", "/");
			bean.setSubAccessoryPath(subAccessoryPath);
		}
		
		
		BaseBean baseBean=new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData=JSON.toJSONString(baseBean);
		return responseData;
	}
	/**
	 * 获取某个数据质量知识库数据
	 * @param argsMap
	 * @return
	 */
	public String getDataQualityBeanInfo(Model argsMap){
		String id = argsMap.getValue("id");
		DataKnowledgeQualityBean bean = new DataKnowledgeQualityBean();
		bean.setId(id);
		bean = dataFileService.getKnowledgeQualityBean(argsMap);
		
		String subAccessoryPath = bean.getSubAccessoryPath();
		if(!StringUtils.isEmpty(bean.getSubAccessoryPath())){
			subAccessoryPath = bean.getSubAccessoryPath().replaceAll("\\\\", "/");
		}
		bean.setSubAccessoryPath(subAccessoryPath);
		
		String solveAccessoryPath = bean.getSolveAccessoryPath();
		if(!StringUtils.isEmpty(bean.getSolveAccessoryPath())){
			solveAccessoryPath = bean.getSolveAccessoryPath().replaceAll("\\\\", "/");
		}
		bean.setSolveAccessoryPath(solveAccessoryPath);
		bean.setDataFrom(CommonDataUtil.getDataFrom(bean.getDataFrom()));
		BaseBean baseBean=new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData=JSON.toJSONString(baseBean);
		return responseData;
	}
	
	public String updateKnowledgeSolution(Model argsMap) throws Exception{
		argsMap.getResponse().setContentType("text/html;charset=utf-8");
		HttpServletRequest request = argsMap.getRequest();
		
		//向磁盘写入文件
		String fileName = "";
		String filePath = request.getSession().getServletContext().getRealPath("/")+"/upload/dmp/question/"+System.currentTimeMillis();
		MultipartHttpServletRequest re = (MultipartHttpServletRequest) argsMap.getRequest();
		MultipartFile multipartFile=re.getFile("userfile");
		if(multipartFile==null)
		{
			throw new ServiceException("未获取到上传文件");
		}
		//fileName = new String(multipartFile.getOriginalFilename().getBytes("ISO8859-1"),"UTF-8");
		fileName = multipartFile.getOriginalFilename();
		
		
		//修改数据
		DataKnowledgeSolutionBean dataBean = new DataKnowledgeSolutionBean();
		
		Map<String, Object> beanMap = new HashMap<String, Object>();
		beanMap.put("subTime", new Date());
		//beanMap.put("title", new String(argsMap.getValueNotEmpty("questionSolutionTitle").getBytes("ISO-8859-1"),"UTF-8"));
		beanMap.put("title", argsMap.getValueNotEmpty("questionSolutionTitle"));
		//beanMap.put("content", new String(argsMap.getValueNotEmpty("questionContent").getBytes("ISO-8859-1"),"UTF-8"));
		beanMap.put("content", argsMap.getValueNotEmpty("questionContent"));
		//beanMap.put("answer", new String(argsMap.getValueNotEmpty("questionAnswer").getBytes("ISO-8859-1"),"UTF-8"));
		beanMap.put("answer", argsMap.getValueNotEmpty("questionAnswer"));
		
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
			beanMap.put("solutionAccessoryPath", filePath+"/"+fileName);
		}
		//dataBean.setId(new String(argsMap.getValueNotEmpty("addQuestionHiddenId").getBytes("ISO-8859-1"),"UTF-8"));
		dataBean.setId(argsMap.getValueNotEmpty("addQuestionHiddenId"));
		this.dataFileService.updateDataSolutionBean(dataBean,beanMap);
		return "{success:true}";
	}
	
	public String solveQuestionData(Model argsMap) throws Exception{
		argsMap.getResponse().setContentType("text/html;charset=utf-8");
		// 处理文件压缩包文件上传
		//向磁盘写入文件
		String fileName = "";
		String filePath = argsMap.getRequest().getSession().getServletContext().getRealPath("/")+"/upload/dmp/question/"+System.currentTimeMillis();
		MultipartHttpServletRequest re = (MultipartHttpServletRequest) argsMap.getRequest();
		MultipartFile multipartFile=re.getFile("userfile");
		if(multipartFile==null)
		{
			throw new ServiceException("未获取到上传文件");
		}
		//fileName = new String(multipartFile.getOriginalFilename().getBytes("ISO8859-1"),"UTF-8");
		fileName = multipartFile.getOriginalFilename();
		
		//String solveQuestionAnswer = new String(argsMap.getValueNotEmpty("solveQuestionAnswer").getBytes("ISO-8859-1"),"UTF-8");
		String solveQuestionAnswer = argsMap.getValueNotEmpty("solveQuestionAnswer");
		
		
//		List items = upload.parseRequest(request);  
//		//变量得到iterator
//		Iterator iterator = items.iterator();  
//		while (iterator.hasNext()) {  
//		    FileItem item = (FileItem) iterator.next();  
//		    //是否是文件属性file
//		    if (!item.isFormField()&&!StringUtils.isEmpty(item.getName())){  
//		    	fileName = item.getName();  
//		    	System.out.println(fileName+"-------------");
//		    	System.out.println(fileName);
//		    	if(fileName.indexOf(":")>-1){
//		    		fileName = fileName.substring(fileName.lastIndexOf("/")+1,fileName.length());
//		    	}
//		    	//获取文件大小
//		        //long sizeInBytes = item.getSize();  
//		        File file = new File(filePath);
//		        if (!file.exists()) {
//					file.mkdirs();
//				}
//		        File uploadedFile = new File(filePath+"/"+fileName);  
//		        item.write(uploadedFile);  
//		    }else{
//		    	System.out.println(item.getFieldName()+"-------------"+new String(item.getString().getBytes("ISO-8859-1")));
//		    	map.put(item.getFieldName(), new String(item.getString().getBytes("ISO-8859-1")));
//		    }
//		}  
		
		UserInfoBean userInfo = (UserInfoBean) argsMap.getRequest().getSession().getAttribute("user");
		String userName = null == userInfo ? "admin" : userInfo.getName();
		
		//组装添加的数据
		argsMap.put("id", argsMap.getValueNotEmpty("solveDataHiddenId"));
		DataKnowledgeQualityBean dataBean = this.dataFileService.getKnowledgeQualityBean(argsMap);
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("solveContent", solveQuestionAnswer);
		dataMap.put("solveUser", userName);
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
			dataMap.put("solveAccessoryPath", uploadFilePath);
			dataMap.put("solveAccessoryName", fileName);
		}
		dataMap.put("solveTime", new Date());
		//设置问题状态 0 未解决 1 已经解决
		dataMap.put("status", "1");
		this.dataFileService.updateDataQualityBean(dataBean, dataMap);
		return "{success:true}";
	}
	
}
