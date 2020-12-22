package com.digitalchina.ldp.app.dmp.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="DMP_DATA_KNOWLEDGE_QUALITY")
public class DataKnowledgeQualityBean implements java.io.Serializable{
	
	@Column(name="ID")
	private String id;//id
	@Column(name="DATAFROM")
	private String dataFrom;//数据来源
	@Column(name="SUBUSER")
	private String subUser;//提交人
	@Column(name="SUBTIME")
	private Date subTime;//提交时间
	@Column(name="SOLVEUSER")
	private String solveUser;//解决人
	@Column(name="SOLVETIME")
	private Date solveTime;//解决时间
	@Column(name="RANK")
	private String rank;//问题等级
	@Column(name="TITLE")
	private String title;//问题标题
	@Column(name="CONTENT")
	private String content;//问题内容
	@Column(name="STAUTS")
	private String status;//状态
	@Column(name="DATAQUALITYTYPE")
	private String dataQualityType;//数据质量类型
	@Column(name="SUBACCESSORYNAME")
	private String subAccessoryName;//提交附件名称
	@Column(name="SUBACCESSORYPATH")
	private String subAccessoryPath;//提交附件路径
	@Column(name="SOLVEACCESSORYNAME")
	private String solveAccessoryName;//解决附件名称
	@Column(name="SOLVEACCESSORYPATH")
	private String solveAccessoryPath;//解决附件路径
	@Column(name="MARK")
	private String mark;//备注
	@Column(name="SOLVECONTENT")
	private String solveContent;//解决问题答案
	
	
	public DataKnowledgeQualityBean() {
	}
	public DataKnowledgeQualityBean(String id, String dataFrom, String subUser, Date subTime, String solveUser, Date solveTime, String rank, String title, String content, String status,
			String dataQualityType, String subAccessoryName, String subAccessoryPath, String solveAccessoryName, String solveAccessoryPath, String mark, String solveContent) {
		super();
		this.id = id;
		this.dataFrom = dataFrom;
		this.subUser = subUser;
		this.subTime = subTime;
		this.solveUser = solveUser;
		this.solveTime = solveTime;
		this.rank = rank;
		this.title = title;
		this.content = content;
		this.status = status;
		this.dataQualityType = dataQualityType;
		this.subAccessoryName = subAccessoryName;
		this.subAccessoryPath = subAccessoryPath;
		this.solveAccessoryName = solveAccessoryName;
		this.solveAccessoryPath = solveAccessoryPath;
		this.mark = mark;
		this.solveContent = solveContent;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDataFrom() {
		return dataFrom;
	}
	public void setDataFrom(String dataFrom) {
		this.dataFrom = dataFrom;
	}
	public String getSubUser() {
		return subUser;
	}
	public void setSubUser(String subUser) {
		this.subUser = subUser;
	}
	public Date getSubTime() {
		return subTime;
	}
	public void setSubTime(Date subTime) {
		this.subTime = subTime;
	}
	public String getSolveUser() {
		return solveUser;
	}
	public void setSolveUser(String solveUser) {
		this.solveUser = solveUser;
	}
	public Date getSolveTime() {
		return solveTime;
	}
	public void setSolveTime(Date solveTime) {
		this.solveTime = solveTime;
	}
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDataQualityType() {
		return dataQualityType;
	}
	public void setDataQualityType(String dataQualityType) {
		this.dataQualityType = dataQualityType;
	}
	public String getSubAccessoryName() {
		return subAccessoryName;
	}
	public void setSubAccessoryName(String subAccessoryName) {
		this.subAccessoryName = subAccessoryName;
	}
	public String getSubAccessoryPath() {
		return subAccessoryPath;
	}
	public void setSubAccessoryPath(String subAccessoryPath) {
		this.subAccessoryPath = subAccessoryPath;
	}
	public String getSolveAccessoryName() {
		return solveAccessoryName;
	}
	public void setSolveAccessoryName(String solveAccessoryName) {
		this.solveAccessoryName = solveAccessoryName;
	}
	public String getSolveAccessoryPath() {
		return solveAccessoryPath;
	}
	public void setSolveAccessoryPath(String solveAccessoryPath) {
		this.solveAccessoryPath = solveAccessoryPath;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getSolveContent() {
		return solveContent;
	}
	public void setSolveContent(String solveContent) {
		this.solveContent = solveContent;
	}
	
	

}
