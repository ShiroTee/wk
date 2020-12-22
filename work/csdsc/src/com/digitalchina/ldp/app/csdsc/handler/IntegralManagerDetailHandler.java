package com.digitalchina.ldp.app.csdsc.handler;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.service.IntegralManagerDetailService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;

/**
 * 各委办局积分统计
 * @author MagicChu
 *
 */
@Component
public class IntegralManagerDetailHandler extends AbstractHandler{
	
	@Autowired
	private IntegralManagerDetailService integralManagerDetailService;
	
	
	/**
	 * 各委办局积分统计查询
	 * @param model
	 * @return
	 */
	@HttpService
	public Pager getWbjIntegralData(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.integralManagerDetailService.getWbjIntegralData(model);
	}
	
	
	/**
	 * 查询委办局积分统计内容，组织表格
	 * @param model
	 * @return
	 */
	@HttpService
	public String getWbjIntegralDataTable(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		String rtn = "{'data':'"+this.integralManagerDetailService.getWbjIntegralDataTable(model).replace("'", "\"")+"'}";
		return rtn;
	}

}

