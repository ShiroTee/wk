package com.digitalchina.ldp.app.dms.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.RDirectoryBean;
import com.digitalchina.ldp.app.dms.bean.TransManager;
import com.digitalchina.ldp.app.dms.dao.TransLogManageDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class TransLogManageDaoImpl extends BaseDaoSupportImpl implements
		TransLogManageDao {

	private ParameterizedRowMapper<TransManager> getMapper() {

		ParameterizedRowMapper<TransManager> mapper = new ParameterizedRowMapper<TransManager>() {
			@Override
			public TransManager mapRow(ResultSet rs, int row)
					throws SQLException {
				TransManager transManager = new TransManager();
				transManager.setIdTransformation(rs.getInt("id_transformation"));
				transManager.setName(rs.getString("name"));
				transManager.setGovName(rs.getString("govName"));
				transManager.setStepName(rs.getString("stepName"));
				transManager.setCreatedUser(rs.getString("CREATED_USER"));
				//transManager.setCreatedDate((Date) rs.getTimestamp("CREATED_DATE"));
				transManager.setCreatedDate(rs.getString("CREATED_DATE"));
				transManager.setModifiedUser(rs.getString("MODIFIED_USER"));
				//transManager.setModifiedDate((Date) rs.getTimestamp("MODIFIED_DATE"));
				transManager.setModifiedDate(rs.getString("MODIFIED_DATE"));
				transManager.setDescription(rs.getString("DESCRIPTION"));
				return transManager;
			}
		};
		return mapper;
	}

	// job日志管理列表
	public PageList<TransManager> find(int pageSize, int limit,
			Map<String, Object> map) {
		String name = StringUtils.objToString(map.get("name"));// 查询参数
		String directoryId = StringUtils.objToString(map.get("directoryId"));
		String modifiedUser = StringUtils.objToString(map.get("modifiedUser"));
		String startTime = StringUtils.objToString(map.get("startTime"));
		String endTime = StringUtils.objToString(map.get("endTime"));
		//String govName = StringUtils.objToString(map.get("govName"));// 委办局名称
		StringBuilder param = new StringBuilder();
		StringBuilder sb = new StringBuilder();
		if (name != "") {
			param.append(" and t.name like '" + "%" + name + "%" + "' ");
		}
		if (directoryId != "" && !("全部").equals(directoryId)) {
			param.append(" and r.id_directory_parent = '" + directoryId + "' ");
		}
		if (modifiedUser != "") {
			param.append(" and t.modified_user like '" + "%" + modifiedUser + "%" + "' ");
		}
//		if (govName != "") {
//			param.append(" and r.govName ='" + govName + "'");
//		}
		if (startTime != "") {
			param.append(" AND TO_CHAR(t.modified_date, 'YYYY-MM-DD HH24:MI:SS') >= '"
							+ startTime + " 00:00:00' ");
		}
		if (endTime != "") {
			param.append(" AND TO_CHAR(t.modified_date, 'YYYY-MM-DD HH24:MI:SS') <= '"
							+ endTime + " 23:59:59' ");
		}

		sb.append("select t.id_transformation,");
		sb.append("t.name,");
		sb.append("r.govName,");
		sb.append("r.stepName,");
		sb.append("t.created_user,");
		sb.append("  TO_CHAR (t.created_date, 'YYYY-MM-DD HH24:MI:SS') created_date,  ");
		sb.append("  TO_CHAR (t.modified_date, 'YYYY-MM-DD HH24:MI:SS') modified_date,  ");
		//sb.append("t.created_date,");
		sb.append("t.modified_user,");
		//sb.append("t.modified_date,");
		sb.append(" t.description");
		sb.append("  from r_transformation t,");
		sb
				.append("(select t2.id_directory,t2.id_directory_parent,t.directory_name  as govName,t2.directory_name   as stepName from r_directory t, r_directory t2 where t.id_directory = t2.id_directory_parent) r");
		sb.append("    where t.id_directory = r.id_directory(+) and 1 = 1 ");
		sb.append(param);
		sb.append(" order by t.modified_date desc");
		String sql = this.getPage().pageForParams(sb.toString());
		List<TransManager> list = this.getSimpleJdbcTemplate().query(sql,
				this.getMapper(), pageSize, (pageSize + limit));
		//sql = "select count(0) from r_transformation t,(select t2.id_directory, t2.id_directory_parent from r_directory t, r_directory t2 where t.id_directory = t2.id_directory_parent) r where t.id_directory = r.id_directory(+)";
		//计数sql
		StringBuilder sum = new StringBuilder();
		sum.append(" select count(0) from ( ");
		sum.append(sb.toString());
		sum.append("  )  ");
		int count = this.getSimpleJdbcTemplate().queryForInt(sum.toString());
		PageList<TransManager> pageList = new PageList<TransManager>();
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
