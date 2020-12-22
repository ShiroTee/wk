package com.digitalchina.ldp.app.dms.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.service.JobExceptionService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class JobExceptionHandler extends AbstractExtHandler {

	@Autowired
	private JobExceptionService jobExceptionService;

	@Override
	public ViewModel page(Model model) {
		ViewModel viewModel = new ViewModel("kettlemonitor/jopException.jsp",
				"kettlemonitor/jobException.js");
		return viewModel;
	}

	public PageList<KettleErrors> getJobExceptionList(Model model) {

		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<KettleErrors> list = jobExceptionService.find(start, end,
				model);
		return list;
	}

	public String getLogMessage(Model model) {
		String msg = jobExceptionService.queryLogMessage(model);

		return msg;
	}
}
