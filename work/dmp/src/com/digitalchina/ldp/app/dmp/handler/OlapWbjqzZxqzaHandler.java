package com.digitalchina.ldp.app.dmp.handler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.service.OlapWbjqzZxqzaService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class OlapWbjqzZxqzaHandler extends AbstractExtHandler {
	@Autowired
	private OlapWbjqzZxqzaService olapWbjqzZxqzaService;
	/**
	 * 方法描述：清洗数据列表展示
	 */
	public PageList<String> geOlapWbjqzZxqzaList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<String> list = olapWbjqzZxqzaService.geOlapWbjqzZxqzaList(start, end, model);
		return list;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("datacheck/olapwbjqzzxqz.jsp");
		return viewModel;
	}
}
