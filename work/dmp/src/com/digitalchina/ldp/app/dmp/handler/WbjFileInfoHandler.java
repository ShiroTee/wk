package com.digitalchina.ldp.app.dmp.handler;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DmpDmJhmodeBean;
import com.digitalchina.ldp.app.dmp.service.IWbjFileInfoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.handler.AbstractExtHandler;

/**
 * 委办局原始数据管理
 * 
 * @author zhangyg
 * 
 */

@Component
public class WbjFileInfoHandler extends AbstractExtHandler {

	@Autowired
	private IWbjFileInfoService wbjFileInfoService ;

	public PageList<Map<String, Object>> getWBJFileInfo(Model argsMap) {
		int start = argsMap.getInt("start");
		int pageSize = argsMap.getInt("pageSize") + start;
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");

		PageList<Map<String, Object>> pageList = wbjFileInfoService
				.getFileCountListGroupByBm(start, pageSize, argsMap);
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

	public PageList<Map<String, Object>> getOneFileInfo(Model argsMap) {
		PageList<Map<String, Object>>  pageList = new PageList<Map<String, Object>>();
		List<Map<String, Object>> list = null;
		int tableCount = Integer.parseInt(argsMap.getValue("tableCount"));
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		list = wbjFileInfoService.getOneWbjAllFilesByBm(argsMap);
		for (Map<String, Object> map : list) {
			if (StringUtils.length(startDate) < 10
					|| StringUtils.length(endDate) < 10) {
				map.put("startDate", "无");
				map.put("endDate", "无");
			} else {
				map.put("startDate", startDate);
				map.put("endDate", endDate);
			}
			//将查询出来的长日期格式化
			String addDate = new SimpleDateFormat("yyyy-MM-dd").format(map.get("ADDDATE")) ;
			map.put("ADDDATE", addDate) ;
		}
		pageList.setCount(tableCount);
		pageList.setList(list);
		
		return pageList;
	}

	public List<Map<String, Object>> getOneMonthAdd(Model argsMap) {
		List<Map<String, Object>> list = null;
		list = wbjFileInfoService.getOneMonthAddByBm(argsMap);
		for (Map<String, Object> map : list) {
			String addDate = new SimpleDateFormat("yyyy-MM-dd").format(map.get("ADDDATE")) ;
			map.put("ADDDATE", addDate) ;
		}
		return list;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("dataproduce/pre-wbjfile.jsp");
		return viewModel;
	}
	
	/**
	 * 获取所有委办局
	 * 
	 * @param argsMap
	 * @return
	 */
	public String getRootData(Model argsMap) {
		List<DmpDmJhmodeBean> list = wbjFileInfoService.getWBJList();
		CreateJson json = new CreateJson();
		for (int i = 0; i < list.size(); i++) {
			json.add("wbjbm", list.get(i).getWbjbm());
			json.add("wbjjc", list.get(i).getWbjjc());
			json.addToList();
		}
		return json.getResultJson();
	}
}
