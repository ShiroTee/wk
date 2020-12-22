package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.bean.WbjBean;
import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.comm.PagerUtil;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.WbjDataSubmitDetailDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 委办局数据提交情况
 * @author MagicChu
 *
 */
@Component
public class WbjDataSubmitDetailDaoImpl extends BaseDao implements WbjDataSubmitDetailDao {

	/**
	 * 各委办局积分统计查询
	 */
	public Pager getWbjDataSubmitCounts(Map<String, Object> argMap,String pageNo,String pageSize) {
		Pager pager = new Pager();
		
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT T.ID,T.ORG_ID,T.ORG_NAME,T.CONTRIBUTION_INTEGRAL FROM INTEGRAL_MANAGE T WHERE 1 = 1 ");
		for(String key:argMap.keySet()){
			sql.append(" AND " + key +argMap.get(key));
		}
		
		//分页数据sql
		String topicsSql = PagerUtil.getPageDataSql(sql.toString(), pageNo, pageSize);
		//分页总页数和总条数sql
		String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(sql.toString(), pageSize);
		
		//分页数据
		List<WbjDataSubmitBean> results = new ArrayList<WbjDataSubmitBean>();
		List<Map<String, Object>> list = this.createJdbcTemplate().queryForList(topicsSql);
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				WbjDataSubmitBean bean = new WbjDataSubmitBean();
				bean.setId(StringUtils.objToString(list.get(i).get("ID")));
				bean.setOrgiId(StringUtils.objToString(list.get(i).get("ORG_ID")));
				bean.setOrgName(StringUtils.objToString(list.get(i).get("ORG_NAME")));
				bean.setContributionIntegral(StringUtils.objToString(list.get(i).get("CONTRIBUTION_INTEGRAL")));
				results.add(bean);
			}

		}
		
		//分页总页数和总条数
		List<Map<String, Object>> listCouts = this.createJdbcTemplate().queryForList(topicPageAndCountsSql);
		if (listCouts != null && listCouts.size() > 0) {
			pager.setAllpage(StringUtils.objToString(listCouts.get(0).get("ALLPAGE")));
			pager.setAllcounts(StringUtils.objToString(listCouts.get(0).get("ALLCOUNTS")));
		}
		pager.setListBeans(results);
		
		return pager;
	}
	
	
	/**
	 * 首页委办局数据提交情况查询，查询上个月实提交数据量最多的六条数据
	 */
	public Pager getIndexWbjDataSubmitCounts(Map<String, Object> argMap,String pageNo,String pageSize) {
		Pager pager = new Pager();
		
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT * FROM (");
		sql.append(" SELECT T.ID,T.ORG_NAME,T.DA_CLA_SUB_COUNT,T.CONTRIBUTION_INTEGRAL FROM INTEGRAL_SJTJPM T WHERE 1 = 1 and DA_CLA_SUB_COUNT is not null");
		for(String key:argMap.keySet()){
			sql.append(" AND " + key +argMap.get(key));
		}
		//排序
		sql.append(" ORDER BY CONTRIBUTION_INTEGRAL desc ) ");
		sql.append(" WHERE rownum < 6 ");
		
		
		//分页数据sql
		String topicsSql = PagerUtil.getPageDataSql(sql.toString(), pageNo, pageSize);
		//分页总页数和总条数sql
		String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(sql.toString(), pageSize);
		
		
		//分页数据
		List<WbjDataSubmitBean> results = new ArrayList<WbjDataSubmitBean>();
		List<Map<String, Object>> list = this.createJdbcTemplate().queryForList(topicsSql);
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				WbjDataSubmitBean bean = new WbjDataSubmitBean();
				bean.setId(StringUtils.objToString(list.get(i).get("ID")));
				//bean.setOrgiId(StringUtils.objToString(list.get(i).get("ORG_ID")));
				bean.setOrgName(StringUtils.objToString(list.get(i).get("ORG_NAME")));
				bean.setDaClaSubCount(StringUtils.objToString(list.get(i).get("DA_CLA_SUB_COUNT")));
				bean.setContributionIntegral(StringUtils.objToString(list.get(i).get("CONTRIBUTION_INTEGRAL")));
				results.add(bean);
			}

		}
		
		//分页总页数和总条数
		List<Map<String, Object>> listCouts = this.createJdbcTemplate().queryForList(topicPageAndCountsSql);
		if (listCouts != null && listCouts.size() > 0) {
			pager.setAllpage(StringUtils.objToString(listCouts.get(0).get("ALLPAGE")));
			pager.setAllcounts(StringUtils.objToString(listCouts.get(0).get("ALLCOUNTS")));
		}
		pager.setListBeans(results);
		
		return pager;
	}


	@Override
	public WbjBean findWbjByOrgId(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		StringBuilder sql1 = new StringBuilder();
		WbjBean bean = new WbjBean();
		sql.append("select t.*,to_char(t.ytjsjrq,'yyyy-mm-dd') yt,to_char(t.sjtjsjrq,'yyyy-mm-dd') sj from wbjtjqkb t where flag=0 and sjtslx is null ");
		sql1.append("select t.*,to_char(t.ytjsjrq,'yyyy-mm-dd') yt,to_char(t.sjtjsjrq,'yyyy-mm-dd') sj from wbjtjqkb t where flag=0 and sjtslx = -1  ");
		for(String key:argMap.keySet()){
			sql.append(" and " + key +argMap.get(key));
			sql1.append(" and " + key +argMap.get(key));
		}
		sql.append(" order by t.sjtjsjrq asc ");
		sql1.append(" order by t.sjtjsjrq asc ");
		List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
		List<Map<String,Object>> unzero = this.createJdbcTemplate().queryForList(sql1.toString());
		bean.setUnzero(unzero);
		bean.setZero(zero);
		return bean;
	}
	
	@Override
	public WbjBean getDataUseOrder(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		WbjBean bean = new WbjBean();
		sql.append("select * from (select asset_name,count(*) nm from approval_info t group by  asset_name order by nm desc ) t where rownum < 6");
		List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
		bean.setZero(zero);
		return bean;
	}
	
	@Override
	public WbjBean getDataUseInfo(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		WbjBean bean = new WbjBean();
		sql.append("select * from (select asset_name,proposer_org_name,apply_time from approval_info t	order by apply_time desc) t where rownum < 6");
		List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
		bean.setZero(zero);
		return bean;
	}
	
	@Override
	public WbjBean getFileSubmitCounts(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		WbjBean bean = new WbjBean();
		sql.append("select t.*,rownum from(select  wbj WBJJC,xxlmc FILEDESC,tjsjrq ADDDATE  from sjcg_sjtjpm order by tjsjrq  desc) t where rownum<6");
		List<Map<String,Object>> zero = this.createJdbcTemplate().queryForList(sql.toString());
		bean.setZero(zero);
		return bean;
	}

}

