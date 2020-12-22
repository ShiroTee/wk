package com.digitalchina.ldp.app.sps.handler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.RouteTypeTree;
import com.digitalchina.ldp.app.sps.service.RouteTypeService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class RouteTypeHandler extends AbstractHandler {

	@Autowired
	private RouteTypeService routeTypeService;

	/**
	 * @param model
	 * @return
	 * @author Luox
	 * 获取服务类型树
	 * @throws Exception 
	 */
	@HttpService
	public List<RouteTypeTree> getRouteTypeTree(Model model) throws Exception {
		String rtRootId = model.getValueNotEmpty("rtRootId");
		return this.routeTypeService.getRouteTypeTree(rtRootId);
	}
}
