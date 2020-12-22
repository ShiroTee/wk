package com.digitalchina.ldp.app.csdsc.bean;

import javax.persistence.Column;

/**
 * @author 陈超
 * 2014-7-16 上午10:07:56
 */
/*
 * 宏观经济
 * 、、、、
 */
public class MacroeconomicInfoBean {
	@Column(name="ZBQC")
	private String indicatorsFullName;   //指标全称
	@Column(name="ZBDW")
	private String indicatorsUnit;       //指标单位
	@Column(name="DQZ")
	private String currentValue;         //当期值
	@Column(name="LJZ")
	private String totalValue;           //累计值
	@Column(name="ZZZ")
	private String growthValue;          //增长值
	@Column(name="ZBDM")
	private String indicatorsCode;       //指标代码
	public String getIndicatorsCode() {
		return indicatorsCode;
	}
	public void setIndicatorsCode(String indicatorsCode) {
		this.indicatorsCode = indicatorsCode;
	}
	public String getIndicatorsFullName() {
		return indicatorsFullName;
	}
	public void setIndicatorsFullName(String indicatorsFullName) {
		this.indicatorsFullName = indicatorsFullName;
	}
	public String getIndicatorsUnit() {
		return indicatorsUnit;
	}
	public void setIndicatorsUnit(String indicatorsUnit) {
		this.indicatorsUnit = indicatorsUnit;
	}
	public String getCurrentValue() {
		return currentValue;
	}
	public void setCurrentValue(String currentValue) {
		this.currentValue = currentValue;
	}
	public String getTotalValue() {
		return totalValue;
	}
	public void setTotalValue(String totalValue) {
		this.totalValue = totalValue;
	}
	public String getGrowthValue() {
		return growthValue;
	}
	public void setGrowthValue(String growthValue) {
		this.growthValue = growthValue;
	}
	
	

}

