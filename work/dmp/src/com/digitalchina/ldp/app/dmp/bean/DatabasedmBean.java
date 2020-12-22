package com.digitalchina.ldp.app.dmp.bean;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="DMP_DATABASE_DM")
public class DatabasedmBean implements java.io.Serializable{
	@Column(name="SJKLX")
	 private String sjklx;
	 @Column(name="SJKMC")   
	 private String sjkmc;      	 //基础库	
	public String getSjklx() {
		return sjklx;
	}
	public void setSjklx(String sjklx) {
		this.sjklx = sjklx;
	}
	public String getSjkmc() {
		return sjkmc;
	}
	public void setSjkmc(String sjkmc) {
		this.sjkmc = sjkmc;
	}
	public DatabasedmBean() {
		super();
	}
	public DatabasedmBean(String sjklx, String sjkmc) {
		super();
		this.sjklx = sjklx;
		this.sjkmc = sjkmc;
	}
}
