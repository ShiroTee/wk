package com.digitalchina.ldp.app.sps.bean;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;
@SuppressWarnings("serial")
@Table(name = "ESB_ROUTE_INFO")
@Entity
public class ServiceInfo extends RouteInfo
{
	@Column(name = "asset_id", length = 40, nullable = false)
	@ManyToOne
	private ResourceCatalogueInfo resource;
	@Column(name = "file_size")
	private Long fileSize; // 文件大小，只有当routType为ftp时才有效
	@Column(name = "FILE_NAME", length = 255)
	private String fileName;
    @Column(name = "BASE_URL")
    private String baseUrl;

    //	@Column(name = "SERV_TYPE_ID", length = 36)
//	private String servTypeId; 
//	@Column(name = "SERV_TYPE_ID", length = 36, nullable = false)
//	@ManyToOne
//	private RouteTypeInfo routeTypeInfo;
//	@Column(name = "IS_FREE", length = 1)
//	private Integer isFree;
//	@Column(name = "PLAT_TYPE", length = 255)
//	private String platType;
//	@Column(name = "SERV_PROV", length = 255)
//	private String servProv;
//	@Column(name = "SERV_DESC", length = 1000)
//	private String servDesc;
//	@Column(name = "SERV_FEAT", length = 4000)
//	private String servFeat;
//	@Column(name = "ASSOC_RECOM", length = 255)
//	private String assocRecom;
//	@Column(name = "SERV_SCORE", length = Constant.FIELD_ID_MAX_LENGTH)
//	private String servScore;
//	@Column(name = "FREE_COUNT", length = Constant.FIELD_ID_MAX_LENGTH)
//	private String freeCount;
//	@Column(name = "SERV_MODE", length = 255)
//	private String servMode;
	
//	public RouteTypeInfo getRouteTypeInfo() {
//		return routeTypeInfo;
//	}
//	public void setRouteTypeInfo(RouteTypeInfo routeTypeInfo) {
//		this.routeTypeInfo = routeTypeInfo;
//	}
	
//	public String getServTypeId() {
//		return servTypeId;
//	}
//	public void setServTypeId(String servTypeId) {
//		this.servTypeId = servTypeId;
//	}
	
//	public String getPlatType() {
//		return platType;
//	}
//	public void setPlatType(String platType) {
//		this.platType = platType;
//	}
//	public Integer getIsFree() {
//		return isFree;
//	}
//	public void setIsFree(Integer isFree) {
//		this.isFree = isFree;
//	}
//	public String getServProv() {
//		return servProv;
//	}
//	public void setServProv(String servProv) {
//		this.servProv = servProv;
//	}
//	public String getServDesc() {
//		return servDesc;
//	}
//	public void setServDesc(String servDesc) {
//		this.servDesc = servDesc;
//	}
//	public String getServFeat() {
//		return servFeat;
//	}
//	public void setServFeat(String servFeat) {
//		this.servFeat = servFeat;
//	}
//	public String getAssocRecom() {
//		return assocRecom;
//	}
//	public void setAssocRecom(String assocRecom) {
//		this.assocRecom = assocRecom;
//	}
//	public String getServScore() {
//		return servScore;
//	}
//	public void setServScore(String servScore) {
//		this.servScore = servScore;
//	}
//	public String getFreeCount() {
//		return freeCount;
//	}
//	public void setFreeCount(String freeCount) {
//		this.freeCount = freeCount;
//	}
//	public String getServMode() {
//		return servMode;
//	}
//	public void setServMode(String servMode) {
//		this.servMode = servMode;
//	}


	private Date publishDate;
	
	public Date getPublishDate()
	{
		return publishDate;
	}

	public void setPublishDate(Date publishDate)
	{
		this.publishDate = publishDate;
	}

	public String getFileName()
	{
		return fileName;
	}

	public void setFileName(String fileName)
	{
		this.fileName = fileName;
	}

	public Long getFileSize()
	{
		return fileSize;
	}

	public void setFileSize(Long fileSize)
	{
		this.fileSize = fileSize;
	}

	public ResourceCatalogueInfo getResource()
	{
		return resource;
	}

	public void setResource(ResourceCatalogueInfo resource)
	{
		this.resource = resource;
	}


    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
	// 格式化文件大小单位
	public String getFileSizef()
	{
		if (this.fileSize != null)
		{
			if (this.fileSize / 1024 >= 1024)
			{
				float s= this.fileSize / 1024;
				s=this.fileSize / 1024;
				if (s / 1024>= 1024)
				{
					return String.format("%.2f",s/1024.0/1024.0)+"GB";
				}
				return String.format("%.2f", s / 1024.0) + " MB";
			}
			double s = this.fileSize / 1024.0;
			return String.format("%.2f", s) + " KB";
		}
		return null;
	}
}
