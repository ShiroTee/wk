package com.digitalchina.ldp.app.csdsc.dao;

import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.csdsc.bean.AssetBean;



/**
 * 地图服务自动注册接口
 * @author MagicChu
 *
 */
public interface GisServiceAutoRegDao {
	
	/**
	 * 删除信息资产数据
	 * @param assetId 资产id
	 */
	public void deleteAsset(String assetId);
	
	/**
	 * 删除服务于资产目录的挂接关系（更新服务表中的资产目录关联id为空）
	 * @param serviceId 服务id
	 */
	public int deleteServiceAndAssetRelation(String serviceId);
	
	//判断此信息资产id是否能删除
	public boolean getAssetIdFlag(String assetId);
	
	//通过信息资产获取所有地图服务id
	public List<Map<String, Object>> getSevIds(String assetId);
	
	/**
	 * 插入信息资产数据
	 * @param assetId 资产id
	 * @param assetName 名称
	 * @param provider  资产提供商id
	 * @param assetAbstract 资产摘要
	 * @param createTime 创建时间
	 */
	public void insertAsset(String assetId,String assetName,String assetAbstract,String provider,String pubLv,String createTime);
	
	/**
	 * 修改信息资产数据
	 * @param assetId 资产id
	 * @param assetName 名称
	 * @param assetAbstract 资产摘要
	 * @param createTime 创建时间
	 */
	public void updateAsset(String assetId,String assetName,String assetAbstract,String provider,String pubLv,String createTime);
	
	/**
	 * 查询信息资产数据
	 * @param assetId 资产id
	 * 
	 */
	public List<AssetBean> queryAsset(String assetId);
	
}
