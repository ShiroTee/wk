package com.digitalchina.ldp.app.dms.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.service.TransExceptionService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class TransExceptionHandler extends AbstractExtHandler {

	@Autowired
	private TransExceptionService transExceptionService;
	
	@Override
	public ViewModel page(Model model) {
		ViewModel viewModel = new ViewModel("kettlemonitor/transException.jsp",
				"kettlemonitor/transException.js");
		return viewModel;
	}

	public PageList<KettleErrors> getTransExceptionList(Model model) {

		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<KettleErrors> list = transExceptionService.find(start, end,
				model);
		return list;
	}

	
	public String getLogMessage(Model model) {
		String msg = transExceptionService.queryLogMessage(model);
		return msg;
	}


}
