package com.digitalchina.ldp.app.csdsc.dao;

import java.util.List;
import java.util.Map;

public interface StatisticChartDaoSJTJ {

	List<Map<String, Object>> getXzqh();

	List<Map<String,Object>> getSqlResult(String sql);

	List<Map<String,Object>> getSqlResult(String sql, Object[] objects);

	List getRkxbnljgList(Map<String, Object> argMap);

	List<Map<String, Object>> getHgjjbyXzqhs(int type, String zbdms, String xzqhs);

	List<Map<String, Object>> getHgjjbyNd(String zbdms, String xzqh, String nd);

	List<Map<String,Object>> getHgjjbyXzqhs(String zbdms);
	
	List<Map<String,Object>> getGrtp(String sql);
	
	List<Map<String,Object>> getSytp(String sql);

    List getGDP(String sql);

    List getZB(String sql);

    List getDQSCZZ(String sql);
	List getNewDate(String sql);

}
