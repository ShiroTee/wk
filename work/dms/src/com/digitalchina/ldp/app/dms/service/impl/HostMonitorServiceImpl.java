package com.digitalchina.ldp.app.dms.service.impl;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.dms.bean.CpuInfoBean;
import com.digitalchina.ldp.app.dms.bean.DataBaseInfoBean;
import com.digitalchina.ldp.app.dms.bean.DiskInfoBean;
import com.digitalchina.ldp.app.dms.bean.HostRuleInfoBean;
import com.digitalchina.ldp.app.dms.bean.MonitorRecordBean;
import com.digitalchina.ldp.app.dms.bean.ProjectInfo;
import com.digitalchina.ldp.app.dms.bean.RamInfoBean;
import com.digitalchina.ldp.app.dms.common.util.CachLinkList;
import com.digitalchina.ldp.app.dms.dao.HostMonitorDao;
import com.digitalchina.ldp.app.dms.dao.HostRuleInfoDao;
import com.digitalchina.ldp.app.dms.service.HostMonitorService;
import com.digitalchina.ldp.app.dms.service.impl.bean.AlarmInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.DiscRulelistOf;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfoDetail;
import com.digitalchina.ldp.app.dms.service.impl.bean.QryRuleListInfo;
import com.digitalchina.ldp.app.dms.service.impl.bean.RamRuleListInfo;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.StringUtils;

@SuppressWarnings({ "rawtypes" })
@Service
public class HostMonitorServiceImpl implements HostMonitorService
{

	@Autowired
	private HostMonitorDao	hostMonitorDao;
	@Autowired
	private HostRuleInfoDao hostRuleInfoDao;

	/**
	 * 方法描述：主机列表展示
	 */
	public PageList<HostInfo> getHostList(int start, int end, Map<String, Object> map)
	{
		try
		{
			// 拼接查询条件
			String name = StringUtils.objToString(map.get("name"));
			String netStatus = StringUtils.objToString(map.get("netStatusCom"));
			String sysType = StringUtils.objToString(map.get("sysTypeCom"));
			StringBuffer qrySql = new StringBuffer();
			if (name != "")
			{
				qrySql.append(" AND P.NAME like '%" + name + "%' ");
			}
			if (netStatus != "")
			{
				qrySql.append(" AND P.STATUS = '" + netStatus + "' ");
			}
			if (sysType != "" && !("全部").equals(sysType))
			{
				qrySql.append(" AND P.TYPE = '" + sysType + "' ");
			}

			// 查询的SQL
			StringBuffer sql = new StringBuffer();
			sql.append("  SELECT P.ID, ");
			sql.append("         NVL (P.NAME, '---') NAME,");
			sql.append("         NVL (P.TYPE, '---') TYPE, ");
			sql.append("         NVL (P.SYSDESC, '---') SYSDESC, ");
			sql.append("         NVL (P.IPADDRESS, '---') IPADDRESS, ");
			sql.append("         P.USERNAME, ");
			sql.append("         P.PASSWORD, ");
			sql.append("         P.HOSTPORT, ");
			sql.append("         P.DATABASENAME, ");
			sql.append("         P.STATUS, ");
			sql.append("         TO_CHAR (P.COLLECTDATE, 'YYYY-MM-DD HH24:MI:SS') COLLECTDATE, ");
			sql.append("         P.WARNINGSTATUS, ");
			sql.append("         P.ERRORMSG, ");
			sql.append("         P.NETSTATUS, ");
			sql.append("         P.DATABASEPORT, ");
			sql.append("         P.DBSTATUS, ");
			sql.append("         P.FREQUENCY ");
			sql.append("    FROM PROJECTINFO P ");
			sql.append("   WHERE 1 = 1 ");
			sql.append(qrySql);
			sql.append("ORDER BY P.STATUS, P.NETSTATUS, P.WARNINGSTATUS, P.NAME ");
			
			List list = hostMonitorDao.findByPage(start, end, sql.toString());
			List<HostInfo> results = new ArrayList<HostInfo>();
			JSONArray jsonArray = JSONArray.fromObject(list);
			Object[] o = jsonArray.toArray();
			for (Object obj : o)
			{
				JSONObject json = (JSONObject) obj;
				HostInfo bean = (HostInfo) JSONObject.toBean(json, HostInfo.class);
				results.add(bean);
			}

			// 计数的SQL
			StringBuilder sqlCount = new StringBuilder();
			sqlCount.append("  SELECT COUNT (0) ");
			sqlCount.append("    FROM PROJECTINFO p ");
			sqlCount.append("   WHERE 1 = 1 ");
			sqlCount.append(qrySql);
			int count = hostMonitorDao.getTotal(sqlCount.toString());

			PageList<HostInfo> pageList = new PageList<HostInfo>();
			pageList.setList(results);
			pageList.setCount(count);

			list = null;
			results = null;
			return pageList;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取主机列表异常", e);
		}
	}

