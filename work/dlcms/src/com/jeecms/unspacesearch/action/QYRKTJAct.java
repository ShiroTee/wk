package com.jeecms.unspacesearch.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeecms.common.web.ResponseUtils;
import com.jeecms.rdp.common.RdpUtils;

@Controller
public class QYRKTJAct {
	/* 
	 * 获取行政区划列表
	 */
	@RequestMapping(value = "/ldsinter/getxzqhlb.jspx", method = RequestMethod.POST)
	public String input(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();

		String level = request.getParameter("level");
		String orgId = request.getParameter("orgId");
		String qyrktjURL = "/app/api/service/comboBoxHandler/getTreeData?level="
				+ level;
		qyrktjURL += "&orgId=" + orgId;
		// System.out.println(qyrktjURL);
		try {
			// 访问人口系统接口读取数据转成JSON
			qyrktjJSON = new JSONObject(RdpUtils.readRdpInterface(request,
					qyrktjURL, "json"));
			ResponseUtils.renderJson(response, qyrktjJSON.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds001'}");
		}
		// System.out.print(qyrktjURL);
		return null;
	}

	/*
	 * 
	 * 获取证件类型列表
	 */
	@RequestMapping(value = "/ldsinter/getzjlxlb.jspx", method = RequestMethod.POST)
	public String findZjlx(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();
		String zjlx = request.getParameter("zjlx");
		String zjlxjURL = "/app/api/service/comboBoxHandler/getData?typeValue="
				+ zjlx;
		try {
			// 访问人口系统接口读取数据转成JSON
			qyrktjJSON = new JSONObject(RdpUtils.readRdpInterface(request,
					zjlxjURL, "json"));
			ResponseUtils.renderJson(response, qyrktjJSON.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds002'}");
		}
		return null;
	}

	/*
	 * 
	 * 获取性别列表
	 */
	@RequestMapping(value = "/ldsinter/getxblb.jspx", method = RequestMethod.POST)
	public String findXB(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();
		String sex = request.getParameter("sex");
		String xbURL = "/app/api/service/comboBoxHandler/getData?typeValue="
				+ sex;
		try {
			// 访问人口系统接口读取数据转成JSON
			qyrktjJSON = new JSONObject(RdpUtils.readRdpInterface(request,
					xbURL, "json"));
			ResponseUtils.renderJson(response, qyrktjJSON.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds003'}");
		}
		return null;
	}

	/*
	 * 获取全员人口统计
	 */
	@RequestMapping(value = "/ldsinter/getfindQYRKTJ.jspx", method = RequestMethod.POST)
	public String findQYRKTJ(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();
		try {
			String xzqhlevel = request.getParameter("xzqh");
			String xzqh = xzqhlevel.substring(0, 15);
			String level = xzqhlevel.substring(16, 17);
			String sex = request.getParameter("sex");
			String tjnf = request.getParameter("tjnf");
			if (xzqhlevel != null && tjnf != null) {
				String xzqhjURL = "/app/api/service/ldsLzCmsHandler/getAllPepCountsInfo?level="
						+ level;
				xzqhjURL += "&xzqh=" + xzqh;
				if (sex != null) {
					xzqhjURL += "&sex=" + sex;
				}
				xzqhjURL += "&todate=" + tjnf;
				// 访问人口系统接口读取数据转成JSON
				qyrktjJSON = new JSONObject(RdpUtils.readRdpInterface(request,
						xzqhjURL, "json"));
				ResponseUtils.renderJson(response, qyrktjJSON.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds004'}");
		}
		return null;
	}

	/*
	 * 获取人口基础信息
	 */
	@RequestMapping(value = "/ldsinter/getfindRKJCXX.jspx", method = RequestMethod.POST)
	public String findRKJCXX(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();
		String xms = request.getParameter("xm");
		String zjlxs = request.getParameter("zjlx");
		String zjmhs = request.getParameter("zjhm");
		String xzqhjURL = "/app/api/service/ldsLzCmsHandler/qryRkInfo";
		try {
			// 访问人口系统接口读取数据转成JSON
			Map<String, String> paraMap = new HashMap<String, String>();
			if (xms != null) {
				paraMap.put("xm", xms);
			}
			if (zjlxs != null) {
				paraMap.put("zjlx", zjlxs);
			}
			if (zjmhs != null) {
				paraMap.put("zjhm", zjmhs);
			}
			qyrktjJSON = new JSONObject(RdpUtils.readRdpInterfacePost(request,
					xzqhjURL, "json", paraMap));
			ResponseUtils.renderJson(response, qyrktjJSON.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds005'}");
		}
		System.out.println(xzqhjURL);
		return null;
	}

	/*
	 * 获取法人信息
	 */
	@RequestMapping(value = "/ldsinter/getfindFRXX.jspx", method = RequestMethod.POST)
	public String findFRXX(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();
		String jgmcs = request.getParameter("jgmc");
		String jgdms = request.getParameter("jgdm");
		String xzqhjURL = "/app/api/service/ldsLzCmsHandler/qryFrInfo";
		try {
			// 访问人口系统接口读取数据转成JSON
			Map<String, String> paraMap = new HashMap<String, String>();
			if (jgmcs != null) {
				paraMap.put("jgmc", jgmcs);
			}
			if (jgdms != null) {
				paraMap.put("jgdm", jgdms);
			}
			qyrktjJSON = new JSONObject(RdpUtils.readRdpInterfacePost(request,
					xzqhjURL, "json", paraMap));
			ResponseUtils.renderJson(response, qyrktjJSON.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds006'}");
		}
		// System.out.println(xzqhjURL);
		return null;
	}

	/*
	 * 获取宏观经济信息
	 */
	@RequestMapping(value = "/ldsinter/getfindHGJJ.jspx", method = RequestMethod.POST)
	public String findHGJJ(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) {
		JSONObject qyrktjJSON = new JSONObject();
		String hgjjnf = request.getParameter("hgjjnf");
		String xzqhjURL = "/app/api/service/ldsLzCmsHandler/qryHgjjInfo";
		try {
			// 访问人口系统接口读取数据转成JSON
			Map<String, String> paraMap = new HashMap<String, String>();
			if (hgjjnf != null) {
				paraMap.put("nf", hgjjnf);
			}
			qyrktjJSON = new JSONObject(RdpUtils.readRdpInterfacePost(request,
					xzqhjURL, "json", paraMap));
			ResponseUtils.renderJson(response, qyrktjJSON.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// lds001:根据树节点ID从IRC平台获取资源服务列表失败;
			ResponseUtils.renderJson(response,
					"{'success':false,'error':'lds007'}");
		}
		// System.out.println(xzqhjURL);
		return null;
	}

}
