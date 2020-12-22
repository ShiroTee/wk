package com.digitalchina.ldp.app.osp.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 论坛 模块
 */
@SuppressWarnings("serial")
@Table(name = "Community_MODULE")
@Entity
public class CommunityModuleBean {
	
	@Id
	@Column(name = "MODULE_ID")
	private String moduleId;//模块Id
	@Column(name = "MODULE_NAME")
	private String moduleName;//模块名称
	@Column(name = "M_SECTION_ID")
	private String mSectionId;//所属板块id
	
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getmSectionId() {
		return mSectionId;
	}
	public void setmSectionId(String mSectionId) {
		this.mSectionId = mSectionId;
	}
	
}
