package com.digitalchina.ldp.app.csdsc.service;

import com.digitalchina.ldp.bean.Model;

import java.util.List;
import java.util.Map;

public interface StatisticChartServiceSJTJ {

	List<Map<String, Object>> getXzqh();

	List getSletrxtjList(Model model);

	List getRkzzqdList(Model model);

	List getSwrkjsyList(Model model);

	List getRkxbnljgList(Model model);

	Map getHgjjbyXzqhs(Model model);

	Map getHgjjbyNd(Model model);

	Map getHgjjZbpm(Model model);

	Map getHgjjDqpm(Model model);

	List<Map<String,Object>> getFrDqfbtj(Model model);

	List getSksjzjsltj(Model model);

	List getGwbjsjtjltj(Model model);

	List getGwbjsjtjlxxtj(Model model);

	List getGwbjsjtjzltj(Model model);

	List getGwbjsjsyltj(Model model);

	List getGwbjsjsylxxtj(Model model);
	
	List getGrtp(Model model);
	
	List getSytp(Model model);

    List getGDP(Model model);

    List getZB(Model model);

    List getDQSCZZ(Model model);
	List getNewDate(Model model);
}
