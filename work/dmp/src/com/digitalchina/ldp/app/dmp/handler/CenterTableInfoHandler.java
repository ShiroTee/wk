package com.digitalchina.ldp.app.dmp.handler;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.service.ICenterTableInfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;

/**
 * 委办局原始数据管理
 * 
 * @author zhangyg
 * 
 */
@Component
public class CenterTableInfoHandler extends AbstractExtHandler {

	@Autowired
	private ICenterTableInfoService centerTableInfoService;

	public PageList<Map<String, Object>> getWBJTableInfo(Model argsMap) {
		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize")+start;
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");

		PageList<Map<String, Object>> pageList = centerTableInfoService
				.getTableNameListGroupByBM(start, pageSize, argsMap);
		List<Map<String, Object>> list = pageList.getList() ;
		for (Map<String, Object> map : list) {
			if (!StringUtils.isBlank(startDate)
					&& !StringUtils.isBlank(endDate)) {
				map.put("startDate", startDate);
				map.put("endDate", endDate);
			} else {
				map.put("startDate", "无");
				map.put("endDate", "无");
			}
		}
		return pageList;
	}

	public List<Map<String, Object>> getOneTableInfo(Model argsMap) {
		List<Map<String, Object>> list = null;
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		list = centerTableInfoService.getOneTableInfoByBM(argsMap);
		for (Map<String, Object> map : list) {
			if (StringUtils.length(startDate) < 10
					|| StringUtils.length(endDate) < 10) {
				map.put("startDate", "无");
				map.put("endDate", "无");
			} else {
				map.put("startDate", startDate);
				map.put("endDate", endDate);
			}
		}
		return list;
	}

	public List<Map<String, Object>> getOneMonthAdd(Model argsMap) {
		List<Map<String, Object>> list = null;
		list = centerTableInfoService.getOneMonthAddByBM(argsMap);
		for (Map<String, Object> map : list) {
			String addDate = new SimpleDateFormat("yyyy-MM-dd").format(map.get("ADDDATE")) ;
			map.put("ADDDATE", addDate) ;
		}
		return list;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("dataproduce/pre-centerdata.jsp");
		return viewModel;
	}
}
