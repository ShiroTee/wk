package com.digitalchina.ldp.app.dms.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import plugin.performance_monitor.util.snmp.SnmpHelper_;
import plugin.performance_monitor.util.snmp.model.hrStorageEntry;

import com.digitalchina.ldp.app.dms.bean.AlarmInfoBean;
import com.digitalchina.ldp.app.dms.bean.CpuInfoBean;
import com.digitalchina.ldp.app.dms.bean.DataBaseInfoBean;
import com.digitalchina.ldp.app.dms.bean.DiskInfoBean;
import com.digitalchina.ldp.app.dms.bean.MonitorRecordBean;
import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
import com.digitalchina.ldp.app.dms.bean.RamInfoBean;
import com.digitalchina.ldp.app.dms.common.util.CachLinkList;
import com.digitalchina.ldp.app.dms.common.util.ConnectionUtil;
import com.digitalchina.ldp.app.dms.dao.AlarmInfoDao;
import com.digitalchina.ldp.app.dms.dao.CpuInfoDao;
import com.digitalchina.ldp.app.dms.dao.DiskInfoDao;
import com.digitalchina.ldp.app.dms.dao.ProjectInfoDao;
import com.digitalchina.ldp.app.dms.dao.RamInfoDao;
import com.digitalchina.ldp.app.dms.service.MonitorDataCollectService;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;

@Service
public class MonitorDataCollectServiceImpl implements MonitorDataCollectService
{

	@Autowired
	private DiskInfoDao diskInfoDao;
	@Autowired
	private RamInfoDao ramInfoDao;
	@Autowired
	private CpuInfoDao cpuInfoDao;
	@Autowired
	private ProjectInfoDao projectInfoDao;
	@Autowired
	private AlarmInfoDao alarmInfoDao;

	@Override
	public void collect(ProjectInfo p)
	{
		
		if(Constant.STATUS_TYPE.N.name().equals(p.getStatus()))
		{
			return;
		}
		//DbContextHolder.setDbType(Constant.DATE_SOURCE_KEY.dms.name());
		SnmpHelper_ snmpHelper = new SnmpHelper_(p.getIpAddress(),"public", 2);
		try
		{

			snmpHelper.getSnmp().listen();
			// 如果SNMP协议可以访问则进行数据采集
			if (this.isValidateNetworkConn(snmpHelper))
			{
				// 采集cpu
				boolean cpuStatus=this.collectCpuInfo(snmpHelper,p.getId());
				// 采集磁盘
				boolean disStatus=this.collectDiskInfo(snmpHelper,p.getId());
				// 采集内存
				boolean ramStatus=this.collectRamInfo(snmpHelper,p.getId());
				this.collectDataBaseInfo(p);
				Map<String,Object> args=new HashMap<String,Object>();
				args.put("netStatus",Constant.STATUS_TYPE.Y.name());
				//更新主机网络状态为正常
				this.projectInfoDao.update(p, args,p.getId());
				if(cpuStatus&&disStatus&&ramStatus)
				{
					this.update(Constant.STATUS_TYPE.N.name(),p.getId());
				}
				else
				{
					this.update(Constant.STATUS_TYPE.Y.name(),p.getId());
				}
				
			}
			else
			{
				
				this.saveAlarmInfo(Constant.MONITOR_OBJECT_TYPE.network.name(),"网络异常",p.getId());
				this.update(Constant.STATUS_TYPE.Y.name(),p.getId());
				Map<String,Object> args=new HashMap<String,Object>();
				args.put("netStatus",Constant.STATUS_TYPE.N.name());
				//更新主机网络状态为不正常
				this.projectInfoDao.update(p, args,p.getId());
			}

		} catch (Exception e)
		{
			e.printStackTrace();
		} finally
		{
			try
			{
				snmpHelper.getSnmp().close();
			} catch (IOException e)
			{
				e.printStackTrace();
			}

		}
	}

	// 采集CPU信息
	private boolean collectCpuInfo(SnmpHelper_ snmpHelper,String projectId)
	{
		
		try
		{
			int cpuUsage = snmpHelper.GetSystemCpuUsage();
			
			CpuInfoBean bean = new CpuInfoBean();
			bean.setCpuUsage(cpuUsage);
			bean.setProjectId(projectId);
			this.cpuInfoDao.insert(bean);
			MonitorRecordBean.cpuMap.put(projectId,bean);
			if (cpuUsage >= AlarmTactics.CPU_USAGE)
			{
				String type=Constant.MONITOR_OBJECT_TYPE.cpu.name();
				String msg="CPU使用率大于" + AlarmTactics.CPU_USAGE + "%!";
				System.out.println(msg);
				this.saveAlarmInfo(type, msg,projectId);
				//this.update(Constant.STATUS_TYPE.Y.name(),projectId);
				return false;
			}
			
		} catch (Exception e)
		{

		}
		return true;
		//this.update(Constant.STATUS_TYPE.N.name(),projectId);

	}

