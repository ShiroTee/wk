package com.digitalchina.ldp.app.dmp.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeQualityBean;
import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;

public interface DataFileService {

	/**
	 * 获取上次文件数据列表
	 * @param argsMap
	 * @return
	 */
	PageList<DataKnowledgeQualityBean> getUploadDataFileList(Model argsMap);

	/**
	 * 保存数据
	 * @param dataBean
	 */
	void save(DataKnowledgeQualityBean dataBean);
	
	/**
	 * 删除数据
	 * @param reslutStr
	 */
	void delDataQuality(String reslutStr);

	/**
	 * 获取附件的绝对地址
	 * @param argsMap
	 * @return
	 */
	DataKnowledgeQualityBean getKnowledgeQualityBean(Model argsMap);

	/**
	 * 添加解决方案知识库
	 * @param dataBean
	 */
	void saveSolutionBean(DataKnowledgeSolutionBean dataBean);

	/**
	 * 获取解决方案知识库列表
	 * @param dataBean
	 */
	PageList<DataKnowledgeSolutionBean> getKnowledgeSolutionFileList(Model argsMap);
	
	/**
	 * 获取解决方案知识库某个Bean
	 * @param argsMap
	 * @return
	 */
	DataKnowledgeSolutionBean getSolutionAccessoryPath(Model argsMap);

	/**
	 * 删除知识库文件某个Bean
	 * @param reslutStr
	 */
	void delKnowledgeSolutionBean(String reslutStr);

	/**
	 * 查询多条数据返还list
	 * @return
	 */
	List<DataKnowledgeQualityBean> getKnowledegQualityBeanList(Model argsMap);

	/**
	 * 查询某条知识库数据
	 * @param bean
	 * @return
	 */
	DataKnowledgeSolutionBean getDataSolutionBean(DataKnowledgeSolutionBean bean);
	
	/**
	 * 更新解决方案某条数据
	 * @param dataBean
	 */
	void updateDataSolutionBean(DataKnowledgeSolutionBean dataBean,Map<String, Object> map);

	/**
	 * 更新数据知识库问题某条数据
	 * @param dataBean
	 */
	void updateDataQualityBean(DataKnowledgeQualityBean dataBean, Map<String, Object> dataMap);

	/**
	 * 更新问题库数据是否导入标志
	 * @param jsonStr
	 */
	void updateDataQualityBeanMark(String jsonStr,String value);
	
	
	public void delDafj(String reslutStr);
	
	
	public void delDataSolutionBean(DataKnowledgeSolutionBean bean);

}
