package com.digitalchina.ldp.app.csdsc.service;



import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.bean.Model;

/**
 * 
 * @author MagicChu
 * 
 */
public interface IntegralManagerDetailService {
	/**
	 * 各委办局积分统计查询
	 * 
	 * @param model
	 * @return
	 */
	public Pager getWbjIntegralData(Model model);
	
	/**
	 * 查询委办局积分统计内容，组织表格
	 * 
	 * @param model
	 * @return
	 */
	public String getWbjIntegralDataTable(Model model);

}
