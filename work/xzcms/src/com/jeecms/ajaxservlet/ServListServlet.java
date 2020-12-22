package com.jeecms.ajaxservlet;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.jeecms.core.entity.UnifiedUser;

/**
 * @author HU
 *
 */
/**
 * @author HU
 * 
 */
public class ServListServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setCharacterEncoding("utf-8");
		String responseData = null;
		// method：表示请求的方法，通过不同的请求参数，调用不同的方法
		String method = req.getParameter("m");
		System.out.println("method=" + method);

		// m=node表示获取树节点。
		if ("node".equals(method)) {
			responseData = this.getNode(req, resp);
			// m=servlist根据叶子节点ID获取节点下的所有服务列表。
		} else if ("servlist".equals(method)) {
			responseData = this.getServList(req, resp);
			// m=info根据服务ID获取该服务的详情。
		} else {
			responseData = "failed";
		}
		System.out.println(responseData);
		resp.getWriter().write(responseData);
	}

	/**
	 * 获取root根节点下的服务列表树
	 * 
	 * @param req
	 * @param resp
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	public String getNode(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String responseData = null;
		// 封装JSON格式空间服务目录
		JSONArray responseJson = new JSONArray();
		// 获取请求接口的域
		String domain = "";
		// 获取请求的节点id，非空间服务
		String unSpaceId = "";
		// 获取请求的节点id，空间服务
		String spaceId = "";
		// 服务调用授权KEY
		String authKey = "";
		// 服务目录下的节点集合
		List<Element> itemList = null;
		// HTTP请求读取二次开发平台服务，返回的XML文档
		Document document = null;
		// 服务目录本地XML配置文件
		Document servDocument = null;

		// 选取本地配置文件中的中的基础信息
		try {
			servDocument = new SAXReader()
					.read(new File(req.getRealPath("WEB-INF")
							+ File.separator + "config" + File.separator + "read-service-config.xml"));
		} catch (DocumentException e2) {
			e2.printStackTrace();
		}
		domain = servDocument.getRootElement().element("domain").getText();
		spaceId = servDocument.getRootElement().element("space-rootid").getText();
		unSpaceId = servDocument.getRootElement().element("unspace-rootid").getText();
		authKey = servDocument.getRootElement().element("authKey").getText();
		//访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		String id = req.getParameter("id");
		String n = req.getParameter("n") ;
		String url = domain
				+ "/app/api/service/sms/smsServiceInterfaceHandler/getCatalogueInfoTreeAll?authKey=" + authKey ;
		url += ("&child=N&timestamp=" + new Date().getTime());
		// 判断id是否为空，如果为空就取根节点id(配置文件里的id),并判断是空间还是非空间服务
		if (StringUtils.isBlank(id)) {
			if(StringUtils.equals("space", n)){
				url = url + "&node=" + spaceId;
			}else{
				url = url + "&node=" + unSpaceId;
			}
		} else {
			url = url + "&node=" + id;
		}
		System.out.println(url);
		HttpGet httpget = new HttpGet(url);
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
//			 HttpClient默认使用ISO-8859-1读取http响应的内容，转化汉字为UTF-8格式。
//			 responseData = new String(responseData.getBytes("ISO-8859-1"),
//			 "utf-8") ;
			document = DocumentHelper.parseText(responseData);
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
			return "{'success':false,'error':'rdp001'}" ;
		} finally {
			httpclient.getConnectionManager().shutdown();
		}

//		 解析返回的XML数据
		Element root = document.getRootElement();
		String success = root.element("success").getText();
		if ("true".equals(success)) { // 判断是否读取成功,如果成功将XML内容解析，重新封装为适合ExtJs使用的JSON数据
			Element item = root.element("item");
			itemList = item.elements();
			for (Element e : itemList) {
				JSONObject member = new JSONObject();
				try {
					member.put("text", e.attributeValue("label"));
					member.put("id", e.attributeValue("id"));
					member.put("pid", e.attributeValue("pid"));
					if ("N".equals(e.attributeValue("leaf"))) {
						member.put("leaf", false);
					} else {
						member.put("leaf", true);
					}
					responseJson.put(member);
				} catch (JSONException e1) {
					e1.printStackTrace();
				}
			}
		}else{
			System.out.println(responseData);
		}
		return responseJson.toString();
		
		//test假数据
//		return "[{id:'6c8426a1-7042-4387-aaf6-6ec69c69fa5b','text':'非空间业务数据服务','addDate':{'@class':'sql-date','$':'2013-02-25'},'status':'true','pid':-1,'leaf':true},{id:'44abe0e6-e76e-491a-b0ef-a31bbc6d7149','text':'公共数据支撑服务','addDate':{'@class':'sql-date','$':'2013-02-25'},'status':'true','pid':-1,'leaf':true},{id:'646a02fb-ec74-45ff-adf1-9011544359cf','text':'其他数据支撑服务','addDate':{'@class':'sql-date','$':'2013-02-25'},'status':'true','pid':-1,'leaf':true},{id:'5f5ecb7c-630d-4b26-9374-167961bd0cba','text':'非空间数据服务','addDate':{'@class':'sql-date','$':'2013-02-25'},'status':'true','pid':-1,'leaf':true}]" ;
	}

	/**
	 * 根据节点ID获取节点下的所有服务列表
	 * 
	 * @param req
	 * @param resp
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	public String getServList(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String responseData = null;
		// 获取请求接口的域
		String domain = "";
		// 服务调用授权KEY
		String authKey = "";
		//接口URL
		StringBuffer url = new StringBuffer() ;
		// 服务目录本地XML配置文件
		Document servDocument = null;

		// 选取本地配置文件中的中的基础信息
		try {
			servDocument = new SAXReader()
					.read(new File(req.getRealPath("WEB-INF")
							+ File.separator + "config" + File.separator + "read-service-config.xml"));
		} catch (DocumentException e2) {
			e2.printStackTrace();
		}
		domain = servDocument.getRootElement().element("domain").getText();
		authKey = servDocument.getRootElement().element("authKey").getText();

		
		// 获取用户登陆信息--zhyg
		UnifiedUser user = (UnifiedUser)req.getSession().getAttribute("rdp_user") ;
		
		//访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		String id = req.getParameter("id");
		String start = req.getParameter("start");
		String limit = req.getParameter("limit");
		url.append(domain) ;
		url.append("/app/api/service/sms/smsServiceInterfaceHandler/getServiceListByCatalogueId?dataType=json&authKey=" + authKey + "&timestamp=") ;
		url.append(new Date().getTime()) ;
		url.append("&catalogId=" + id) ;
		url.append("&start=" + start) ;
		url.append("&limit=" + limit) ;
		//如果用户登陆并且存在RdpUserId，则表示登陆的是RDP平台用户。获取的服务列表有是否被当前用户已申请的标示
		if (user != null && user.getRdpUserId() != null) {
			String userId = user.getRdpUserId() ;
			url.append("&userId=" + userId) ;
			url.append("&status=" + 1) ;		//获取当前登陆用户所有未申请的服务参数值1：所有未申请、0：所有已申请、不传此参数查询出所有服务列表
		}
		HttpGet httpget = new HttpGet(url.toString());
		System.out.println(url.toString());
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
//			responseData = new String(responseData.getBytes("ISO-8859-1"),
//					 "utf-8") ;
		} catch (Exception e) {
			e.printStackTrace();
			return "{'success':false,'error':'rdp002'}" ;
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		
		return responseData.toString();
		
//		responseData = "{'count':0,'list':[{'callCount':'1189','publishDate':'2002-08-26','serviceDesc':'','serviceId':'28b28226-a1c0-4d7f-90c1-a63c0b7e99c8','serviceName':'获取某个目录下服务列表'},{'callCount':'817','publishDate':'2002-08-26','serviceDesc':'','serviceId':'e1ce46e6-d5c3-4ee0-9bbc-32b60c36dcd6','serviceName':'获取服务目录树'},{'callCount':'531','publishDate':'2013-07-29','serviceDesc':'','serviceId':'9911e9e9-a3b4-4b13-ab15-16e22d52af68','serviceName':'获取最热服务列表'},{'callCount':'72','publishDate':'2013-07-31','serviceDesc':'','serviceId':'54c82333-7cf8-41f5-952c-cee676ecd866','serviceName':'用户申请服务'},{'callCount':'0','publishDate':'2002-08-26','serviceDesc':'','serviceId':'bd212f49-da0b-45e1-b284-54080f837750','serviceName':'获取目录树全部'},{'callCount':'122','publishDate':'2002-08-26','serviceDesc':'','serviceId':'356155c1-bba4-4ee4-a848-958012e74be0','serviceName':'获取用户下已申请服务列表'},{'callCount':'0','publishDate':'2002-08-26','serviceDesc':'统计四大库每个表数据量','serviceId':'ad70444b-6f2a-4590-9054-946a3e2cb9b1','serviceName':'基础库数据数据统计'},{'callCount':'528','publishDate':'2013-08-01','serviceDesc':'','serviceId':'0f8fc317-e241-4aff-8fc2-a82f6be36a26','serviceName':'获取最新服务列表'},{'callCount':'220','publishDate':'2002-08-26','serviceDesc':'获取服务详细信息','serviceId':'d8e58f57-fb2a-4b22-9066-94db51fdeec5','serviceName':'获取某个服务的详细信息'}]}";
//		/*返回的格式应该：{success:true,total:88,rows:[{ID:1,Name:"Jhon"},{ID:2,Name:"Brown"},{xxx},{yyy},{zzz}]}*/
//		return responseData;
	}

	/**
	 * 根据服务ID获得具体服务的详细信息
	 * 
	 * @param req
	 * @param resp
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
//	public String getServInfoById(HttpServletRequest req,
//			HttpServletResponse resp) throws ServletException, IOException {
//		String responseData = null;
//		String servId = req.getParameter("id");
//		if ("10".equals(servId)) {
//			responseData = "{id:'10',name:'RKJCCX-人口基础信息查询zhyg1',yycj:'人中查询,查询人口详细信息1。',yhsq:'需要zhyg1',"
//					+ "xtsr:[{name:'method',type:'String',ismust:'Y',desc:'API接口名称'},{name:'session',type:'String',ismust:'N',desc:'TOP分配给用户的SessionKey，通过登陆授权获取。某个API是否需要传入session参数，需参考此API的API用户授权类型'},{name:'timestamp',type:'String',ismust:'Y',desc:'时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2008-01-25 20:23:30。淘宝API服务端允许客户端请求时间误差为10分钟。'},{name:'format',type:'String',ismust:'N',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'app_key',type:'String',ismust:'Y',desc:'TOP分配给应用的AppKey'}],"
//					+ "yysr:[{name:'fields',type:'Field List',ismust:'Y',examval:'nick，sex',defval:'',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'access_token',type:'String',ismust:'N',examval:'map，array',defval:'check',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'v',type:'String',ismust:'Y',examval:'men，var',defval:'male',desc:'API协议版本，可选值:2.0。'}],"
//					+ "fhjg:[{name:'user',type:'User',ismust:'Y',examval:'user1,user2;',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'food',type:'Food',ismust:'Y',examval:'',desc:'某个API是否需要传入session参数，需参考此API的API用户授权类型'}],"
//					+ "fhsl:'<level>017 false false false false 1018 false false false </level>019 false false false <score>020 </br>false false false false 1021 false false false </score>',"
//					+ "sldm:'var root = new Ext.tree.AsyncTreeNode({id : \"root\",text : \"信息资源目录zhyg1\"，expanded : true,draggable : false});'}";
//		} else if ("11".equals(servId)) {
//			responseData = "{id:'11',name:'NNCX002-年龄查询zhyg2',yycj:'人中查询，查询人口详细信息zhyg2。',yhsq:'需要zhyg2',"
//					+ "xtsr:[{name:'method',type:'String',ismust:'Y',desc:'API接口名称'},{name:'session',type:'String',ismust:'N',desc:'TOP分配给用户的SessionKey，通过登陆授权获取。某个API是否需要传入session参数，需参考此API的API用户授权类型'},{name:'timestamp',type:'String',ismust:'Y',desc:'时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2008-01-25 20:23:30。淘宝API服务端允许客户端请求时间误差为10分钟。'},{name:'format',type:'String',ismust:'N',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'app_key',type:'String',ismust:'Y',desc:'TOP分配给应用的AppKey'}],"
//					+ "yysr:[{name:'fields',type:'Field List',ismust:'Y',examval:'nick，sex',defval:'',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'access_token',type:'String',ismust:'N',examval:'map，array',defval:'check',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'v',type:'String',ismust:'Y',examval:'men，var',defval:'male',desc:'API协议版本，可选值:2.0。'}],"
//					+ "fhjg:[{name:'user',type:'User',ismust:'Y',examval:'user1',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'food',type:'Food',ismust:'Y',examval:'',desc:'某个API是否需要传入session参数，需参考此API的API用户授权类型'}],"
//					+ "fhsl:'<level>017 false false false false 1018 false false false </level>019 false false false <score>020 false </br>false false false 1021 false false false </score>',"
//					+ "sldm:'showDetail = function(){var record = resultTable.getSelectionModel().getSelected();</br>if (record.data.length == 0){alert(\"未检测到数据!\");}</br>else{// 显示窗口detailPanel.getForm().loadRecord(record);detailWindow.show().center();}}'}";
//
//		} else if ("12".equals(servId)) {
//			responseData = "{id:'12',name:'RKSXCX1-人口属性查询定位zhyg3',yycj:'人中查询，查询人口详细信息。zhyg3',yhsq:'需要',"
//					+ "xtsr:[{name:'method',type:'String',ismust:'Y',desc:'API接口名称'},{name:'session',type:'String',ismust:'N',desc:'TOP分配给用户的SessionKey，通过登陆授权获取。某个API是否需要传入session参数，需参考此API的API用户授权类型'},{name:'timestamp',type:'String',ismust:'Y',desc:'时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2008-01-25 20:23:30。淘宝API服务端允许客户端请求时间误差为10分钟。'},{name:'format',type:'String',ismust:'N',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'app_key',type:'String',ismust:'Y',desc:'TOP分配给应用的AppKey'}],"
//					+ "yysr:[{name:'fields',type:'Field List',ismust:'Y',examval:'nick，sex',defval:'',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'access_token',type:'String',ismust:'N',examval:'map，array',defval:'check',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'v',type:'String',ismust:'Y',examval:'men，var',defval:'male',desc:'API协议版本，可选值:2.0。'}],"
//					+ "fhjg:[{name:'user',type:'User',ismust:'Y',examval:'user1',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'food',type:'Food',ismust:'Y',examval:'',desc:'某个API是否需要传入session参数，需参考此API的API用户授权类型'}],"
//					+ "fhsl:'<level>017 false false false false 1018 false false false </level>019 false false false <score>020 false false</br> false false 1021 false false false </score>',"
//					+ "sldm:'showDetail = function(){var record = resultTable.getSelectionModel().getSelected();</br>if (record.data.length == 0){alert(\"未检测到数据!\");}</br>else{// 显示窗口detailPanel.getForm().loadRecord(record);detailWindow.show().center();}}'}";
//
//		} else if ("14".equals(servId)) {
//			responseData = "{id:'14',name:'xxxx08-人口详细信息查询',yycj:'人中查询，查询人口详细信息。',yhsq:'需要',"
//					+ "xtsr:[{name:'method',type:'String',ismust:'Y',desc:'API接口名称'},{name:'session',type:'String',ismust:'N',desc:'TOP分配给用户的SessionKey，通过登陆授权获取。某个API是否需要传入session参数，需参考此API的API用户授权类型'},{name:'timestamp',type:'String',ismust:'Y',desc:'时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2008-01-25 20:23:30。淘宝API服务端允许客户端请求时间误差为10分钟。'},{name:'format',type:'String',ismust:'N',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'app_key',type:'String',ismust:'Y',desc:'TOP分配给应用的AppKey'}],"
//					+ "yysr:[{name:'fields',type:'Field List',ismust:'Y',examval:'nick，sex',defval:'',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'access_token',type:'String',ismust:'N',examval:'map，array',defval:'check',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'v',type:'String',ismust:'Y',examval:'men，var',defval:'male',desc:'API协议版本，可选值:2.0。'}],"
//					+ "fhjg:[{name:'user',type:'User',ismust:'Y',examval:'user1',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'food',type:'Food',ismust:'Y',examval:'',desc:'某个API是否需要传入session参数，需参考此API的API用户授权类型'}],"
//					+ "fhsl:'<level>017 false false false false 1018 false false false </level>019 false false false </br><score>020 false false</br> false false 1021 false false false </score>',"
//					+ "sldm:'showDetail = function(){var record = resultTable.getSelectionModel().getSelected();</br>if (record.data.length == 0){alert(\"未检测到数据!\");}</br>else{// 显示窗口detailPanel.getForm().loadRecord(record);detailWindow.show().center();}}'}";
//
//		} else if ("22".equals(servId)) {
//			responseData = "{id:'22',name:'ldrkt45j-流动人口统计zhyg4',yycj:'人中查询，查询人口详细信息zhyg4。',yhsq:'需要zhyg4',"
//					+ "xtsr:[{name:'method',type:'String',ismust:'Y',desc:'API接口名称'},{name:'session',type:'String',ismust:'N',desc:'TOP分配给用户的SessionKey，通过登陆授权获取。某个API是否需要传入session参数，需参考此API的API用户授权类型'},{name:'timestamp',type:'String',ismust:'Y',desc:'时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2008-01-25 20:23:30。淘宝API服务端允许客户端请求时间误差为10分钟。'},{name:'format',type:'String',ismust:'N',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'app_key',type:'String',ismust:'Y',desc:'TOP分配给应用的AppKey'}],"
//					+ "yysr:[{name:'fields',type:'Field List',ismust:'Y',examval:'nick，sex',defval:'',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'access_token',type:'String',ismust:'N',examval:'map，array',defval:'check',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'v',type:'String',ismust:'Y',examval:'men，var',defval:'male',desc:'API协议版本，可选值:2.0。'}],"
//					+ "fhjg:[{name:'user',type:'User',ismust:'Y',examval:'user1',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'food',type:'Food',ismust:'Y',examval:'',desc:'某个API是否需要传入session参数，需参考此API的API用户授权类型'}],"
//					+ "fhsl:'<level>017 false false false false 1018 false false false </level>019 false</br> false false <score>020 fal</br>se false false false 1021 false false false </score>',"
//					+ "sldm:'showDetail = function(){var record = resultTable.getSelectionModel().getSelected();if (record.data.length == 0){alert(\"未检测到数据!\");}</br>else{// 显示窗口detailPanel.getForm().loadRecord(record);detailWindow.show().center();}}'}";
//
//		} else {
//			responseData = "{id:'8888',name:'其它服务',yycj:'人中查询，查询人口详细信息。',yhsq:'需要',"
//					+ "xtsr:[{name:'method',type:'String',ismust:'Y',desc:'API接口名称'},{name:'session',type:'String',ismust:'N',desc:'TOP分配给用户的SessionKey，通过登陆授权获取。某个API是否需要传入session参数，需参考此API的API用户授权类型'},{name:'timestamp',type:'String',ismust:'Y',desc:'时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2008-01-25 20:23:30。淘宝API服务端允许客户端请求时间误差为10分钟。'},{name:'format',type:'String',ismust:'N',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'app_key',type:'String',ismust:'Y',desc:'TOP分配给应用的AppKey'}],"
//					+ "yysr:[{name:'fields',type:'Field List',ismust:'Y',examval:'nick，sex',defval:'',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'access_token',type:'String',ismust:'N',examval:'map，array',defval:'check',desc:'可选，指定响应格式。默认xml，目前支持格式为xml，json'},{name:'v',type:'String',ismust:'Y',examval:'men，var',defval:'male',desc:'API协议版本，可选值:2.0。'}],"
//					+ "fhjg:[{name:'user',type:'User',ismust:'Y',examval:'user1',desc:'只返回user_id，nick，sex，buyer_credit，avatar，has_shop，vip_info参数'},{name:'food',type:'Food',ismust:'Y',examval:'',desc:'某个API是否需要传入session参数，需参考此API的API用户授权类型'}],"
//					+ "fhsl:'<level>017 false false false false 1018 false false false </level>019 false false false <score>020</br> false false false false</br> 1021 false false false </score>',"
//					+ "sldm:'showDetail = function(){var record = resultTable.getSelectionModel().getSelected();if (record.data.length == 0){alert(\"未检测到数据!\");}</br>else{// 显示窗口detailPanel.getForm().loadRecord(record);detailWindow.show().center();}}'}";
//
//		}
//		return responseData;
//	}
	
}
