package com.digitalchina.ldp.app.csdsc.comm;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页控件类
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-17
 */
public class Pager {
	
	//总条数
	private String allcounts = "0";
	//总页数
	private String allpage = "0";
	//分页后数据集合
	private List<?> listBeans = new ArrayList();

	public List getListBeans() {
		return listBeans;
	}

	public void setListBeans(List listBeans) {
		this.listBeans = listBeans;
	}

	public String getAllcounts() {
		return allcounts;
	}

	public void setAllcounts(String allcounts) {
		this.allcounts = allcounts;
	}

	public String getAllpage() {
		return allpage;
	}

	public void setAllpage(String allpage) {
		this.allpage = allpage;
	}
	
	
	

}

