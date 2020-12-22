package com.digitalchina.ldp.app.dms.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.LogTrans;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.service.TransDoService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class TransDoHandler extends AbstractExtHandler {

	@Autowired
	private TransDoService transDoService;
	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("kettle/transDo.jsp","kettle/transDo.js");
		return viewModel;
	}
	public PageList<LogTrans> getLogTransList(Model model) {

		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<LogTrans> list = transDoService.find(start, end, model);
		return list;
	}
	
	public String getLogMessage(Model model) {
		String msg = transDoService.queryLogMessage(model);
		return msg;
	}
	
	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList(Model model)
	{
		List<RDirectoryBean> list = transDoService.getDirectoryList();
		return list;
	}
}
