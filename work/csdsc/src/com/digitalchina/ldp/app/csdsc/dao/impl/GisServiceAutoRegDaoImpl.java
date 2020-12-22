package com.digitalchina.ldp.app.csdsc.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.csdsc.bean.AssetBean;
import com.digitalchina.ldp.app.csdsc.bean.RouteBean;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.GisServiceAutoRegDao;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.dao.BaseDao;

/**
 * 地图服务自动注册接口
 * @author MagicChu
 *
 */
@Component
public class GisServiceAutoRegDaoImpl extends BaseDao implements GisServiceAutoRegDao {

	
	/**
	 * 删除信息资产数据
	 * @param assetId 资产id
	 */
	@Override
	public void deleteAsset(String assetId) {
		JdbcTemplate  simpleJdbcTemplate = this.createJdbcTemplate();
		
		StringBuffer sb = new StringBuffer();
		sb.append(" delete from  asset where  asset_id='"+assetId+"' ");
		simpleJdbcTemplate.execute(sb.toString());
		simpleJdbcTemplate.execute("commit");
	}
	
	/**
	 * 删除服务于资产目录的挂接关系（更新服务表中的资产目录关联id为空）
	 * @param serviceId 服务id
	 */
	@Override
	public int deleteServiceAndAssetRelation(String serviceId) {
		JdbcTemplate  simpleJdbcTemplate = this.createJdbcTemplate();
		StringBuffer sb = new StringBuffer();
		sb.append(" update esb_route_info c set c.asset_id=null where c.res_id='"+serviceId+"' ");
		int i = simpleJdbcTemplate.update(sb.toString());
		simpleJdbcTemplate.execute("commit");
		return i;
	}
	
	//判断此信息资产id是否能删除
	public boolean getAssetIdFlag(String assetId) {
		boolean flag = true;
		StringBuilder sql = new StringBuilder();
		sql.append(" select a.id from approval_info a where 1=1 and a.asset_id='"+assetId+"' and a.status not in ('申请失败') ");
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		results = this.createJdbcTemplate().queryForList(sql.toString());
		if (results != null && results.size() > 0) {
			flag = false;
		}
		return flag;
	}

	//通过信息资产获取所有地图服务id
	public List<Map<String, Object>> getSevIds(String assetId) {
		StringBuilder sql = new StringBuilder();
		sql.append(" select res_id,res_nm,srv_url from esb_route_info b where 1=1 and b.asset_id='"+assetId+"' ");
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		results = this.createJdbcTemplate().queryForList(sql.toString());
		return results;
	}
	
	/**
	 * 插入信息资产数据
	 * @param assetId 资产id
	 * @param assetName 名称
	 * @param provider  资产提供商id
	 * @param assetAbstract 资产摘要
	 * @param createTime 创建时间
	 */
	@Override
	public void insertAsset(String assetId, String assetName,String assetAbstract,
			String provider,String pubLv,String createTime) {
		JdbcTemplate  simpleJdbcTemplate = this.createJdbcTemplate();
		
		StringBuffer sb = new StringBuffer();
		if(null==pubLv)
		{
			sb.append(" insert into asset(asset_id,root_id,arch_cate,asset_name,abstract,provider,pub_lv,crt_dt,status,sm_flag) values('"+assetId+"','"+assetId+"','Arch_busi_uview','"+assetName+"','"+assetAbstract+"','"+provider+"',"+pubLv+",to_date('"+createTime+"','yyyy-mm-dd'),null,1) ");
		}
		else
		{
			sb.append(" insert into asset(asset_id,root_id,arch_cate,asset_name,abstract,provider,pub_lv,crt_dt,status,sm_flag) values('"+assetId+"','"+assetId+"','Arch_busi_uview','"+assetName+"','"+assetAbstract+"','"+provider+"','"+pubLv+"',to_date('"+createTime+"','yyyy-mm-dd'),null,1) ");
		}
		
		simpleJdbcTemplate.execute(sb.toString());
		simpleJdbcTemplate.execute("commit");
	}
	
	
	/**
	 * 修改信息资产数据
	 * @param assetId 资产id
	 * @param assetName 名称
	 * @param assetAbstract 资产摘要
	 * @param createTime 创建时间
	 */
	@Override
	public void updateAsset(String assetId, String assetName,String assetAbstract,String provider,String pubLv,String createTime) {
		JdbcTemplate  simpleJdbcTemplate = this.createJdbcTemplate();
		
		StringBuffer sb = new StringBuffer();
		if(null==pubLv)
		{
			sb.append(" update asset set crt_dt=to_date('"+createTime+"','yyyy-mm-dd'),asset_name='"+assetName+"',abstract='"+assetAbstract+"',provider='"+provider+"',pub_lv="+pubLv+" where 1=1 and asset_id='"+assetId+"' ");
		}
		else
		{
			sb.append(" update asset set crt_dt=to_date('"+createTime+"','yyyy-mm-dd'),asset_name='"+assetName+"',abstract='"+assetAbstract+"',provider='"+provider+"',pub_lv='"+pubLv+"' where 1=1 and asset_id='"+assetId+"' ");
		}
		
		simpleJdbcTemplate.execute(sb.toString());
		simpleJdbcTemplate.execute("commit");
	}
	
	/**
	 * 查询信息资产数据
	 * @param assetId 资产id
	 */
	@Override
	public List<AssetBean> queryAsset(String assetId) {
		JdbcTemplate  simpleJdbcTemplate = this.createJdbcTemplate();
		List<AssetBean> results = new ArrayList<AssetBean>();
		StringBuffer sb = new StringBuffer();
		if("".equals(assetId))
		{
			sb.append(" select a.asset_id,a.asset_name  from asset a where 1=1  and sm_flag=1 ");
		}
		else
		{
			sb.append(" select a.asset_id,a.asset_name  from asset a where 1=1 and a.asset_id='"+assetId+"' and sm_flag=1 ");
		}
		
		List<Map<String, Object>> list = simpleJdbcTemplate.queryForList(sb.toString());
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				AssetBean bean = new AssetBean();
				
				List<Map<String, Object>> lists = getSevIds(StringUtils.objToString(list.get(i).get("asset_id")));
				List<RouteBean> rbs  = new ArrayList<RouteBean>();
				if(lists.size()>0)
				{
					for (int j = 0; j < lists.size(); j++) {
						RouteBean rb = new RouteBean();
						String resId = (String) lists.get(j).get("res_id");
						String resName = (String) lists.get(j).get("res_nm");
						String resUrl = (String) lists.get(j).get("srv_url");
						rb.setRouteId(resId);
						rb.setRouteName(resName);
						rb.setRouteUrl(resUrl);
						rbs.add(rb);
					}
				}
				bean.setServices(rbs);
				
				bean.setAssetId(StringUtils.objToString(list.get(i).get("asset_id")));
				bean.setAssetName(StringUtils.objToString(list.get(i).get("asset_name")));
				results.add(bean);
			}
		}
		return results;
	}

}

