package com.digitalchina.ldp.app.sps.service;

import java.util.List;

import com.digitalchina.ldp.app.sps.bean.ServiceCatalogInfo;
import com.digitalchina.ldp.app.sps.bean.ServiceCatalogType;
import com.digitalchina.ldp.bean.PageList;

public interface ServiceCatalogService {
  public PageList<ServiceCatalogInfo> loadTree();

  public PageList<ServiceCatalogInfo> addNode(ServiceCatalogInfo serviceCatalogInfo);

  public PageList<ServiceCatalogInfo> editNode(ServiceCatalogInfo serviceCatalogInfo);

  public PageList<ServiceCatalogInfo> delNode(String id);

  public List<ServiceCatalogInfo> getTree(String pid);

  public List<ServiceCatalogInfo> loadSubNodes(String id);

  public List<ServiceCatalogType> loadAllType();

  public List<ServiceCatalogInfo> loadTreeByType(String type);

  public List<ServiceCatalogInfo> loadAllZT();

}
