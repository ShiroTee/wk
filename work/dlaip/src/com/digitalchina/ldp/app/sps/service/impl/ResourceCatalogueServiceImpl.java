package com.digitalchina.ldp.app.sps.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalchina.ldp.app.sps.bean.AssetWithApplyStatistics;
import com.digitalchina.ldp.app.sps.bean.DcitPublicLv;
import com.digitalchina.ldp.app.sps.bean.DictArchCateInfo;
import com.digitalchina.ldp.app.sps.bean.DictSecrLv;
import com.digitalchina.ldp.app.sps.bean.ResourceAndClassInfo;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.dao.ResourceCatalogueDao;
import com.digitalchina.ldp.app.sps.service.ApprovalService;
import com.digitalchina.ldp.app.sps.service.ResourceCatalogueService;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import com.digitalchina.ldp.service.BaseService;

@Service
public class ResourceCatalogueServiceImpl extends BaseService implements
		ResourceCatalogueService
{
	@Autowired
	private ResourceCatalogueDao resourceCatalogueDao;
	@Autowired
	private ApprovalService approvalService;

	@Override
	public PageList<ResourceCatalogueInfo> laodResourceByOrg(int start,
			int pageSize, String orgId, String resourceName)
	{
		BeanQuery<ResourceCatalogueInfo> query = this
				.createBeanQuery(ResourceCatalogueInfo.class);
		query.selectFields("resourceId", "resourceName",
				"publicLv.publicLvName", "pubDate", "provider.orgName",
				"status", "secrLv.secrTypeName");
		query.sortForDesc("pubDate");
		query.eq("status", "1");
		query.setJoin(true);
		query.setJoinLeftJoin();
		if (!"".equals(orgId))
		{
			query.eq("provider", orgId);
		}
		if (resourceName != null)
		{
			query.like("resourceName", resourceName);
		}
		return query.page(start, pageSize);
	}
	
	@Override
	public PageList<DynamicBean> loadResourceByOrgForLiuZhou(int start, int pageSize, String orgId,
	      String resourceName) {
	  return resourceCatalogueDao.loadResourceByOrgForLiuZhou(start, pageSize, orgId);
	}
	@Override
	public PageList<ResourceCatalogueInfo> getSearch(int start, int pageSize,
			String orgId, String assetName, String archCateId, String sm_flag)
	{
		OrganizationInfoBean org=this.createBeanQuery(OrganizationInfoBean.class).eq("orgId",orgId).selectFields("orgCode").uniqueResult();
		String orgCode="";
		if(org!=null)
		{
			orgCode=org.getOrgCode();
		}
		PageList<DynamicBean> pageList = resourceCatalogueDao.getSearch(start,
				pageSize, orgCode, assetName, archCateId, sm_flag);
		PageList<ResourceCatalogueInfo> listR = new PageList<ResourceCatalogueInfo>();
		List<ResourceCatalogueInfo> list = new ArrayList<ResourceCatalogueInfo>();
		for (int i = 0; i < pageList.getList().size(); i++)
		{
			DynamicBean dBean = pageList.getList().get(i);
			ResourceCatalogueInfo bean = new ResourceCatalogueInfo();
			bean.setResourceId("" + dBean.get("asset_id"));
			bean.setResourceName("" + dBean.get("asset_name"));
			DcitPublicLv dp = new DcitPublicLv();
			if (null != dBean.get("publiclv"))
			{
				dp.setPublicLvName("" + dBean.get("publiclv"));
			}
			dp.setPublicLvId("" + dBean.get("pub_lv"));
			bean.setPublicLv(dp);
			if (null != dBean.get("pub_dt")
					&& !"".equals("" + dBean.get("pub_dt")))
			{
				
				bean.setPubDate(dBean.getValue(Date.class, "pub_dt"));
			}
			if (null != dBean.get("status") && !"".equals(dBean.get("status")))
			{
				bean.setStatus(Integer.parseInt("" + dBean.get("status")));
			}
			if (null != dBean.get("update_rate"))
			{
				bean.setUpdateRate(dBean.getValue(Integer.class, "update_rate"));
			}
			if (null != dBean.get("final_update_date"))
			{
				bean.setFinalUpdateDate(dBean.getValue("final_update_date"));
			}
			DictArchCateInfo daci = new DictArchCateInfo();
			daci.setTypNm("" + dBean.get("typ_nm"));
			daci.setTypCd("" + dBean.get("arch_cate"));
			bean.setDictArchCateInfo(daci);
			OrganizationInfoBean oib = new OrganizationInfoBean();
			oib.setOrgName("" + dBean.get("org_nm"));
			oib.setOrgId("" + dBean.get("provider"));
			bean.setProvider(oib);
			DictSecrLv ds = new DictSecrLv();
			ds.setSecrTypCd("" + dBean.get("secr_lv"));
			bean.setSecrLv(ds);
			list.add(bean);
		}
		listR.setList(list);
		listR.setCount(pageList.getCount());
		return listR;
	}
	@Override
	public ResourceCatalogueInfo getResourceCatalogueInfo(String resourceId)
	{
		ResourceCatalogueInfo bean = this
				.createBeanQuery(ResourceCatalogueInfo.class)
				.eq(resourceId, resourceId).uniqueResult();
		if (bean == null)
		{
			throw new ServiceException("资源目录不存在或已被删除");
		}
		// 查询出资源目录所
		return null;
	}
	@Override
	public void updateResourceCatalogueInfo(String ids, int status)
	{
		String[] allId = ids.split(",");
		for (int i = 0; i < allId.length; i++)
		{
			ResourceCatalogueInfo rc = new ResourceCatalogueInfo();
			rc.setResourceId(allId[i]);
			rc.setStatus(status);
			rc.setPubDate(new java.util.Date());
			this.createExecuteQuery().update(rc);
		}
	}
	@Override
	public ResourceCatalogueInfo getByResourceId(String resourceId)
	{
		ResourceCatalogueInfo bean = this
				.createBeanQuery(ResourceCatalogueInfo.class)
				.eq("resourceId", resourceId).setJoinLeftJoin().setJoin(true)
				.uniqueResult();
		if (bean == null)
		{
			throw new ServiceException("资源目录不存在或已被删除");
		}
		/*
		 * BeanQuery<ResourceAndFieldInfo>
		 * query=this.createBeanQuery(ResourceAndFieldInfo.class);
		 * query.eq("resource",bean.getResourceId()); query.setJoin(true);
		 * query.setJoinBean("FieldInfo");
		 * query.selectFields("fieldLength","isNull"
		 * ,"remark","field.fieldName","field.engFieldName","field.dataType");
		 * bean.setFields(query.list());
		 */
		return bean;
	}
	@Override
	public ResourceCatalogueInfo getResourceDetails(String resourceId)
	{
		BeanQuery<ResourceCatalogueInfo> query = this.createBeanQuery(
				ResourceCatalogueInfo.class).eq("resourceId", resourceId);
		query.setJoin(true);
		query.setJoinLeftJoin();
		ResourceCatalogueInfo info = query.uniqueResult();
		if (info == null)
		{
			throw new ServiceException("资源目录不存在或已被删除");
		}
		// 获取资源目录分类信息
		BeanQuery<ResourceAndClassInfo> query_ = this
				.createBeanQuery(ResourceAndClassInfo.class);
		query_.eq("resourceId", resourceId);
		query_.setJoin(true);
		query.setJoinBean("ResourceClassInfo");
		List<ResourceAndClassInfo> list = query_.list();
		for (ResourceAndClassInfo r : list)
		{
			info.getTypes().add(r);
		}
		return info;
	}

	@Override
	public PageList<ResourceCatalogueInfo> queryBySubjectId(int start,
			int pageSize, String userId, String subjectId)
	{
		BeanQuery<ResourceCatalogueInfo> query = this
				.createBeanQuery(ResourceCatalogueInfo.class);
		query.eq("", "");
		return null;
	}
	@Override
	public PageList<ResourceCatalogueInfo> queryByOrgId(int start,
			int pageSize, String userId, String orgId)
	{
		BeanQuery<ResourceCatalogueInfo> query = this
				.createBeanQuery(ResourceCatalogueInfo.class);
		query.setJoin(true);
		query.eq("provider", orgId);
		query.eq("status", 1);
		query.selectFields("resourceId", "resourceName", "publicLv", "pubDate",
				"provider.orgName");
		query.sortForDesc("pubDate", "resourceName");
		return query.page(start, pageSize);
	}
	@Override
	public ResourceCatalogueInfo getResourceDetaiByUserId(String userId,
			String resourceId)
	{

		return null;
	}
	@Override
	public PageList<ResourceCatalogueInfo> queryByType(int start, int pageSize,
			Map<String, String> args)
	{
		return resourceCatalogueDao.queryByType(start, pageSize, args);
	}

	/**
	 * 最新发布的信息资源列表
	 */
	@Override
	public PageList<DynamicBean> latest(int start, int limit)
	{
		PageList<DynamicBean> pl = resourceCatalogueDao.latest(start, limit);
		return pl;
		// return
		// this.createBeanQuery(ResourceCatalogueInfo.class).sortForDesc("pubDate").list(start,limit);
	}
	/**
	 * 最热服务 (被调用次数)
	 * 
	 * @param start
	 * @param limit
	 * @return
	 */
	@Override
	public PageList<DynamicBean> hotInvoking(int start, int limit)
	{
		return resourceCatalogueDao.hotInvoking(start, limit);
	}

	/**
	 * 最热服务 (被关注次数)
	 * 
	 * @param start
	 * @param limit
	 * @return
	 */
	@Override
	public List<ResourceCatalogueInfo> hotWatching(int start, int limit)
	{
		return null;
	}
	/**
	 * 最热服务 (被提交需求的次数)
	 * 
	 * @param start
	 * @param limit
	 * @return
	 */
	@Override
	public List<ResourceCatalogueInfo> hotRequire(int start, int limit)
	{
		return null;
	}
	/**
	 * 最热服务 (被申请的次数)
	 * 
	 * @param start
	 * @param limit
	 * @return
	 */
	@Override
	public List<ResourceCatalogueInfo> hotApply(int start, int limit)
	{
		return null;
	}
	/**
	 * 最热服务 (被查看详细页面的次数)
	 * 
	 * @param start
	 * @param limit
	 * @return
	 */
	@Override
	public List<ResourceCatalogueInfo> hotDetailed(int start, int limit)
	{
		return null;
	}

	@Override
	public PageList<ResourceCatalogueInfo> getPageListByAuthKey(String authId,
			int start, int pageSize)
	{

		return null;
	}

	@Override
	public PageList<ResourceCatalogueInfo> getPageListByAuthKey(String key,
			String start, String limit)
	{
		int start1 = Integer.parseInt(start);
		int limit1 = Integer.parseInt(limit);
		return resourceCatalogueDao.find(key, start1, limit1);
	}

	@Override
	public Boolean deleteData(String assetId, String authId)
	{
		return resourceCatalogueDao.deleteData(assetId, authId);
	}

	@Override
	public Boolean updateStatus(String id, String tableName, String status)
	{
		return resourceCatalogueDao.updateStatus(id, tableName, status);
	}

	@Override
	public Boolean updateAllStopOrStart(String ids, String tableNames,
			String status) throws Exception
	{
		// 取得所有的id和所有的表名
		String id[] = ids.split(",");
		String tableName[] = tableNames.split(",");
		for (int i = 0; i < id.length; i++)
		{
			Boolean b = resourceCatalogueDao.updateStatus(id[i], tableName[i],
					status);
			if (!b)
			{
				// 有一条失败则抛出异常回滚事务
				throw new Exception();
			}
		}
		return true;
	}

	@Override
	public PageList<ResourceCatalogueInfo> getSearch(int start, int pageSize,
			String orgId, String assetName, String archCateId)
	{
		BeanQuery<ResourceCatalogueInfo> query = this
				.createBeanQuery(ResourceCatalogueInfo.class);
		query.selectFields("resourceId", "resourceName",
				"publicLv.publicLvName", "pubDate", "provider.orgName",
				"status", "dictArchCateInfo.typNm");
		query.sortForDesc("pubDate");
		query.setJoin(true);
		query.setJoinLeftJoin();
		if (!"".equals(orgId))
		{
			query.eq("provider", orgId);
		}
		if (assetName != null)
		{
			query.like("resourceName", assetName);
		}
		if (!"".equals(archCateId))
		{
			query.eq("dictArchCateInfo", archCateId);
		}
		return query.page(start, pageSize);
	}

	@Override
	public void editRate(ResourceCatalogueInfo r)
	{
		this.createExecuteQuery().update(r);
	}

  @Override
  public PageList<DynamicBean> queryByTypeForLiuZhou(int start, int pageSize,
      Map<String, String> args) {
    return resourceCatalogueDao.queryByTypeForLiuZhou(start,pageSize,args);
  }

  @Override
  public PageList<DynamicBean> laodResourceByOrgForLiuZhou(int start, int pageSize,
      String keyWord) {
    return resourceCatalogueDao.laodResourceByOrgForLiuZhou(start,pageSize,keyWord);
  }
  
  @Override
  public AssetWithApplyStatistics getByResourceIdWithStatistics(String resourceId) {
    AssetWithApplyStatistics bean =
        this.createBeanQuery(AssetWithApplyStatistics.class)
            .eq("resourceId", resourceId).setJoinLeftJoin().setJoin(true).uniqueResult();
    if (bean == null) {
      throw new ServiceException("资源目录不存在或已被删除");
    }
    bean.setApplyQuantity(approvalService.countForAsset(bean.getResourceId()));
    return bean;
  }
}