	/**
	 * 方法描述：告警列表展示
	 */
	public PageList<AlarmInfo> getAlarmList(int start, int end, Map<String, Object> map)
	{
		try
		{
			// 拼接查询条件
			String name = StringUtils.objToString(map.get("name"));
			String alarmType = StringUtils.objToString(map.get("alarmTypeCom"));
			String starttime_date = StringUtils.objToString(map.get("starttime_date"));
			String endtime_date = StringUtils.objToString(map.get("endtime_date"));
			StringBuffer qrySql = new StringBuffer();
			if (name != "")
			{
				qrySql.append(" AND B.NAME like '%" + name + "%' ");
			}
			if (alarmType != "" && !("全部").equals(alarmType))
			{
				qrySql.append(" AND A.ALARMTYPE = '" + alarmType + "' ");
			}
			if (starttime_date != "")
			{
				qrySql.append(" AND TO_CHAR(A.COLLECTDATE, 'YYYY-MM-DD HH24:MI:SS') >= '" + starttime_date + " 00:00:00' ");
			}
			if (endtime_date != "")
			{
				qrySql.append(" AND TO_CHAR(A.COLLECTDATE, 'YYYY-MM-DD HH24:MI:SS') <= '" + endtime_date + " 23:59:59' ");
			}

			// 查询的SQL
			StringBuffer sql = new StringBuffer();
			sql.append("SELECT A.ID, ");
			sql.append("       A.PROJECTID, ");
			sql.append("       B.NAME HOSTNAME, ");
			sql.append("       A.ALARMTYPE, ");
			sql.append("       TO_CHAR (A.COLLECTDATE, 'YYYY-MM-DD HH24:MI:SS') COLLECTDATE, ");
			sql.append("       A.ERRORMSG ");
			sql.append("  FROM ALARMINFO A, PROJECTINFO B ");
			sql.append(" WHERE A.PROJECTID = B.ID ");
			sql.append(qrySql);
			sql.append("ORDER BY B.NAME, A.ALARMTYPE, A.COLLECTDATE DESC ");
			List list = hostMonitorDao.findByPage(start, end, sql.toString());
			List<AlarmInfo> results = new ArrayList<AlarmInfo>();
			JSONArray jsonArray = JSONArray.fromObject(list);
			Object[] o = jsonArray.toArray();
			for (Object obj : o)
			{
				JSONObject json = (JSONObject) obj;
				AlarmInfo bean = (AlarmInfo) JSONObject.toBean(json, AlarmInfo.class);

				String errorMsg = bean.getERRORMSG();
				if (StringUtils.objToString(errorMsg) != "" && errorMsg.contains("\\"))
				{
					bean.setERRORMSG(errorMsg.replace("\\", "/"));
				}

				String type = StringUtils.objToString(bean.getALARMTYPE());
				if (type != "")
				{
					bean.setALARMTYPE(formatAlarmType(bean.getALARMTYPE()));
				}
				results.add(bean);
			}

			// 计数的SQL
			StringBuilder sqlCount = new StringBuilder();
			sqlCount.append("  SELECT COUNT (0) ");
			sqlCount.append("     FROM ALARMINFO A, PROJECTINFO B ");
			sqlCount.append("   WHERE A.PROJECTID = B.ID ");
			sqlCount.append(qrySql);
			int count = hostMonitorDao.getTotal(sqlCount.toString());

			PageList<AlarmInfo> pageList = new PageList<AlarmInfo>();
			pageList.setList(results);
			pageList.setCount(count);

			list = null;
			results = null;
			return pageList;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取告警列表异常", e);
		}
	}

