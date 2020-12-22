package com.jeecms.integralManager.action;

import static com.jeecms.cms.Constants.TPLDIR_CHANNEL;
import static com.jeecms.core.action.front.LoginAct.PROCESS_URL;
import static com.jeecms.core.action.front.LoginAct.RETURN_URL;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeecms.cms.entity.main.CmsSite;
import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.web.CmsUtils;
import com.jeecms.cms.web.FrontUtils;
import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.web.RequestUtils;
import com.jeecms.common.web.ResponseUtils;
import com.jeecms.integralManager.service.impl.IntegralManagerServiceImpl;
import com.jeecms.rdp.common.RdpUtils;
import com.jeecms.rdp.common.TreeBean;
import com.jeecms.rdp.common.TreeUtil;


/**
 * 积分管理-发布通知公告
 * @author MagicChu
 *
 */
@Controller
public class IntegralManagerAct {
	
	@Autowired
	private IntegralManagerServiceImpl integralManagerServiceImpl;

	private static final Logger log = LoggerFactory.getLogger(IntegralManagerAct.class);
	
	public static final String STATUS = "tpl.loginStatus";
	public static final String INPUT_ = "tpl.alertlogininput";
	
	
	/**
	 * 将积分统计数据发布到通知公告，通过接口获取数据
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/publishIntegral", method = {RequestMethod.GET,RequestMethod.POST})
	public String publishIntegralToNotice(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		try {
			//起止日期参数，组织接口地址
			String startDate=request.getParameter("startDate");
			String endDate=request.getParameter("endDate");
			String getDataURL = PropertiesUtil.getValueBykey("platformAdd2")+"/service/api/csdsc/integralManagerDetailHandler/getWbjIntegralDataTable?1=1" ;
			getDataURL += "&startDate=" + startDate ;
			getDataURL += "&endDate=" + endDate ;
			
			//获取table的json数据
			JSONObject IRCServerList = new JSONObject(RdpUtils.readRdpInterface(request, getDataURL, "json")) ;
			String rtnTable = IRCServerList.get("data").toString();
			integralManagerServiceImpl.publishIntegralToNotice(rtnTable,startDate,endDate);
			ResponseUtils.renderJson(response, "{'success':true}") ;
			
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//发布到通知公告失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//发布到通知公告失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//发布到通知公告失败
			ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		return null;
	}
	
	//得到空间地理资源目录树数据
	@RequestMapping(value = "/getGisTree.jspx", method = {RequestMethod.GET,RequestMethod.POST})
	public String submitGis(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		try {
			String getDataURL = PropertiesUtil.getValueBykey("gisDomain")+"/LiquidGIS/Catalog.gis?REQUEST=GetTopic&FORMAT=json" ;
			
			JSONObject IRCServerList = new JSONObject(RdpUtils.readGisInterface(request, getDataURL, "json")) ;
			String trnStr = IRCServerList.toString();
			
			List<TreeBean> csls = new ArrayList<TreeBean>();
			TreeUtil.getTreeBean(trnStr, "", csls);
			JSONArray ja = new JSONArray(csls);
			if(ja.length()>0)ja.remove(0);
			String rtn = ja.toString().replace("'", "\"");
			//System.out.println(rtn);
			ResponseUtils.renderJson(response, rtn);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		return null;
	}
	
	//点击空间地理资源目录树的某个节点查询下面资源目录数据
	@RequestMapping(value = "/getResourseForTree.jspx", method = {RequestMethod.GET,RequestMethod.POST})
	public String submitGisTree(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		try {
			String wheresql = "";
			String sql1 = "";
			String orderbysql = "";
			
			//树id
			String topicCode=request.getParameter("topicCode");
			sql1 = " AND TOPICCODE LIKE '"+topicCode+"%'";
			orderbysql = " ORDER BY PUBLISHTIME DESC";
			
			wheresql = "1=1"+sql1 +orderbysql;
			wheresql = URLEncoder.encode(wheresql,"utf-8");
			wheresql = wheresql.replace("+", "%20");
			String getDataURL = PropertiesUtil.getValueBykey("gisDomain")+"/LiquidGIS/Catalog.gis?REQUEST=GetUserResourcesByWhereInfo&PARAMETERS="+wheresql+"&FORMAT=json" ;
			JSONArray IRCServerList = new JSONArray(RdpUtils.readGisInterface(request, getDataURL, "json")) ;
			
			String getAssetInfoURL = PropertiesUtil.getValueBykey("platformAdd")+"/service/api/sps/resourceCatalogueInfoHandler/getResourceDetail?start=0&limit=100" ;
			int counts = IRCServerList.length();
			JSONArray assetArr = new JSONArray();
			String getAssetInfoURLNew;
			for (int i = 0; i < counts; i++) {
				JSONObject jo = IRCServerList.getJSONObject(i);
				int resourceId = jo.getInt("ResourceID");
				String resourceIdNew = String.valueOf(resourceId);
				getAssetInfoURLNew = getAssetInfoURL+"&resourceId="+resourceIdNew ;
				String str = RdpUtils.readRdpInterface(request, getAssetInfoURLNew, "json");
				if(!str.contains("false"))
				{
					JSONArray ret = new JSONArray(str);
					JSONObject jso = ret.getJSONObject(0);
					boolean bloo = jso.isNull("status");
					if(bloo)continue;
					assetArr.put(ret.get(0));
				}
				getAssetInfoURLNew = getAssetInfoURL;
			}
			
			
			String trnStr = assetArr.toString();
			//String trnStr = IRCServerList.toString();
			
//			List<TreeBean> csls = new ArrayList<TreeBean>();
//			TreeUtil.getTreeBean(trnStr, "", csls);
//			JSONArray ja = new JSONArray(csls);
//			if(ja.length()>0)ja.remove(0);
//			String rtn = ja.toString().replace("'", "\"");
			//System.out.println(trnStr);
			ResponseUtils.renderJson(response, trnStr);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		return null;
		
		/**
		
		
		try {
			String topicCode=request.getParameter("topicCode");
			String getDataURL = PropertiesUtil.getValueBykey("gisDomain")+"/LiquidGIS/Catalog.gis?REQUEST=GetUserResourcesByTopicCode&PARAMETERS="+topicCode+"&FORMAT=json" ;
			
			JSONArray IRCServerList = new JSONArray(RdpUtils.readGisInterface(request, getDataURL, "json")) ;
			String trnStr = IRCServerList.toString();
			
//			List<TreeBean> csls = new ArrayList<TreeBean>();
//			TreeUtil.getTreeBean(trnStr, "", csls);
//			JSONArray ja = new JSONArray(csls);
//			if(ja.length()>0)ja.remove(0);
//			String rtn = ja.toString().replace("'", "\"");
			System.out.println(trnStr);
			ResponseUtils.renderJson(response, trnStr);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		return null;
		
		
		**/
	}
	
	
	//通过条件搜索资源目录数据
	@RequestMapping(value = "/getResourseForQry.jspx", method = {RequestMethod.GET,RequestMethod.POST})
	public String submitResourseForQry(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		try {
			String wheresql = "";
			String sql2 = "";
			String orderbysql = "";
			
			String resourcetitle=request.getParameter("zymc");
			//不为空时模糊查询，为空时查询所有
			if(!"".equals(resourcetitle))
			{
				sql2 = " AND RESOURCETITLE LIKE '%"+resourcetitle+"%'";
			}
			
			orderbysql = " ORDER BY PUBLISHTIME DESC";
			
			wheresql = "1=1" + sql2+orderbysql;
			wheresql = URLEncoder.encode(wheresql,"utf-8");
			wheresql = wheresql.replace("+", "%20");
			String getDataURL = PropertiesUtil.getValueBykey("gisDomain")+"/LiquidGIS/Catalog.gis?REQUEST=GetUserResourcesByWhereInfo&PARAMETERS="+wheresql+"&FORMAT=json" ;
			JSONArray IRCServerList = new JSONArray(RdpUtils.readGisInterface(request, getDataURL, "json")) ;
			
			String getAssetInfoURL = PropertiesUtil.getValueBykey("platformAdd")+"/service/api/sps/resourceCatalogueInfoHandler/getResourceDetail?start=0&limit=100" ;
			int counts = IRCServerList.length();
			JSONArray assetArr = new JSONArray();
			String getAssetInfoURLNew;
			for (int i = 0; i < counts; i++) {
				JSONObject jo = IRCServerList.getJSONObject(i);
				int resourceId = jo.getInt("ResourceID");
				String resourceIdNew = String.valueOf(resourceId);
				getAssetInfoURLNew = getAssetInfoURL+"&resourceId="+resourceIdNew ;
				String str = RdpUtils.readRdpInterface(request, getAssetInfoURLNew, "json");
				if(!str.contains("false"))
				{
					JSONArray ret = new JSONArray(str);
					JSONObject jso = ret.getJSONObject(0);
					boolean bloo = jso.isNull("status");
					if(bloo)continue;
					assetArr.put(ret.get(0));
				}
				getAssetInfoURLNew = getAssetInfoURL;
			}
			
			
			String trnStr = assetArr.toString();
			//String trnStr = IRCServerList.toString();
			
//			List<TreeBean> csls = new ArrayList<TreeBean>();
//			TreeUtil.getTreeBean(trnStr, "", csls);
//			JSONArray ja = new JSONArray(csls);
//			if(ja.length()>0)ja.remove(0);
//			String rtn = ja.toString().replace("'", "\"");
			//System.out.println(trnStr);
			ResponseUtils.renderJson(response, trnStr);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		return null;
	}
	
	
	
	
	//资源详情
	@RequestMapping(value = "/getResourseInfo.jspx", method = {RequestMethod.GET,RequestMethod.POST})
	public String submitResourseInfo(HttpServletRequest request,
			HttpServletResponse response, ModelMap model)
	{
		CmsUser user = CmsUtils.getUser(request);
		CmsSite site = CmsUtils.getSite(request);
		String sol = site.getSolutionPath();
		String processUrl = RequestUtils.getQueryParam(request, PROCESS_URL);
		String returnUrl = RequestUtils.getQueryParam(request, RETURN_URL);
		//String message = RequestUtils.getQueryParam(request, MESSAGE);
		//Channel cl=new Channel();
		FrontUtils.frontData(request, model, site);
		
		try {
			String resourceId=request.getParameter("resourceId");
			String wheresql = "RESOURCEID="+resourceId;
			
			wheresql = URLEncoder.encode(wheresql,"utf-8");
			wheresql = wheresql.replace("+", "%20");
			String getDataURL = PropertiesUtil.getValueBykey("gisDomain")+"/LiquidGIS/Catalog.gis?REQUEST=GetUserResourcesByWhereInfo&PARAMETERS="+wheresql+"&FORMAT=json" ;
			JSONArray IRCServerList = new JSONArray(RdpUtils.readGisInterface(request, getDataURL, "json")) ;
			String trnStr = IRCServerList.toString();
			
//			List<TreeBean> csls = new ArrayList<TreeBean>();
//			TreeUtil.getTreeBean(trnStr, "", csls);
//			JSONArray ja = new JSONArray(csls);
//			if(ja.length()>0)ja.remove(0);
//			String rtn = ja.toString().replace("'", "\"");
			//System.out.println(trnStr);
			ResponseUtils.renderJson(response, trnStr);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//ResponseUtils.renderJson(response, "{'success':false}") ;
		}
		return null;
	}
	
}
