package com.digitalchina.ldp.app.csdsc.handler;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.csdsc.bean.WbjBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.service.WbjDataSubmitDetailService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.DbContextHolder;
import com.digitalchina.ldp.handler.AbstractHandler;

/**
 * 委办局数据提交情况
 * @author MagicChu
 *
 */
@Component
public class WbjDataSubmitDetailHandler extends AbstractHandler{
	
	@Autowired
	private WbjDataSubmitDetailService wbjDataSubmitDetailService;
	
	
	/**
	 * 委办局数据提交情况查询
	 * @param model
	 * @return
	 */
	@HttpService
	public Pager getWbjDataSubmitCounts(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.wbjDataSubmitDetailService.getWbjDataSubmitCounts(model);
	}
	
	/**
	 * 首页委办局数据提交情况查询，查询上个月实提交数据量最多的六条数据
	 * @param model
	 * @return
	 */
	@HttpService
	public Pager getIndexWbjDataSubmitCounts(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.wbjDataSubmitDetailService.getIndexWbjDataSubmitCounts(model);
	}
	
	@HttpService
	public WbjBean getWbjByOrgId(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.wbjDataSubmitDetailService.getWbjByOrgId(model);
	}
	@HttpService
	public WbjBean getDataUseOrder(Model model) {
		DbContextHolder.setDefaultDbType("rdp");
		return this.wbjDataSubmitDetailService.getDataUseOrder(model);
	}
	@HttpService
	public WbjBean getDataUseInfo(Model model) {
		DbContextHolder.setDefaultDbType("rdp");
		return this.wbjDataSubmitDetailService.getDataUseInfo(model);
	}
	@HttpService
	public WbjBean getFileSubmitCounts(Model model) {
		DbContextHolder.setDefaultDbType("csdsc");
		return this.wbjDataSubmitDetailService.getFileSubmitCounts(model);
	}
	
}

