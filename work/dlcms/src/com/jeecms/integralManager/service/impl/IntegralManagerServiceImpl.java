package com.jeecms.integralManager.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.jeecms.integralManager.dao.impl.IntegralManagerDaoImpl;

/**
 * 积分管理-发布通知公告service
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-3
 */
@Service
@Transactional
public class IntegralManagerServiceImpl {

	@Autowired
	private IntegralManagerDaoImpl integralManagerDaoImpl;

	/**
	 * 将积分统计数据发布到通知公告，通过接口获取数据，多个表插入，涉及到事务处理，在Service层加入事务
	 * @param integralInfo 通知公告内容
	 */
	@Transactional(isolation = Isolation.READ_COMMITTED)
	public void publishIntegralToNotice(String integralInfo,String startDate,String endDate) {
		integralManagerDaoImpl.publishIntegralToNotice(integralInfo,startDate,endDate);
	}
	
	
}
