package com.digitalchina.ldp.app.csdsc.bean;

import java.util.List;
import java.util.Map;

/**
 * @author 陈超
 * 2014-8-29 上午09:58:07
 */
public class MarriageRegisterBean {
	private List<Map<String,Object>> list;
	private Map<String,Object> argMap;
	private String queryLogId;
	public List<Map<String, Object>> getList() {
		return list;
	}
	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}
	public Map<String, Object> getArgMap() {
		return argMap;
	}
	public void setArgMap(Map<String, Object> argMap) {
		this.argMap = argMap;
	}
	public String getQueryLogId() {
		return queryLogId;
	}
	public void setQueryLogId(String queryLogId) {
		this.queryLogId = queryLogId;
	}
	
	

}

