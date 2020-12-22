package com.digitalchina.ldp.app.osp.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Table(name = "TOOL_INFO")
@Entity
public class ToolBean {
	 @Id
     @Column(name="TOOL_ID")
	 private String toolId;//工具Id
	 @Column(name = "TOOL_NAME")
	 private String toolName;//工具名称 
	 @Column(name = "TOOL_TYPE")
	 private String toolType;//工具种类
	 @Column(name = "TOOL_URL")
	 private String toolUrl;//存放地址
	 @Column(name = "DOWN_COUNT")
	 private String downCount;//下载次数
	 @Column(name = "TOOL_SIZE")
	 private String toolSize;//工具大小
	 @Column(name = "UPDATE_TIME")
	 private Date updateTime;//更新时间
	 @Column(name = "TOOL_STATUS")
	 private String toolStatus;//工具状态
	 @Column(name = "TOOL_IMG")
	 private String toolImg;//工具图片
	 
	public String getToolImg() {
		return toolImg;
	}
	public void setToolImg(String toolImg) {
		this.toolImg = toolImg;
	}
	public String getToolId() {
		return toolId;
	}
	public void setToolId(String toolId) {
		this.toolId = toolId;
	}
	public String getToolName() {
		return toolName;
	}
	public void setToolName(String toolName) {
		this.toolName = toolName;
	}
	public String getToolType() {
		return toolType;
	}
	public void setToolType(String toolType) {
		this.toolType = toolType;
	}
	public String getToolUrl() {
		return toolUrl;
	}
	public void setToolUrl(String toolUrl) {
		this.toolUrl = toolUrl;
	}
	public String getDownCount() {
		return downCount;
	}
	public void setDownCount(String downCount) {
		this.downCount = downCount;
	}
	public String getToolSize() {
		return toolSize;
	}
	public void setToolSize(String toolSize) {
		this.toolSize = toolSize;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getToolStatus() {
		return toolStatus;
	}
	public void setToolStatus(String toolStatus) {
		this.toolStatus = toolStatus;
	}
	 
}
