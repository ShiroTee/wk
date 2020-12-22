package com.digitalchina.ldp.app.dms.service.impl.bean;

/**
 * 
 * 类描述：查询的规则信息
 * 
 * @author: xiaojun
 * @date： 日期：2013-4-9 时间：下午02:26:44
 * @version 1.0
 */
public class QryRuleListInfo implements java.io.Serializable {
	private String TEXT;
	private String VALUE;
	
	public String getTEXT() {
		return TEXT;
	}
	public void setTEXT(String text) {
		TEXT = text;
	}
	public String getVALUE() {
		return VALUE;
	}
	public void setVALUE(String value) {
		VALUE = value;
	}
}
