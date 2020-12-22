package com.digitalchina.ldp.app.sps.bean;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
@SuppressWarnings("serial")
@Table(name="Asset")
@Entity
public class ResourceCatalogueInfo implements Serializable
{
	@Id
	@Column(name="asset_id")
	private String resourceId;
	@Column(name="asset_name",length=256,nullable=false)
	private String resourceName;		//资产名称
	@Column(name="pub_dt")
	private Date pubDate;				//发布日期
	@Column(name="provider",length=40)
	@ManyToOne
	private OrganizationInfoBean provider;			//资源提供方
	@Transient
	private List<ServiceInfo> services;
	/**
	 * 公开级别
	 * 0=主动公开
	 * 1=被动公开
	 * 2=不公开
	 */
	@Column(name="pub_lv")
	@ManyToOne
	private DcitPublicLv publicLv;
	@Column(name="status")
	private Integer status;
	@Column(name="sm_flag")
	private Integer sm_flag;
	//资源摘要
	@Column(name="abstract")
	private String resAbstract;
	@Column(name="keyword")
	private String keyword;
	@ManyToOne
	@Column(name="arch_cate")
	private DictArchCateInfo dictArchCateInfo;
	public DictArchCateInfo getDictArchCateInfo()
	{
		return dictArchCateInfo;
	}
	public void setDictArchCateInfo(DictArchCateInfo dictArchCateInfo)
	{
		this.dictArchCateInfo = dictArchCateInfo;
	}
	//保密级别
	@Column(name="secr_lv")
	@ManyToOne
	private DictSecrLv secrLv;
	@Column(name="crt_dt")
	private Date createDate; 
	@Column(name="remark")
	private String remark;
	//更新频率
	@Column(name="UPDATE_RATE")
	private Integer updateRate;
	//最后更新时间
	@Column(name="FINAL_UPDATE_DATE")
	private String finalUpdateDate;
	public Integer getUpdateRate()
	{
		return updateRate;
	}
	public void setUpdateRate(Integer updateRate)
	{
		this.updateRate = updateRate;
	}
	public String getFinalUpdateDate()
	{
		return finalUpdateDate;
	}
	public void setFinalUpdateDate(String finalUpdateDate)
	{
		this.finalUpdateDate = finalUpdateDate;
	}
	public String getRemark()
	{
		return remark;
	}
	public void setRemark(String remark)
	{
		this.remark = remark;
	}
	public Date getCreateDate()
	{
		return createDate;
	}
	public void setCreateDate(Date createDate)
	{
		this.createDate = createDate;
	}
	public DictSecrLv getSecrLv()
	{
		return secrLv;
	}
	public void setSecrLv(DictSecrLv secrLv)
	{
		this.secrLv = secrLv;
	}
	
	public String getKeyword()
	{
		return keyword;
	}
	public void setKeyword(String keyword)
	{
		this.keyword = keyword;
	}
	public String getResAbstract()
	{
		return resAbstract;
	}
	public void setResAbstract(String resAbstract)
	{
		this.resAbstract = resAbstract;
	}
	public Integer getStatus()
	{
		return status;
	}
	public void setStatus(Integer status)
	{
		this.status = status;
	}
	public DcitPublicLv getPublicLv()
	{
		return publicLv;
	}
	public void setPublicLv(DcitPublicLv publicLv)
	{
		this.publicLv = publicLv;
	}
	public ResourceCatalogueInfo()
	{
		
	}
	public ResourceCatalogueInfo(String resourceId)
	{
		this.resourceId=resourceId;
	}
	public List<ServiceInfo> getServices()
	{
		return services;
	}
	public void setServices(List<ServiceInfo> services)
	{
		this.services = services;
	}
	public OrganizationInfoBean getProvider()
	{
		return provider;
	}
	public void setProvider(OrganizationInfoBean provider)
	{
		this.provider = provider;
	}
	public String getResourceId()
	{
		return resourceId;
	}
	public void setResourceId(String resourceId)
	{
		this.resourceId = resourceId;
	}
	public String getResourceName()
	{
		return resourceName;
	}
	public void setResourceName(String resourceName)
	{
		this.resourceName = resourceName;
	}
	public Date getPubDate()
	{
		return pubDate;
	}
	public void setPubDate(Date pubDate)
	{
		this.pubDate = pubDate;
	}
	@Transient
	private List<ResourceAndClassInfo> types=new ArrayList<ResourceAndClassInfo>(5);
	public List<ResourceAndClassInfo> getTypes()
	{
		return types;
	}
	public void setTypes(List<ResourceAndClassInfo> types)
	{
		this.types = types;
	}
	@Transient
	private List<ResourceAndFieldInfo> fields=new ArrayList<ResourceAndFieldInfo>(5);
	public List<ResourceAndFieldInfo> getFields()
	{
		return fields;
	}
	public void setFields(List<ResourceAndFieldInfo> fields)
	{
		this.fields = fields;
	}
	public static void main(String[] args)throws Exception
	{
		/*
		BeanHelperQuery<ResourceCatalogueInfo> query=new BeanHelperQuery<ResourceCatalogueInfo>(ResourceCatalogueInfo.class,null,null,null);
		query.eq("resourceId","123");
		query.eq("resourceName","test","or");
		query.eq(, value, linkIdentifier)
		*/
	}
	public Integer getSm_flag() {
		return sm_flag;
	}
	public void setSm_flag(Integer sm_flag) {
		this.sm_flag = sm_flag;
	}
	
}
