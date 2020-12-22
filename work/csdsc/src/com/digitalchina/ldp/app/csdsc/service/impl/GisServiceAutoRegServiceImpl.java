package com.digitalchina.ldp.app.csdsc.service.impl;


import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.digitalchina.ldp.app.csdsc.bean.AssetBean;
import com.digitalchina.ldp.app.csdsc.comm.HttpClientUtils;
import com.digitalchina.ldp.app.csdsc.dao.GisServiceAutoRegDao;
import com.digitalchina.ldp.app.csdsc.service.GisServiceAutoRegService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;

/**
 * 地图服务自动注册接口
 * @author MagicChu
 *
 */
@Service
public class GisServiceAutoRegServiceImpl implements	GisServiceAutoRegService {
	
	@Autowired
	private GisServiceAutoRegDao gisServiceAutoRegDao;
	
	
	/**
	 * 地图服务自动注册接口
	 * 
	 * @param model
	 * @return
	 */
	public void registerGisServiceAutoReg(Model model) {
		String flag = model.getValueNotEmpty("flag");
		if("1".equals(flag))sGisServiceAutoReg(model);
		else if("2".equals(flag))uGisServiceAutoReg(model);
		else if("3".equals(flag))dGisServiceAutoReg(model);
		else throw new ServiceException("参数flag不正确！");
	}
	
	//查询
	public List<AssetBean> qGisServiceAutoReg(Model model) {
		
		//参数区域
		String assetId = model.getValue("assetId");
		//查询一条或者多条信息资产数据
		return gisServiceAutoRegDao.queryAsset(assetId);
	}

	
	
	//新增
	public void sGisServiceAutoReg(Model model) {
		
		//参数区域
		
		//资源图层id
		String assetId = model.getValueNotEmpty("assetId");
		//资源图层名称
		String assetName = model.getValueNotEmpty("assetName");
		//共享级别
		String pubLv = model.getValue("pubLv");
		if("".equals(pubLv)||" ".equals(pubLv)||"null".equals(pubLv)||null==pubLv)pubLv = null;
		//摘要
		String assetAbstract = model.getValue("abstract");
		if("".equals(assetAbstract)||" ".equals(assetAbstract)||"null".equals(assetAbstract)||null==assetAbstract)assetAbstract = "";
		//资源图层提供部门
		String provider = model.getValueNotEmpty("provider");
		//资源图层信息（云联资源图层信息对象）
		String resourceInfo = model.getRequest().getParameter("resourceInfo");
		if("".equals(resourceInfo)||resourceInfo==null)throw new ServiceException("资源图层信息参数resourceInfo必填！");
		JSONObject resourceInfoJson = JSONObject.parseObject(resourceInfo);
		//创建时间
		String str = String.valueOf(resourceInfoJson.get("CreateTime")).substring(6,8);
		if("00".equals(str))str = "01";
		String createTime = String.valueOf(resourceInfoJson.get("CreateTime")).substring(0,6)+str;
		//资源图层下的服务列表
		String serviceArg =model.getRequest().getParameter("serviceArg");
		if("".equals(serviceArg)||serviceArg==null)throw new ServiceException("服务列表参数serviceArg必填！");
		
		try{
			JSONObject IRCServerList = JSONObject.parseObject(serviceArg);
			JSONArray ja = IRCServerList.getJSONArray("services");
			int counts = ja.size();
			
			//插入信息资产数据
			gisServiceAutoRegDao.insertAsset(assetId,assetName,assetAbstract, provider,pubLv,createTime);
			
			for (int i = 0; i < counts; i++) {
				JSONObject jo = ja.getJSONObject(i);
				String rtn = sGisService(model, assetId, jo.getString("routeId"),jo.getString("routeName"), jo.getString("routeUrl"));
				//当任意一个地图服务没新增成功就不能新增此资产目录
				if(!rtn.contains("true"))
				{
					dGisServiceAutoReg(model);
					throw new ServiceException("服务新增失败！");
				}
			}
			
		}catch (ClassCastException e) {
			throw new ServiceException("服务列表参数serviceArg格式不正确！");
		}
		
	}
	
	
	//修改
	public void uGisServiceAutoReg(Model model) {
		
		//参数区域
		
		//资源图层id
		String assetId = model.getValueNotEmpty("assetId");
		//资源图层名称
		String assetName = model.getValueNotEmpty("assetName");
		//共享级别
		String pubLv = model.getValue("pubLv");
		if("".equals(pubLv)||" ".equals(pubLv)||"null".equals(pubLv)||null==pubLv)pubLv = null;
		//摘要
		String assetAbstract = model.getValue("abstract");
		if("".equals(assetAbstract)||" ".equals(assetAbstract)||"null".equals(assetAbstract)||null==assetAbstract)assetAbstract = "";
		//资源图层提供部门
		String provider = model.getValueNotEmpty("provider");
		//资源图层信息（云联资源图层信息对象）
		String resourceInfo = model.getRequest().getParameter("resourceInfo");
		if("".equals(resourceInfo)||resourceInfo==null)throw new ServiceException("资源图层信息参数resourceInfo必填！");
		JSONObject resourceInfoJson = JSONObject.parseObject(resourceInfo);
		//创建时间
		String str = String.valueOf(resourceInfoJson.get("CreateTime")).substring(6,8);
		if("00".equals(str))str = "01";
		String createTime = String.valueOf(resourceInfoJson.get("CreateTime")).substring(0,6)+str;
		//资源图层下的服务列表
		String serviceArg =model.getRequest().getParameter("serviceArg");
		if("".equals(serviceArg)||serviceArg==null)throw new ServiceException("服务列表参数serviceArg必填！");
		
		try{
			JSONObject IRCServerList = JSONObject.parseObject(serviceArg);
			JSONArray ja = IRCServerList.getJSONArray("services");
			int counts = ja.size();
			
			for (int i = 0; i < counts; i++) {
				JSONObject jo = ja.getJSONObject(i);
				String rtn = uGisService(model, assetId, jo.getString("routeId"),jo.getString("routeName"), jo.getString("routeUrl"),provider);
				//当任意一个地图服务没修改成功就不能修改此资产目录
				if(!rtn.contains("true"))
				{
					throw new ServiceException("服务修改失败！");
				}
			}
			
			//修改服务没有异常，修改信息资产数据
			gisServiceAutoRegDao.updateAsset(assetId,assetName,assetAbstract,provider,pubLv,createTime);
			
		}catch (ClassCastException e) {
			throw new ServiceException("服务列表参数serviceArg格式不正确！");
		}
		
	}
	
