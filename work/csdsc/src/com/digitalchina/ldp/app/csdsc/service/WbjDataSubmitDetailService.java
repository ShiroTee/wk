package com.digitalchina.ldp.app.csdsc.service;


import com.digitalchina.ldp.app.csdsc.bean.WbjBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.bean.Model;

/**
 * 
 * @author MagicChu
 * 
 */
public interface WbjDataSubmitDetailService {
	/**
	 * 委办局数据提交情况查询
	 * 
	 * @param model
	 * @return
	 */
	public Pager getWbjDataSubmitCounts(Model model);
	
	
	/**
	 * 首页委办局数据提交情况查询，查询上个月实提交数据量最多的六条数据
	 * 
	 * @param model
	 * @return
	 */
	public Pager getIndexWbjDataSubmitCounts(Model model);
	
	public WbjBean getWbjByOrgId(Model model);

	public WbjBean getDataUseOrder(Model model);

	public WbjBean getDataUseInfo(Model model);

	public WbjBean getFileSubmitCounts(Model model);

}
