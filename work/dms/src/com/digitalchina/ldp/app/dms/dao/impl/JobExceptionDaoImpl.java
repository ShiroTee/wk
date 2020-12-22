package com.digitalchina.ldp.app.dms.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.KettleErrors;
import com.digitalchina.ldp.app.dms.dao.JobExceptionDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class JobExceptionDaoImpl extends BaseDaoSupportImpl implements
		JobExceptionDao {

	private ParameterizedRowMapper<KettleErrors> getMapper() {

		ParameterizedRowMapper<KettleErrors> mapper = new ParameterizedRowMapper<KettleErrors>() {
			@Override
			public KettleErrors mapRow(ResultSet rs, int row)
					throws SQLException {
				KettleErrors ke = new KettleErrors();
				ke.setId(rs.getString("id"));
				ke.setName(rs.getString("name"));
//				ke.setStartDate((Date) rs.getTimestamp("START_DATE"));
				ke.setStartDate(rs.getString("START_DATE"));
//				ke.setEndDate((Date) rs.getTimestamp("END_DATE"));
				ke.setEndDate( rs.getString("END_DATE"));
//				ke.setLogDate((Date) rs.getTimestamp("LOG_DATE"));
				ke.setLogDate(rs.getString("LOG_DATE"));
				if ("J".equals(rs.getString("ERR_TYPE"))) {
					ke.setErrType("job类型");
				} else {
					ke.setErrType("转换类型");
				}
				ke.setClpy(rs.getString("CLRY"));
				ke.setClrq(rs.getTimestamp("CLRQ"));
				ke.setErroReason(rs.getString("ERR_REASON"));
				ke.setClff(rs.getString("CLFF"));
				ke.setClbz(rs.getString("CLBZ"));
				ke.setSolveAccessoryName(rs.getString("SOLVEACCESSORYNAME"));
				if(rs.getString("SOLVEACCESSORYPATH")!=null){
					ke.setSolveAccessoryPath(rs.getString("SOLVEACCESSORYPATH")
							.replaceAll("\\\\", "/"));
				}
				
//				ke.setSolveAccessoryPath(rs.getString("SOLVEACCESSORYPATH"));
				ke.setMark(rs.getString("MARK"));
				return ke;
			}
		};
		return mapper;
	}

	// 作业异常记录列表
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
		//sb.append("a.start_date,");
		//sb.append("a.end_date,");
		//sb.append("a.log_date,");
		sb.append("  TO_CHAR (a.start_date, 'YYYY-MM-DD HH24:MI:SS') start_date,  ");
		sb.append("  TO_CHAR (a.end_date, 'YYYY-MM-DD HH24:MI:SS') end_date,  ");
		sb.append("  TO_CHAR (a.log_date, 'YYYY-MM-DD HH24:MI:SS') log_date,  ");
		sb.append("a.clry,");
		sb.append("a.clrq,");
		sb.append("a.err_reason,");
		sb.append("a.clff,");
		sb.append("a.clbz,");
		sb.append("a.log_field,");
		sb.append("a.solveAccessoryName,");
		sb.append("a.solveAccessoryPath,");
		sb.append("a.mark");
		sb.append("  from k_errs a ");
		sb.append("  where a.err_type = 'J' and 1=1 ");
		if ("1".equals(map.get("flag"))) {
			sb.append(" and a.isKnowledge = 0 ");
		}
		sb.append(param);
		sb.append("order by a.log_date desc");
		String sql = this.getPage().pageForParams(sb.toString());
		List<KettleErrors> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper(), pageSize, (pageSize + limit));
		//sql = "select count(0) from k_errs a where a.err_type = 'J'";
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

	 //查询日志信息
	 public String queryLogMessage(Map<String, Object> map, String id) {
	 String sql =
	 "select a.log_field from k_errs a where a.err_type =? and a.id=?";
	 List<Map<String, Object>> list = this.getSimpleJdbcTemplate()
	 .queryForList(sql, "J", id);
	 if (!list.isEmpty()) {
	 String logField = list.get(0).get("log_field").toString();
	 // 替换日志信息的不规则字符(/,-)
//   logField = logField.replaceAll("[/,-]", "").replace("\\n", "<br/>");
     logField = logField.replace("\\n", "<br/>");
	 return logField;
	 }
	 return null;
	 }

//	public List findBySql(String sql) {
//		DbContextHolder.setDbType(Constant.DATE_SOURCE_KEY.dms.name());
//		List list = this.getSimpleJdbcTemplate().queryForList(sql);
//
//		return list;
//	}

//	public List<String> queryLogMessage(Map<String, Object> map) {
//		String id = StringUtils.objToString(map.get("id"));
//		System.out.println("id= " + id);
//
//		// String sql =
//		// "select a.log_field from k_errs a where a.err_type =? and a.id=?";
//		String sql = "select a.log_field from k_errs a where a.err_type ='J' and a.id='"
//				+ id + "'";
//		List list = this.findBySql(sql);
//		return list;
//	}

	@Override
	public KettleErrors getKettleErroresById(String sql) {
		KettleErrors bean = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper()).get(0);
		return bean;
	}

	@Override
	public List<KettleErrors> getDataKnowBeanList(String jsonStr) {
		String sql = "select * from k_errs where id in " + jsonStr;
		List<KettleErrors> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper());
		return list;
	}

	@Override
	public void updateDataQualityBeanMark(String ids, String value) {
		String sql = "UPDATE k_errs SET MARK = " + value + " WHERE ID IN "
				+ ids;
		this.getSimpleJdbcTemplate().update(sql);
	}

	@Override
	public void updateErrorBeanIsKnow(String ids) {
		String sql = "UPDATE k_errs SET ISKNOWLEDGE =  1  WHERE ID IN " + ids;
		this.getSimpleJdbcTemplate().update(sql);
	}
	
	@Override
	public void delDafj(String reslutStr) {
		String sql = " UPDATE  K_ERRS SET SOLVEACCESSORYNAME = NULL,SOLVEACCESSORYPATH=NULL   WHERE ID = '" + reslutStr+"' ";
		this.getSimpleJdbcTemplate().update(sql);
	}
}