	//删除
	public void dGisServiceAutoReg(Model model) {
		
		//参数区域
		String assetId = model.getValueNotEmpty("assetId");
		
		boolean deleteFlag = gisServiceAutoRegDao.getAssetIdFlag(assetId);
		
		if(deleteFlag)
		{
			//通过信息资产获取所有地图服务id
			List<Map<String, Object>> list = gisServiceAutoRegDao.getSevIds(assetId);
			
			if(list.size()>0)
			{
				for (int i = 0; i < list.size(); i++) {
					String resId = (String) list.get(i).get("res_id");
					String rtn = dGisService(model, resId);
					//当任意一个地图服务没删除成功就不能删除此资产目录
					if(!rtn.contains("true"))throw new ServiceException("相关服务还未停止，不能删除，请先确认服务已停止！");
				}
				
				//删除信息资产
				gisServiceAutoRegDao.deleteAsset(assetId);
			}
			else
			{
				//删除信息资产
				gisServiceAutoRegDao.deleteAsset(assetId);
			}
		}
		else
		{
			throw new ServiceException("相关资源目录被授权或正在申请，暂时不能删除！");
		}
		
	}
	
	//新增地图服务数据
	public String sGisService(Model model,String assetId,String routeId,String routeName,String routeUrl) {
		try {
			//插入地图服务数据
			String getDataURL = "/service/api/sps/serviceInfoHandler/registerRouteInfo?1=1";
			getDataURL += "&routeId="+routeId ;
			getDataURL += "&routeName=" + URLEncoder.encode(routeName,"utf-8") ;
			getDataURL += "&prxoyURL=" + URLEncoder.encode(routeUrl,"utf-8") ;
			getDataURL += "&publishURL=gisService"+ (int)(Math.random()*1000000000) ;
			getDataURL += "&writeLog=" + 1 ;
			getDataURL += "&serviceType=" + 0 ;
			getDataURL += "&routeType=http" ;
			getDataURL += "&isAuth=" + 1 ;
			getDataURL += "&matchOnUriPrefix=" + 1 ;
			getDataURL += "&resourceId=" + assetId ;
			return HttpClientUtils.readRdpInterface(model.getRequest(), getDataURL, "json");
		} catch (IOException e) {
			throw new ServiceException("调用失败！");
		}
		
	}
	
	
	//修改地图服务数据
	public String uGisService(Model model,String assetId,String routeId,String routeName,String routeUrl,String provider) {
		try {
			//修改地图服务数据
			String getDataURL = "/service/api/sps/serviceInfoHandler/editServiceInfo?1=1";
			getDataURL += "&routeId="+routeId ;
			getDataURL += "&orgId="+provider ;
			getDataURL += "&routeName=" + URLEncoder.encode(routeName,"utf-8") ;
			getDataURL += "&prxoyURL=" + URLEncoder.encode(routeUrl,"utf-8") ;
			getDataURL += "&writeLog=" + 1 ;
			getDataURL += "&isAuth=" + 1 ;
			getDataURL += "&routeStatus=" + 1 ;
			return HttpClientUtils.readRdpInterface(model.getRequest(), getDataURL, "json");
		} catch (IOException e) {
			throw new ServiceException("调用失败！");
		}
		
	}
	
	//删除地图服务
	public String  dGisService(Model model,String resId) {
		try {
			
			int ret = gisServiceAutoRegDao.deleteServiceAndAssetRelation(resId);
			if(ret!=0)
			{
				//插入地图服务数据
				String getDataURL = "/service/api/sps/serviceInfoHandler/deleteRoute?1=1";
				getDataURL += "&routeId=" + resId ;
				return HttpClientUtils.readRdpInterface(model.getRequest(), getDataURL, "json");
			}
			else
			{
				throw new ServiceException("服务与资源目录挂接关系删除失败！");
			}
			
		} catch (IOException e) {
			throw new ServiceException("调用失败！");
		}
		
	}

}

