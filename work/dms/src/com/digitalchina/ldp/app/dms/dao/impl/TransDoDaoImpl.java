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
import com.digitalchina.ldp.app.dms.bean.LogTrans;
import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.dao.TransDoDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class TransDoDaoImpl extends BaseDaoSupportImpl implements TransDoDao {

	private ParameterizedRowMapper<LogTrans> getMapper() {

		ParameterizedRowMapper<LogTrans> mapper = new ParameterizedRowMapper<LogTrans>() {
			@Override
			public LogTrans mapRow(ResultSet rs, int row) throws SQLException {
				LogTrans logTrans = new LogTrans();
				logTrans.setIdBatch(rs.getInt("id_transformation"));
				logTrans.setTransName(rs.getString("TRANSNAME"));
				logTrans.setStartDate((Date) rs.getTimestamp("STARTDATE"));
				logTrans.setEndDate((Date) rs.getTimestamp("ENDDATE"));
				logTrans.setLogDate(rs.getString("LOGDATE"));
				logTrans.setReplayDate(rs.getString("REPLAYDATE"));
				logTrans.setStatus(rs.getString("STATUS"));
				logTrans.setChannelId(rs.getString("CHANNEL_ID"));
				logTrans.setLinesRead(rs.getInt("lines_read"));
				logTrans.setLinesWritten(rs.getInt("lines_written"));
				logTrans.setLinesInput(rs.getInt("lines_input"));
				logTrans.setLinesOutput(rs.getInt("lines_output"));
				logTrans.setLinesUpdated(rs.getInt("lines_updated"));
				logTrans.setLinesRejected(rs.getInt("lines_rejected"));
				logTrans.setErrors(rs.getInt("errors"));
				logTrans.setGovName(rs.getString("govname"));
				logTrans.setJobName(rs.getString("JOBNAME"));
				logTrans.setBatchFlag(rs.getString("batch_flag"));
				return logTrans;
			}
		};
		return mapper;
	}

	// trans执行情况列表
	@SuppressWarnings("deprecation")
	public PageList<LogTrans> find(int pageSize, int limit,
			Map<String, Object> map) {
		String transName = StringUtils.objToString(map.get("transName"));// 查询参数
		String directoryId = StringUtils.objToString(map.get("directoryId"));
		String startTime = StringUtils.objToString(map.get("replayDate"));
		String endTime = StringUtils.objToString(map.get("logDate"));
		String errors = StringUtils.objToString(map.get("errors"));
		StringBuilder param = new StringBuilder();
		StringBuilder sb = new StringBuilder();
		if (transName != "") {
			param.append(" and a.transname like '" + "%" + transName + "%"
					+ "' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId)) {
			param.append(" and rd.id_root = '" + directoryId + "' ");
		}
		if (startTime != "") {
			param
					.append(" AND TO_CHAR(a.replaydate, 'YYYY-MM-DD HH24:MI:SS') >= '"
							+ startTime + " 00:00:00' ");
		}
		if (endTime != "") {
			param
					.append(" AND TO_CHAR(a.logdate, 'YYYY-MM-DD HH24:MI:SS') <= '"
							+ endTime + " 23:59:59' ");
		}
		//执行成功包括:(状态为非stop和正常执行error=0)
		// 执行失败包括:(状态为stop或正常执行error>0)
		if (errors != "" && !("全部").equals(errors)) {
			if (("0").equals(errors)) {
				param.append(" and (nvl(a.errors,0) = 0  and  a.status != 'stop') ");
			} else if (("1").equals(errors)) {
				//param.append(" and a.status = 'stop'    ");
				param.append(" and (nvl(a.errors,0) > 0  or a.status = 'stop'  )  ");
			}
		}
		/*sb.append("  with jon_to_trans_tmp as   ");
		sb.append("  (select distinct t1.id_jobentry,   ");
		sb.append("  t1.id_job,   ");
		sb.append("  t1.name         as transname,  ");
		sb.append("  r.name         as jobname,   ");
		sb.append("   t1.id_jobentry_type, ");
		sb.append("   t2.id_transformation,  ");
		sb.append("   t2.id_directory  ");
		sb.append("   from r_jobentry t1, r_transformation t2, r_job r   ");
		sb.append("   where 1 = 1 and t1.id_job = r.id_job and t1.name = t2.name), d_tmp as  ");
		sb.append("   ((select rd.id_directory,rd.directory_name, rd.id_directory_parent,rd.id_directory_parent as id_root  ");
		sb.append("   from r_directory rd where rd.id_directory_parent in ((select rd.id_directory from r_directory rd  ");
		sb.append("   where rd.id_directory_parent = 0))) union  ");
		sb.append("   (select t.id_directory,t.directory_name,t.id_directory_parent,t.id_directory as id_root from r_directory t  ");
		sb.append("   where t.id_directory_parent = 0))  ");
		sb.append(" select b.id_transformation, ");
		sb.append(" a.batch_flag, ");
		sb.append(" rd.govname, ");
		sb.append(" rd.id_root, ");
		sb.append(" a.transname, ");
		sb.append(" jt.jobname, ");
		sb.append(" a.startdate, ");
		sb.append(" a.enddate, ");
		sb.append(" TO_CHAR (a.logdate, 'YYYY-MM-DD HH24:MI:SS') logdate,  ");
		sb.append(" TO_CHAR (a.replaydate, 'YYYY-MM-DD HH24:MI:SS') replaydate,  ");
		sb.append(" a.status, ");
		sb.append(" a.channel_id, ");
		sb.append(" a.lines_read, ");
		sb.append(" a.lines_written, ");
		sb.append(" a.lines_updated, ");
		sb.append(" a.lines_input, ");
		sb.append(" a.lines_output, ");
		sb.append(" a.lines_rejected, ");
		sb.append(" a.errors");
		//sb.append(" a.log_field ");
		sb.append(" from log_trans a, r_transformation  b,jon_to_trans_tmp jt, ");
		sb.append(" (select dtmp.id_directory,dtmp.id_directory_parent,dtmp.directory_name,dtmp.id_root, ");
		sb.append(" rd.directory_name as govname  from d_tmp dtmp, r_directory rd ");
		sb.append(" where dtmp.id_root = rd.id_directory) rd ");
		sb.append(" where b.id_directory = rd.id_directory(+)");
		sb.append(" and a.transname = b.name and a.transname = jt.transname and b.name = jt.transname and a.logdate in (select max(c.logdate) from log_trans c group by c.transname) and 1=1 ");
		sb.append(param);
		sb.append("order by RD.GOVNAME, JT.JOBNAME,A.TRANSNAME, TO_CHAR(A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') DESC");*/

		sb.append("WITH jon_to_trans_tmp AS (");
		sb.append("SELECT DISTINCT t1.id_jobentry,t1.id_job,t1.name AS transname,r.name AS jobname,t1.id_jobentry_type,t2.id_transformation,t2.id_directory");
		sb.append(" FROM r_jobentry t1,r_transformation t2,r_job r WHERE t1.id_job = r.id_job AND t1.name = t2.name),");
		sb.append("d_tmp AS (");
		sb.append("SELECT rd.id_directory, rd.directory_name, rd.id_directory_parent, rd.id_directory_parent AS id_root");
		sb.append(" FROM r_directory rd ");
		sb.append(" inner JOIN (SELECT id_directory FROM r_directory WHERE id_directory_parent = 0) t ");
		sb.append(" ON rd.id_directory_parent=t.id_directory ");
		sb.append(" UNION(SELECT t.id_directory, t.directory_name, t.id_directory_parent, t.id_directory AS id_root FROM r_directory t WHERE t.id_directory_parent = 0) ");
		sb.append(")");
		sb.append("SELECT b.id_transformation, a.batch_flag, rd.govname, rd.id_root, a.transname, jt.jobname, a.startdate, a.enddate, TO_CHAR (a.logdate,");
		sb.append("'YYYY-MM-DD HH24:MI:SS') logdate, TO_CHAR (a.replaydate,'YYYY-MM-DD HH24:MI:SS') replaydate, a.status, a.channel_id, a.lines_read, a.lines_written, a.lines_updated, a.lines_input, a.lines_output, a.lines_rejected, a.errors  ");
		sb.append(" FROM ");
		sb.append(" log_trans a, r_transformation b, jon_to_trans_tmp jt, (");
		sb.append("SELECT dtmp.id_directory, dtmp.id_directory_parent, dtmp.directory_name, dtmp.id_root, rd.directory_name AS govname ");
		sb.append(" FROM d_tmp dtmp, r_directory rd WHERE dtmp.id_root = rd.id_directory) rd  ");
		sb.append("WHERE a.transname = b.name AND a.transname = jt.transname AND b.name = jt.transname AND a.logdate IN (");
		sb.append("SELECT max(c.logdate) FROM log_trans c GROUP BY c.transname)");
		//sb.append(" AND 1 = 1");
		sb.append(param);
		sb.append(" ORDER BY TO_CHAR(A.LOGDATE, 'YYYY-MM-DD HH24:MI:SS') DESC,RD.GOVNAME asc, JT.JOBNAME asc, A.TRANSNAME asc ");
		String sql = this.getPage().pageForParams(sb.toString());
		List<LogTrans> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper(), pageSize, (pageSize + limit));
		// 计数sql
		StringBuilder sum = new StringBuilder();
		sum.append(" select count(0) from ( ");
		sum.append(sb.toString());
		sum.append("  )   ");
		int count = this.getSimpleJdbcTemplate().queryForInt(sum.toString());
		PageList<LogTrans> pageList = new PageList<LogTrans>();
		pageList.setList(list);
		pageList.setCount(count);
		return pageList;
	}

	// 获取transformation日志信息
	public String queryLogMessage(Map<String, Object> map, String id) {
		try {
			id = java.net.URLDecoder.decode(StringUtils.objToString(map
					.get("id")), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String sql = " select a.transname,a.log_field from log_trans a,r_transformation b,(select rd.id_directory, rd.directory_name, rd.id_directory_parent "
				+ "from r_directory rd where rd.id_directory_parent = 0) rd where b.id_directory = rd.id_directory(+) and a.transname = b.name and a.logdate in "
				+ "(select max(c.logdate) from log_trans c group by c.transname) and  a.transname=?";
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate()
				.queryForList(sql, id);
		if (!list.isEmpty()) {
			String logField = list.get(0).get("log_field").toString();
			// 替换日志信息的不规则字符(/,-)
			logField = logField.replace("\\n", "<br/>");
			// logField = logField.replaceAll("[/,-]", "").replace("\\n",
			// "<br/>");
			return logField;
		}
		return null;
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
