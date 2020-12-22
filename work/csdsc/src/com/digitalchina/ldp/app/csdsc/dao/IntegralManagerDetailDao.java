package com.digitalchina.ldp.app.csdsc.dao;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;


/**
 * 各委办局积分统计
 * @author MagicChu
 *
 */
public interface IntegralManagerDetailDao {
	public Pager  getWbjIntegralData(Map<String, Object> argMap,String pageNo,String pageSize);
	public List<WbjDataSubmitBean>  getWbjIntegralDataTable(Map<String, Object> argMap);
}