	// 采集磁盘信息
	private boolean collectDiskInfo(SnmpHelper_ snmpHelper,String projectId)
	{
		hrStorageEntry[] hrStorageEntry = snmpHelper.GetFixedDiskStorageInfo();
		hrStorageEntry hr = null;
		DiskInfoBean bean = null;
		List<DiskInfoBean> list=new ArrayList<DiskInfoBean>();
		for (int i = 0; i < hrStorageEntry.length; i++)
		{
			hr = hrStorageEntry[i];
			bean = new DiskInfoBean();
			bean.setName(hr.hrStorageDescr);
			bean.setProjectId(projectId);
			bean.setSize(hr.getStorageSize());
			bean.setUseSize(hr.getStorageUsed());
			diskInfoDao.insert(bean);
			list.add(bean);
			if (bean.getUseage() >= AlarmTactics.DISK_USAGE)
			{
				String type=Constant.MONITOR_OBJECT_TYPE.disk.name();
				String msg="磁盘:["+bean.getName()+"]空间空间使用率大于"+ AlarmTactics.DISK_USAGE*100 + "%!";
				System.out.println(msg);
				this.saveAlarmInfo(type, msg,projectId);
				//this.update(Constant.STATUS_TYPE.Y.name(),projectId);
				return false;
			}
		}
		MonitorRecordBean.diskMap.put(projectId,list);
		return true;
	}

	// 采集内存信息
	private boolean collectRamInfo(SnmpHelper_ snmpHelper,String projectId)
	{
		try
		{
			RamInfoBean bean = new RamInfoBean();
			hrStorageEntry entry = snmpHelper.GetPhysicalMemoryInfo();
			bean.setProjectId(projectId);
			bean.setSize(entry.getStorageSize());
			bean.setUseSize(entry.getStorageUsed());
			ramInfoDao.insert(bean);
			MonitorRecordBean.ramMap.put(projectId,bean);
			if (bean.getUsage()>= AlarmTactics.RAM_USAGE)
			{
				String type=Constant.MONITOR_OBJECT_TYPE.ram.name();
				String msg="物理内存使用率大于"+ AlarmTactics.RAM_USAGE*100 + "%!";
				System.out.println(msg);
				this.saveAlarmInfo(type, msg,projectId);
				//this.update(Constant.STATUS_TYPE.Y.name(),projectId);
				return false;
			}
			
		} catch (Exception e)
		{
			
		}
		return true;
	}
	private void collectDataBaseInfo(ProjectInfo p)
	{
		if(!StringUtils.isEmpty(p.getDataBaseName())&&!StringUtils.isEmpty(p.getPassword())&&!StringUtils.isEmpty(p.getUserName()))
		{
				ConnectionUtil conn=new ConnectionUtil(p.getIpAddress(),p.getUserName(),p.getPassword(),p.getDataBasePort(),p.getDataBaseName());
				if(conn==null)
				{
					return;
				}
				DataBaseInfoBean bean=conn.getDataBaseInfo();
				if(bean.getStatus().equals(Constant.STATUS_TYPE.N.name()))
				{
					Map<String,Object> args=new HashMap<String,Object>();
					args.put("dbStatus",Constant.STATUS_TYPE.N.name());
					args.put("warningStatus",Constant.STATUS_TYPE.N.name());
					this.projectInfoDao.update(p, args,p.getId());
				}
				else
				{
					Map<String,Object> args=new HashMap<String,Object>();
					args.put("dbStatus",Constant.STATUS_TYPE.Y.name());
					args.put("warningStatus",Constant.STATUS_TYPE.Y.name());
					this.projectInfoDao.update(p, args,p.getId());
				}
		}
	}

	// 验证网络是否连通
	private boolean isValidateNetworkConn(SnmpHelper_ snmpHelper)
	{
		try
		{
			String systemName = snmpHelper.GetSystemName();
			if (StringUtils.isEmpty(systemName))
			{
				return false;
			}
		} catch (Exception e)
		{

		}
		return true;
	}

	

	@Override
	public void load()
	{
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("status", Constant.STATUS_TYPE.Y.name());
		List<ProjectInfo> list = projectInfoDao
				.find(ProjectInfo.class, argsMap);
		// 将数据读入到缓存队列中
		CachLinkList.QUEUE.addAll(list);
		System.out.println("向监控队列中放入" + CachLinkList.QUEUE.size() + "台主机");

	}

	

	// 更新主机监控状态
	private void update(String status,String projectId)
	{
		ProjectInfo p = new ProjectInfo();
		p.setStatus(status);
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("warningStatus", status);
		this.projectInfoDao.update(p, argsMap,projectId);
	}
	private void saveAlarmInfo(String type,String msg,String projectId)
	{
		AlarmInfoBean alarmInfo =new AlarmInfoBean();
		alarmInfo.setAlarmType(type);
		alarmInfo.setErrorMsg(msg);
		alarmInfo.setProjectId(projectId);
		this.alarmInfoDao.insert(alarmInfo);
	}
}

// 告警策略
class AlarmTactics
{
	public static final float CPU_USAGE = 80F;
	public static final float DISK_USAGE = 0.9F;
	public static final float RAM_USAGE = 0.9F;
}