	/**
	 * 格式化--告警类型
	 */
	public String formatAlarmType(String status)
	{
		String resultStr = "";
		if (("network").equals(status))
		{
			resultStr = "网络告警";
		}
		else if (("cpu").equals(status))
		{
			resultStr = "CPU告警";
		}
		else if (("disk").equals(status))
		{
			resultStr = "磁盘告警";
		}
		else if (("ram").equals(status))
		{
			resultStr = "内存告警";
		}
		else if (("database").equals(status))
		{
			resultStr = "数据库告警";
		}
		else
		{
			resultStr = "-9999";
		}

		return resultStr;
	}

	
	
	
	
	/**
	 * 方法描述：主机的详细信息
	 */
	public HostInfoDetail getHostDetail(Map<String, Object> map)
	{
		try
		{
			// 暂时从数据库查询信息，最后将改为读取缓存
			//DbContextHolder.setDbType(Constant.DATE_SOURCE_KEY.dms.name());
			String id = StringUtils.objToString(map.get("id"));
			System.out.print(id);
			HostInfoDetail hostInfoDetail = new HostInfoDetail();
			Map<String, Object> argsMap = new HashMap<String, Object>();
			Map<String, Object> hostMap = new HashMap<String, Object>();
			if (id != "")
			{
				argsMap.put("projectId", id);
				hostMap.put("id", id);
			}

			// 主机信息
			List<ProjectInfo> hostInfoList = hostMonitorDao.find(ProjectInfo.class, hostMap);
			if (hostInfoList.size() != 0)
			{
				hostInfoList = hostInfoList.subList(0, 1);
			}
			// CPU信息
			List<CpuInfoBean> cpuInfoList =new ArrayList<CpuInfoBean>();
			CpuInfoBean cpuInfoBean=new CpuInfoBean();
			if(MonitorRecordBean.getCpuNewRecord(id)==null)
			{
				cpuInfoBean.setCpuUsage(0);
				cpuInfoBean.setProjectId(id);
			}
			else
			{
				cpuInfoBean=MonitorRecordBean.getCpuNewRecord(id);
			}
			cpuInfoList.add(cpuInfoBean);
			// 磁盘信息
			List<DiskInfoBean> diskInfoList =MonitorRecordBean.getDiskInfoBean(id);
			if(diskInfoList==null)
			{
				diskInfoList=new ArrayList<DiskInfoBean>();
			}
			// 内存信息
			List<RamInfoBean> ramInfoList =new ArrayList<RamInfoBean>();
			if(MonitorRecordBean.getRamInfoBean(id)!=null)
			{
				ramInfoList.add(MonitorRecordBean.getRamInfoBean(id));
			}
			System.out.println(ramInfoList);
			//cpu规则信息
			String sql="SELECT R.* FROM PROJECTINFO P， HOSTRULEINFO H , RULEINFO R WHERE H.Projectid = '"+id+"' and R.ruletype='CPU使用率' AND P.ID=H.Projectid AND H.RULEID=R.ID ";
			List<HostRuleInfoBean> hostRuleInfocpulist =this.hostRuleInfoDao.findBySql(sql);
			//System.out.println(hostRuleInfocpulist);
			//磁盘规则
			String sql1="SELECT R.* FROM PROJECTINFO P， HOSTRULEINFO H , RULEINFO R WHERE H.Projectid = '"+id+"' and R.ruletype='磁盘剩余大小' AND P.ID=H.Projectid AND H.RULEID=R.ID";
			List<HostRuleInfoBean> hostRuleInfodisclist =this.hostRuleInfoDao.findBySql(sql1);
			System.out.println(hostRuleInfodisclist);
			//内存规则
			String sql2="SELECT R.* FROM PROJECTINFO P， HOSTRULEINFO H , RULEINFO R WHERE H.Projectid = '"+id+"' and R.ruletype='内存使用率' AND P.ID=H.Projectid AND H.RULEID=R.ID";
			List<HostRuleInfoBean> hostRuleInforamlist =this.hostRuleInfoDao.findBySql(sql2);
			System.out.println(hostRuleInforamlist);
			// 数据库信息
			List<DataBaseInfoBean> dataBaseInfoList = hostMonitorDao.find(DataBaseInfoBean.class, argsMap);
			if (dataBaseInfoList.size() != 0)
			{
				dataBaseInfoList = dataBaseInfoList.subList(0, 1);
			}
			hostInfoDetail.setDataBaseInfoList(dataBaseInfoList);
			hostInfoDetail.setHostRuleInfocpulist(hostRuleInfocpulist);
			hostInfoDetail.setHostRuleInfodisclist(hostRuleInfodisclist);
			hostInfoDetail.setHostRuleInforamlist(hostRuleInforamlist);
			hostInfoDetail.setHostInfoList(hostInfoList);
			hostInfoDetail.setCpuInfoList(cpuInfoList);
			hostInfoDetail.setDiskInfoList(diskInfoList);
			hostInfoDetail.setRamInfoList(ramInfoList);
			
			return hostInfoDetail;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("获取主机的详细信息异常", e);
		}
	}

