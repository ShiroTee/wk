package com.digitalchina.ldp.app.dmp.handler;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.service.ICenterToBaseCompService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;

/**
 * 中心前置到基础库对账
 * 
 * @author zhangyg
 * 
 */

@Component
public class CenterToBaseCompHandler extends AbstractExtHandler {

	@Autowired
	private ICenterToBaseCompService centerToBaseCompService;

	// 查询对账结果
	public PageList<Map<String, Object>> getCompareResult(Model argsMap) {
		String startDate = argsMap.getValue("starttime_date");
		String endDate = argsMap.getValue("endtime_date");
		PageList<Map<String, Object>> pageList = centerToBaseCompService
				.getCompareResultInfo(argsMap);
		List<Map<String, Object>> list = pageList.getList();
		for (Map<String, Object> map : list) {
			if (map.get("COMPAREDATE") != null) {
				String compareDate = new SimpleDateFormat("yyyy-MM-dd")
						.format(map.get("COMPAREDATE"));
				map.put("COMPAREDATE", compareDate);
				if (!StringUtils.isBlank(startDate)
						&& !StringUtils.isBlank(endDate)) {
					map.put("startDate", startDate);
					map.put("endDate", endDate);
				} else {
					map.put("startDate", "无");
					map.put("endDate", "无");
				}
			}
		}
		return pageList;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("datacheck/comp-centerToBase.jsp");
		return viewModel;
	}
}
