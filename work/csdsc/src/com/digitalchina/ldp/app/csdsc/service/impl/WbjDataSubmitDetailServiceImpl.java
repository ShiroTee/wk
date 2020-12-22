package com.digitalchina.ldp.app.csdsc.service.impl;

import com.digitalchina.ldp.app.csdsc.bean.WbjBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.dao.WbjDataSubmitDetailDao;
import com.digitalchina.ldp.app.csdsc.service.WbjDataSubmitDetailService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 委办局数据提交情况
 * @author MagicChu
 *
 */
@Service
public class WbjDataSubmitDetailServiceImpl implements	WbjDataSubmitDetailService {
	@Autowired
	private WbjDataSubmitDetailDao wbjDataSubmitDetailDao;

	/**
	 * 委办局数据提交情况查询
	 * 
	 * @param model
	 * @return
	 */
	public Pager getWbjDataSubmitCounts(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String startDate = model.getValue("startDate");
		String endDate = model.getValue("endDate");
		
		//选择页数和每页显示数量
		String pageNo = model.getValue("pageNo");
		String pageSize = BeanDefineConfigue.getProperty("pageSize_");

		argMap.put(" SUBMIT_DATE >= ","TO_DATE('"+startDate+"', 'yyyy/mm/dd')");
		argMap.put(" SUBMIT_DATE <= ","TO_DATE('"+endDate+"', 'yyyy/mm/dd')");
		return this.wbjDataSubmitDetailDao.getWbjDataSubmitCounts(argMap,pageNo,pageSize);
	}
	
	/**
	 * 首页委办局数据提交情况查询，查询上个月实提交数据量最多的六条数据
	 * 
	 * @param model
	 * @return
	 */
	public Pager getIndexWbjDataSubmitCounts(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		
		//选择页数和每页显示数量，首页默认第一页，分页6条，返回分页对象，方便扩展
		String pageNo = "1";
		String pageSize = "5";

		return this.wbjDataSubmitDetailDao.getIndexWbjDataSubmitCounts(argMap,pageNo,pageSize);
	}

	@Override
	public WbjBean getWbjByOrgId(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		String orgId = model.getValue("orgId");
		argMap.put(" org_id = ", "'"+orgId+"'");
		return this.wbjDataSubmitDetailDao.findWbjByOrgId(argMap);
	}
	
	@Override
	public WbjBean getDataUseOrder(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		return this.wbjDataSubmitDetailDao.getDataUseOrder(argMap);
	}
	
	@Override
	public WbjBean getDataUseInfo(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		return this.wbjDataSubmitDetailDao.getDataUseInfo(argMap);
	}
	@Override
	public WbjBean getFileSubmitCounts(Model model) {
		Map<String,Object> argMap = new HashMap<String,Object>();
		return this.wbjDataSubmitDetailDao.getFileSubmitCounts(argMap);
	}
	
}

