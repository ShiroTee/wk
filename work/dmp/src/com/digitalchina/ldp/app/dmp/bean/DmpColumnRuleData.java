package com.digitalchina.ldp.app.dmp.bean;

import java.util.Date;

import com.digitalchina.ldp.common.util.Column;
import com.digitalchina.ldp.common.util.Table;
@Table(name="DMP_COLUMNRULEDATA")
public class DmpColumnRuleData implements java.io.Serializable{
	
	@Column(name="ID")
	private String id;
	@Column(name="RULEID")
	private String ruleId;//规则ID
	@Column(name="RULENAME")
	private String ruleName;//规则名称
	@Column(name="CREATETIME")
	private Date createTime;//创建时间
	
	public DmpColumnRuleData() {
	}

	public DmpColumnRuleData(String id, String ruleId, String ruleName, Date createTime) {
		super();
		this.id = id;
		this.ruleId = ruleId;
		this.ruleName = ruleName;
		this.createTime = createTime;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRuleId() {
		return ruleId;
	}

	public void setRuleId(String ruleId) {
		this.ruleId = ruleId;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
