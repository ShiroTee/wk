package com.jeecms.exchange.bean;

import java.io.Serializable;

/**
 * 互动交流楼中楼回复（楼中楼）
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-2
 */
public class SubTopicBean implements Serializable {

	private static final long serialVersionUID = -7380905021091315247L;

	public SubTopicBean() {
	}

	// 删除按钮,0：可以删除；1：不可以删除
	private String topicDeleteBtn = "1";

	// 楼中楼父ID
	private String topicPId = "";

	// 楼中楼ID
	private String topicId = "";

	// 楼层
	private String topicFloor = "";

	// 回复人
	private String topicFromUser = "";

	// 被回复人
	private String topicToUser = "";

	// 帖子内容
	private String topicMsg = "";

	// 回复发布时间
	private String topicAddDate = "";

	public String getTopicFromUser() {
		return topicFromUser;
	}

	public void setTopicFromUser(String topicFromUser) {
		this.topicFromUser = topicFromUser;
	}

	public String getTopicToUser() {
		return topicToUser;
	}

	public void setTopicToUser(String topicToUser) {
		this.topicToUser = topicToUser;
	}

	public String getTopicMsg() {
		return topicMsg;
	}

	public void setTopicMsg(String topicMsg) {
		this.topicMsg = topicMsg;
	}

	public String getTopicAddDate() {
		return topicAddDate;
	}

	public void setTopicAddDate(String topicAddDate) {
		this.topicAddDate = topicAddDate;
	}

	public String getTopicDeleteBtn() {
		return topicDeleteBtn;
	}

	public void setTopicDeleteBtn(String topicDeleteBtn) {
		this.topicDeleteBtn = topicDeleteBtn;
	}

	public String getTopicFloor() {
		return topicFloor;
	}

	public void setTopicFloor(String topicFloor) {
		this.topicFloor = topicFloor;
	}

	public String getTopicId() {
		return topicId;
	}

	public void setTopicId(String topicId) {
		this.topicId = topicId;
	}

	public String getTopicPId() {
		return topicPId;
	}

	public void setTopicPId(String topicPId) {
		this.topicPId = topicPId;
	}

}
