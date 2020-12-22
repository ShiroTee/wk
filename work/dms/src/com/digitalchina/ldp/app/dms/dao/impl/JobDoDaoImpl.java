package com.digitalchina.ldp.app.dms.dao.impl;

import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.JobDoBean;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.JobDoDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@SuppressWarnings("rawtypes")
@Component
public class JobDoDaoImpl extends BaseDaoSupportImpl implements JobDoDao
{
	/**
	 * 
	 * 方法描述：分页查询
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public List findByPage(int start, int end, String sql)
	{
		String sb = this.getPage().pageForParams(sql);
		List list = this.getSimpleJdbcTemplate().queryForList(sb, start, start + end);

		return list;
	}

	/**
	 * 
	 * 方法描述：查询总条数
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public int getTotal(String sql)
	{
		int count = this.getSimpleJdbcTemplate().queryForInt(sql);

		return count;
	}

	/**
	 * 
	 * 方法描述：普通的查询语句
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public List findBySql(String sql)
	{
		List list = this.getSimpleJdbcTemplate().queryForList(sql);

		return list;
	}

	/**
	 * 
	 * 方法描述：更新语句
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public void updateBySql(String sql)
	{
		this.getSimpleJdbcTemplate().update(sql);
	}

	/**
	 * 
	 * 方法描述：插入语句
	 * 
	 * @param start
	 * @param end
	 * @param map
	 * @return
	 */
	public void insertBySql(String sql, Object[] args)
	{
		this.getSimpleJdbcTemplate().update(sql, args);
	}

	// //////////////////////////////旧版本///////////////////////////////
	private ParameterizedRowMapper<JobDoBean> getMapper()
	{

		ParameterizedRowMapper<JobDoBean> mapper = new ParameterizedRowMapper<JobDoBean>() {
			@Override
			public JobDoBean mapRow(ResultSet rs, int row) throws SQLException
			{
				JobDoBean jobDoBean = new JobDoBean();
				jobDoBean.setIdJob(rs.getInt("ID_JOB"));
				jobDoBean.setRIdJob(rs.getInt("R_ID_JOB"));
				jobDoBean.setJobName(rs.getString("JOBNAME"));
				jobDoBean.setStartDate((Date) rs.getTimestamp("STARTDATE"));
				jobDoBean.setEndDate((Date) rs.getTimestamp("ENDDATE"));
				jobDoBean.setLogDate((Date) rs.getTimestamp("LOGDATE"));
				jobDoBean.setReplayDate((Date) rs.getTimestamp("REPLAYDATE"));
				jobDoBean.setStatus(rs.getString("STATUS"));
				jobDoBean.setChannelId(rs.getString("CHANNEL_ID"));
				jobDoBean.setLinesRead(rs.getInt("LINES_READ"));
				jobDoBean.setLinesWritten(rs.getInt("LINES_WRITTEN"));
				jobDoBean.setLinesInput(rs.getInt("LINES_INPUT"));
				jobDoBean.setLinesOutput(rs.getInt("LINES_OUTPUT"));
				jobDoBean.setLinesUpdated(rs.getInt("LINES_UPDATED"));
				jobDoBean.setLinesRejected(rs.getInt("LINES_REJECTED"));
				jobDoBean.setErrors(rs.getInt("ERRORS"));
				jobDoBean.setGovName(rs.getString("GOVNAME"));
				jobDoBean.setBatchFlag(rs.getString("BATCH_FLAG"));
				// jobDoBean.setLogField("\""+rs.getString("LOG_FIELD")+"\"");

				return jobDoBean;
			}
		};
		return mapper;
	}

	// private ParameterizedRowMapper<LogJobEntryBean> getMapperTwo() {
	//
	// ParameterizedRowMapper<LogJobEntryBean> mapperTwo = new
	// ParameterizedRowMapper<LogJobEntryBean>() {
	// @Override
	// public LogJobEntryBean mapRow(ResultSet rs, int row)
	// throws SQLException {
	// LogJobEntryBean ljeb = new LogJobEntryBean();
	// ljeb.setIdBatch(rs.getInt("BATCHID"));
	// ljeb.setChannelId(rs.getString("CHANNELID"));
	// ljeb.setStepName(rs.getString("STEPNAME"));
	// ljeb.setLinesInput(rs.getInt("LINESINPUT"));
	// ljeb.setLinesWritten(rs.getInt("LINESWRITTEN"));
	// ljeb.setLinesOutput(rs.getInt("LINESOUTPUT"));
	// ljeb.setLinesRead(rs.getInt("LINESREAD"));
	// ljeb.setLinesUpdated(rs.getInt("LINESUPDATED"));
	// ljeb.setLinesRejected(rs.getInt("LINESREJECTED"));
	// ljeb.setErrors(rs.getInt("ERRORS"));
	// return ljeb;
	// }
	// };
	// return mapperTwo;
	// }

