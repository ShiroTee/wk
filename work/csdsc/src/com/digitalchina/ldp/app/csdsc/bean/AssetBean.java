package com.digitalchina.ldp.app.csdsc.bean;

import java.io.Serializable;
import java.util.List;

/**
 * 信息资产bean
 * 
 * @author MagicChu
 * 
 */
public class AssetBean implements Serializable {

	private static final long serialVersionUID = -7380905021091315247L;

	public AssetBean() {
	}

	// 信息资产id
	private String assetId;
	// 信息资产名称
	private String assetName;
	// 服务集合
	private List<RouteBean> services;

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public List<RouteBean> getServices() {
		return services;
	}

	public void setServices(List<RouteBean> services) {
		this.services = services;
	}

}
