package com.digitalchina.ldp.app.sps.util;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="step")
public final class Step {
	private int id;//进度ID
	private String name;//进度名称
	private int nextStep;//下一步进度ID
	private String assignee;//审批人
	private String comment;//注释
	
	public int getId() {
		return id;
	}
	@XmlAttribute 
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	@XmlAttribute 
	public void setName(String name) {
		this.name = name;
	}
	public String getAssignee() {
		return assignee;
	}
	@XmlAttribute 
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public String getComment() {
		return comment;
	}
	@XmlAttribute 
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getNextStep() {
		return nextStep;
	}
	@XmlAttribute 
	public void setNextStep(int nextStep) {
		this.nextStep = nextStep;
	}
	
}
