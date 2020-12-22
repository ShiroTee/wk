package com.digitalchina.ldp.app.sps.handler.webservice;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.service.ResourceCatalogueService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

@Component
/**
 * 在线接口
 */
public class ResourceHandler extends AbstractHandler
{
	/**
	 * 根据组织结构ID获取资源目录列表
	 * @param model
	 * @return
	 */
	@Autowired
	private ResourceCatalogueService resourceCatalogueService;
	@HttpService
	public PageList<ResourceCatalogueInfo> queryByOrgId(Model model)
	{
	    HttpServletRequest request=model.getRequest();
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		String orgId=model.getValue("orgId");
		//String secrLv=model.getValue("secrLv");
		String resourceName=request.getParameter("resourceName");
		return resourceCatalogueService.getSearch(start, pageSize,orgId,resourceName,"","1");
	}
	
	@HttpService
    public PageList<ResourceCatalogueInfo> queryByOrgIdByJsonp(Model model)
    {
        int start=model.getInt("start");
        int pageSize=model.getInt("limit");
        String orgId=model.getValue("orgId");
       // String secrLv=model.getValue("secrLv");
        String resourceName=model.getValue("resourceName");
        return resourceCatalogueService.laodResourceByOrg(start, pageSize,orgId,resourceName);
    }
	
	@HttpService
    public PageList<DynamicBean> queryByOrgIdByJsonpForLiuZhou(Model model)
    {
        int start=model.getInt("start");
        int pageSize=model.getInt("limit");
        String orgId=model.getValue("orgId");
       // String secrLv=model.getValue("secrLv");
        String resourceName=model.getValue("resourceName");
        return resourceCatalogueService.loadResourceByOrgForLiuZhou(start, pageSize,orgId,resourceName);
    }
	
	@HttpService
	public PageList<ResourceCatalogueInfo> queryByType(Model model)
	{
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		String isRoot=model.getValue("isRoot");
		String type=model.getValue("type");
		Map<String,String> args=new HashMap<String,String>(2);
		if(!"".equals(type))
		{
			args.put("type", type);
		}
		if(!"".equals(isRoot)){
			args.put("isRoot", isRoot);
		}
		try{
			PageList<ResourceCatalogueInfo> pl=resourceCatalogueService.queryByType(start, pageSize,args);
			return pl;
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 获取资源目录详细信息
	 * @param model
	 * @return
	 */
	@HttpService
	public ResourceCatalogueInfo getResourceDetail(Model model)
	{
		//String userId=model.getValueNotEmpty("userId");
		String resourceId=model.getValueNotEmpty("resourceId");
		return this.resourceCatalogueService.getResourceDetails(resourceId);
	}
	
	/**
	 * 最新资源
	 * @param model
	 * @return
	 */
	@HttpService
	public PageList<DynamicBean> latest(Model model){
	  int start=model.getInt("start");
	  int limit=model.getInt("limit");
	  PageList<DynamicBean> pl=resourceCatalogueService.latest(start,limit);
	  return pl;
	}
	
	/**
	 * 最热服务
	 * @param model
	 * @return
	 */
	@HttpService
	public PageList<DynamicBean> hotInvoking(Model model){
	  int start=model.getInt("start");
      int limit=model.getInt("limit");
	  return resourceCatalogueService.hotInvoking(start,limit);
	}
}

