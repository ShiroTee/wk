package com.digitalchina.ldp.app.dms.dao.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.dao.LogJobDao;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class LogJobDaoImpl extends BaseDaoSupportImpl implements LogJobDao {

	// job整个页面
	public PageList<LogJob> find(int start, int pageSize, Model model) {
		String jobName = model.getValue("jobName");//
		String sql = "	select a.id_job, a.jobname, a.status, a.startdate, a.enddate from log_job a, r_job b where a.id_job = b.id_job  and 1 = 1 ";
		if (StringUtils.objToString(jobName) != "") {
			System.out.println("aaa");
			sql += " and log.jobname='" + jobName + "'";
		}
		sql = this.getPage().pageForParams(sql);
		List<Map<String, Object>> daoList = this.getSimpleJdbcTemplate()
				.queryForList(sql, start, pageSize);
		List<LogJob> list = new ArrayList<LogJob>();
		LogJob bean = null;
		for (Map<String, Object> map : daoList) {
			bean = new LogJob();
			bean.setIdJob((Integer) map.get("ID_JOB"));
			bean.setJobName(map.get("JOBNAME").toString());
			bean.setStatus(map.get("STATUS").toString());
			bean.setChannelId(map.get("CHANNEL_ID").toString());
			bean.setStartDate((Date) map.get("STARTDATE"));
			bean.setEndDate((Date) map.get("ENDDATE"));
			list.add(bean);
		}
		return (PageList<LogJob>) list;
	}
}
