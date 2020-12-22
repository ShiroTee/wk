package com.digitalchina.ldp.app.csdsc.dao;

import java.util.Map;

import com.digitalchina.ldp.app.csdsc.bean.WbjBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;


/**
 * 
 * @author MagicChu
 *
 */
public interface WbjDataSubmitDetailDao {
	public Pager  getWbjDataSubmitCounts(Map<String, Object> argMap,String pageNo,String pageSize);
	public Pager  getIndexWbjDataSubmitCounts(Map<String, Object> argMap,String pageNo,String pageSize);
	public WbjBean findWbjByOrgId(Map<String,Object> argMap);
	public WbjBean getDataUseOrder(Map<String, Object> argMap);
	public WbjBean getDataUseInfo(Map<String, Object> argMap);
	public WbjBean getFileSubmitCounts(Map<String, Object> argMap);
}
