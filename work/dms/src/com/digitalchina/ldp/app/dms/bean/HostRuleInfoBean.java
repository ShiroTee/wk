package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "HOSTRULEINFO")
public class HostRuleInfoBean implements java.io.Serializable{
	@Column(name = "ID")
	public String id;	//ID
	@Column(name = "PROJECTID")
	public String projectid;//主机ID
	@Column(name = "RULEID")
	public String ruleid;	//规则ID
	@Column(name = "ADDTIME")
	public Date addtime;	//添加时间
	@Column(name = "MEMO")
	public String memo;	//备注
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectid() {
		return projectid;
	}
	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}
	public String getRuleid() {
		return ruleid;
	}
	public void setRuleid(String ruleid) {
		this.ruleid = ruleid;
	}
	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public HostRuleInfoBean(String id, String projectid, String ruleid,
			Date addtime, String memo) {
		super();
		this.id = id;
		this.projectid = projectid;
		this.ruleid = ruleid;
		this.addtime = addtime;
		this.memo = memo;
	}
	public HostRuleInfoBean() {
		super();
	}
	
}
