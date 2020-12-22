package com.digitalchina.ldp.app.dms.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RepositoryLog;
import com.digitalchina.ldp.app.dms.service.RepositoryLogService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class RepositoryLogHandler extends AbstractExtHandler {

	@Autowired
	private RepositoryLogService repositoryLogService;

	
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("kettle/repositoryLog.jsp","kettle/repositoryLog.js");
		return viewModel;
	}

	public PageList<RepositoryLog> getRepositoryLogList(Model model) {

		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<RepositoryLog> list = repositoryLogService.find(start, end, model);
		return list;
	}
}
