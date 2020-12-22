package com.jeecms.rdp.common;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * 树组织工具类
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-8-19
 */
public class TreeUtil {

	/*
	 public static void main(String[] args) {
			
	 JSONObject jo = new
	 JSONObject("{'TopicCode':'B','TopicName':'基础专题数据','CanSearch':false,'TopicDescription':'','TopicItems':[{'TopicCode':'B01','TopicName':'基础地名','CanSearch':true,'TopicDescription':'地名数据','TopicItems':null,'ResourceItems':null}],'ResourceItems':null}")
	 ;
			
	 JSONObject jo2 = new
	 JSONObject("{'TopicCode':'B','TopicName':'基础专题数据','CanSearch':false,'TopicDescription':'','TopicItems':null,'ResourceItems':null}") ;
			
	 String str =
	 "{'TopicCode':'B','TopicName':'基础专题数据','CanSearch':false,'TopicDescription':'','TopicItems':[{'TopicCode':'B01','TopicName':'基础地名','CanSearch':true,'TopicDescription':'地名数据','TopicItems':null,'ResourceItems':null}],'ResourceItems':null}";
			
	 List<TreeBean> csls = new ArrayList<TreeBean>();
	 getTreeBean(str, "",csls);
			
			
			
	 JSONArray ja = new JSONArray(csls);
	 System.out.println(ja.toString());
			
	 }
	 */

	// 递归得到treebean
	public static void getTreeBean(String json, String pid, List<TreeBean> csl) {

		TreeBean cb = null;
		JSONObject jo = null;
		if (json.startsWith("{")) {
			jo = new JSONObject(json);
		}

		// 当前对象下面没有子集
		if ("null".equals(jo.get("TopicItems").toString())) {
			cb = new TreeBean();
			cb.setId(jo.get("TopicCode").toString());
			cb.setName(jo.get("TopicName").toString());
			cb.setParentId(pid);
			csl.add(cb);

		} else {
			cb = new TreeBean();
			cb.setId(jo.get("TopicCode").toString());
			cb.setName(jo.get("TopicName").toString());
			cb.setParentId(pid);
			csl.add(cb);

			json = jo.get("TopicItems").toString();
			JSONArray ja = new JSONArray(json);
			for (int i = 0; i < ja.length(); i++) {
				JSONObject jo2 = ja.getJSONObject(i);
				getTreeBean(jo2.toString(), jo.get("TopicCode").toString(), csl);
			}

		}

	}

}
