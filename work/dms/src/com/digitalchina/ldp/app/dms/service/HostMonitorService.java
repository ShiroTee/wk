package com.digitalchina.ldp.app.dms.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.dms.service.impl.bean.AlarmInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.DiscRulelistOf;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfoDetail;
import com.digitalchina.ldp.app.dms.service.impl.bean.QryRuleListInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.RamRuleListInfo;
import com.digitalchina.ldp.bean.PageList;

public interface HostMonitorService
{
	/**
	 * 方法描述：主机列表展示
	 */
	public PageList<HostInfo> getHostList(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：告警列表展示
	 */
	public PageList<AlarmInfo> getAlarmList(int start, int end, Map<String, Object> map);

	/**
	 * 方法描述：主机的详细信息
	 */
	public HostInfoDetail getHostDetail(Map<String, Object> map);

	/**
	 * 方法描述：添加--主机的信息
	 */
	public void addHostInfo(Map<String, Object> map);

	public void addHost(Map<String, Object> map);
	
	/**
	 * 获取cup使用率列表
	 * @return
	 */
	public List<QryRuleListInfo> getRamInfoCPUList();
	/**
	 * 获磁盘使用率列表
	 * @return
	 */
	public	List<DiscRulelistOf> getRamInfoDISCList();
	/**
	 * 获取内存大小列表
	 * @return
	 */
	
	public List<RamRuleListInfo> getRamInfoRAMList();
	

	/**
	 * 方法描述：主机监控的开启和关闭
	 */
	public void updateMonitorStatus(Map<String, Object> map);

	/**
	 * 方法描述：更新主机的信息
	 */
	public void updateHostInfo(Map<String, Object> map);

}
