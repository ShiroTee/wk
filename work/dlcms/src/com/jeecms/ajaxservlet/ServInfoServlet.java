package com.jeecms.ajaxservlet;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;

/**
 * @author HU
 *
 */
public class ServInfoServlet extends HttpServlet {

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
		responseData = this.getServInfoById(req, resp) ;
		System.out.println(responseData);
		resp.getWriter().write(responseData);
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
	public String getServInfoById(HttpServletRequest req,
			HttpServletResponse resp) throws ServletException, IOException {
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
		
		//访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		String servId = req.getParameter("id");
		
		url.append(domain);
		url.append("/app/api/service/sms/smsServiceInterfaceHandler/getDetailServiceInfoById?authKey=" + authKey + "&dataType=json") ;
		url.append("&serviceId=" + servId);
		url.append("&timestamp=" + new Date().getTime()) ;

		System.out.println(url.toString());
		HttpGet httpget = new HttpGet(url.toString());
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
//			responseData = new String(responseData.getBytes("ISO-8859-1"),
//					 "utf-8") ;
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} finally {
			httpclient.getConnectionManager().shutdown();
		}

		//"\n"必须为"</br>"; "<"换成：“&lt;”     ">"：换成"&gt;"    
//		responseData = "{'data':{'qingqiu':'请求参数','appCode':'sms','catalogueId':'81e965a6-951f-47c5-8b6b-647730d407db','id':'17ec5851-2ed5-4a2b-9aaa-2766d26e8ace','name':'影像地图','protocal':'http','serviceCatalogueInfoBean':{'addDate':1363824000000,'id':'81e965a6-951f-47c5-8b6b-647730d407db','leaf':'Y','name':'WMTS服务','pid':'9857ec84-f98d-4ab5-9b1a-bf67958e67f4','status':'Y'},'serviceProvider':'超图','serviceType':'gis','status':'Y','url':'services/ogc/wmts/1170','xmlParameter':'&lt;map&gt;</br>  &lt;entry&gt;</br>    &lt;string&gt;bounds&lt;/string&gt;</br>    &lt;string&gt;408189.8888,477780.390625,664896.28125,681598.890625&lt;/string&gt;</br>  &lt;/entry&gt;</br>  &lt;entry&gt;</br>    &lt;string&gt;sid&lt;/string&gt;</br>    &lt;string&gt;&lt;/string&gt;</br>  &lt;/entry&gt;</br>  &lt;entry&gt;</br>    &lt;string&gt;host&lt;/string&gt;</br>    &lt;string&gt;http://10.6.10.55:8090&lt;/string&gt;</br>  &lt;/entry&gt;</br>  &lt;entry&gt;</br>    &lt;string&gt;interfaceType&lt;/string&gt;</br>    &lt;string&gt;WMTS&lt;/string&gt;</br>  &lt;/entry&gt;</br>  &lt;entry&gt;</br>    &lt;string&gt;name&lt;/string&gt;</br>    &lt;string&gt;YingXiangDiTu&lt;/string&gt;</br>  &lt;/entry&gt;</br>&lt;/map&gt;','success':true}}";
		// 返回的JSON数据
		return responseData;
		
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
	}
}
