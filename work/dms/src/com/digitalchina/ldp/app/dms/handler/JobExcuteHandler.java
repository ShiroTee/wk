package com.digitalchina.ldp.app.dms.handler;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.service.JobExcuteService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractExtHandler;

@Component
public class JobExcuteHandler extends AbstractExtHandler {

	@Autowired
	private JobExcuteService logJobService;

	public PageList<LogJob> testPage(Model model) {
		int start=(int)model.getInt("start");
		int pageSize=(int)model.getInt("limit");
		String param= StringUtils.objToString(model.getValue("jobName"));
		System.out.println("param="+param);
		//PageList<LogJob> list = logJobService.getLogJobList(start,pageSize,model);
		Map<String,Object> map=new HashMap<String,Object>();
		if((StringUtils.objToString(model.getValue("jobName")))!=""){
			map.put("jobName", param);
		}
		PageList<LogJob> list = logJobService.getLogJobList(map,start,pageSize);
		return list;
	}
	
	public PageList<LogJob> testPage(Model model,LogJob logJob) {

		int start=(int)model.getInt("start");
		int pageSize=(int)model.getInt("limit");
		String param= model.getValue("jobName");
		logJob = new LogJob();
		System.out.println("param="+param);
		Map<String,Object> map=new HashMap<String,Object>();
		map.put(logJob.getJobName(), param);
		
		PageList<LogJob> list = logJobService.getLogJobList(map, start, pageSize);
		return list;
	}
	//写 sql实现
/*	public PageList<LogJob> testPageOne(Model model) {
		int start=(int)model.getInt("start");
		int pageSize=(int)model.getInt("limit");
		String param= StringUtils.objToString(model.getValue("jobName"));
		System.out.println("param="+param);
		PageList<LogJob> list = logJobService.getLogJobList(start,pageSize,model);
		Map<String,Object> map=new HashMap<String,Object>();
		if((StringUtils.objToString(model.getValue("jobName")))!=""){
			map.put("jobName", param);
		}
		PageList<LogJob> list = logJobService.getLogJobList(map,start,pageSize);
		return list;
	}*/
	
}
