package com.jeecms.rdp.common;

/**
 * 组织树
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-8-19
 */
public class TreeBean {

	//id
	private String id;
	//名称
	private String name;
	//父id
	private String parentId;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	

}
