package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 社区 板块
 */
@SuppressWarnings("serial")
@Table(name = "community_section")
@Entity
public class CommunitySectionBean {
	@Id
	@Column(name = "SECTION_ID")
	private String sectionId;//版块Id
	@Column(name = "SECTION_NAME")
	private String sectionName;//版块名称
	
	public String getSectionId() {
		return sectionId;
	}
	public void setSectionId(String sectionId) {
		this.sectionId = sectionId;
	}
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	
	
	
}
