package com.digitalchina.ldp.app.sps.dao;

import java.util.Map;

import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface ResourceCatalogueDao {
  PageList<ResourceCatalogueInfo> queryByType(int start, int pageSize, Map<String, String> args);
  public PageList<DynamicBean> hotInvoking(int start, int limit);

  public PageList<DynamicBean> latest(int start, int limit);
  public PageList<ResourceCatalogueInfo> find(String assetId,int start,int pageSize);
  /**
   * 根据资产id和授权id删除关系
   * @param assetId
   * @param authId
   * @return
   */
  public Boolean deleteData(String assetId,String authId);
  /**
   * 修改资源组成的启用状态
   * @param id
   * @param tableName
   * @param status
   * @return
   */
  public Boolean updateStatus(String id, String tableName, String status);
  /**
   * 根据条件查询数据
   * @param start
   * @param pageSize
   * @param orgId
   * @param assetName
   * @param archCateId
   * @param sm_flag
   * @return
   */
  public PageList<DynamicBean> getSearch(int start, int pageSize,String orgId,String assetName,String archCateId,String sm_flag);

  PageList<DynamicBean> loadResourceByOrgForLiuZhou(int start, int pageSize, String orgId);
  
  PageList<DynamicBean> queryByTypeForLiuZhou(int start, int pageSize, Map<String, String> args);
  PageList<DynamicBean> laodResourceByOrgForLiuZhou(int start, int pageSize, String keyWord);
}
