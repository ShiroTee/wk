package com.digitalchina.ldp.app.dmp.bean.vo;

public class ErrorDataBean implements java.io.Serializable{
	
	//委办局
	private String wbjName;
	//表明
	private String tableName;
	//表编码
	private String tableCode;
	//异常表编码
	private String exceptionTableCode;
	//条数
	private String errorCount;
	//不满足规则条数
	private String exceptionCount;
	//开始查询时间
	private String startTime;
	//结束查询日期
	private String endTime;
	
	public ErrorDataBean() {
	}

	public ErrorDataBean(String exceptionTableCode,String wbjName, String tableName, String tableCode, String errorCount, String exceptionCount, String startTime, String endTime) {
		super();
		this.wbjName = wbjName;
		this.tableName = tableName;
		this.tableCode = tableCode;
		this.errorCount = errorCount;
		this.exceptionCount = exceptionCount;
		this.startTime = startTime;
		this.endTime = endTime;
		this.exceptionTableCode = exceptionTableCode;
	}

	public String getWbjName() {
		return wbjName;
	}

	public void setWbjName(String wbjName) {
		this.wbjName = wbjName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getTableCode() {
		return tableCode;
	}

	public void setTableCode(String tableCode) {
		this.tableCode = tableCode;
	}

	public String getErrorCount() {
		return errorCount;
	}

	public void setErrorCount(String errorCount) {
		this.errorCount = errorCount;
	}

	public String getExceptionCount() {
		return exceptionCount;
	}

	public void setExceptionCount(String exceptionCount) {
		this.exceptionCount = exceptionCount;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getExceptionTableCode() {
		return exceptionTableCode;
	}

	public void setExceptionTableCode(String exceptionTableCode) {
		this.exceptionTableCode = exceptionTableCode;
	}
	
	
	
	

}
