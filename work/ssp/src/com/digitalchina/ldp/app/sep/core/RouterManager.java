package com.digitalchina.ldp.app.sep.core;

import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.service.RouteService;

/**
 * 路由管理器
 * @author python
 *
 */
public interface RouterManager
{
	/**
	 * 停止一个路由
	 */
	public void stop(String routerId);
	/**
	 * 删除一个路由
	 */
	public void delete(String routerId);
	/**
	 * 启动一个路由
	 */
	public void start(String routerId);
	/**
	 * 启动全部的路由
	 */
	public void start();
	/**
	 * 新增一个路由
	 */
	public void add(RouteInfo routle);
	/**
	 * 关闭服务
	 */
	public void shutdown();

    public RouteService getRouteService();
}