	/**
	 * 方法描述：添加--主机的信息
	 */
	public void addHostInfo(Map<String, Object> map)
	{
		try
		{
			int count = hostMonitorDao.queryCount(ProjectInfo.class) + 1;
			ProjectInfo projectInfo = new ProjectInfo();
			HostRuleInfoBean hostRuleInfoBean =null;
			String rucpuid=StringUtils.objToString(map.get("vALUE"));
			System.out.println(rucpuid);
			String rudiscid=StringUtils.objToString(map.get("dISCID"));
			String ruramid=StringUtils.objToString(map.get("rAMID"));
			projectInfo.setId("" + count + "");
			projectInfo.setName(StringUtils.objToString(map.get("nAME")));
			projectInfo.setType(StringUtils.objToString(map.get("tYPE")));
			String ipid=StringUtils.objToString(map.get("iPADDRESS"));
			System.out.print(ipid);
			projectInfo.setIpAddress(StringUtils.objToString(map.get("iPADDRESS")));
			projectInfo.setUserName(StringUtils.objToString(map.get("uSERNAME")));
			projectInfo.setPassword(StringUtils.objToString(map.get("pASSWORD")));
			projectInfo.setHostPort(StringUtils.objToString(map.get("hOSTPORT")) == "" ? null : Integer.parseInt(map.get("hOSTPORT").toString()));
			projectInfo.setDataBaseName(StringUtils.objToString(map.get("dATABASENAME")));
			projectInfo.setStatus("Y");
			projectInfo.setCollectDate(new Date());
			projectInfo.setWarningStatus("N");
			projectInfo.setNetStatus("N");
			projectInfo.setDbStatus("N");
			projectInfo.setDataBasePort(StringUtils.objToString(map.get("dATABASEPORT")) == "" ? null : Integer.parseInt(map.get("dATABASEPORT").toString()));
			projectInfo.setFrequency(Integer.parseInt(StringUtils.objToString(map.get("fREQUENCY"))));
			if(rucpuid!=null&&rucpuid!=""){
				String aid = UUID.randomUUID().toString();
				hostRuleInfoBean=new HostRuleInfoBean();
				hostRuleInfoBean.setId(aid);
				hostRuleInfoBean.setProjectid("" + count + "");
				hostRuleInfoBean.setRuleid(rucpuid);
				hostRuleInfoBean.setAddtime(new Date());
				hostRuleInfoBean.setMemo("无");
				this.hostRuleInfoDao.insert(hostRuleInfoBean);
			}
			if(rudiscid!=null&&rudiscid!=""){
				String bid = UUID.randomUUID().toString();
				hostRuleInfoBean=new HostRuleInfoBean();
				hostRuleInfoBean.setId(bid);
				hostRuleInfoBean.setProjectid("" + count + "");
				hostRuleInfoBean.setRuleid(rudiscid);
				hostRuleInfoBean.setAddtime(new Date());
				hostRuleInfoBean.setMemo("无");
				this.hostRuleInfoDao.insert(hostRuleInfoBean);
			}
			if(ruramid!=null&&ruramid!=""){
				String cid = UUID.randomUUID().toString();
				hostRuleInfoBean=new HostRuleInfoBean();
				hostRuleInfoBean.setId(cid);
				hostRuleInfoBean.setProjectid("" + count + "");
				hostRuleInfoBean.setRuleid(ruramid);
				hostRuleInfoBean.setAddtime(new Date());
				hostRuleInfoBean.setMemo("无");
				this.hostRuleInfoDao.insert(hostRuleInfoBean);
			}
			List pro= this.hostMonitorDao.findBySql("select * from projectinfo  where IPADDRESS='"+ipid+"'");
			if(pro.size()>0&&!pro.equals("[]")){
				 throw new ServiceException("此ip已配置,如想配置请进详情修改");
			}
			this.hostMonitorDao.insert(projectInfo);

			// 将数据读入到缓存队列中
			List<ProjectInfo> list = new ArrayList<ProjectInfo>();
			list.add(projectInfo);
			CachLinkList.QUEUE.addAll(list);
			System.out.println("向监控队列中放入" + CachLinkList.QUEUE.size() + "台主机");
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("添加--主机的信息发生异常", e);
		}
	}

