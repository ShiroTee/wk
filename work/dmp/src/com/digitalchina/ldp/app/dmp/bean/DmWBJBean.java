package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name="DMP_DM_WBJ")
public class DmWBJBean implements java.io.Serializable{
	
	@Column(name="WBJBM")
	//委办局编码
	private String wbjCode;
	//委办局简称
	@Column(name="WBJJC")
	private String wbjShortName;
	//委办局全称
	@Column(name="WBJQC")
	private String wbjFullName;
	public DmWBJBean() {
	}
	public DmWBJBean(String wbjCode, String wbjShortName, String wbjFullName) {
		super();
		this.wbjCode = wbjCode;
		this.wbjShortName = wbjShortName;
		this.wbjFullName = wbjFullName;
	}
	public String getWbjCode() {
		return wbjCode;
	}
	public void setWbjCode(String wbjCode) {
		this.wbjCode = wbjCode;
	}
	public String getWbjShortName() {
		return wbjShortName;
	}
	public void setWbjShortName(String wbjShortName) {
		this.wbjShortName = wbjShortName;
	}
	public String getWbjFullName() {
		return wbjFullName;
	}
	public void setWbjFullName(String wbjFullName) {
		this.wbjFullName = wbjFullName;
	}

}
