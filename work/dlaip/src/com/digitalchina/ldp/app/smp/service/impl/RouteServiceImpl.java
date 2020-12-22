package com.digitalchina.ldp.app.smp.service.impl;

import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.common.util.RouteManagerContainer;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
import com.digitalchina.ldp.app.smp.service.RouteService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.orm.execute.ExecuteQuery;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RouteServiceImpl extends BaseService
  implements RouteService
{
  public List<RouteInfo> getRouteList(int routeStatus)
  {
    return createBeanQuery(RouteInfo.class)
      .eq("routeStatus", Integer.valueOf(routeStatus), new String[0]).list();
  }

  public void saveRouteInfo(RouteInfo route, boolean isAddtoRouteManager)
  {
    createExecuteQuery().insert(route, false);
  }

  public PageList<RouteInfo> getPageList(String routeType, int routeStatus, int start, int pageSize)
  {
    BeanQuery query = createBeanQuery(RouteInfo.class);
    if (!StringUtils.isEmpty(routeType))
    {
      query.eq("routeType", routeType, new String[0]);
    }
    query.eq("routeStatus", Integer.valueOf(routeStatus), new String[0]);
    PageList pageList = query.page(start, pageSize);
    RmiRouteManager rmiRouteManager = 
      (RmiRouteManager)BeanDefineConfigue.getBean(RmiRouteManager.class, "rmiRouteManager", null);
    List list = rmiRouteManager.getRouteStatus(pageList
      .getList());
    pageList.setList(list);
    return pageList;
  }

  public RouteInfo getRouteInfo(String routeId)
  {
    RouteInfo bean = 
      (RouteInfo)createBeanQuery(RouteInfo.class)
      .eq("routeId", routeId, new String[0]).uniqueResult();
    if (bean == null)
    {
      throw new ServiceException("服务信息不存在或已被删除");
    }
    return bean;
  }
  
  public Integer updateRouteInfo(RouteInfo routeInfo)
  {
    return this.createExecuteQuery().update(routeInfo);
  }

  public RouteInfo getRouteInfoByPublishURL(String url)
  {
    BeanQuery query = createBeanQuery(RouteInfo.class)
      .eq("publishURL", url, new String[0]).eq("routeStatus", Integer.valueOf(1), new String[0]);
    query.selectFields(new String[] { "routeId", "prxoyURL", "isAuth", "routeType" });
    RouteInfo info = (RouteInfo)query.uniqueResult();
    return info;
  }

  public PageList<RouteInfo> search(String routeType, String routeName, int runningStatus, int start, int pageSize)
  {
    BeanQuery query = createBeanQuery(RouteInfo.class);
    if(runningStatus > 0){
    	query.eq("runningStatus", runningStatus);
    }
    if (!"".equals(routeType))
    {
      query.eq("routeType", routeType, new String[0]);
    }
    if (!"".equals(routeName))
    {
      query.like("routeName", routeName, new String[0]);
    }
    List routeManages = ((RouteManagerContainer)BeanDefineConfigue.getBean(RouteManagerContainer.class, "routeManagerContainer", null)).getRouteManagers();
    RmiRouteManager rmiRouteManager = (RmiRouteManager)routeManages.get(0);

      PageList pageList = query.page(start, pageSize);
//    if (runningStatus == 0)
//      {
	      List list = rmiRouteManager.getRouteStatus(pageList.getList());
	      pageList.setList(list);
//      }
      return pageList;
  }
}