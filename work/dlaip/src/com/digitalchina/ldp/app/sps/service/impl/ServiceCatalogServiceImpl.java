package com.digitalchina.ldp.app.sps.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.sps.bean.ServiceCatalogInfo;
import com.digitalchina.ldp.app.sps.bean.ServiceCatalogType;
import com.digitalchina.ldp.app.sps.service.ServiceCatalogService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;

@Service
public class ServiceCatalogServiceImpl extends BaseService implements
		ServiceCatalogService
{
	private static List<ServiceCatalogInfo> cacheList;

	@Override
	public PageList<ServiceCatalogInfo> addNode(
			ServiceCatalogInfo serviceCatalogInfo)
	{
		this.createExecuteQuery().insert(serviceCatalogInfo, false);
		refreshCache();
		return loadTree();
	}

	@Override
	public PageList<ServiceCatalogInfo> editNode(
			ServiceCatalogInfo serviceCatalogInfo)
	{
		this.createExecuteQuery().update(serviceCatalogInfo);
		refreshCache();
		return loadTree();
	}

	@Override
	public PageList<ServiceCatalogInfo> loadTree()
	{
		if (cacheList == null)
		{
			cacheList = this.createBeanQuery(ServiceCatalogInfo.class)
					.eq("typeCate", "FW").list();
		}
		PageList<ServiceCatalogInfo> pl = new PageList<ServiceCatalogInfo>();
		pl.setList(cacheList);
		return pl;
	}

	@Override
	public PageList<ServiceCatalogInfo> delNode(String id)
	{
		List<String> idList = new ArrayList<String>(cacheList.size());
		idList.add(id);
		loadParent(idList);
		for (String idToBeDel : idList)
		{
			this.createExecuteQuery().delete(ServiceCatalogInfo.class,
					idToBeDel);
		}
		refreshCache();
		return loadTree();
	}

	private void loadParent(List<String> idList)
	{
		ServiceCatalogInfo sci;
		for (int i = 0; i < cacheList.size(); i++)
		{
			sci = cacheList.get(i);
			if (idList.contains(sci.getParentId()))
			{
				idList.add(sci.getId());
				cacheList.remove(i);
				i = 0;
			}
		}
	}

	private void refreshCache()
	{
		cacheList = this.createBeanQuery(ServiceCatalogInfo.class).list();
	}

	@Override
	public List<ServiceCatalogInfo> getTree(String pid)
	{
		return this.createBeanQuery(ServiceCatalogInfo.class).eq("parentId",pid).selectFields("name","typ_id","parentId").list();
	}
	
	@Override
	public List<ServiceCatalogInfo> loadSubNodes(String id) {
		return this.createBeanQuery(ServiceCatalogInfo.class).eq("parentId",id).list();
	}

	@Override
	public List<ServiceCatalogType> loadAllType() {
		return this.createBeanQuery(ServiceCatalogType.class).list();
	}

	@Override
	public List<ServiceCatalogInfo> loadTreeByType(String type) {
		return this.createBeanQuery(ServiceCatalogInfo.class).eq("typeCate",type).list();
	}

  @Override
  public List<ServiceCatalogInfo> loadAllZT() {
    return this.createBeanQuery(ServiceCatalogInfo.class).eq("typeCate", "ZT").list();
  }
}
