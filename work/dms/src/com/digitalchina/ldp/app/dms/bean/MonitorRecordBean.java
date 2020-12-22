package com.digitalchina.ldp.app.dms.bean;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MonitorRecordBean implements java.io.Serializable
{
	public static final Map<String, CpuInfoBean> cpuMap = new ConcurrentHashMap<String, CpuInfoBean>(
			1);
	public static final Map<String, List<DiskInfoBean>> diskMap = new ConcurrentHashMap<String, List<DiskInfoBean>>(
			1);
	public static final Map<String, RamInfoBean> ramMap = new ConcurrentHashMap<String, RamInfoBean>(
			1);
	public static final Map<String, DataBaseInfoBean> dataBaseMap = new ConcurrentHashMap<String, DataBaseInfoBean>(
			1);

	public static CpuInfoBean getCpuNewRecord(String projectId)
	{
		return MonitorRecordBean.cpuMap.get(projectId);
	}

	public static List<DiskInfoBean> getDiskInfoBean(String projectId)
	{
		return MonitorRecordBean.diskMap.get(projectId);
	}

	public static RamInfoBean getRamInfoBean(String proejctId)
	{
		return ramMap.get(proejctId);
	}

	public static DataBaseInfoBean getDataBaseInfoBean(String projectId)
	{
		return dataBaseMap.get(projectId);
	}
}
