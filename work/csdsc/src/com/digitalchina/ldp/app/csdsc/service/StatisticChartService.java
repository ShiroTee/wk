package com.digitalchina.ldp.app.csdsc.service;

import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.bean.Model;

import java.util.List;
import java.util.Map;

public interface StatisticChartService {

	public Pager getIndexChartsCatogary(Model model);
	
	public List<Map<String, Object>> getFrxxCount(String xzqh);

	public List<Map<String, Object>> getShxfpCount();

	public List<Map<String, Object>> getRjsrzcCount();

	public List<Map<String, Object>> getRktjCount(String starDate, String stopDate);

	public List<Map<String, Object>> getXzqh();

	public List<Map<String, Object>> getZbnd();
	
	public List<Map<String, Object>> getRknltj();

	public List<Map<String, Object>> getRkqrqc();

	public List<Map<String, Object>> getSletzxs();

	public List<Map<String, Object>> getQyfbxx(String ys, String nf);

	public List<Map<String, Object>> getqyfbxxnd();

	public List<Map<String, Object>> getqyfbdl();

	public List<Object> getRelation(Model model);

	public Map<String,Object> getRelationExpand(Model model);

	public List<Map<String, Object>> getlkzdlgxx(Model model);

	public List<Map<String, Object>> getJjsjCount(String zblx, String zbnd);

	public List<Map<String, Object>> getJjsjCount(String zblx);

	public List<Map<String,Object>> getJjsjCountGroupbyYear(String zblx);

	public List<Map<String, Object>> getLknd();
	
	public List<Object> getPopulationMap(Model model);

}
