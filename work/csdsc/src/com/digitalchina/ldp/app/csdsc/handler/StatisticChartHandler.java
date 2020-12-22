package com.digitalchina.ldp.app.csdsc.handler;

import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.service.StatisticChartService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;


/**
 * 统计报表后台数据
 * @author Qianli
 */
@Component
public class StatisticChartHandler extends AbstractHandler{
	
	@Autowired
	private StatisticChartService statisticChartService;
	
	
	/**
	 * 获取各可视化统计图表名称
	 */
	@HttpService
	public Pager getIndexChartsCatogary(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getIndexChartsCatogary(model);
	}
	
	@HttpService
	public List<Map<String, Object>> getRktjCount(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		String starDate = model.getValueNotEmpty("starDate");
		String stopDate = model.getValueNotEmpty("stopDate");
		return this.statisticChartService.getRktjCount(starDate,stopDate);
	}
	
	@HttpService
	public List<Map<String, Object>> getFrxxCount(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		String xzqh = model.getValueNotEmpty("xzqh");
		return this.statisticChartService.getFrxxCount(xzqh);
	}
	
	@HttpService
	public List<Map<String, Object>> getJjsjCount(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		String zblx = model.getValueNotEmpty("zblx");
		String zbnd = model.getValueNotEmpty("zbnd");
		if("0".equals(zbnd)){
			return this.statisticChartService.getJjsjCount(zblx);
		}else{
			return this.statisticChartService.getJjsjCount(zblx,zbnd);
		}
	}

	/**
	 * 获取某个指标类型各个年度的数据量
	 * @param model 指标类型
	 * @return 和 getJjsjCount 一样
     */
	@HttpService
	public List<Map<String, Object>> getJjsjCountGroupbyYear(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		String zblx = model.getValueNotEmpty("zblx");
		return this.statisticChartService.getJjsjCountGroupbyYear(zblx);
	}
	
	@HttpService
	public List<Map<String, Object>> getRjsrzcCount(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRjsrzcCount();
	}
	
	@HttpService
	public List<Map<String, Object>> getShxfpCount(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getShxfpCount();
	}
	
	@HttpService
	public List<Map<String, Object>> getXzqh(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getXzqh();
	}
	
	@HttpService
	public List<Map<String, Object>> getZbnd(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getZbnd();
	}
	
	@HttpService
	public List<Map<String, Object>> getLknd(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getLknd();
	}
	
	@HttpService
	public List<Map<String, Object>> getRknltj(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRknltj();
	}
	
	@HttpService
	public List<Map<String, Object>> getRkqrqc(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRkqrqc();
	}
	
	@HttpService
	public List<Map<String, Object>> getSletzxs(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getSletzxs();
	}
	
	@HttpService
	public List<Object> getRelation(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRelation(model);
	}


	@HttpService
	public Map<String,Object> getRelationExpand(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRelationExpand(model);
	}
	
	
	@HttpService
	public List<Map<String, Object>> getQyfbxx(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		String ys = model.getValueNotEmpty("ys");
		String nf = model.getValueNotEmpty("nf");
		return this.statisticChartService.getQyfbxx(ys,nf);
	}
	
	@HttpService
	public List<Map<String, Object>> getqyfbxxnd(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getqyfbxxnd();
	}
	
	@HttpService
	public List<Map<String, Object>> getqyfbdl(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getqyfbdl();
	}
	
	@HttpService
	public List<Map<String, Object>> getlkzdlgxx(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getlkzdlgxx(model);
	}
	
	@HttpService
	public List<Object> getPopulationMap(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getPopulationMap(model);
	}
}
