package com.digitalchina.ldp.app.dms.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;

@Table(name = "RULEINFO")
public class RuleinfoBean implements java.io.Serializable{
	
	@Column(name = "ID")
	private String id;//ID
	
	@Column(name = "RULENAME")
	private String rulename;//规则名称
	
	@Column(name = "RULETYPE")
	private String ruletype;//规则类型
	
	@Column(name = "STATUS")
	private String status;//启用状态
	
	@Column(name = "OPERATOR")
	private String operator;//逻辑运算符
	
	@Column(name = "THRESHOLD")
	private String threshold;//阀值

	@Column(name = "ADDTIME")
	private Date addtme;//添加时间
	
	@Column(name = "MEMO")
	private String memo;	//备注

	public RuleinfoBean(String id, String rulename, String ruletype,
			String status, String operator, String threshold, Date addtme,
			String memo) {
		super();
		this.id = id;
		this.rulename = rulename;
		this.ruletype = ruletype;
		this.status = status;
		this.operator = operator;
		this.threshold = threshold;
		this.addtme = addtme;
		this.memo = memo;
	}

	public RuleinfoBean() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRulename() {
		return rulename;
	}

	public void setRulename(String rulename) {
		this.rulename = rulename;
	}

	public String getRuletype() {
		return ruletype;
	}

	public void setRuletype(String ruletype) {
		this.ruletype = ruletype;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getThreshold() {
		return threshold;
	}

	public void setThreshold(String threshold) {
		this.threshold = threshold;
	}

	public Date getAddtme() {
		return addtme;
	}

	public void setAddtme(Date addtme) {
		this.addtme = addtme;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	
	
}
