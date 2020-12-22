package com.digitalchina.ldp.app.dms.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.dms.bean.RepositoryLog;
import com.digitalchina.ldp.app.dms.dao.RepositoryLogDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class RepositoryLogDaoImpl extends BaseDaoSupportImpl implements
		RepositoryLogDao {

	private ParameterizedRowMapper<RepositoryLog> getMapper() {

		ParameterizedRowMapper<RepositoryLog> mapper = new ParameterizedRowMapper<RepositoryLog>() {
			@Override
			public RepositoryLog mapRow(ResultSet rs, int row)
					throws SQLException {
				RepositoryLog repositoryLog = new RepositoryLog();
				repositoryLog.setIdRepositoryLog(rs.getInt("id_repository_log"));
				repositoryLog.setRepVersion(rs.getString("rep_version"));
				repositoryLog.setLogUser(rs.getString("log_user"));
				//repositoryLog.setLogDate((Date)rs.getTimestamp("log_date"));
				repositoryLog.setLogDate(rs.getString("log_date"));
				repositoryLog.setOperationDesc(rs.getString("operation_desc"));
				return repositoryLog;
			}
		};
		return mapper;
	}

	// job日志管理列表
	public PageList<RepositoryLog> find(int pageSize, int limit,
			Map<String, Object> map) {
		String logUser = StringUtils.objToString(map.get("logUser"));// 查询参数
		String startTime = StringUtils.objToString(map.get("startTime"));
		String endTime = StringUtils.objToString(map.get("endTime"));
		StringBuilder param = new StringBuilder();
		StringBuilder sb = new StringBuilder();

		if (logUser != "") {
			param.append(" and a.log_user like '" + "%" + logUser + "%" + "' ");
		}
		if (startTime != "") {
			param.append(" AND TO_CHAR(a.log_date, 'YYYY-MM-DD HH24:MI:SS') >= '"
							+ startTime + " 00:00:00' ");
		}
		if (endTime != "") {
			param.append(" AND TO_CHAR(a.log_date, 'YYYY-MM-DD HH24:MI:SS') <= '"
							+ endTime + " 23:59:59' ");
		}
		sb.append("select a.id_repository_log,");
		sb.append("a.rep_version,");
		//sb.append("a.log_date,");
		sb.append("  TO_CHAR (a.log_date, 'YYYY-MM-DD HH24:MI:SS') log_date,  ");
		sb.append("a.log_user,");
		sb.append("a.operation_desc");
		sb.append("   from r_repository_log a");
		sb.append("    where 1 = 1 ");
		sb.append(param);
		sb.append("  order by a.log_date desc");
		String sql = this.getPage().pageForParams(sb.toString());
		List<RepositoryLog> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper(), pageSize, (pageSize + limit));
		//sql = "select count(0) from r_repository_log";
		//计数sql
		StringBuilder sum = new StringBuilder();
		sum.append(" select count(0) from ( ");
		sum.append(sb.toString());
		sum.append("  )  ");
		int count = this.getSimpleJdbcTemplate().queryForInt(sum.toString());
		PageList<RepositoryLog> pageList = new PageList<RepositoryLog>();
		pageList.setList(list);
		pageList.setCount(count);
		return pageList;
	}

}
