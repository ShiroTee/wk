package com.digitalchina.ldp.app.dms.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.service.KettleWarningService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class KettleWarningHandler extends AbstractExtHandler
{

	@Autowired
	private KettleWarningService	kettleWarningService;

	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel = new ViewModel("kettlewarning/kettlewarning.jsp", "kettlewarning/kettlewarning.js");
		return viewModel;
	}

	/**
	 * 方法描述：kettle异常预警列表展示
	 */
	public PageList<String> getWarningDataList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());

		PageList<String> list = kettleWarningService.getWarningDataList(start, end, model);
		return list;
	}

	/**
	 * 方法描述：查询日志信息
	 */
	public List<String> getLogMessage(Model model)
	{
		List<String> list = kettleWarningService.queryLogMessage(model);
		return list;
	}

}
