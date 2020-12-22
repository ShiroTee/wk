package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="all_col_comments")
public class WBJTableColumnBean implements java.io.Serializable{
	
	//用户
	@Column(name="OWNER")
	private String owner;
	//表名
	@Column(name="TABLE_Name")
	private String tableName;
	//列名
	@Column(name="COLUMN_NAME")
	private String columnName;
	//注释
	@Column(name="COMMENTS")
	private String comments;
	
	public WBJTableColumnBean() {
	}
	public WBJTableColumnBean(String owner, String tableName, String columnName, String comments) {
		super();
		this.owner = owner;
		this.tableName = tableName;
		this.columnName = columnName;
		this.comments = comments;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}

}
