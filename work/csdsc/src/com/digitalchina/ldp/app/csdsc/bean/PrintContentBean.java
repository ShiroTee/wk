package com.digitalchina.ldp.app.csdsc.bean;

import java.util.List;
import java.util.Map;

/**
 * @author 陈超
 * 2014-8-8 上午11:18:56
 */
public class PrintContentBean {
	private PopulationBaseInfoBean baseBean;
	private List<Map<String, Object>> list;
	private String printNum;//流水号
	private String currentDate;
	
	public PopulationBaseInfoBean getBaseBean() {
		return baseBean;
	}
	public void setBaseBean(PopulationBaseInfoBean baseBean) {
		this.baseBean = baseBean;
	}
	public List<Map<String, Object>> getList() {
		return list;
	}
	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}
	public String getPrintNum() {
		return printNum;
	}
	public void setPrintNum(String printNum) {
		this.printNum = printNum;
	}
	public String getCurrentDate() {
		return currentDate;
	}
	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}

}

