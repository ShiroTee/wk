package com.digitalchina.ldp.app.csdsc.dao;

import com.digitalchina.ldp.app.csdsc.comm.Pager;

import java.util.List;
import java.util.Map;

public interface StatisticChartDao {

	Pager getIndexChartsCatogary(Object object, String pageNo, String pageSize);
	
	public List<Map<String, Object>> getFrxxCount(String xzqh);

	public List<Map<String, Object>> getRktjCount(String starDate, String stopDate);

	public List<Map<String, Object>> getXzqh();

	public List<Map<String, Object>> getZbnd();

	public List<Map<String, Object>> getHgjjCount();

	public List<Map<String, Object>> getHgjjCount(String zblx, String zbnd);

	public List<Map<String, Object>> getHgjjCount(String zblx);

	public List<Map<String,Object>> getJjsjCountGroupbyYear(String zblx);

	public List<Map<String, Object>> getRknltjCount();

	public List<Map<String, Object>> getRkqrqc();
	
	public List<Map<String, Object>> getSletzxs();

	public List<Map<String, Object>> getQyfbxx(String ys, String nf);

	public List<Map<String, Object>> getqyfbxxnd();

	public List<Map<String, Object>> getqyfbdl();

	public List<Map<String, Object>> getRKTPConfig(String type);

	public Map<String, Object> getRKTPType(String type);

	public Map<String, Object> getRKTPTableConfig(String tableName,String queryType);

	public Map<String, Object> getRKTPTableLinkConfig(String tableName,String fatherTable,String firsttype);

	public List<Map<String, Object>> getRKTPByFatherTableConfig(String tableName,String queryType);

	public Map<String, Object> getRelation(List<Map<String, Object>> configs,String queryType,String queryValue);

	public List<Map<String, Object>> getlkzdlgxx(String type, String xzqh,String start, String end);

	public List<Map<String, Object>> getLknd();

	public List<Map<String, Object>> getRjsrzcCount();
	
	public List<Object> getPopulationMap(Map<String,Object> config, String name);
	
}
