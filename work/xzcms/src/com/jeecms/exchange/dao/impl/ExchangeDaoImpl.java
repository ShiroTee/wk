package com.jeecms.exchange.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import com.jeecms.common.StringUtils;
import com.jeecms.core.dao.impl.BaseDaoSupportImpl;
import com.jeecms.exchange.bean.SubTopicBean;
import com.jeecms.exchange.bean.TopicBean;
import com.jeecms.exchange.comm.Pager;
import com.jeecms.exchange.comm.PagerUtil;

/**
 * 互动交流dao
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-3
 */
@Component
public class ExchangeDaoImpl extends BaseDaoSupportImpl {

	
	
	
	
	/**
	 * 首页帖子列表
	 * @return
	 * @param pageNo
	 *            选择页数
	 * @param pageSize
	 *            每页显示条数
	 */
	public Pager topicIndex(String pageNo,String pageSize) {
		Pager pager = new Pager();
		
		StringBuffer fysb = new StringBuffer();
		fysb.append(" WITH TEMP AS (SELECT MAX(to_number(T.FLOOR)) - 1 REPLYS, T.PTID ");
		fysb.append(" FROM TOPIC T WHERE T.PTID IN (SELECT T.TID FROM TOPIC T ");
		fysb.append(" WHERE 1 = 1 AND T.PTID IS NULL AND T.DELETEFLAG = 0) ");
		fysb.append(" GROUP BY T.PTID),TEMP2 AS (SELECT MAX(to_number(T.FLOOR)) - 1 REPLYS, T.TID PTID ");
		fysb.append(" FROM TOPIC T WHERE T.TID IN (SELECT T.TID FROM TOPIC T WHERE 1 = 1 ");
		fysb.append(" AND T.PTID IS NULL AND T.DELETEFLAG = 0 AND T.TID NOT IN ");
		fysb.append(" (SELECT T.PTID FROM TOPIC T WHERE T.PTID IN (SELECT T.TID ");
		fysb.append(" FROM TOPIC T WHERE 1 = 1 AND T.PTID IS NULL AND T.DELETEFLAG = 0) ");
		fysb.append(" GROUP BY T.PTID)) GROUP BY T.TID),TEMP3 AS ( SELECT T.USERID, ");
		fysb.append(" T.TNAME,T.MSG,T.TID,TO_CHAR(T.ADDDATE, 'YYYY-MM-DD hh24:mi:ss') ADDDATE, ");
		fysb.append(" TT.REPLYS FROM TOPIC T, TEMP TT WHERE 1 = 1 ");
		fysb.append(" AND T.TID = TT.PTID UNION ALL SELECT T.USERID,T.TNAME, ");
		fysb.append(" T.MSG,T.TID,TO_CHAR(T.ADDDATE, 'YYYY-MM-DD hh24:mi:ss') ADDDATE, ");
		fysb.append(" TTT.REPLYS FROM TOPIC T, TEMP2 TTT ");
		fysb.append(" WHERE 1 = 1 AND T.TID = TTT.PTID ORDER BY ADDDATE DESC)  ");
		fysb.append(" SELECT * FROM TEMP3  ");
		 
		//分页数据sql
		String topicsSql = PagerUtil.getPageDataSql(fysb.toString(), pageNo, pageSize);
		//分页总页数和总条数sql
		String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(fysb.toString(), pageSize);
		
		
		//分页数据
		List<TopicBean> results = new ArrayList<TopicBean>();
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate().queryForList(topicsSql);
		if (list != null && list.size() > 0) {
			String msg="";
			for (int i = 0; i < list.size(); i++) {
				TopicBean bean = new TopicBean();
				bean.setTopicId(StringUtils.objToString(list.get(i).get("TID")));
				if(StringUtils.objToString(list.get(i).get("MSG")).length()>46) msg = StringUtils.objToString(list.get(i).get("MSG")).substring(0,46)+"......";
				else msg = StringUtils.objToString(list.get(i).get("MSG"));
				bean.setTopicMsg(msg);
				bean.setTopicUser(StringUtils.objToString(list.get(i).get("USERID")));
				bean.setTopicName(StringUtils.objToString(list.get(i).get("TNAME")));
				bean.setTopicReplyCounts(StringUtils.objToString(list.get(i).get("REPLYS")));
				//取年月日
				bean.setTopicAddDate(StringUtils.objToString(list.get(i).get("ADDDATE")));
				results.add(bean);
			}

		}
		
		//分页总页数和总条数
		List<Map<String, Object>> listCouts = this.getSimpleJdbcTemplate().queryForList(topicPageAndCountsSql);
		if (listCouts != null && listCouts.size() > 0) {
			pager.setAllpage(StringUtils.objToString(listCouts.get(0).get("ALLPAGE")));
			pager.setAllcounts(StringUtils.objToString(listCouts.get(0).get("ALLCOUNTS")));
		}
		
		pager.setListBeans(results);
		
		return pager;
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
		Pager pager = new Pager();
		StringBuffer fysb = new StringBuffer();
		fysb.append(" SELECT T.TID,NVL(T.PTID,T.TID) PTID,T.USERID,T.TNAME,T.MSG,TO_CHAR(T.ADDDATE,'YYYY-MM-DD hh24:mi:ss') ADDDATE,T.FLOOR, ");
		fysb.append(" CASE WHEN T.USERID = '"+userid+"' THEN '0' ELSE '1' END DELETE_BTN ");
		fysb.append(" FROM TOPIC T START WITH T.TID = '"+topicId+"' ");
		fysb.append(" AND T.DELETEFLAG = 0 CONNECT BY PRIOR T.TID = T.PTID ");
		fysb.append(" AND T.TOPICLEVEL IN (0, 1) AND T.DELETEFLAG = 0 ORDER BY to_number(T.FLOOR) ");
		
		
		//分页数据sql
		String topicsSql = PagerUtil.getPageDataSql(fysb.toString(), pageNo, pageSize);
		//分页总页数和总条数sql
		String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(fysb.toString(), pageSize);
		
		
		//分页数据
		List<TopicBean> results = new ArrayList<TopicBean>();
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate().queryForList(topicsSql);
		if (list != null && list.size() > 0) {

			for (int i = 0; i < list.size(); i++) {
				TopicBean bean = new TopicBean();
				//循环寻找每层回复的楼中楼
				List<SubTopicBean> subResults  = this.subTopic(userid, StringUtils.objToString(list.get(i).get("TID")));
				bean.setTopicId(StringUtils.objToString(list.get(i).get("TID")));
				bean.setTopicPId(StringUtils.objToString(list.get(i).get("PTID")));
				bean.setTopicMsg(StringUtils.objToString(list.get(i).get("MSG")));
				bean.setTopicUser(StringUtils.objToString(list.get(i).get("USERID")));
				bean.setTopicName(StringUtils.objToString(list.get(i).get("TNAME")));
				bean.setTopicReplyCounts(StringUtils.objToString(list.get(i).get("REPLYS")));
				bean.setTopicAddDate(StringUtils.objToString(list.get(i).get("ADDDATE")));
				bean.setTopicFloor(StringUtils.objToString(list.get(i).get("FLOOR")));
				bean.setTopicDeleteBtn(StringUtils.objToString(list.get(i).get("DELETE_BTN")));
				//将楼中楼设置到帖子中去
				bean.setSubTopic(subResults);
				results.add(bean);
			}
		}
		
		//分页总页数和总条数
		List<Map<String, Object>> listCouts = this.getSimpleJdbcTemplate().queryForList(topicPageAndCountsSql);
		if (listCouts != null && listCouts.size() > 0) {
			pager.setAllpage(StringUtils.objToString(listCouts.get(0).get("ALLPAGE")));
			pager.setAllcounts(StringUtils.objToString(listCouts.get(0).get("ALLCOUNTS")));
		}
		
		pager.setListBeans(results);
		
		return pager;
	}
	
	
	/**
	 * 某个回复的楼中楼
	 * @param userid 用户id
	 * @param topicId 帖子id
	 * @return
	 */
	public List<SubTopicBean> subTopic(String userid,String topicId) {

		StringBuffer fysb = new StringBuffer();

		fysb.append(" SELECT T.USERID,T.TOUSERID,T.MSG,T.FLOOR,TO_CHAR(T.ADDDATE,'YYYY-MM-DD hh24:mi:ss') ADDDATE,T.TID,'"+topicId+"' PTID, ");
		fysb.append(" CASE WHEN T.USERID = '"+userid+"' THEN '0' ELSE ");
		fysb.append(" '1' END DELETE_BTN FROM TOPIC T WHERE T.TOPICLEVEL = 2 ");
		fysb.append(" AND T.DELETEFLAG = 0 AND T.PTID = '"+topicId+"' ORDER BY to_number(T.FLOOR) ");
		
		List<SubTopicBean> results = new ArrayList<SubTopicBean>();
		//System.out.println(fysb.toString());
		List<Map<String, Object>> list = this.getSimpleJdbcTemplate().queryForList(fysb.toString().toString());
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				SubTopicBean bean = new SubTopicBean();
				bean.setTopicId(StringUtils.objToString(list.get(i).get("TID")));
				bean.setTopicPId(StringUtils.objToString(list.get(i).get("PTID")));
				bean.setTopicMsg(StringUtils.objToString(list.get(i).get("MSG")));
				bean.setTopicFromUser(StringUtils.objToString(list.get(i).get("USERID")));
				bean.setTopicToUser(StringUtils.objToString(list.get(i).get("TOUSERID")));
				bean.setTopicDeleteBtn(StringUtils.objToString(list.get(i).get("DELETE_BTN")));
				bean.setTopicFloor(StringUtils.objToString(list.get(i).get("FLOOR")));
				bean.setTopicAddDate(StringUtils.objToString(list.get(i).get("ADDDATE")));
				results.add(bean);
			}

		}
		return results;
	}
	
	/**
	 * 回复楼中楼
	 * @param tmsg 回复内容
	 * @param fromUser 回复人
	 * @param toUser	被回复人
	 * @param thisFloorTid 回复楼层的id，作为所有回复的父id
	 */
	public void submitReply(String tmsg,String fromUser,String toUser,String thisFloorTid) {

		StringBuffer sbp = new StringBuffer();
		sbp.append(" SELECT '"+StringUtils.getRandmStr(16)+"', ");
		sbp.append(" '"+thisFloorTid+"', ");
		sbp.append(" '"+fromUser+"', ");
		sbp.append(" '"+tmsg+"', ");
		sbp.append(" TO_DATE('"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"','YYYY-MM-DD hh24:mi:ss'), ");
		sbp.append(" '2', ");
		sbp.append(" MAX(to_number(NVL(FLOOR,0)))+1, ");
		sbp.append(" '"+toUser+"' ");
		sbp.append(" FROM TOPIC t WHERE 1=1 AND t.ptid='"+thisFloorTid+"' ");
		
		StringBuffer sb = new StringBuffer();
		sb.append(" INSERT INTO TOPIC(TID,PTID,USERID,MSG,ADDDATE,TOPICLEVEL,FLOOR,TOUSERID) " +sbp.toString());
		System.out.println(sb.toString());
		this.getSimpleJdbcTemplate().execute(sb.toString());
	}
	
	
	/**
	 * 回帖
	 * @param tmsg 回复内容
	 * @param fromUser 回复人
	 * @param thisFloorTid 楼主帖子id
	 */
	public void submitTopic(String tmsg,String fromUser,String thisFloorTid) {

		StringBuffer sbp = new StringBuffer();
		sbp.append(" SELECT '"+StringUtils.getRandmStr(16)+"', ");
		sbp.append(" '"+thisFloorTid+"', ");
		sbp.append(" '"+fromUser+"', ");
		sbp.append(" '"+tmsg+"', ");
		sbp.append(" TO_DATE('"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"','YYYY-MM-DD hh24:mi:ss'), ");
		sbp.append(" '1', ");
		sbp.append(" MAX(to_number(NVL(FLOOR,0)))+1 ");
		sbp.append(" FROM TOPIC t WHERE 1=1 AND ( T.PTID='"+thisFloorTid+"' OR  T.PTID IS NULL ) ");
		
		StringBuffer sb = new StringBuffer();
		sb.append(" INSERT INTO TOPIC(TID,PTID,USERID,MSG,ADDDATE,TOPICLEVEL,FLOOR) " +sbp.toString());
		//System.out.println(sb.toString());
		this.getSimpleJdbcTemplate().execute(sb.toString());
	}
	
	
	/**
	 * 发帖
	 * @param tmsg 内容
	 * @param fromUser 发帖人
	 * @param tname 标题
	 */
	public void addTopic(String tmsg,String fromUser,String tname) {

		StringBuffer sbp = new StringBuffer();
		sbp.append(" '"+StringUtils.getRandmStr(16)+"', ");
		sbp.append(" '"+fromUser+"', ");
		sbp.append(" '"+tmsg+"', ");
		sbp.append(" '"+tname+"', ");
		sbp.append(" TO_DATE('"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"','YYYY-MM-DD hh24:mi:ss'), ");
		sbp.append(" '0', ");
		sbp.append(" '1' ");
		
		StringBuffer sb = new StringBuffer();
		sb.append(" INSERT INTO TOPIC(TID,USERID,MSG,TNAME,ADDDATE,TOPICLEVEL,FLOOR) VALUES(" +sbp.toString()+") ");
		//System.out.println(sb.toString());
		this.getSimpleJdbcTemplate().execute(sb.toString());
	}
	
	
	/**
	 * 删帖，删回复，删跟帖
	 * @param topicId 帖子id
	 */
	public int deleteTopic(String topicId) {
		StringBuffer sb = new StringBuffer();
		sb.append(" UPDATE  TOPIC T SET T.DELETEFLAG = '1' WHERE 1=1 AND T.TID='"+topicId+"' ");
		//System.out.println(sb.toString());
		//更新条数
		int updateCount = this.getSimpleJdbcTemplate().update(sb.toString());
		//System.out.println(updateCount);
		return updateCount;
	}
	
}