	@Override
	public void addHost(Map<String, Object> map) {
		try
		{
			int count = hostMonitorDao.queryCount(ProjectInfo.class) + 1;
			ProjectInfo projectInfo = new ProjectInfo();
			HostRuleInfoBean hostRuleInfoBean =null;
			String rucpuid=StringUtils.objToString(map.get("vALUE"));
			System.out.println(rucpuid);
			String rudiscid=StringUtils.objToString(map.get("dISCID"));
			String ruramid=StringUtils.objToString(map.get("rAMID"));
			projectInfo.setId("" + count + "");
			projectInfo.setName(StringUtils.objToString(map.get("NAME")));
			projectInfo.setType(StringUtils.objToString(map.get("TYPE")));
			String ipid=StringUtils.objToString(map.get("IPADDRESS"));
			System.out.print(ipid);
			projectInfo.setIpAddress(StringUtils.objToString(map.get("IPADDRESS")));
			projectInfo.setUserName(StringUtils.objToString(map.get("USER")));
			projectInfo.setPassword(StringUtils.objToString(map.get("PASSWORD")));
			projectInfo.setHostPort(StringUtils.objToString(map.get("HOSTPORT")) == "" ? null : Integer.parseInt(map.get("HOSTPORT").toString()));
			projectInfo.setDataBaseName(StringUtils.objToString(map.get("DATABASENAME")));
			projectInfo.setStatus("Y");
			projectInfo.setCollectDate(new Date());
			projectInfo.setWarningStatus("N");
			projectInfo.setNetStatus("N");
			projectInfo.setDbStatus("N");
			projectInfo.setDataBasePort(StringUtils.objToString(map.get("DATABASEPORT")) == "" ? null : Integer.parseInt(map.get("DATABASEPORT").toString()));
			projectInfo.setFrequency(Integer.parseInt(StringUtils.objToString(map.get("FREQUENCY"))));
			if(rucpuid!=null&&rucpuid!=""){
				String aid = UUID.randomUUID().toString();
				hostRuleInfoBean=new HostRuleInfoBean();
				hostRuleInfoBean.setId(aid);
				hostRuleInfoBean.setProjectid("" + count + "");
				hostRuleInfoBean.setRuleid(rucpuid);
				hostRuleInfoBean.setAddtime(new Date());
				hostRuleInfoBean.setMemo("无");
				this.hostRuleInfoDao.insert(hostRuleInfoBean);
			}
			if(rudiscid!=null&&rudiscid!=""){
				String bid = UUID.randomUUID().toString();
				hostRuleInfoBean=new HostRuleInfoBean();
				hostRuleInfoBean.setId(bid);
				hostRuleInfoBean.setProjectid("" + count + "");
				hostRuleInfoBean.setRuleid(rudiscid);
				hostRuleInfoBean.setAddtime(new Date());
				hostRuleInfoBean.setMemo("无");
				this.hostRuleInfoDao.insert(hostRuleInfoBean);
			}
			if(ruramid!=null&&ruramid!=""){
				String cid = UUID.randomUUID().toString();
				hostRuleInfoBean=new HostRuleInfoBean();
				hostRuleInfoBean.setId(cid);
				hostRuleInfoBean.setProjectid("" + count + "");
				hostRuleInfoBean.setRuleid(ruramid);
				hostRuleInfoBean.setAddtime(new Date());
				hostRuleInfoBean.setMemo("无");
				this.hostRuleInfoDao.insert(hostRuleInfoBean);
			}
			List pro= this.hostMonitorDao.findBySql("select * from projectinfo  where IPADDRESS='"+ipid+"'");
			if(pro.size()>0&&!pro.equals("[]")){
				throw new ServiceException("此ip已配置,如想配置请进详情修改");
			}
			this.hostMonitorDao.insert(projectInfo);

			// 将数据读入到缓存队列中
			List<ProjectInfo> list = new ArrayList<ProjectInfo>();
			list.add(projectInfo);
			CachLinkList.QUEUE.addAll(list);
			System.out.println("向监控队列中放入" + CachLinkList.QUEUE.size() + "台主机");
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("添加--主机的信息发生异常", e);
		}
	}

