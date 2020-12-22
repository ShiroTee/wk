package com.digitalchina.ldp.app.dms.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.service.CleanRuleMonitorService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class CleanRuleMonitorHandler extends AbstractExtHandler
{

	@Autowired
	private CleanRuleMonitorService	cleanRuleMonitorService;

	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel = new ViewModel("cleanmonitor/cleanrule.jsp", "cleanmonitor/cleanrule.js");
		return viewModel;
	}

	/**
	 * 方法描述：清洗规则数据列表展示
	 */
	public PageList<String> getCleanRuleDataList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());

		PageList<String> list = cleanRuleMonitorService.getCleanRuleDataList(start, end, model);
		return list;
	}

	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList(Model model)
	{
		List<RDirectoryBean> list = cleanRuleMonitorService.getDirectoryList();
		RDirectoryBean bean = new RDirectoryBean();
		bean.setDirectoryId(null);
		bean.setDirectoryName("全部");
		list.add(0, bean);
		return list;
	}

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> getLogMessage(Model model)
	{
		List<String> list = cleanRuleMonitorService.queryLogMessage(model);
		return list;
	}

}
