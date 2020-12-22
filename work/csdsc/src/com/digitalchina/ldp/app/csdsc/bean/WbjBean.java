package com.digitalchina.ldp.app.csdsc.bean;

import java.util.List;
import java.util.Map;

/**
 * @author 陈超
 * 2014-9-9 上午11:06:55
 */
public class WbjBean {
	private List<Map<String,Object>> zero;
	private List<Map<String,Object>> unzero;
	public List<Map<String, Object>> getZero() {
		return zero;
	}
	public void setZero(List<Map<String, Object>> zero) {
		this.zero = zero;
	}
	public List<Map<String, Object>> getUnzero() {
		return unzero;
	}
	public void setUnzero(List<Map<String, Object>> unzero) {
		this.unzero = unzero;
	}
	

}

