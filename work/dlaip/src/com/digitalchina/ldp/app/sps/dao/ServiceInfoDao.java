package com.digitalchina.ldp.app.sps.dao;

public interface ServiceInfoDao
{
	/**
	 * 更新resouceId为null
	 * @param routeId
	 */
	public void update(String routeId);
	public String find(String publishURL,Integer matchOnUriPrefix);
}
