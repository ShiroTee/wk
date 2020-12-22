package com.digitalchina.ldp.app.sps.service;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.sps.bean.AssetWithApplyStatistics;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface ResourceCatalogueService
{
	/**
	 * 分页获取资源目录列表
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<ResourceCatalogueInfo> getSearch(int start,int pageSize,String orgId,String assetName,String archCateId,String sm_flag);
	/**
	 * 分页获取资源目录列表(重载)
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<ResourceCatalogueInfo> getSearch(int start,int pageSize,String orgId,String assetName,String archCateId);
	
	/**
	 * 获取资源详细信息
	 * @param resourceId
	 * @return
	 */
	public ResourceCatalogueInfo getResourceCatalogueInfo(String resourceId);
	/**
	 * 更新资源目录信息
	 * @param info
	 */
	public void updateResourceCatalogueInfo(String ids,int status);
	public ResourceCatalogueInfo getByResourceId(String resourceId);
	public ResourceCatalogueInfo getResourceDetaiByUserId(String userId,String resourceId);
	public ResourceCatalogueInfo getResourceDetails(String resourceId);
	/**
	 * 根据主题分类获取资源目录列表
	 * @param start
	 * @param pageSize
	 * @param subjectId
	 * @return
	 */
	public PageList<ResourceCatalogueInfo> queryBySubjectId(int start,int pageSize,String userId,String subjectId);
	/**
	 * 根据组织机构ID获取资源目录
	 * @param start
	 * @param pageSize
	 * @param orgId
	 * @return
	 */
	public PageList<ResourceCatalogueInfo> queryByOrgId(int start,int pageSize,String userId,String orgId);
	public PageList<ResourceCatalogueInfo> queryByType(int start, int pageSize, Map<String, String> args);
    /**
     * 获取最新发布的信息资源
     * @param start
     * @param limit
     * @return
     */
	public PageList<DynamicBean> latest(int start, int limit);
	/**
	   * 最热服务 (被调用次数)
	   * @param start
	   * @param limit
	   * @return
	   */
	  public PageList<DynamicBean> hotInvoking(int start, int limit);
	  
	  /**
	   * 最热服务 (被关注次数)
	   * @param start
	   * @param limit
	   * @return
	   */
	  public List<ResourceCatalogueInfo> hotWatching(int start, int limit) ;
	  
	  /**
	   * 最热服务 (被提交需求的次数)
	   * @param start
	   * @param limit
	   * @return
	   */
	  public List<ResourceCatalogueInfo> hotRequire(int start, int limit);
	  
	  /**
	   * 最热服务 (被申请的次数)
	   * @param start
	   * @param limit
	   * @return
	   */
	  public List<ResourceCatalogueInfo> hotApply(int start, int limit) ;
	  
	  /**
	   * 最热服务 (被查看详细页面的次数)
	   * @param start
	   * @param limit
	   * @return
	   */
	  public List<ResourceCatalogueInfo> hotDetailed(int start, int limit) ;
	  public PageList<ResourceCatalogueInfo> getPageListByAuthKey(String authId,int start,int pageSize);
	  public PageList<ResourceCatalogueInfo> laodResourceByOrg(int start, int pageSize, String orgId,
        String resourceName);
	  /**
	   * 根据授权key查询相应的资源信息
	   * @param key
	   * @param start
	   * @param limit
	   * @return
	   */
	  public PageList<ResourceCatalogueInfo> getPageListByAuthKey(String key,String start,String limit);
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
	  public Boolean updateStatus(String id,String tableName,String status);
	  /**
	   * 修改若干条资源组成的启用状态
	   * @param ids
	   * @param tableNames
	   * @param status
	   * @return
	   */
	  public Boolean updateAllStopOrStart(String ids,String tableNames,String status) throws Exception;
	  /**
	   * 修改资源目录更新频率和最后更新时间
	   * @param r
	   */
	  public void editRate(ResourceCatalogueInfo r);
      
	  
	  /**
	   * 根据组织结构ID 加载其持有的资源目录 (柳州定制, 每个资源目录都包含状态位指明是否包含服务)
	   * @param start
	   * @param pageSize
	   * @param orgId
	   * @param resourceName
	   * @return
	   */
	  public PageList<DynamicBean> loadResourceByOrgForLiuZhou(int start, int pageSize,
        String orgId, String resourceName);
	  
	  /**
       * 根据类别ID 加载其下的源目录 (柳州定制, 每个资源目录都包含状态位指明是否包含服务)
       * @param start
       * @param pageSize
       * @param orgId
       * @param resourceName
       * @return
       */
	  public PageList<DynamicBean> queryByTypeForLiuZhou(int start, int pageSize,
	        Map<String, String> args);
      public PageList<DynamicBean> laodResourceByOrgForLiuZhou(int start, int pageSize,
         String keyWord);
      public AssetWithApplyStatistics getByResourceIdWithStatistics(
          String resourceId);
	  
}
