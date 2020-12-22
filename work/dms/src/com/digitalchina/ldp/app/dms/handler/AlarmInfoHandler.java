package com.digitalchina.ldp.app.dms.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.service.HostMonitorService;
import com.digitalchina.ldp.app.dms.service.impl.bean.AlarmInfo;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;
@Component
public class AlarmInfoHandler extends AbstractExtHandler
{

	@Autowired
	private HostMonitorService hostMonitorService;
	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("hostmonitor/alarmlist.jsp","hostmonitor/alarmlist.js");
		return viewModel;
	}
	/**
	 * 方法描述：告警列表展示
	 */
	public PageList<AlarmInfo> getAlarmList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());

		model.put("alarmTypeCom", formatAlarmType(StringUtils.objToString(model.get("alarmTypeCom"))));
		PageList<AlarmInfo> list = hostMonitorService.getAlarmList(start, end, model);
		return list;
	}
	private String formatAlarmType(String status)
	{
		String resultStr = "";
		if (!("全部").equals(status) && status != "")
		{
			if (("网络告警").equals(status))
			{
				resultStr = "network";
			}
			else if (("CPU告警").equals(status))
			{
				resultStr = "cpu";
			}
			else if (("磁盘告警").equals(status))
			{
				resultStr = "disk";
			}
			else if (("内存告警").equals(status))
			{
				resultStr = "ram";
			}
			else if (("数据库告警").equals(status))
			{
				resultStr = "database";
			}
			else
			{
				resultStr = "-9999";
			}
		}

		return resultStr;
	}
}
