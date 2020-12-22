package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Table(name = "ACTIVITY_INFO")
@Entity
public class ActivityBean {
	@Id
	@Column(name = "ACT_ID", length = 36, nullable = false)
	private String actId;//活动id
	@Column(name = "ACT_NAME", length = 255)
	private String actName;//活动名称
	@Column(name = "ACT_SPONSOR", length = 255)
	private String actSponsor;//活动主办方
	@Column(name = "ACT_START", length = 255)
	private Date actStart;//开始时间
	@Column(name = "ACT_END")
	private Date actEnd;//结束时间
	@Column(name = "ACT_DESC", length = 4000)
	private String actDesc;//活动详情
	@Column(name = "PHOTO_PATH", length = 4000)
	private String photoPath;//活动图片路径
	@Column(name = "ACT_STATUS", length = 1)
	private String actStatus;//活动状态
	@Column(name = "CREATE_TIME")
	private Date createTime;//创建时间
	
	public String getActId() {
		return actId;
	}
	public void setActId(String actId) {
		this.actId = actId;
	}
	public String getActName() {
		return actName;
	}
	public void setActName(String actName) {
		this.actName = actName;
	}
	public String getActSponsor() {
		return actSponsor;
	}
	public void setActSponsor(String actSponsor) {
		this.actSponsor = actSponsor;
	}
	public Date getActStart() {
		return actStart;
	}
	public void setActStart(Date actStart) {
		this.actStart = actStart;
	}
	public Date getActEnd() {
		return actEnd;
	}
	public void setActEnd(Date actEnd) {
		this.actEnd = actEnd;
	}
	public String getActDesc() {
		return actDesc;
	}
	public void setActDesc(String actDesc) {
		this.actDesc = actDesc;
	}
	public String getPhotoPath() {
		return photoPath;
	}
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
	public String getActStatus() {
		return actStatus;
	}
	public void setActStatus(String actStatus) {
		this.actStatus = actStatus;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
