package com.digitalchina.ldp.app.dms.handler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.service.HostMonitorService;
import com.digitalchina.ldp.app.dms.service.impl.bean.HostInfoDetail;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.ViewModel;
import com.digitalchina.ldp.handler.AbstractExtHandler;
import org.springframework.stereotype.Controller;

@Component
public class HostInfoHandler extends AbstractExtHandler
{
	@Autowired
	private HostMonitorService hostMonitorService;

	@Override
	public ViewModel page(Model model)
	{
		ViewModel viewModel = new ViewModel("hostmonitor/hostinfo.jsp",
				"hostmonitor/hostinfo.js");
		model.getRequest().setAttribute("id",model.get("id"));
		model.getRequest().setAttribute("type",model.getValue("type"));
		return viewModel;
	}
	/**
	 * 方法描述：主机的详细信息
	 */
	public HostInfoDetail getHostDetail(Model model)
	{
		HostInfoDetail hostInfoDetail = hostMonitorService.getHostDetail(model);
		/*
		String projectId=model.getValueNotEmpty("id");
		List<CpuInfoBean> cpuList=new ArrayList<CpuInfoBean>();
		cpuList.add(MonitorRecordBean.getCpuNewRecord(projectId));
		hostInfoDetail.setCpuInfoList(cpuList);
		List<RamInfoBean> ramList=new ArrayList<RamInfoBean>();
		ramList.add(MonitorRecordBean.getRamInfoBean(projectId));
		hostInfoDetail.setRamInfoList(ramList);
		List<DiskInfoBean> diskInfoList=MonitorRecordBean.getDiskInfoBean(projectId);
		String sql="DELETE FROM ";
		hostInfoDetail.setDiskInfoList(diskInfoList);
		*/
		return hostInfoDetail;
	}
	//跳转到指定handler的page方法
	public String skipHandler(Model model)
	{
		return "HostMonitorHandler";
	}

}
