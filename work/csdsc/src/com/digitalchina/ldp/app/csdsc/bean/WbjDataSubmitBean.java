package com.digitalchina.ldp.app.csdsc.bean;

import java.io.Serializable;

/**
 * 委办局数据提交bean
 * 
 * @author MagicChu
 * 
 */
public class WbjDataSubmitBean implements Serializable {
	private static final long serialVersionUID = -7380905021091315247L;

	public WbjDataSubmitBean() {
	}

	// id
	private String id;
	// 组织id
	private String orgiId;
	// 组织名称
	private String orgName;
	// 有效积分（实提交数据量）
	private String contributionIntegral;
	// 数据类提交量
	private String daClaSubCount;
	// 使用积分
	private String useIntegral;
	// 质量不合格积分
	private String rejectIntegral;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrgiId() {
		return orgiId;
	}

	public void setOrgiId(String orgiId) {
		this.orgiId = orgiId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getContributionIntegral() {
		return contributionIntegral;
	}

	public void setContributionIntegral(String contributionIntegral) {
		this.contributionIntegral = contributionIntegral;
	}

	public String getUseIntegral() {
		return useIntegral;
	}

	public void setUseIntegral(String useIntegral) {
		this.useIntegral = useIntegral;
	}

	public String getRejectIntegral() {
		return rejectIntegral;
	}

	public void setRejectIntegral(String rejectIntegral) {
		this.rejectIntegral = rejectIntegral;
	}
	
	public String getDaClaSubCount() {
		return daClaSubCount;
	}

	public void setDaClaSubCount(String daClaSubCount) {
		this.daClaSubCount = daClaSubCount;
	}

}
