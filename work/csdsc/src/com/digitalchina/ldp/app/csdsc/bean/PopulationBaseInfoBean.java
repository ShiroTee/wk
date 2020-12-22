package com.digitalchina.ldp.app.csdsc.bean;

import java.util.Date;

import javax.persistence.Column;

/**
 * @author 陈超
 * 2014-7-15 下午03:57:03
 */
/*
 * 人口基本信息
 */
public class PopulationBaseInfoBean {
	@Column(name="RKBS")
	private String rkbs;                   //人口标示：
	@Column(name="XM")
	private String name;                   //姓    名：
	@Column(name="CYM")
	private String usedName;               //曾 用 名
	@Column(name="XB")
	private String sex;                    //性    别：
	@Column(name="MC")
	private String nation;                 //民    族：
	@Column(name="ZJLX")
	private String papersType;             //证件类型：
	@Column(name="SFZJH")
	private String papersNum;              //证件号码：
	@Column(name="DQHMC")
	private String religion;               //宗教信仰：---所属区县
	@Column(name="XZZ")
	private String educationDegree;        //文化程度：--现住址
	@Column(name="HYZK")
	private String maritalStatus;          //婚姻状况：
	@Column(name="GLZT")
	private String politicsStatus;         //政治面貌：--管理状态
	@Column(name="HKXZ")
	private String accountType;            //户口性质：
	@Column(name="CSRR")
	private Date birthdate;                //出生日期：
	@Column(name="JZDZ")
	private String address;            //居住地址：
	@Column(name="HH")
	private String homeNum;            //户号：
	@Column(name="JTGX")
	private String relative;            //与户主关系：
	
	public String getHomeNum() {
		return homeNum;
	}
	public void setHomeNum(String homeNum) {
		this.homeNum = homeNum;
	}
	public String getRelative() {
		return relative;
	}
	public void setRelative(String relative) {
		this.relative = relative;
	}
	public String getRkbs() {
		return rkbs;
	}
	public void setRkbs(String rkbs) {
		this.rkbs = rkbs;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsedName() {
		return usedName;
	}
	public void setUsedName(String usedName) {
		this.usedName = usedName;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getNation() {
		return nation;
	}
	public void setNation(String nation) {
		this.nation = nation;
	}
	public String getPapersType() {
		return papersType;
	}
	public void setPapersType(String papersType) {
		this.papersType = papersType;
	}
	public String getPapersNum() {
		return papersNum;
	}
	public void setPapersNum(String papersNum) {
		this.papersNum = papersNum;
	}
	public String getReligion() {
		return religion;
	}
	public void setReligion(String religion) {
		this.religion = religion;
	}
	public String getEducationDegree() {
		return educationDegree;
	}
	public void setEducationDegree(String educationDegree) {
		this.educationDegree = educationDegree;
	}
	public String getMaritalStatus() {
		return maritalStatus;
	}
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	public String getPoliticsStatus() {
		return politicsStatus;
	}
	public void setPoliticsStatus(String politicsStatus) {
		this.politicsStatus = politicsStatus;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public Date getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	

}

