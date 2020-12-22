package com.digitalchina.ldp.app.dms.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dms.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dms.dao.dataKnowledgeDao;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;
@Component
public class dataKnowledgeDaoImpl extends BaseDaoSupportImpl implements dataKnowledgeDao{

	@Override
	public List<DataKnowledgeSolutionBean> getListSoultion(String sql, int start, int end) {
		sql=this.getPage().pageForParams(sql);
		return this.getSimpleJdbcTemplate().query(sql, this.getSolutionMapper_(), start, end);
	}
	
	private ParameterizedRowMapper<DataKnowledgeSolutionBean> getSolutionMapper_()
	{
		ParameterizedRowMapper<DataKnowledgeSolutionBean> mapper = new ParameterizedRowMapper<DataKnowledgeSolutionBean>()
		{
			public DataKnowledgeSolutionBean mapRow(ResultSet rs, int row)
					throws SQLException
			{
				DataKnowledgeSolutionBean bean = new DataKnowledgeSolutionBean();
				bean.setId(rs.getString("ID"));
				bean.setTitle(rs.getString("TITLE"));
				bean.setContent(rs.getString("CONTENT"));
				bean.setAnswer(rs.getString("ANSWER"));
				bean.setSolutionAccessoryName(rs.getString("SOLUTIONACCESSORYNAME"));
				bean.setSolutionAccessoryPath(rs.getString("SOLUTIONACCESSORYPATH"));
				bean.setType(rs.getString("TYPE"));
				bean.setSubTime(rs.getDate("SUBTIME"));
				bean.setMark(rs.getString("MARK"));
				return bean;
			}
		};
		return mapper;
	}

	@Override
	public int getSolutionCount(String sql) {
		return this.getSimpleJdbcTemplate().queryForInt(sql);
	}

	@Override
	public void updateDataQualityBeanMark(String ids, String value) {
		String sql = "UPDATE k_errs SET MARK = "+value+" WHERE ID IN " + ids;
		this.getSimpleJdbcTemplate().update(sql);
	}
	
	
	
	@Override
	public void delDafj(String reslutStr) {
		String sql = " UPDATE  DATA_KNOWLEDGE_SOLUTION SET SOLUTIONACCESSORYNAME = NULL,SOLUTIONACCESSORYPATH=NULL   WHERE ID = '" + reslutStr+"' ";
		this.getSimpleJdbcTemplate().update(sql);
	}

}
