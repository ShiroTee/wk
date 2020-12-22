package com.digitalchina.ldp.app.dms.service;

import java.util.Map;

import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
public interface DataKnowledgeService {


	/**
	 * 获取解决方案知识库列表
	 * @param dataBean
	 */
	PageList<DataKnowledgeSolutionBean> getKnowledgeSolutionFileList(Model argsMap);
	
	/**
	 * 删除知识库文件某个Bean
	 * @param reslutStr
	 */
	void delKnowledgeSolutionBean(String reslutStr);


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
	 * 更新问题库数据是否导入标志
	 * @param jsonStr
	 */
	void updateDataQualityBeanMark(String jsonStr,String value);

	/**
	 * 添加解决方案知识库
	 * @param dataBean
	 */
	void saveSolutionBean(DataKnowledgeSolutionBean dataBean);
	
	/**
	 * 删除附件
	 * 
	 * @param argsMap
	 * @return
	 */
	public void delDafj(String reslutStr);

}
