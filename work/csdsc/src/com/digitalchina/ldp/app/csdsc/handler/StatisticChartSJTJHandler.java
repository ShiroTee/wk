package com.digitalchina.ldp.app.csdsc.handler;

import com.digitalchina.ldp.app.csdsc.service.StatisticChartServiceSJTJ;
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
 * @author zhanglei
 */
@Component
public class StatisticChartSJTJHandler extends AbstractHandler{
	
	@Autowired
	private StatisticChartServiceSJTJ statisticChartService;

	/**
	 * 行政区划
	 */
	@HttpService
	public List<Map<String, Object>> getXzqh(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getXzqh();
	}

	/**
	 * 地区分布统计(法人)
	 */
	@HttpService
	public List<Map<String, Object>> getFrDqfbtj(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getFrDqfbtj(model);
	}

	/**
	 * 适龄儿童入学统计分析
     */
	@HttpService
	public List getSletrxtjList(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getSletrxtjList(model);
	}

	/**
	 * 人口增长强度变化结构
     */
	@HttpService
	public List getRkzzqdList(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRkzzqdList(model);
	}

	/**
	 * 死亡人口及死因统计分析结构
     */
	@HttpService
	public List getSwrkjsyList(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getSwrkjsyList(model);
	}

	/**
	 * 人口性别、年龄结构分布
     */
	@HttpService
	public List getRkxbnljgList(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getRkxbnljgList(model);
	}

	/**
	 * 查询(父级)行政区划下 所有年份的数据
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getHgjjbyXzqhs
	 * 参数：
	 * xzqhs=行政区划代码（多个按「,」分隔）
	 * zbdms=指标代码（多个按「,」分隔）
	 * type=「0」或者「1」，「0」表示查询当前行政区划，「1」表示查询下一级的行政区划
	 */
	@HttpService
	public Object getHgjjbyXzqhs(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getHgjjbyXzqhs(model);
	}

	/**
	 * 查询父级行政区划下 某一年份的数据
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getHgjjbyNd
	 * 参数：
	 * xzqh=行政区划代码
	 * zbdms=指标代码（多个按「,」分隔）
	 * nd=年度
	 */
	@HttpService
	public Object getHgjjbyNd(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getHgjjbyNd(model);
	}

	/**
	 * 查询某地区下所有城市的指标值，按指标值倒序排序
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getHgjjDqpm
	 * 参数：
	 * xzqh=行政区划代码
	 * zbdm=指标代码（多个按「,」分隔）
	 * nf=年度
	 */
	@HttpService
	public Map getHgjjDqpm(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getHgjjDqpm(model);
	}

	/**
	 * 查询城市的一些基本指标的排名
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getHgjjZbpm
	 * 参数：
	 * xzqh=行政区划代码
	 * nf=年度
	 */
	@HttpService
	public Map getHgjjZbpm(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getHgjjZbpm(model);
	}

	/**
	 * 四库数据总接收量统计
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getSksjzjsltj
	 * 参数：
	 */
	@HttpService
	public List getSksjzjsltj(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getSksjzjsltj(model);
	}

	/**
	 * 各委办局数据提交量统计
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getGwbjsjtjltj
	 * 参数：
	 * wbjmc=委办局名称
	 */
	@HttpService
	public List getGwbjsjtjltj(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getGwbjsjtjltj(model);
	}

	/**
	 * 各委办局数据提交量详细统计
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getGwbjsjtjlxxtj
	 * 参数：
	 * wbjmc=委办局名称
	 */
	@HttpService
	public List getGwbjsjtjlxxtj(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getGwbjsjtjlxxtj(model);
	}

	/**
	 * 各委办局数据提交质量统计
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getGwbjsjtjzltj
	 * 参数：
	 * wbjmc=委办局名称
	 */
	@HttpService
	public List getGwbjsjtjzltj(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getGwbjsjtjzltj(model);
	}

	/**
	 * 各委办局数据使用量统计
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getGwbjsjsyltj
	 * 参数：
	 *
     */
	@HttpService
	public List getGwbjsjsyltj(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getGwbjsjsyltj(model);
	}

	/**
	 * 各委办局数据使用量详细统计
	 * http://localhost:6565/service/api/csdsc/statisticChartHandler/getGwbjsjsylxxtj
	 * 参数：
	 * wbjmc=委办局名称
	 */
	@HttpService
	public List getGwbjsjsylxxtj(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return  this.statisticChartService.getGwbjsjsylxxtj(model);
	}
	
	/**
	 * 个人图谱
	 * @param model
	 * @return
	 */
	@HttpService
	public List getGrtp(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return  this.statisticChartService.getGrtp(model);
	}
	
	/**
	 * 商业图谱
	 * @param model
	 * @return
	 */
	@HttpService
	public List getSytp(Model model){
		DbContextHolder.setDefaultDbType("csdsc");
		return  this.statisticChartService.getSytp(model);
	}

    /**
     * 数据统计_获取GDP数据
     * @param model
     * @return
     */
    @HttpService
    public List getGDP(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return  this.statisticChartService.getGDP(model);
    }

    /**
     * 数据统计_获取ZB数据
     * @param model
     * @return
     */
    @HttpService
    public List getZB(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return  this.statisticChartService.getZB(model);
    }


    /**
     * 数据统计_地区生产总值
     * @param model
     * @return
     */
    @HttpService
    public List getDQSCZZ(Model model){
        DbContextHolder.setDefaultDbType("csdsc");
        return  this.statisticChartService.getDQSCZZ(model);
    }

	/**
	 * 获取最新时间
	 * @param model
	 * @return
	 */
	@HttpService
	public List getNewDate(Model model)
	{
		DbContextHolder.setDefaultDbType("csdsc");
		return this.statisticChartService.getNewDate(model);
	}

}
