package com.digitalchina.ldp.app.dms.service;

import java.util.Map;

public interface HostRuleInfoService {
	/**
	 * 方法描述：更新语句
	 */
	public void updateBySql(Map<String, Object> map);

	/**
	 * 方法描述：插入语句
	 */
	public void insertBySql(Map<String, Object> map);
}
