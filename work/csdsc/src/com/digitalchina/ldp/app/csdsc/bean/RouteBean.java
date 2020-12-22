package com.digitalchina.ldp.app.csdsc.bean;

import java.io.Serializable;

/**
 * 服务bean
 * 
 * @author MagicChu
 * 
 */
public class RouteBean implements Serializable {

	private static final long serialVersionUID = -7380905021091315247L;

	public RouteBean() {
	}

	// 服务id
	private String routeId;
	// 服务名称
	private String routeName;
	// 服务url
	private String routeUrl;

	public String getRouteId() {
		return routeId;
	}

	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}

	public String getRouteName() {
		return routeName;
	}

	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}

	public String getRouteUrl() {
		return routeUrl;
	}

	public void setRouteUrl(String routeUrl) {
		this.routeUrl = routeUrl;
	}

}
