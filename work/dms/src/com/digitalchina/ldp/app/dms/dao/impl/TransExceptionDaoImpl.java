package com.digitalchina.ldp.app.dms.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.dao.TransExceptionDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class TransExceptionDaoImpl extends BaseDaoSupportImpl implements
		TransExceptionDao {

	private ParameterizedRowMapper<KettleErrors> getMapper() {

		ParameterizedRowMapper<KettleErrors> mapper = new ParameterizedRowMapper<KettleErrors>() {
			@Override
			public KettleErrors mapRow(ResultSet rs, int row)
					throws SQLException {
				KettleErrors ke = new KettleErrors();
				ke.setId(rs.getString("id"));
				ke.setName(rs.getString("name"));
				//ke.setStartDate((Date) rs.getTimestamp("START_DATE"));
				ke.setStartDate(rs.getString("START_DATE"));
				//ke.setEndDate((Date) rs.getTimestamp("END_DATE"));
				ke.setEndDate( rs.getString("END_DATE"));
				//ke.setLogDate((Date) rs.getTimestamp("LOG_DATE"));
				ke.setLogDate(rs.getString("LOG_DATE"));
				return ke;
			}
		};
		return mapper;
	}

	// transformation异常记录情况列表
	public PageList<KettleErrors> find(int pageSize, int limit,
			Map<String, Object> map) {
		String jobName = StringUtils.objToString(map.get("name"));// 查询参数
		String startTime = StringUtils.objToString(map.get("startTime"));
		String endTime = StringUtils.objToString(map.get("endTime"));
		StringBuilder param = new StringBuilder();
		StringBuilder sb = new StringBuilder();
		if (jobName != "") {
			param.append(" and a.name like '" + "%" + jobName + "%" + "' ");
		}
		if (startTime != "") {
			param.append(" AND TO_CHAR(a.log_date, 'YYYY-MM-DD HH24:MI:SS') >= '"
							+ startTime + " 00:00:00' ");
		}
		if (endTime != "") {
			param.append(" AND TO_CHAR(a.log_date, 'YYYY-MM-DD HH24:MI:SS') <= '"
							+ endTime + " 00:00:00' ");
		}
		sb.append("select a.id,");
		sb.append("a.name,");
		sb.append("a.channel_id,");
		sb.append("a.err_type,");
//		sb.append("a.start_date,");
//		sb.append("a.end_date,");
//		sb.append("a.log_date,");
		sb.append("  TO_CHAR (a.start_date, 'YYYY-MM-DD HH24:MI:SS') start_date,  ");
		sb.append("  TO_CHAR (a.end_date, 'YYYY-MM-DD HH24:MI:SS') end_date,  ");
		sb.append("  TO_CHAR (a.log_date, 'YYYY-MM-DD HH24:MI:SS') log_date,  ");
		sb.append("a.clry,");
		sb.append("a.clrq,");
		sb.append("a.err_reason,");
		sb.append("a.clff,");
		sb.append("a.clbz,");
		sb.append("a.log_field");
		sb.append("  from k_errs a ");
		sb.append("  where a.err_type = 'T' and 1=1 ");
		sb.append(param);
		sb.append("order by a.log_date desc");
		String sql = this.getPage().pageForParams(sb.toString());
		List<KettleErrors> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper(), pageSize, (pageSize + limit));
		//sql = "select count(0) from k_errs a where a.err_type = 'T'";
		
		StringBuilder sum = new StringBuilder();
		sum.append(" select count(0) from ( ");
		sum.append(sb.toString());
		sum.append("  )  ");
		int count = this.getSimpleJdbcTemplate().queryForInt(sum.toString());

		PageList<KettleErrors> pageList = new PageList<KettleErrors>();
		pageList.setList(list);
		pageList.setCount(count);
		return pageList;
	}

	public String queryLogMessage(Map<String, Object> map, String id) {
		String sql = "select a.log_field from k_errs a where a.err_type =? and a.id=?";
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate()
				.queryForList(sql, "T", id);
		if (!list.isEmpty()) {
			String logField = list.get(0).get("log_field").toString();
			// 替换日志信息的不规则字符(/,-)
			//logField = logField.replaceAll("[/,-]", "").replace("\\n", "<br/>");
			logField = logField.replace("\\n", "<br/>");
			return logField;
		}
		return null;
	}

}