	// // job执行情况列表
	// public PageList<JobDoBean> find(int pageSize, int limit,
	// Map<String, Object> map) {
	// String jobName = StringUtils.objToString(map.get("jobName"));// 查询参数
	// String directoryId = StringUtils.objToString(map.get("directoryId"));
	// String startTime = StringUtils.objToString(map.get("replayDate"));
	// String endTime = StringUtils.objToString(map.get("logDate"));
	// StringBuilder param = new StringBuilder();
	// StringBuilder sb = new StringBuilder();
	// if (jobName != "") {
	// param.append(" and a.jobname like '" + "%" + jobName + "%" + "' ");
	// }
	// if (directoryId != "" && !("全部").equals(directoryId)) {
	// param.append(" and r.id_directory_parent = '" + directoryId + "' ");
	// }
	// if (startTime != "") {
	// param
	// .append(" AND TO_CHAR(a.replaydate, 'YYYY-MM-DD HH24:MI:SS') >= '"
	// + startTime + " 00:00:00' ");
	// }
	// if (endTime != "") {
	// param
	// .append(" AND TO_CHAR(a.logdate, 'YYYY-MM-DD HH24:MI:SS') >= '"
	// + endTime + " 00:00:00' ");
	// }
	// sb.append("select b.id_job,");
	// sb.append("b.name as jobname,");
	// sb.append("b.id_directory,");
	// sb.append("d.id_jobentry,");
	// sb.append("d.name as jobentryname,");
	// sb.append("d.id_jobentry_type,");
	// sb.append("r.govName,");
	// sb.append("a.channel_id,");
	// sb.append("a.startdate,");
	// sb.append("a.enddate,");
	// sb.append("a.logdate,");
	// sb.append("a.replaydate,");
	// sb.append("a.status,");
	// sb.append("a.log_field,");
	// sb.append("nvl(a.lines_read,0) lines_read,");
	// sb.append("nvl(a.lines_written,0) lines_written,");
	// sb.append("nvl(a.lines_updated,0) lines_updated,");
	// sb.append("nvl(a.lines_input,0) lines_input,");
	// sb.append("nvl(a.lines_output,0) lines_output,");
	// sb.append("nvl(a.lines_rejected,0) lines_rejected,");
	// sb.append("nvl(a.errors,0) errors");
	// sb.append("  from log_job a, r_job b,r_jobentry d,");
	// sb
	// .append("(select t2.id_directory,t2.id_directory_parent,t.directory_name   as govName from r_directory t, r_directory t2 where t.id_directory = t2.id_directory_parent) r");
	// sb.append("  where b.id_directory = r.id_directory(+)");
	// sb
	// .append("    and b.id_job = d.id_job and d.id_jobentry_type = 46 and a.r_id_job = b.id_job and a.logdate in (select max(c.logdate) from log_job c group by c.jobname) and 1=1 ");
	// sb.append(param);
	// sb.append("order by a.enddate desc");
	// String sql = this.getPage().pageForParams(sb.toString());
	// List<JobDoBean> list = this.getSimpleJdbcTemplate().query(sql,
	// this.getMapper(), pageSize + 1, (pageSize + limit));
	// sql =
	// "select count(0) from log_job a, r_job b where a.jobname = b.name and a.logdate in (select max(c.logdate) from log_job c group by c.jobname)";
	// int count = this.getSimpleJdbcTemplate().queryForInt(sql);
	// PageList<JobDoBean> pageList = new PageList<JobDoBean>();
	// pageList.setList(list);
	// pageList.setCount(count);
	// return pageList;
	// }

