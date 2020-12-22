package com.owen.server.pageVar;

public class JQGridProperties {
	
	protected int			id;
	protected String 		level;
	protected String 		parent;
	protected String 		leaf;
	protected String		expanded; 
	protected String		loaded;
	
	protected String		treeLink;
	
	
	
	public String getTreeLink() {
		return treeLink;
	}
	public void setTreeLink(String treeLink) {
		this.treeLink = treeLink;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getExpanded() {
		return expanded;
	}
	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}
	public String getLoaded() {
		return loaded;
	}
	public void setLoaded(String loaded) {
		this.loaded = loaded;
	}
	
}
