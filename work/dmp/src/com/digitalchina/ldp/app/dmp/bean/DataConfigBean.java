package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="DMP_DATACONFIG")
public class DataConfigBean implements java.io.Serializable{
	
	@Column(name="DATAID")
	private String id;
	@Column(name="NAME")
	private String name;//异常代码管理名称
	@Column(name="DATASOURCE")
	private String dataSource;//异常数据来源
	@Column(name="DATASOURCEVALUE")
	private String dataSourceCode;//委办局编码
	@Column(name="TABLENAME")
	private String tableName;//表名
	@Column(name="TABLENAMEVALUE")
	private String tableNameValue;//表英文名
	@Column(name="COLUMNNAME")
	private String columnName;//列名
	@Column(name="COLUMNNAMEVALUE")
	private String columnNameValue;//列名
	@Column(name="DATARULETYPE")
	private String dataRuleType; //数据规则类型
	@Column(name="DATARULENAME")
	private String dataRuleName; //数据规则类型名称
	@Column(name="DATARULECODE")
	private String dataRuleCode; //数据规则类型代码
	@Column(name="COLUMNRULEID")
	private String columnRuleId; //处理数据规则代码
	@Column(name="MARK")
	private String mark; //标注
	@Column(name="DESCRIPTION")
	private String desc; //描述
	
	public DataConfigBean() {
	}

	public DataConfigBean(String id, String name, String dataSource, String dataSourceCode, String tableName, String tableNameValue, String columnName, String columnNameValue, String dataRuleType,
			String dataRuleName, String dataRuleCode, String columnRuleId, String mark, String desc) {
		super();
		this.id = id;
		this.name = name;
		this.dataSource = dataSource;
		this.dataSourceCode = dataSourceCode;
		this.tableName = tableName;
		this.tableNameValue = tableNameValue;
		this.columnName = columnName;
		this.columnNameValue = columnNameValue;
		this.dataRuleType = dataRuleType;
		this.dataRuleName = dataRuleName;
		this.dataRuleCode = dataRuleCode;
		this.columnRuleId = columnRuleId;
		this.mark = mark;
		this.desc = desc;
	}

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

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public String getDataSourceCode() {
		return dataSourceCode;
	}

	public void setDataSourceCode(String dataSourceCode) {
		this.dataSourceCode = dataSourceCode;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getTableNameValue() {
		return tableNameValue;
	}

	public void setTableNameValue(String tableNameValue) {
		this.tableNameValue = tableNameValue;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getColumnNameValue() {
		return columnNameValue;
	}

	public void setColumnNameValue(String columnNameValue) {
		this.columnNameValue = columnNameValue;
	}

	public String getDataRuleType() {
		return dataRuleType;
	}

	public void setDataRuleType(String dataRuleType) {
		this.dataRuleType = dataRuleType;
	}

	public String getDataRuleName() {
		return dataRuleName;
	}

	public void setDataRuleName(String dataRuleName) {
		this.dataRuleName = dataRuleName;
	}

	public String getDataRuleCode() {
		return dataRuleCode;
	}

	public void setDataRuleCode(String dataRuleCode) {
		this.dataRuleCode = dataRuleCode;
	}

	public String getColumnRuleId() {
		return columnRuleId;
	}

	public void setColumnRuleId(String columnRuleId) {
		this.columnRuleId = columnRuleId;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
	

}
