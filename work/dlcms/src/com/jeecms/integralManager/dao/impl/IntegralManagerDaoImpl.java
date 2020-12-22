package com.jeecms.integralManager.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import com.jeecms.core.dao.impl.BaseDaoSupportImpl;

/**
 * 积分管理-发布通知公告dao
 * 
 * @author zhuxiaofei
 * @version 1.0
 * @since 2014-7-3
 */
@Component
public class IntegralManagerDaoImpl extends BaseDaoSupportImpl {

	
	/**
	 * 将积分统计数据发布到通知公告，通过接口获取数据，多个表插入，涉及到事务处理，已经在Service层加入事务
	 * @param integralInfo 通知公告内容
	 */
	public void publishIntegralToNotice(String integralInfo,String startDate,String endDate) {
		
		//获取JdbcTemplate，使用同一个JdbcTemplate，此多表插入数据方法拥有事务功能
		JdbcTemplate  simpleJdbcTemplate = this.getSimpleJdbcTemplate();

		StringBuffer sb0 = new StringBuffer();
		sb0.append(" SELECT MAX(CONTENT_ID)+1 NEW_CONTENT_ID FROM JC_CONTENT ");
		int new_content_id = simpleJdbcTemplate.queryForObject(sb0.toString(), Integer.class);

		//JC_CONTENT表组织sql
		StringBuffer sbp = new StringBuffer();
		sbp.append(" SELECT " + new_content_id + ",62,1,1,1, ");
		sbp.append(" TO_DATE('"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"','YYYY-MM-DD hh24:mi:ss'), ");
		sbp.append(" 0,0,0,2,0,0,0,0 FROM DUAL ");
		StringBuffer sb = new StringBuffer();
		sb.append(" INSERT INTO JC_CONTENT " +sbp.toString()+" ");
		

		//JC_CONTENT_EXT表组织sql
		StringBuffer sbp2 = new StringBuffer();
		//公告标题
		String title = startDate+"到"+endDate+"各委办局积分统计";
		sbp2.append(" SELECT " + new_content_id + ",'" + title + "', ");
		sbp2.append(" TO_DATE('"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"','YYYY-MM-DD hh24:mi:ss'), ");
		sbp2.append(" 0,1 FROM DUAL ");
		StringBuffer sb2 = new StringBuffer();
		sb2.append(" INSERT INTO JC_CONTENT_EXT(CONTENT_ID,TITLE,RELEASE_DATE,IS_BOLD,NEED_REGENERATE) " +sbp2.toString()+" ");
		
		
		//JC_CONTENT_TXT表组织sql
		StringBuffer sbp5 = new StringBuffer();
		sbp5.append(" INSERT INTO JC_CONTENT_TXT(CONTENT_ID,TXT) SELECT " + new_content_id + ",empty_clob() FROM DUAL ");
		StringBuffer sbp5_1 = new StringBuffer();
		sbp5_1.append(" UPDATE JC_CONTENT_TXT SET TXT=? WHERE CONTENT_ID=(SELECT MAX(CONTENT_ID) FROM JC_CONTENT_TXT) ");
		
		//JC_CONTENT_CHANNEL表组织sql
		StringBuffer sbp3 = new StringBuffer();
		sbp3.append(" INSERT INTO JC_CONTENT_CHANNEL(CONTENT_ID,CHANNEL_ID) SELECT " + new_content_id + ",62 FROM DUAL ");
		
		
		//JC_CONTENT_COUNT表组织sql
		StringBuffer sbp4 = new StringBuffer();
		sbp4.append(" INSERT INTO JC_CONTENT_COUNT SELECT " + new_content_id + ",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 FROM DUAL ");
		
		simpleJdbcTemplate.execute(sb.toString());
		simpleJdbcTemplate.execute(sb2.toString());
		simpleJdbcTemplate.execute(sbp5.toString());
		simpleJdbcTemplate.update(sbp5_1.toString(), integralInfo);
		simpleJdbcTemplate.execute(sbp3.toString());
		simpleJdbcTemplate.execute(sbp4.toString());
	}
	
}
