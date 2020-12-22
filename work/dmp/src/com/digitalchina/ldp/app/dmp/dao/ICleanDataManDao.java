package com.digitalchina.ldp.app.dmp.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.dmp.bean.DataConfigBean;
import com.digitalchina.ldp.dao.BaseDaoSupport;

/**
 * 
 * @author zhangyg
 *
 */
@Component
public interface ICleanDataManDao extends BaseDaoSupport{
	
	/**
	 * 查询满足条件的所有清洗规则列表
	 * @return
	 */
	public List<DataConfigBean> getCleanDataConfigBean() ;
	
	
}
