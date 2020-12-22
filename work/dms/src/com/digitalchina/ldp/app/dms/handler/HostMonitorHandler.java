package com.digitalchina.ldp.app.dms.handler;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import plugin.performance_monitor.util.snmp.SnmpHelper_;
import plugin.performance_monitor.util.snmp.model.hrStorageEntry;

import com.digitalchina.ldp.app.dms.service.HostMonitorService;
import com.digitalchina.ldp.app.dms.service.impl.bean.DiscRulelistOf;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfoDetail;
import com.digitalchina.ldp.app.dms.service.impl.bean.QryRuleListInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.RamRuleListInfo;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class HostMonitorHandler extends AbstractExtHandler
{

	@Autowired
	private HostMonitorService hostMonitorService;

	/**
	 * 方法描述：主机列表展示
	 */
	public PageList<HostInfo> getHostList(Model model)
	{
		int start = StringUtils.toNum(model.get("start").toString());
		int end = StringUtils.toNum(model.get("limit").toString());

		model.put("netStatusCom", formatNetStatus(StringUtils.objToString(model.get("netStatusCom"))));
		PageList<HostInfo> list = hostMonitorService.getHostList(start, end, model);
		return list;
	}

	
	/**
	 * 方法描述：主机的详细信息
	 */
	public HostInfoDetail getHostDetail(Model model)
	{
		HostInfoDetail hostInfoDetail = hostMonitorService.getHostDetail(model);
		return hostInfoDetail;
	}
	public ViewModel showPage(Model model)
	{
		ViewModel viewModel=new ViewModel("hostmonitor/hostinfo.jsp","hostmonitor/hostinfo.js");
		model.getRequest().setAttribute("id",model.getValue("id"));
		model.getRequest().setAttribute("type",model.getValue("type"));
		return viewModel;
	}
	

	/**
	 * 方法描述：更新主机的信息
	 */
	public String updateHostInfo(Model model)
	{
		hostMonitorService.updateHostInfo(model);
		return "{\"success\":true,\"msg\":\"成功\"}";
	}

	/**
	 * 方法描述：新增主机的信息
	 * @param model
	 * @return
	 */
	public String addHostInfo(Model model){
		hostMonitorService.addHostInfo(model);
		return "{\"success\":true,\"msg\":\"成功\"}";
	}

	/**
	 * 方法描述：主机监控的开启和关闭
	 */
	public String updateMonitorStatus(Model model)
	{
		hostMonitorService.updateMonitorStatus(model);
		return "{\"success\":true,\"msg\":\"成功\"}";
	}

	/**
	 * 格式化--网络状态
	 */
	private String formatNetStatus(String status)
	{
		String resultStr = "";
		if (!("全部").equals(status) && status != "")
		{
			if (("正常").equals(status))
			{
				resultStr = Constant.STATUS_TYPE.Y.name();
			}
			else if (("异常").equals(status))
			{
				resultStr = Constant.STATUS_TYPE.N.name();
			}
			else
			{
				resultStr = "F";
			}
		}

		return resultStr;
	}
	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel=new ViewModel("hostmonitor/hostlist.jsp","hostmonitor/hostlist.js");
		
		return viewModel;
	}

	//跳转到指定handler的page方法
	public String skipHandler(Model model){
		return "HostInfoHandler";
	}
	
	//cpu规则查询
	public List<QryRuleListInfo> getRamInfoCPUList(Model model) {
		CreateJson json = new CreateJson();
		List<QryRuleListInfo> list = this.hostMonitorService.getRamInfoCPUList();
		System.out.println(list);
		return list;
	}
	
//磁盘规则查询
	public List<DiscRulelistOf> getRamInfoDISCList(Model model) {
		CreateJson json = new CreateJson();
		List<DiscRulelistOf> list = this.hostMonitorService.getRamInfoDISCList();
		System.out.println(list);
		return list;
	}
	//内存规则查询
	
	public List<RamRuleListInfo> getRamInfoRAMList(Model model) {
		CreateJson json = new CreateJson();
		List<RamRuleListInfo> list = this.hostMonitorService.getRamInfoRAMList();
		System.out.println(list);
		return list;
	}
	/**
	 * 获取主机磁盘盘符列表
	 * @param model
	 * @return
	 */
	public String getDiskList(Model model)
	{
		System.out.println("---------------------------------------------------------------");
		String ipAdddress=model.getValueNotEmpty("ipAddress");
		String publicName=model.getValueNotEmpty("publicName");
		SnmpHelper_ snmpHelper = new SnmpHelper_(ipAdddress,publicName, 2);
		try {
			snmpHelper.getSnmp().listen();
			hrStorageEntry[] hrStorageEntry = snmpHelper.GetFixedDiskStorageInfo();
			for(int i=0;i<hrStorageEntry.length;i++)
			{
				String diskName=hrStorageEntry[i].hrStorageDescr;
			}
		} catch (Exception e) {
			
		}
		finally
		{
			try {
				snmpHelper.getSnmp().close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println("---------------------------------------------------------------");
		 return "{\"success\":true,\"msg\":\"成功\"}";
	}
}
