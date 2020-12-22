package com.digitalchina.ldp.app.dms.service.impl.bean;

import java.util.List;

import com.digitalchina.ldp.app.dms.bean.CpuInfoBean;
import com.digitalchina.ldp.app.dms.bean.DataBaseInfoBean;
import com.digitalchina.ldp.app.dms.bean.DiskInfoBean;
import com.digitalchina.ldp.app.dms.bean.HostRuleInfoBean;
import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
import com.digitalchina.ldp.app.dms.bean.RamInfoBean;

/**
 * 
 * 类描述：查询的主机信息
 * 
 * @author: xiaojun
 * @date： 日期：2013-4-9 时间：下午02:26:44
 * @version 1.0
 */
public class HostInfoDetail implements java.io.Serializable
{
	private List<CpuInfoBean> cpuInfoList;
	private List<DataBaseInfoBean> dataBaseInfoList;
	private List<DiskInfoBean> diskInfoList;
	private List<RamInfoBean> ramInfoList;
	private List<ProjectInfo> hostInfoList;
	private List<HostRuleInfoBean> hostRuleInfocpulist;
	private List<HostRuleInfoBean> hostRuleInfodisclist;
	private List<HostRuleInfoBean> hostRuleInforamlist;

	public List<ProjectInfo> getHostInfoList()
	{
		return hostInfoList;
	}

	public void setHostInfoList(List<ProjectInfo> hostInfoList)
	{
		this.hostInfoList = hostInfoList;
	}

	public List<CpuInfoBean> getCpuInfoList()
	{
		return cpuInfoList;
	}

	public void setCpuInfoList(List<CpuInfoBean> cpuInfoList)
	{
		this.cpuInfoList = cpuInfoList;
	}

	public List<DataBaseInfoBean> getDataBaseInfoList()
	{
		return dataBaseInfoList;
	}

	public void setDataBaseInfoList(List<DataBaseInfoBean> dataBaseInfoList)
	{
		this.dataBaseInfoList = dataBaseInfoList;
	}

	public List<DiskInfoBean> getDiskInfoList()
	{
		return diskInfoList;
	}

	public void setDiskInfoList(List<DiskInfoBean> diskInfoList)
	{
		this.diskInfoList = diskInfoList;
	}

	public List<RamInfoBean> getRamInfoList()
	{
		return ramInfoList;
	}

	public void setRamInfoList(List<RamInfoBean> ramInfoList)
	{
		this.ramInfoList = ramInfoList;
	}

	public List<HostRuleInfoBean> getHostRuleInfocpulist() {
		return hostRuleInfocpulist;
	}

	public void setHostRuleInfocpulist(List<HostRuleInfoBean> hostRuleInfocpulist) {
		this.hostRuleInfocpulist = hostRuleInfocpulist;
	}

	public List<HostRuleInfoBean> getHostRuleInfodisclist() {
		return hostRuleInfodisclist;
	}

	public void setHostRuleInfodisclist(List<HostRuleInfoBean> hostRuleInfodisclist) {
		this.hostRuleInfodisclist = hostRuleInfodisclist;
	}

	public List<HostRuleInfoBean> getHostRuleInforamlist() {
		return hostRuleInforamlist;
	}

	public void setHostRuleInforamlist(List<HostRuleInfoBean> hostRuleInforamlist) {
		this.hostRuleInforamlist = hostRuleInforamlist;
	}

}
