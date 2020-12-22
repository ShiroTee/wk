package com.jeecms.exchange.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jeecms.exchange.bean.TopicBean;
import com.jeecms.exchange.comm.Pager;
import com.jeecms.exchange.dao.impl.ExchangeDaoImpl;

/**
 * 互动交流service
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-3
 */
@Service
public class ExchangeServiceImpl {

	@Autowired
	private ExchangeDaoImpl exchangeDaoImpl;

	/**
	 * 首页帖子列表
	 * @return
	 * @param pageNo
	 *            选择页数
	 * @param pageSize
	 *            每页显示条数
	 */
	public Pager topicIndex(String pageNo,String pageSize) {
		return exchangeDaoImpl.topicIndex(pageNo,pageSize);
	}
	
	/**
	 * 某个帖子内容
	 * @param userid 用户id
	 * @param topicId 帖子id
	  * @param pageNo
	 *            选择页数
	 * @param pageSize
	 *            每页显示条数
	 * @return
	 */
	public Pager topic(String userid,String topicId,String pageNo,String pageSize) {
		return exchangeDaoImpl.topic(userid, topicId,pageNo,pageSize);
	}
	
	/**
	 * 回复楼中楼
	 * @param tmsg 回复内容
	 * @param fromUser 回复人
	 * @param toUser	被回复人
	 * @param thisFloorTid 回复楼层的id，作为所有回复的父id
	 */
	public void submitReply(String tmsg,String fromUser,String toUser,String thisFloorTid) {
		exchangeDaoImpl.submitReply(tmsg, fromUser, toUser, thisFloorTid);
	}
	
	
	/**
	 * 回帖
	 * @param tmsg 回帖内容
	 * @param fromUser 回帖人
	 * @param thisFloorTid 楼主帖子id
	 */
	public void submitTopic(String tmsg,String fromUser,String thisFloorTid) {
		exchangeDaoImpl.submitTopic(tmsg, fromUser, thisFloorTid);
	}
	
	/**
	 * 发帖
	 * @param tmsg 内容
	 * @param fromUser 发帖人
	 * @param tname 标题
	 */
	public void addTopic(String tmsg,String fromUser,String tname) {
		exchangeDaoImpl.addTopic(tmsg, fromUser, tname);
	}
	
	
	/**
	 * 删帖，删回复，删跟帖
	 * @param topicId 帖子id
	 */
	public int deleteTopic(String topicId) {
		int updateCount = exchangeDaoImpl.deleteTopic(topicId);
		return updateCount;
	}
}
