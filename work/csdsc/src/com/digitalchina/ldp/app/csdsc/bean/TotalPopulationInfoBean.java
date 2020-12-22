package com.digitalchina.ldp.app.csdsc.bean;

import javax.persistence.Column;

/**
 * @author 陈超
 * 2014-7-15 下午03:32:16
 */
/*
 * 全员人口信息
 */
public class TotalPopulationInfoBean {
	@Column(name="QHMC")
	private String administrativeRegionName;      //行政区划名称			
	@Column(name="TJNF")
	private String statisticalYear;               //统计年份(年)
	private int totalNum;                         //总人数(个)
	@Column(name="NANXZS")
	private int maleNum;                          //	男性总数(个)
	@Column(name="NVXZS")
	private int femaleNum;                        //女性总数(个)
	public String getAdministrativeRegionName() {
		return administrativeRegionName;
	}
	public void setAdministrativeRegionName(String administrativeRegionName) {
		this.administrativeRegionName = administrativeRegionName;
	}
	public String getStatisticalYear() {
		return statisticalYear;
	}
	public void setStatisticalYear(String statisticalYear) {
		this.statisticalYear = statisticalYear;
	}
	public int getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(int totalNum) {
		this.totalNum = totalNum;
	}
	public int getMaleNum() {
		return maleNum;
	}
	public void setMaleNum(int maleNum) {
		this.maleNum = maleNum;
	}
	public int getFemaleNum() {
		return femaleNum;
	}
	public void setFemaleNum(int femaleNum) {
		this.femaleNum = femaleNum;
	}
	

}

