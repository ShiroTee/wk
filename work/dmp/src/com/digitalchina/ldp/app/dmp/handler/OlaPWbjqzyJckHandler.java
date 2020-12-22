package com.digitalchina.ldp.app.dmp.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.service.OlaPWbjqzyJckService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
@Component
public class OlaPWbjqzyJckHandler extends AbstractExtHandler{
	
	
	@Autowired
	private OlaPWbjqzyJckService olaPWbjqzyJckService;
	public PageList<String> getOlaPWbjqzyJckList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<String> list = olaPWbjqzyJckService.getOlaPWbjqzyJckList(start, end, model);
		return list;
	}
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("datacheck/olapwbjjckdz.jsp");
		return viewModel;
	}
}
