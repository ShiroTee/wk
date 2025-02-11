package com.jeecms.irc.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeecms.common.web.ResponseUtils;
import com.jeecms.rdp.common.RdpUtils;

/**
 * 根据目录树节点ID，读取该节点下所有数据资源服务
 * 
 * @author zhyg
 * 
 */
@Controller
public class GetIRCResClassAct {
	private static final Logger log = LoggerFactory
			.getLogger(GetIRCResClassAct.class);
	@RequestMapping(value = "/irc/getIRCResClass.jspx", method = RequestMethod.POST)
	public String submit(String returnUrl, HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		//错误编码：irc007:
		//获取传入参数
		JSONObject responseData = new JSONObject() ;
		String getTreeURL = "/app/api/service/irc/ircIrcDataDealHandler/jsonCatalog?" ;
		try {
			responseData = new JSONObject(RdpUtils.readRdpInterface(request, getTreeURL, "json")) ;
			ResponseUtils.renderJson(response, responseData.toString()) ;
		} catch (Exception e) {
			//irc003:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response, "{'success':false,'error':'irc007'}") ;
			e.printStackTrace();
		}
		
		//TEST测试，删除
		//String test = "{'content':[{'id':'3ee02fd1fc7c5e07b0a0121fed3cae87','pubtime':'2013-07-02','text':'数字办人口住房信息资源内容发布','mc':'数据表','themename':'房地产','subsum':'0','pubcycle':'2013-07-02 11:15:51执行','type':'1','disabletime':'2013-09-01'},{'id':'3ee02fd1fc7c5e07b0a0121fed3cae87','pubtime':'2013-07-02','text':'数字办人口住房信息资源内容发布','mc':'数据表','themename':'房地产','subsum':'0','pubcycle':'2013-07-02 11:15:51执行','type':'1','disabletime':'2013-09-01'},{'id':'3ee02fd1fc7c5e07b0a0121fed3cae87','pubtime':'2013-07-02','text':'数字办人口住房信息资源内容发布','mc':'数据表','themename':'房地产','subsum':'0','pubcycle':'2013-07-02 11:15:51执行','type':'1','disabletime':'2013-09-01'},{'id':'3ee02fd1fc7c5e07b0a0121fed3cae87','pubtime':'2013-07-02','text':'数字办人口住房信息资源内容发布','mc':'数据表','themename':'房地产','subsum':'0','pubcycle':'2013-07-02 11:15:51执行','type':'1','disabletime':'2013-09-01'},{'id':'3ee02fd1fc7c5e07b0a0121fed3cae87','pubtime':'2013-07-02','text':'数字办人口住房信息资源内容发布','mc':'数据表','themename':'房地产','subsum':'0','pubcycle':'2013-07-02 11:15:51执行','type':'1','disabletime':'2013-09-01'},{'id':'3ee02fd1fc7c5e07b0a0121fed3cae87','pubtime':'2013-07-02','text':'数字办人口住房信息资源内容发布','mc':'数据表','themename':'房地产','subsum':'0','pubcycle':'2013-07-02 11:15:51执行','type':'1','disabletime':'2013-09-01'},{'id':'329a3cabea3c3cbd4a36b4de01a5b923','pubtime':'2013-07-10','text':'人口资源表发布','mc':'数据表','themename':'干部任免','subsum':'0','pubcycle':'2013-07-10 14:17:30执行','type':'1','disabletime':'2013-08-31'},{'id':'41556b13cd0010a87611b3f114a85344','pubtime':'2013-07-03','text':'数字办人口资源发布','mc':'数据表','themename':'文秘、行政','subsum':'0','pubcycle':'2013-07-03 17:20:18执行','type':'1','disabletime':'2013-09-01'},{'id':'15f8604c16121369bac8cee4d2fdce07','pubtime':'2013-07-01','text':'人口资源本地文件发布','mc':'本地文件','themename':'人事工作','subsum':'1','pubcycle':'null','type':'6','disabletime':'2013-08-31'},{'id':'947adcb8813222072645319ad23815b4','pubtime':'2013-06-17','text':'城市建设规划用地表发布','mc':'数据表','themename':'土地资源规划','subsum':'0','pubcycle':'2013-06-17 16:22:15执行','type':'1','disabletime':'2013-08-31'},{'id':'212ec1dc12807217eb54cd45a7acd5a1','pubtime':'2013-06-13','text':'科技局数据库资源表发布','mc':'数据表','themename':'科技管理部门与机构','subsum':'1','pubcycle':'2013-06-13 16:42:54执行','type':'1','disabletime':'2013-08-31'},{'id':'0e6a9d51f41b393e3b379eefb0470fa8','pubtime':'2013-06-06','text':'城市规划用地服务资料ftp发布','mc':'ftp目录','themename':'土地资源规划','subsum':'1','pubcycle':'null','type':'4','disabletime':'2013-08-31'},{'id':'bf922b9ba968f29246e2648966da33b1','pubtime':'2013-06-06','text':'城市规划用地本地文件发布','mc':'本地文件','themename':'土地资源规划','subsum':'1','pubcycle':'null','type':'6','disabletime':'2013-08-31'},{'id':'a96e5a5a0662d47d64e990eb7fa7f40c','pubtime':'2013-05-29','text':'人口发布测试x','mc':'数据表','themename':'林业','subsum':'1','pubcycle':'2013-05-29 15:29:34执行','type':'1','disabletime':'2013-07-01'},{'id':'dec3a80fa02f984613784a1f8a653946','pubtime':'2013-05-28','text':'人口委文件资源发布','mc':'ftp目录','themename':'信息产业','subsum':'0','pubcycle':'null','type':'4','disabletime':'2013-06-28'},{'id':'80c0874897952a881c4bea4f8f6e5311','pubtime':'2013-05-28','text':'文件资源注册发布','mc':'本地文件','themename':'综合政务','subsum':'0','pubcycle':'null','type':'6','disabletime':'2013-06-29'},{'id':'fa63c3c27ce9016983d815a5794e3c73','pubtime':'2013-05-27','text':'人口发布测试1','mc':'数据表','themename':'林业','subsum':'0','pubcycle':'2013-05-27 10:00:55执行','type':'1','disabletime':'2013-07-01'},{'id':'f0b9471297c68eaf6c0f14ec3040cc11','pubtime':'2013-05-28','text':'人口发布测试','mc':'数据表','themename':'林业','subsum':'0','pubcycle':'2013-05-28 16:56:50执行','type':'1','disabletime':'2013-07-01'},{'id':'28bf4120f062024183b6079e35ac562e','pubtime':'2013-05-23','text':'人口委基础信息表','mc':'数据表','themename':'农业设施建设','subsum':'1','pubcycle':'2013-05-23 17:29:58执行','type':'1','disabletime':'2013-05-31'},{'id':'92467f187f777f86042987b8a7fe47d5','pubtime':'2013-05-23','text':'人口委','mc':'数据表','themename':'农业、水利','subsum':'0','pubcycle':'2013-05-23 19:30:16执行','type':'1','disabletime':'2013-06-01'}],'totalnum':'20'}" ;
		//ResponseUtils.renderJson(response, test) ;
		return null;
	}
}
