package com.digitalchina.ldp.app.dmp.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;


@Table(name="DMP_DATA_KNOWLEDGE_SOLUTION")
public class DataKnowledgeSolutionBean implements java.io.Serializable{

	@Column(name="ID")
	private String id;//id
	@Column(name="TITLE")
	private String title;//问题标题
	@Column(name="CONTENT")
	private String content;//问题内容
	@Column(name="ANSWER")
	private String answer;//问题答案
	@Column(name="SOLUTIONACCESSORYNAME")
	private String solutionAccessoryName;//解决附件名称
	@Column(name="SOLUTIONACCESSORYPATH")
	private String solutionAccessoryPath;//解决附件路径
	
	@Column(name="SUBACCESSORYNAME")
	private String subAccessoryName;//问题附件名称
	@Column(name="SUBACCESSORYPATH")
	private String subAccessoryPath;//问题附件路径
	
	@Column(name="SUBTIME")
	private Date subTime;//提交时间
	@Column(name="TYPE")
	private String type;//类型
	@Column(name="MARK")
	private String mark;//备注
	
	
	public DataKnowledgeSolutionBean() {
	}
	public DataKnowledgeSolutionBean(String id, String title, String content, String answer, String solutionAccessoryName, String solutionAccessoryPath,String subAccessoryName,String subAccessoryPath, Date subTime, String type, String mark) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.answer = answer;
		this.solutionAccessoryName = solutionAccessoryName;
		this.solutionAccessoryPath = solutionAccessoryPath;
		this.subAccessoryName = subAccessoryName;
		this.subAccessoryPath = subAccessoryPath;
		this.subTime = subTime;
		this.type = type;
		this.mark = mark;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getSolutionAccessoryName() {
		return solutionAccessoryName;
	}
	public void setSolutionAccessoryName(String solutionAccessoryName) {
		this.solutionAccessoryName = solutionAccessoryName;
	}
	public String getSolutionAccessoryPath() {
		return solutionAccessoryPath;
	}
	public void setSolutionAccessoryPath(String solutionAccessoryPath) {
		this.solutionAccessoryPath = solutionAccessoryPath;
	}
	public Date getSubTime() {
		return subTime;
	}
	public void setSubTime(Date subTime) {
		this.subTime = subTime;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
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
	
	
	
	
}
