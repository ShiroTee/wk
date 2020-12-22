package com.digitalchina.ldp.app.dmp.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.dmp.bean.DatabasedmBean;
import com.digitalchina.ldp.app.dmp.bean.DmpDataBaseTableBean;
import com.digitalchina.ldp.app.dmp.bean.RecordBean;
import com.digitalchina.ldp.app.dmp.service.RecordService;
import com.digitalchina.ldp.bean.BaseBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class RecordHandler extends AbstractExtHandler {

	@Autowired
	private RecordService recordService;

	/**
	 * 获取基础库数据表
	 * 
	 * @param argsMap
	 * @return
	 */
	public PageList<RecordBean> getRecordList(Model argsMap) {
		int start = argsMap.getInt("start"), end = argsMap.getInt("limit");
		PageList<RecordBean> recordList = recordService.getRecordList(start,
				end, argsMap);
		return recordList;
	}

	/**
	 * 获取所有基础库
	 * 
	 * @param argsMap
	 * @return
	 */
	public List<DatabasedmBean>  getRootData(Model argsMap) {
		List<DatabasedmBean> list = recordService.getRecordList();
//		CreateJson json=new CreateJson();
//		for(DatabasedmBean bean:list)
//		{
//			json.add("sjkmc",bean.getSjkmc());
//			json.add("sjklx",bean.getSjklx());
//			json.addToList();
//		}
//		return json.getResultJson();
		return list;
	}

	/**
	 * 根据基础库获取表
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getTableNameListByJCK(Model argsMap) {
		String wbjCode = argsMap.getValue("wbjCode");
		DmpDataBaseTableBean tableBean = new DmpDataBaseTableBean();
		tableBean.setSjklx(wbjCode);
		List<DmpDataBaseTableBean> list = recordService
				.getTableNameListByJCK(tableBean);
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("sjklx", list.get(i).getBm());
			json.add("bhzmc", list.get(i).getBhzmc());
			json.addToList();
		}
		return json.getResultJson();
	}

	/**
	 * 获取某条数据信息
	 * @param argsMap
	 * @return
	 */
	public String getConfigInfo(Model argsMap){
		String sjklx = argsMap.getValue("dataId");
		RecordBean bean = new RecordBean();
		bean.setSjklx(sjklx);
		bean = recordService.getDataInfoById(bean);
		BaseBean baseBean=new BaseBean();
		baseBean.setData(bean);
		baseBean.setSuccess(true);
		String responseData=JSON.toJSONString(baseBean);
		return responseData;
	}
	/**
	 * 获取基础数据库列表
	 * @param argsMap
	 * @return
	 */
	public PageList<String> getRecordDataList(Model argsMap){
		PageList<String> list = recordService.getRecordDataList(argsMap);
//		PageList<RecordBean> pageList = new PageList<RecordBean>();
//		int count = recordService.queryCount(argsMap);
//		pageList.setCount(36);
//		pageList.setCount(list.size());
//		pageList.setList(list);
		return list;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("dataproduce/basiclibary.jsp");
		return viewModel;
	}
}
