package com.digitalchina.ldp.app.sps.service;

import java.util.List;

import com.digitalchina.ldp.app.sps.bean.RouteTypeInfo;
import com.digitalchina.ldp.app.sps.bean.RouteTypeTree;

/**
 * @author Luox
 * 服务类别接口
 */
public interface RouteTypeService {
	
	public List<RouteTypeInfo> getRouteTypeInfo() throws Exception;

	public List<RouteTypeTree> getRouteTypeTree(String rtRootId) throws Exception;
	
}
