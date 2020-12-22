package com.digitalchina.ldp.app.dms.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.dao.JobExceptionDao;
import com.digitalchina.ldp.app.dms.dao.dataKnowledgeDao;
import com.digitalchina.ldp.app.dms.service.JobExceptionService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;

@Service
public class JobExceptionServiceImpl implements JobExceptionService {

	@Autowired
	private JobExceptionDao jobExceptionDao;
	@Autowired
	private dataKnowledgeDao dataKnowledgeDao;

	public PageList<KettleErrors> find(int pageSize, int limit, Model model) {

		try {
			PageList<KettleErrors> pageList = jobExceptionDao.find(pageSize, limit, model);
			return pageList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job异常记录列表异常", e);

		}

	}

	public String queryLogMessage(Model model) {
		try {
			return jobExceptionDao.queryLogMessage(model, model.getValue("id"));
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServiceException("job异常记录列表异常", e);

		}
	}

	@Override
	public KettleErrors getKettleErrorsBean(Model argsMap) {
		String id = argsMap.getValue("id");
		String ids = "('"+id+"')";
		KettleErrors dataBean = this.jobExceptionDao.getDataKnowBeanList(ids).get(0);
		return dataBean;
	}

	@Override
	public void updateKettleErrorsBean(KettleErrors dataBean, Map<String, Object> dataMap) {
		this.jobExceptionDao.update(new KettleErrors(), dataMap, dataBean.getId());
	}

	@Override
	public KettleErrors getKettleErrorsBeanInfo(Model argsMap) {
		String id = argsMap.getValue("id");
		String sql = "SELECT ID,NAME,CHANNEL_ID,ERR_TYPE ,START_DATE,END_DATE,to_char(LOG_DATE,'YYYY-MM-DD HH24:MI:SS') log_date,CLRY,CLRQ,ERR_REASON,CLFF,CLBZ,SOLVEACCESSORYNAME,SOLVEACCESSORYPATH,MARK from K_ERRS where Id = '" + id + "'";
		KettleErrors bean = this.jobExceptionDao.getKettleErroresById(sql);
		return bean;
	}

	@Override
	public List<KettleErrors> getKnowledegQualityBeanList(Model argsMap) {
		String jsonStr = argsMap.getValue("jsonStr");
		jsonStr = jsonStr.replace("[", "(").replace("]", ")").replaceAll("\"", "\'");
		List<KettleErrors> list = this.jobExceptionDao.getDataKnowBeanList(jsonStr);
		for(KettleErrors beans : list){
			String ids=beans.getId();
			DataKnowledgeSolutionBean dateBean=dataKnowledgeDao.find(DataKnowledgeSolutionBean.class, ids);
			if(dateBean!=null){
				this.dataKnowledgeDao.delete(DataKnowledgeSolutionBean.class,ids);
			}
			KettleErrors qualityBean = list.get(0);
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
			this.dataKnowledgeDao.insert(bean);
		}
//		if("1".equals(list.get(0).getMark())){
//			throw new ServiceException("你选择的数据已经导出到典型案列解决方案,请刷新典型案例解决方案！");
//		}
		return list;
	}
	
	public void delDataSolutionBean(DataKnowledgeSolutionBean bean) {
		this.jobExceptionDao.delete(DataKnowledgeSolutionBean.class, bean.getId());
	}

	public void saveSolutionBean(DataKnowledgeSolutionBean bean) {
		try{
			this.jobExceptionDao.insert(bean);
		}catch (Exception e) {
			throw new ServiceException("操作数据库异常");
		}
	}

	@Override
	public void updateDataQualityBeanMark(String jsonStr, String string) {
		this.jobExceptionDao.updateDataQualityBeanMark(jsonStr, string);
	}

	@Override
	public void delKnowledgeSolutionBean(String ids) {
		this.jobExceptionDao.deleteListById(DataKnowledgeSolutionBean.class, "id", ids);
	}

	@Override
	public void delErrorDataBean(String ids) {
		this.jobExceptionDao.updateErrorBeanIsKnow(ids);

	}
	public void delDafj(String reslutStr){
		this.jobExceptionDao.delDafj(reslutStr);

	}
}