	// job执行情况列表
	public PageList<JobDoBean> find(int pageSize, int limit, Map<String, Object> map)
	{
		String jobName = StringUtils.objToString(map.get("jobName"));// 查询参数
		String directoryId = StringUtils.objToString(map.get("directoryId"));
		String startTime = StringUtils.objToString(map.get("replayDate"));
		String endTime = StringUtils.objToString(map.get("logDate"));
		String errors = StringUtils.objToString(map.get("errors"));
		StringBuilder param = new StringBuilder();
		StringBuilder sb = new StringBuilder();
		if (jobName != "")
		{
			param.append(" and temp1.jobname like '" + "%" + jobName + "%" + "' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId))
		{
			param.append(" and temp.id_directory = '" + directoryId + "' ");
		}

		if (errors != "" && !("全部").equals(errors))
		{
			if (("0").equals(errors))
			{
				param.append(" and nvl(temp1.errors, 0) = 0 ");
			}
			else if (("1").equals(errors))
			{
				param.append(" and nvl(temp1.errors, 0) > 0 ");
			}
		}
		if (startTime != "")
		{
			param.append(" AND TO_CHAR(temp1.replaydate, 'YYYY-MM-DD HH24:MI:SS') >= '" + startTime + " 00:00:00' ");
		}
		if (endTime != "")
		{
			param.append(" AND TO_CHAR(temp1.logdate, 'YYYY-MM-DD HH24:MI:SS') <= '" + endTime + " 00:00:00' ");
		}
		sb.append(" with temp as ");
		sb.append(" (select t.id_job, t.id_directory,t.name ");
		sb.append(" from r_job t ");
		sb.append(" where t.id_directory in ");
		sb.append(" (select t.id_directory ");
		sb.append(" from r_directory t ");
		sb.append(" where t.id_directory_parent = 0) ");
		sb.append(" and t.name in ");
		sb.append(" (select t.name ");
		sb.append(" from r_jobentry t ");
		sb.append(" where t.id_job = (select tt.id_job ");
		sb.append(" from r_job tt ");
		sb.append(" where tt.name = '各委办局数据交换整体调度流程') ");
		sb.append(" and t.id_jobentry_type = 46)), ");
		sb.append(" temp1 as ");
		sb.append(" (select * from log_job ll), ");
		sb.append(" temp2 as (SELECT rd.id_directory, rd.directory_name,rd.id_directory_parent  from r_directory rd) ");
		sb.append(" select temp.id_job, ");
		sb.append(" temp2.directory_name as  govName, ");
		sb.append(" temp1.batch_flag, ");
		sb.append(" temp2.id_directory_parent, ");
		sb.append(" temp.id_directory, ");
		sb.append(" temp.name, ");
		sb.append(" temp1.r_id_job, ");
		sb.append(" temp1.jobname, ");
		sb.append(" temp1.channel_id, ");
		sb.append(" temp1.startdate, ");
		sb.append(" temp1.enddate, ");
		sb.append(" temp1.logdate, ");
		sb.append(" temp1.replaydate, ");
		sb.append(" temp1.status, ");
		sb.append(" temp1.log_field, ");
		sb.append(" nvl(temp1.lines_read, 0) lines_read, ");
		sb.append(" nvl(temp1.lines_written, 0) lines_written, ");
		sb.append(" nvl(temp1.lines_updated, 0) lines_updated, ");
		sb.append(" nvl(temp1.lines_input, 0) lines_input, ");
		sb.append(" nvl(temp1.lines_output, 0) lines_output, ");
		sb.append(" nvl(temp1.lines_rejected, 0) lines_rejected, ");
		sb.append(" nvl(temp1.errors, 0) errors ");
		sb.append("  from temp, temp1,temp2 ");
		sb.append("  where temp.id_job = temp1.r_id_job and temp.id_directory = temp2.id_directory");
		sb.append(param);
		sb.append(" order by temp1.jobname, temp1.logdate desc");

		String sql = this.getPage().pageForParams(sb.toString());
		List<JobDoBean> list = this.getSimpleJdbcTemplate().query(sql, this.getMapper(), pageSize, (pageSize + limit));
//		sql = " select count(0) from (with temp as (select t.id_job, t.id_directory  from r_job t where t.id_directory in (select t.id_directory  from r_directory t "
//				+ " where t.id_directory_parent = 0) and t.name in (select t.name  from r_jobentry t where t.id_job = (select tt.id_job  from r_job tt  where tt.name = '兰州数据中心数据交换调度JOB')"
//				+ " and t.id_jobentry_type = 46)), temp1 as (select * from log_job ll),temp2 as (SELECT rd.id_directory, rd.directory_name  from r_directory rd)  select *  from temp, temp1,temp2  where temp.id_job = temp1.r_id_job and temp.id_directory = temp2.id_directory)";
		//计数sql
		StringBuilder sum = new StringBuilder();
		sum.append(" select count(0) from ( ");
		sum.append(sb.toString());
		sum.append("  )  ");
		int count = this.getSimpleJdbcTemplate().queryForInt(sum.toString());
		PageList<JobDoBean> pageList = new PageList<JobDoBean>();
		pageList.setList(list);
		pageList.setCount(count);
		return pageList;
	}

	public List<RDirectoryBean> getDirectoryList()
	{
		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("directoryParentId", "0");
		List<RDirectoryBean> list = this.find(RDirectoryBean.class, argsMap);
		return list;
	}

	// 查询日志信息
	public String queryLogMessage(Map<String, Object> map, String id)
	{

		try
		{
			id = java.net.URLDecoder.decode(StringUtils.objToString(map.get("id")), "UTF-8");
		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		String sql = "with temp as (select t.id_job, t.id_directory, t.name from r_job t where t.id_directory in (select t.id_directory from r_directory t where t.id_directory_parent = 0)"
				+ " and t.name in (select t.name from r_jobentry t where t.id_job = (select tt.id_job from r_job tt where tt.name = '各委办局数据交换整体调度流程') and t.id_jobentry_type = 46)),"
				+ " temp1 as (select * from log_job ll),temp2 as (SELECT rd.id_directory, rd.directory_name, rd.id_directory_parent from r_directory rd)"
				+ "select temp1.jobname, temp1.log_field from temp, temp1, temp2 where temp.id_job = temp1.r_id_job and temp.id_directory = temp2.id_directory and temp1.jobname=?";
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate().queryForList(sql, id);
		if (!list.isEmpty())
		{
			String logField = list.get(0).get("log_field").toString();
			// 替换日志信息的不规则字符(/,-)
			logField = logField.replaceAll("[/,-]", "").replace("\\n", "<br/>");
			return logField;
		}
		return null;

	}
}
