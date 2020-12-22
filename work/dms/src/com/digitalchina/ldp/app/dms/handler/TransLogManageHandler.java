package com.digitalchina.ldp.app.dms.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.TransManager;
import com.digitalchina.ldp.app.dms.service.TransLogManageService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class TransLogManageHandler extends AbstractExtHandler {

	@Autowired
	private TransLogManageService transLogManageService;

	
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("kettlerunlogmonitor/transLogManage.jsp","kettlerunlogmonitor/transLogManage.js");
		return viewModel;
	}

	public PageList<TransManager> getTransLogManageList(Model model) {

		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());
		PageList<TransManager> list = transLogManageService.find(start, end, model);
		return list;
	}
	
	/**
	 * 方法描述：获取Kettle目录的列表
	 */
	public List<RDirectoryBean> getDirectoryList(Model model)
	{
		List<RDirectoryBean> list = transLogManageService.getDirectoryList();
		return list;
	}
}
