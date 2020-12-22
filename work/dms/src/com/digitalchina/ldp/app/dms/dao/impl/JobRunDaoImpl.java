package com.digitalchina.ldp.app.dms.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.LogJob;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.JobRunDao;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class JobRunDaoImpl extends BaseDaoSupportImpl implements JobRunDao {

	private ParameterizedRowMapper<LogJob> getMapper() {

		ParameterizedRowMapper<LogJob> mapper = new ParameterizedRowMapper<LogJob>() {
			@Override
			public LogJob mapRow(ResultSet rs, int row) throws SQLException {
				LogJob logJob = new LogJob();
				logJob.setIdJob(rs.getInt("ID_JOB"));
				logJob.setJobName(rs.getString("JOBNAME"));
				logJob.setId_directory(rs.getString("ID_DIRECTORY"));
				logJob.setId_root(rs.getString("ID_ROOT"));
				logJob.setStartDate((Date) rs.getTimestamp("STARTDATE"));
				logJob.setEndDate((Date) rs.getTimestamp("ENDDATE"));
				logJob.setLogDate(rs.getString("LOGDATE"));
				logJob.setReplayDate(rs.getString("REPLAYDATE"));
				logJob.setStatus(rs.getString("STATUS"));
				logJob.setGovName(rs.getString("GOVNAME"));
				return logJob;
			}
		};
		return mapper;
	}
	// job运行情况列表
	@SuppressWarnings("deprecation")
	public PageList<LogJob> find(int pageSize, int limit, Model model) {
		String jobName = model.getValue("jobName");// 查询参数
		String directoryId = StringUtils.objToString(model.get("directoryId"));
		StringBuilder param = new StringBuilder();
		StringBuilder sb = new StringBuilder();
		if (StringUtils.objToString(jobName) != "") {
			param.append(" and tj.jobname like '" + "%" + jobName + "%" + "' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId)) {
			param.append(" and rd.id_root = '" + directoryId + "' ");
		}
		sb.append("  with tmp_directory as  ");
		sb.append("  ((select t.id_directory,  ");
		sb.append("  t.id_directory_parent,  ");
		sb.append("  t.directory_name,  ");
		sb.append("  t.id_directory_parent as id_root  ");
		sb.append("  from r_directory t  ");
		sb.append("  where t.id_directory_parent in  ");
		sb.append("  (select t.id_directory  ");
		sb.append("  from r_directory t ");
		sb.append("  where t.id_directory_parent = 0)) union (select t.id_directory,  ");
		sb.append("  t.id_directory_parent,  ");
		sb.append("  t.directory_name, ");
		sb.append("  t.id_directory as id_root  ");
		sb.append("  from r_directory t  ");
		sb.append("  where t.id_directory_parent = 0)),  ");
		sb.append("  tmp_job as  ");
		sb.append("  (select b.id_job,  ");
		sb.append("  a.jobname,  ");
		sb.append("  b.id_directory,  ");
		sb.append("  a.startdate,  ");
		sb.append("  a.enddate,  ");
		sb.append("  to_char(a.logdate, 'YYYY-MM-DD HH24:MI:SS') logdate, ");
		sb.append("  to_char(a.replaydate, 'YYYY-MM-DD HH24:MI:SS') replaydate, ");
		sb.append("  a.status  ");
		sb.append("  from log_job a, r_job b ");
		sb.append("  where 1 = 1  ");
		sb.append("  and a.jobname = b.name  ");
		sb.append("  and a.logdate in  ");
		sb.append("  (select max(c.logdate) from log_job c group by c.jobname)  ");
		sb.append("  and 1 = 1  ");
		sb.append("  order by a.status, a.enddate desc)  ");
		sb.append("  select tj.id_job,tj.jobname,tj.id_directory,  ");
		sb.append("  rd.id_root,rd.govname,tj.startdate,tj.enddate,  ");
		sb.append("  tj.logdate,tj.replaydate,tj.status  ");
		sb.append("  from tmp_job tj,  ");
		sb.append("  (select dtmp.id_directory,dtmp.id_directory_parent,dtmp.directory_name,  ");
		sb.append("  dtmp.id_root,rd.directory_name as govname ");
		sb.append("  from tmp_directory dtmp, r_directory rd  ");
		sb.append("  where dtmp.id_root = rd.id_directory) rd  ");
		sb.append("  where tj.id_directory = rd.id_directory(+)  ");
		sb.append(param);
		sb.append("  order by rd.govname,tj.jobname,tj.logdate desc  ");
		String sql = this.getPage().pageForParams(sb.toString());
		List<LogJob> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper(), pageSize, (pageSize + limit));
		//计数sql
		StringBuilder sum = new StringBuilder();
		sum.append(" select count(0) from ( ");
		sum.append(sb.toString());
		sum.append("  )  ");
		int count = this.getSimpleJdbcTemplate().queryForInt(sum.toString());
		PageList<LogJob> pageList = new PageList<LogJob>();
		pageList.setList(list);
		pageList.setCount(count);
		return pageList;
	}

	public List<RDirectoryBean> getDirectoryList() {
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("directoryParentId", "0");
		RDirectoryBean bean = new RDirectoryBean();
		bean.setDirectoryId(null);
		bean.setDirectoryName("全部");
		List<RDirectoryBean> list = this.find(RDirectoryBean.class, argsMap);
		list.add(0, bean);
		return list;
	}

}
