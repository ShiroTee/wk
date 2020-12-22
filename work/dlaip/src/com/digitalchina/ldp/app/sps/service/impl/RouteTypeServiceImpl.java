package com.digitalchina.ldp.app.sps.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.RouteTypeInfo;
import com.digitalchina.ldp.app.sps.bean.RouteTypeTree;
import com.digitalchina.ldp.app.sps.service.RouteTypeService;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;

@Service
public class RouteTypeServiceImpl extends BaseService implements RouteTypeService{
 
	@Override
	public List<RouteTypeInfo> getRouteTypeInfo() throws Exception {
		BeanQuery<RouteTypeInfo> query=this.createBeanQuery(RouteTypeInfo.class);
		return query.list();
	}

	@Override
	public List<RouteTypeTree> getRouteTypeTree(String rtRootId) throws Exception{
		RouteTypeTree root = new RouteTypeTree(new RouteTypeInfo(rtRootId));
		getRouteTypeTree(root);
		return root.getChildren();
	}

	  private void getRouteTypeTree(RouteTypeTree root)
	  {
		RouteTypeTree rtTreeInfo = null;
	    BeanQuery<RouteTypeInfo> query = createBeanQuery(RouteTypeInfo.class);
	    query.addQueryParameter("parantTypeId", root.getId());
	    query.sortForAsc(new String[] { "typeName" });
	    List<RouteTypeInfo> list = query.list();
	    for (RouteTypeInfo bean : list)
	    {
	      rtTreeInfo = new RouteTypeTree(bean);
	      root.getChildren().add(rtTreeInfo);
	      getRouteTypeTree(rtTreeInfo);
	    }
	  }
}
