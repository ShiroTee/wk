package com.digitalchina.ldp.app.dms.handler;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import plugin.performance_monitor.util.snmp.SnmpHelper_;
import plugin.performance_monitor.util.snmp.model.hrStorageEntry;

import com.digitalchina.ldp.app.dms.bean.RuleinfoBean;
import com.digitalchina.ldp.app.dms.service.HostMonitorService;
import com.digitalchina.ldp.app.dms.service.impl.bean.DiscRulelistOf;
import com.digitalchina.ldp.app.dms.service.impl.bean.QryRuleListInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.RamRuleListInfo;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.common.util.CreateJson;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class AddHostMonitorHandler extends AbstractExtHandler {

	@Autowired
	private HostMonitorService hostMonitorService;

	@Override
	public ViewModel page(Model model) {
		ViewModel viewModel = new ViewModel("hostmonitor/hostadd.jsp",
				"hostmonitor/hostadd.js");
		return viewModel;
	}

	/**
	 * 方法描述：添加--主机的信息
	 */
	public String addHostInfo(Model model) {
		hostMonitorService.addHostInfo(model);
		return "{\"success\":true,\"msg\":\"成功\"}";
	}

	public String addHost(Model model){
		hostMonitorService.addHost(model);
		return "{\"success\":true,\"msg\":\"成功\"}";
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
		String ipAdddress=model.getValueNotEmpty("ipAddress");
		String publicName="public";
		SnmpHelper_ snmpHelper = new SnmpHelper_(ipAdddress,publicName, 2);
		try {
			snmpHelper.getSnmp().listen();
			hrStorageEntry[] hrStorageEntry = snmpHelper.GetFixedDiskStorageInfo();
			for(int i=0;i<hrStorageEntry.length;i++)
			{
				String diskName=hrStorageEntry[i].hrStorageDescr;
				System.out.print(diskName);
			}
			} catch (Exception e) 
			{	
		}
		finally
		{
			try {
				snmpHelper.getSnmp().close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		 return "{\"success\":true,\"msg\":\"成功\"}";
		 
	}
}