	/**
	 * 方法描述：主机监控的开启和关闭
	 */
	public void updateMonitorStatus(Map<String, Object> map)
	{
		try
		{
			String jsonString = StringUtils.objToString(map.get("jsonData"));
			String qryState = StringUtils.objToString(map.get("qryState"));
			if (jsonString != null)
			{
				String inStr = jsonString.replace("[", "(").replace("]", ")").replace("\"", "'");
				if (qryState != null)
				{
					String sql = "UPDATE PROJECTINFO SET STATUS='" + qryState + "' WHERE ID IN " + inStr;
					this.hostMonitorDao.updateBySql(sql);

					// 将数据读入到缓存队列中或者清除缓存队列中的数据
					JSONArray list = JSONArray.fromObject(jsonString);
					Map<String, Object> argsMap = new HashMap<String, Object>();
					for (int i = 0; i < list.size(); i++)
					{
						if (StringUtils.objToString(list.getString(i)) != "")
						{
							argsMap.put("id", list.getString(i));
							// 获取主机信息
							List<ProjectInfo> hostInfoList = hostMonitorDao.find(ProjectInfo.class, argsMap);

							if (("Y").equals(qryState))
							{
								// 将数据读入到缓存队列中
								CachLinkList.QUEUE.addAll(hostInfoList);
								System.out.println("向监控队列中放入" + CachLinkList.QUEUE.size() + "台主机");
							}
							else
							{
								// 将数据从缓存队列中移除
								CachLinkList.QUEUE.removeAll(hostInfoList);
								System.out.println("向监控队列中移除" + CachLinkList.QUEUE.size() + "台主机");
							}

							hostInfoList = null;
							argsMap = null;
						}
					}
				}
				else
				{
					throw new ServiceException("不能明确是否是开启和关闭的操作");
				}
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("主机监控的开启和关闭发生异常", e);
		}
	}

	/**
	 * 方法描述：更新主机的信息
	 */
	public void updateHostInfo(Map<String, Object> map)
	{
		try
		{
			Map<String, Object> argsMap = new HashMap<String, Object>();
			ProjectInfo projectInfo = new ProjectInfo();
			HostRuleInfoBean hostRuleInfoBean=null; 
			if (StringUtils.objToString(map.get("iD")) != "")
			{
				String id = StringUtils.objToString(map.get("iD"));
				System.out.println(id);
				String name = StringUtils.objToString(map.get("nAME"));
				String type = StringUtils.objToString(map.get("tYPE"));
				String ipAddress = StringUtils.objToString(map.get("iPADDRESS"));
				String userName = StringUtils.objToString(map.get("uSERNAME"));
				String password = StringUtils.objToString(map.get("pASSWORD"));
				Object port = StringUtils.objToString(map.get("hOSTPORT")) == "" ? -999 : map.get("hOSTPORT");
				Object frequency = StringUtils.objToString(map.get("fREQUENCY")) == "" ? 0 : map.get("fREQUENCY");
				Object dataBasePort = StringUtils.objToString(map.get("dATABASEPORT"));
				
				String rucpuid=StringUtils.objToString(map.get("vALUE"));
			//	System.out.println(rucpuid);
				String rudiscid=StringUtils.objToString(map.get("dISCID"));
			//	System.out.println(rudiscid);
				String ruramid=StringUtils.objToString(map.get("rAMID"));
			//	System.out.println(ruramid);
				String sql="select * from hostruleinfo where projectid='"+id+"'";
				List list=this.hostRuleInfoDao.findBySql(sql);
				System.out.println(list);
				if(list!=null){
					String ids = "('"+id+"')";
					this.hostRuleInfoDao.deleteListById(HostRuleInfoBean.class,"projectid", ids);
				}
				if(rucpuid!=null&&rucpuid!=""){
					String aid = UUID.randomUUID().toString();
					hostRuleInfoBean=new HostRuleInfoBean();
					hostRuleInfoBean.setId(aid);
					hostRuleInfoBean.setProjectid(id);
					hostRuleInfoBean.setRuleid(rucpuid);
					hostRuleInfoBean.setAddtime(new Date());
					hostRuleInfoBean.setMemo("无");
					this.hostRuleInfoDao.insert(hostRuleInfoBean);
				}
				if(rudiscid!=null&&rudiscid!=""){
					String bid = UUID.randomUUID().toString();
					hostRuleInfoBean=new HostRuleInfoBean();
					hostRuleInfoBean.setId(bid);
					hostRuleInfoBean.setProjectid(id);
					hostRuleInfoBean.setRuleid(rudiscid);
					hostRuleInfoBean.setAddtime(new Date());
					hostRuleInfoBean.setMemo("无");
					this.hostRuleInfoDao.insert(hostRuleInfoBean);
				}
				if(ruramid!=null&&ruramid!=""){
					String cid = UUID.randomUUID().toString();
					hostRuleInfoBean=new HostRuleInfoBean();
					hostRuleInfoBean.setId(cid);
					hostRuleInfoBean.setProjectid(id);
					hostRuleInfoBean.setRuleid(ruramid);
					hostRuleInfoBean.setAddtime(new Date());
					hostRuleInfoBean.setMemo("无");
					this.hostRuleInfoDao.insert(hostRuleInfoBean);
				}

				argsMap.put("id", id);
				argsMap.put("name", name);
				argsMap.put("type", type);
				argsMap.put("ipAddress", ipAddress);
				argsMap.put("userName", userName);
				argsMap.put("password", password);
				argsMap.put("hostPort", port);
				argsMap.put("frequency", frequency);
				argsMap.put("dataBasePort", dataBasePort);
				if (StringUtils.objToString(map.get("dATABASENAME")) != "")
				{
					argsMap.put("dataBaseName", map.get("dATABASENAME"));
				}

				this.hostMonitorDao.update(projectInfo, argsMap, id);
			}
			else
			{
				throw new ServiceException("更新主机信息发生异常,未找到主机信息");
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new ServiceException("更新主机信息发生异常", e);
		}
	}
	//查询cpu列表
	public List<QryRuleListInfo> getRamInfoCPUList(){
		String sql =("select ID VALUE, RULENAME||' '|| OPERATOR || ' ' || THRESHOLD  TEXT from ruleinfo where  RULETYPE='CPU使用率' and STATUS='Y'");	
		List list=this.hostMonitorDao.findBySql(sql);
		List<QryRuleListInfo> results = new ArrayList<QryRuleListInfo>();
		JSONArray jsonArray = JSONArray.fromObject(list);
		Object[] o = jsonArray.toArray();
		for (Object obj : o)
		{
			JSONObject json = (JSONObject) obj;
			QryRuleListInfo bean = (QryRuleListInfo) JSONObject.toBean(json, QryRuleListInfo.class);
			results.add(bean);
		}
		QryRuleListInfo qryRuleListInfo = new QryRuleListInfo();
		//qryRuleListInfo.setVALUE("");
		//qryRuleListInfo.setTEXT("未配置");
		results.add(0, qryRuleListInfo);
		System.out.println(results);
		return results;
	 }
	//查询磁盘列表
	
	public List<DiscRulelistOf> getRamInfoDISCList(){
		String sql =("select ID DISCID, RULENAME||' '|| OPERATOR || ' ' || THRESHOLD  DISC from ruleinfo where  RULETYPE='磁盘剩余大小' and STATUS='Y'");	
		List list=this.hostMonitorDao.findBySql(sql);
		List<DiscRulelistOf> results = new ArrayList<DiscRulelistOf>();
		JSONArray jsonArray = JSONArray.fromObject(list);
		Object[] o = jsonArray.toArray();
		for (Object obj : o)
		{
			JSONObject json = (JSONObject) obj;
			DiscRulelistOf bean = (DiscRulelistOf) JSONObject.toBean(json, DiscRulelistOf.class);
			results.add(bean);
		}
		System.out.println(results);
		return results;
	 }
	
	//查询内存列表
	public List<RamRuleListInfo> getRamInfoRAMList(){
		String sql =("select ID RAMID , RULENAME||' '|| OPERATOR || ' ' || THRESHOLD  RAM from ruleinfo where  RULETYPE='内存使用率' and STATUS='Y'");	
		List list=this.hostMonitorDao.findBySql(sql);
		List<RamRuleListInfo> results = new ArrayList<RamRuleListInfo>();
		JSONArray jsonArray = JSONArray.fromObject(list);
		Object[] o = jsonArray.toArray();
		for (Object obj : o)
		{
			JSONObject json = (JSONObject) obj;
			RamRuleListInfo bean = (RamRuleListInfo) JSONObject.toBean(json, RamRuleListInfo.class);
			results.add(bean);
		}
		System.out.println(results);
		return results;
	 }
}
