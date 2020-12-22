package com.digitalchina.ldp.app.dmp.bean;
import java.util.Date;

import com.digitalchina.ldp.common.util.Table;
import com.digitalchina.ldp.common.util.Column;
@Table(name="OLAP_DATA_REPORT")
public class OlapDataReportBean implements java.io.Serializable{
	
	@Column(name="ID")
	private String id;
	@Column(name="WBJNAME")
	private String wbjName;//委办局名称
	@Column(name="WBJCODE")
	private String wbjCode;//委办局编码
	@Column(name="PARSEFILECOUNT")
	private String parseFileCount;//解析文档总数
	@Column(name="PARSEFILEFAIL")
	private String parsefilefail;//解析文档失败数
	@Column(name="PARSE_INCENTER_COUNT")
	private String parseIncenterCount;//入中心前置库总数
	@Column(name="PARSE_INCENTER_FAIL")
	private String parseIncenterFail;//入中心前置库失败数
	@Column(name="DATA_CLEAN_COUNT")
	private String dataCleanCount;//数据清洗总数
	@Column(name="DATA_CLEAN_FAIL")
	private String dataCleanFail;//数据清洗失败数
	@Column(name="DATA_TRAN_COUNT")
	private String dataTranCount;//数据转换总数
	@Column(name="DATA_TRAN_FAIL")
	private String dataTranFail;//数据转换失败数
	@Column(name="DATA_COMP_COUNT")
	private String dataCompCount;//数据对比总数
	@Column(name="DATA_COMP_FAIL")
	private String dataCompFail;//数据对比失败数
	@Column(name="DATA_LOAD_COUNT")
	private String dataLoadCount;//数据加载总数
	@Column(name="DATA_LOAD_FAIL")
	private String dataLoadFail;//数据加载失败数
	@Column(name="WBJ_PREFIXDATABASE_COUNT")
	private String wbjPrefixdatabaseCount;//委办局前置库记录总数
	@Column(name="REPORT_TYPE")
	private String reportType;//报告模式1.文件模式，2.数据库模式
	@Column(name="REPORT_TIME")
	private Date reportTime;//报告时间
	@Column(name="MARK")
	private String mark;//标注
	@Column(name="CHANGE_FILE_COUNT")
	private String changeFileCount;//交换文件总数
	
	public OlapDataReportBean() {
	}
	
	public OlapDataReportBean(String id, String wbjName, String wbjCode, String parseFileCount, String parsefilefail, String parseIncenterCount, String parseIncenterFail, String dataCleanCount, String dataCleanFail,
			String dataTranCount, String dataTranFail, String dataCompCount, String dataCompFail, String dataLoadCount, String dataLoadFail, String wbjPrefixdatabaseCount, String reportType, Date reportTime, String mark,
			String changeFileCount) {
		super();
		this.id = id;
		this.wbjName = wbjName;
		this.wbjCode = wbjCode;
		this.parseFileCount = parseFileCount;
		this.parsefilefail = parsefilefail;
		this.parseIncenterCount = parseIncenterCount;
		this.parseIncenterFail = parseIncenterFail;
		this.dataCleanCount = dataCleanCount;
		this.dataCleanFail = dataCleanFail;
		this.dataTranCount = dataTranCount;
		this.dataTranFail = dataTranFail;
		this.dataCompCount = dataCompCount;
		this.dataCompFail = dataCompFail;
		this.dataLoadCount = dataLoadCount;
		this.dataLoadFail = dataLoadFail;
		this.wbjPrefixdatabaseCount = wbjPrefixdatabaseCount;
		this.reportType = reportType;
		this.reportTime = reportTime;
		this.mark = mark;
		this.changeFileCount = changeFileCount;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getWbjName() {
		return wbjName;
	}
	public void setWbjName(String wbjName) {
		this.wbjName = wbjName;
	}
	public String getWbjCode() {
		return wbjCode;
	}
	public void setWbjCode(String wbjCode) {
		this.wbjCode = wbjCode;
	}
	public String getParseFileCount() {
		return parseFileCount;
	}
	public void setParseFileCount(String parseFileCount) {
		this.parseFileCount = parseFileCount;
	}
	public String getParsefilefail() {
		return parsefilefail;
	}
	public void setParsefilefail(String parsefilefail) {
		this.parsefilefail = parsefilefail;
	}
	public String getParseIncenterCount() {
		return parseIncenterCount;
	}
	public void setParseIncenterCount(String parseIncenterCount) {
		this.parseIncenterCount = parseIncenterCount;
	}
	public String getParseIncenterFail() {
		return parseIncenterFail;
	}
	public void setParseIncenterFail(String parseIncenterFail) {
		this.parseIncenterFail = parseIncenterFail;
	}
	public String getDataCleanCount() {
		return dataCleanCount;
	}
	public void setDataCleanCount(String dataCleanCount) {
		this.dataCleanCount = dataCleanCount;
	}
	public String getDataCleanFail() {
		return dataCleanFail;
	}
	public void setDataCleanFail(String dataCleanFail) {
		this.dataCleanFail = dataCleanFail;
	}
	public String getDataTranCount() {
		return dataTranCount;
	}
	public void setDataTranCount(String dataTranCount) {
		this.dataTranCount = dataTranCount;
	}
	public String getDataTranFail() {
		return dataTranFail;
	}
	public void setDataTranFail(String dataTranFail) {
		this.dataTranFail = dataTranFail;
	}
	public String getDataCompCount() {
		return dataCompCount;
	}
	public void setDataCompCount(String dataCompCount) {
		this.dataCompCount = dataCompCount;
	}
	public String getDataCompFail() {
		return dataCompFail;
	}
	public void setDataCompFail(String dataCompFail) {
		this.dataCompFail = dataCompFail;
	}
	public String getDataLoadCount() {
		return dataLoadCount;
	}
	public void setDataLoadCount(String dataLoadCount) {
		this.dataLoadCount = dataLoadCount;
	}
	public String getDataLoadFail() {
		return dataLoadFail;
	}
	public void setDataLoadFail(String dataLoadFail) {
		this.dataLoadFail = dataLoadFail;
	}
	public String getWbjPrefixdatabaseCount() {
		return wbjPrefixdatabaseCount;
	}
	public void setWbjPrefixdatabaseCount(String wbjPrefixdatabaseCount) {
		this.wbjPrefixdatabaseCount = wbjPrefixdatabaseCount;
	}
	public String getReportType() {
		return reportType;
	}
	public void setReportType(String reportType) {
		this.reportType = reportType;
	}
	public Date getReportTime() {
		return reportTime;
	}
	public void setReportTime(Date reportTime) {
		this.reportTime = reportTime;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getChangeFileCount() {
		return changeFileCount;
	}
	public void setChangeFileCount(String changeFileCount) {
		this.changeFileCount = changeFileCount;
	}
	

}
