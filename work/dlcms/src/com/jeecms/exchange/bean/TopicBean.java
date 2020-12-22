package com.jeecms.exchange.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 互动交流帖子（主题帖）
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-2
 */
public class TopicBean implements Serializable {

	private static final long serialVersionUID = -7380905021091315247L;

	public TopicBean() {
	}

	// 删除按钮,0：可以删除；1：不可以删除
	private String topicDeleteBtn = "1";

	// 帖子父ID
	private String topicPId = "";

	// 帖子ID
	private String topicId = "";

	// 发布人
	private String topicUser = "";

	// 帖子名称
	private String topicName = "";

	// 帖子内容
	private String topicMsg = "";

	// 帖子发布时间
	private String topicAddDate = "";

	// 帖子回复数量
	private String topicReplyCounts = "";

	// 帖子楼层
	private String topicFloor = "";

	// 楼中楼帖子集合
	private List<SubTopicBean> subTopic = null;

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
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

	public String getTopicReplyCounts() {
		return topicReplyCounts;
	}

	public void setTopicReplyCounts(String topicReplyCounts) {
		this.topicReplyCounts = topicReplyCounts;
	}

	public List<SubTopicBean> getSubTopic() {
		return subTopic;
	}

	public void setSubTopic(List<SubTopicBean> subTopic) {
		this.subTopic = subTopic;
	}

	public String getTopicUser() {
		return topicUser;
	}

	public void setTopicUser(String topicUser) {
		this.topicUser = topicUser;
	}

	public String getTopicFloor() {
		return topicFloor;
	}

	public void setTopicFloor(String topicFloor) {
		this.topicFloor = topicFloor;
	}

	public String getTopicDeleteBtn() {
		return topicDeleteBtn;
	}

	public void setTopicDeleteBtn(String topicDeleteBtn) {
		this.topicDeleteBtn = topicDeleteBtn;
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
