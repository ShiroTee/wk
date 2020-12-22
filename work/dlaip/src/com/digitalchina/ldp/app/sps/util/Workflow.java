package com.digitalchina.ldp.app.sps.util;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="workflow")
public class Workflow {
	
	private List<Step> steps;

	public List<Step> getSteps() {
		return steps;
	}
	@XmlElementWrapper(name="steps")
	@XmlElement(name="step")
	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}
	
	
}
