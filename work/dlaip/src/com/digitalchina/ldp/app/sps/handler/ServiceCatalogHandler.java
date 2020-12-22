package com.digitalchina.ldp.app.sps.handler;

import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.sps.bean.ServiceCatalogInfo;
import com.digitalchina.ldp.app.sps.bean.ServiceCatalogType;
import com.digitalchina.ldp.app.sps.service.ServiceCatalogService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;

@Component
public class ServiceCatalogHandler extends AbstractHandler
{
	@Autowired
	private ServiceCatalogService serviceCatalogService;

	@HttpService
	public PageList<ServiceCatalogInfo> loadTree(Model model)
	{
		return serviceCatalogService.loadTree();
	}
	
	@HttpService
	public List<ServiceCatalogInfo> loadAllZT(){
	  return serviceCatalogService.loadAllZT();
	}
	@HttpService
	public List<ServiceCatalogInfo> loadSubNodes(Model model){
		
		return serviceCatalogService.loadSubNodes(model.getValue("id"));
	}
	
	public List<ServiceCatalogInfo> getAsyncTree(Model model)
	{
		List<ServiceCatalogInfo> list=serviceCatalogService.loadTree().getList();
		
		return list;
	}
	public PageList<ServiceCatalogInfo> addNode(Model model)
	{
		ServiceCatalogInfo sci = new ServiceCatalogInfo();
		sci.setName(model.getValue("nodeName"));
		sci.setParentId(model.getValue("parentId"));
		sci.setComment(model.getValue("comment"));
		model.getRequest().getParameterMap();
		sci.setCreateTime(new Date());
		return serviceCatalogService.addNode(sci);
	}

	public PageList<ServiceCatalogInfo> editNode(Model model)
	{
		ServiceCatalogInfo sci = new ServiceCatalogInfo();
		sci.setId(model.getValue("nodeId"));
		sci.setName(model.getValue("nodeName"));
		sci.setComment(model.getValue("comment"));
		sci.setModifyTime(new Date());
		return serviceCatalogService.editNode(sci);
	}

	public PageList<ServiceCatalogInfo> removeNode(Model model)
	{
		return serviceCatalogService.delNode(model.getValue("nodeId"));
	}
	
	/**
	 * url: http://localhost/sps/service/api/sps/serviceCatalogHandler/loadType
	 * @param model
	 * @return
	 */
	@HttpService
	public List<ServiceCatalogType> loadType(Model model){
		try{
			return serviceCatalogService.loadAllType();
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * url: http://localhost/sps/service/api/sps/serviceCatalogHandler/loadTreeByType?type=ZT
	 * @param model
	 * @return
	 */
	@HttpService
	public List<ServiceCatalogInfo> loadTreeByType(Model model){
		try{
			List<ServiceCatalogInfo> list=serviceCatalogService.loadTreeByType(model.getValue("type"));
			return list;
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
