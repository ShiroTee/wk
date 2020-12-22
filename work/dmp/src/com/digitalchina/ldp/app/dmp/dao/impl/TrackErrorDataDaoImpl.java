package com.digitalchina.ldp.app.dmp.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeQualityBean;
import com.digitalchina.ldp.app.dmp.bean.DataKnowledgeSolutionBean;
import com.digitalchina.ldp.app.dmp.dao.TrackErrorDataDao;
import com.digitalchina.ldp.common.constant.Constant;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.dao.impl.BaseDaoSupportImpl;

@Component
public class TrackErrorDataDaoImpl extends BaseDaoSupportImpl implements TrackErrorDataDao {

	public Map<String, Object> queryExceptionTableCount(String tableName,String startTime,String endTime) {
		//tableName = "EXCEPTION_"+tableName;
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT COUNT(ID) AS EXCECOUNT, COUNT(INTIME) AS COUNT FROM ");
		sql.append(tableName);
		sql.append(Constant.DBLINK);
		sql.append(" WHERE 1 = 1 AND ID IS NOT NULL AND INTIME IS NOT NULL ");
		if(!StringUtils.isEmpty(startTime)){
			sql.append(" AND INTIME >= to_date('"+startTime+"', 'yyyy-mm-dd')");
		}
		if(!StringUtils.isEmpty(endTime)){
			sql.append(" and intime <= to_date('"+endTime+"', 'yyyy-mm-dd')");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			map =  this.getSimpleJdbcTemplate().queryForMap(sql.toString());
		} catch (Exception e) {
			map.put("EXCECOUNT", 0);
			map.put("COUNT", 0);
			System.out.print(e.getMessage());
			return map;
		}
		return map;
	}
	
	public List<Map<String, Object>> getExceptionTableInfo(String sql, int start, int pageSize) {
		sql=this.getPage().pageForParams(sql);
		List<Map<String, Object>> list = 0 != start ? this.getSimpleJdbcTemplate().queryForList(sql,start+1,pageSize+start) : this.getSimpleJdbcTemplate().queryForList(sql,start,pageSize+start);
		return list;
	}

	public List<DataKnowledgeQualityBean> getDataKnowBeanList(String jsonStr) {
		String sql = "select * from DMP_DATA_KNOWLEDGE_QUALITY where id in "+ jsonStr;
		List<DataKnowledgeQualityBean> list = this.getSimpleJdbcTemplate().query(sql, this.getMapper_());
		return list;
	}
	
	private ParameterizedRowMapper<DataKnowledgeQualityBean> getMapper_()
	{
		ParameterizedRowMapper<DataKnowledgeQualityBean> mapper = new ParameterizedRowMapper<DataKnowledgeQualityBean>()
		{
			public DataKnowledgeQualityBean mapRow(ResultSet rs, int row)
					throws SQLException
			{
				DataKnowledgeQualityBean bean = new DataKnowledgeQualityBean();
				bean.setId(rs.getString("ID"));
				bean.setTitle(rs.getString("TITLE"));
				bean.setContent(rs.getString("CONTENT"));
				bean.setSolveAccessoryPath(rs.getString("SOLVEACCESSORYPATH"));
				bean.setSolveAccessoryName(rs.getString("SOLVEACCESSORYNAME"));
				bean.setSolveContent(rs.getString("SOLVECONTENT"));
				bean.setSubUser(rs.getString("SUBUSER"));
				
				bean.setDataFrom(rs.getString("DATAFROM"));
				bean.setSubTime(rs.getDate("SUBTIME"));
				bean.setSolveUser(rs.getString("SOLVEUSER"));
				bean.setSolveTime(rs.getDate("SOLVETIME"));
				bean.setRank(rs.getString("RANK"));
				bean.setStatus(rs.getString("STAUTS"));
				bean.setSubAccessoryName(rs.getString("SUBACCESSORYNAME"));
				bean.setSubAccessoryPath(rs.getString("SUBACCESSORYPATH"));
				bean.setDataQualityType(rs.getString("DATAQUALITYTYPE"));
				bean.setMark(rs.getString("MARK"));
				
				return bean;
			}
		};
		return mapper;
	}

	public List<DataKnowledgeSolutionBean> getListSoultion(String sql, int start , int end) {
		sql=this.getPage().pageForParams(sql);
		return this.getSimpleJdbcTemplate().query(sql, this.getSolutionMapper_(), start, end);
	}
	
	public List<DataKnowledgeQualityBean> getListDataQuality(String sql, int start , int end) {
		sql=this.getPage().pageForParams(sql);
		return this.getSimpleJdbcTemplate().query(sql, this.getMapper_(), start, end);
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
				bean.setSubAccessoryName(rs.getString("SUBACCESSORYNAME"));
				bean.setSubAccessoryPath(rs.getString("SUBACCESSORYPATH"));
				bean.setType(rs.getString("TYPE"));
				bean.setSubTime(rs.getDate("SUBTIME"));
				bean.setMark(rs.getString("MARK"));
				return bean;
			}
		};
		return mapper;
	}

	public int getSolutionCount(String sql) {
		return this.getSimpleJdbcTemplate().queryForInt(sql);
	}

	public void updateDataQualityBeanMark(String ids,String value) {
		String sql = "UPDATE DMP_DATA_KNOWLEDGE_QUALITY SET MARK = "+value+" WHERE ID IN " + ids;
		this.getSimpleJdbcTemplate().update(sql);
	}

	public List<Map<String, Object>> getExceptionTableComments(String exceptionTable) {
		String sql = "select   *   from   user_col_comments where table_name = '"+exceptionTable+"'";
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate().queryForList(sql);
		return list;
	}


	public void delDafj(String reslutStr) {
		String sql = " UPDATE  DMP_DATA_KNOWLEDGE_QUALITY SET SOLVEACCESSORYPATH = NULL,SOLVEACCESSORYNAME=NULL   WHERE ID = '" + reslutStr+"' ";
		this.getSimpleJdbcTemplate().update(sql);
	}
}
