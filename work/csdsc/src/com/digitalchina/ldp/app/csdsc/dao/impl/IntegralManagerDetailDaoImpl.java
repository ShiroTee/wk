package com.digitalchina.ldp.app.csdsc.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.digitalchina.ldp.app.csdsc.bean.WbjDataSubmitBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.comm.PagerUtil;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.IntegralManagerDetailDao;
import com.digitalchina.ldp.dao.BaseDao;

/**
 * 各委办局积分统计
 * @author MagicChu
 *
 */
@Component
public class IntegralManagerDetailDaoImpl extends BaseDao implements IntegralManagerDetailDao {

	/**
	 * 各委办局积分统计查询
	 */
	public Pager getWbjIntegralData(Map<String, Object> argMap,String pageNo,String pageSize) {
		Pager pager = new Pager();
		
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT T.ID,T.ORG_ID,T.ORG_NAME,T.CONTRIBUTION_INTEGRAL,T.USE_INTEGRAL,T.REJECT_INTEGRAL FROM INTEGRAL_MANAGE T WHERE 1 = 1 ");
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
				bean.setUseIntegral(StringUtils.objToString(list.get(i).get("USE_INTEGRAL")));
				bean.setRejectIntegral(StringUtils.objToString(list.get(i).get("REJECT_INTEGRAL")));
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
	 * 查询委办局积分统计内容，组织表格
	 */
	public List<WbjDataSubmitBean> getWbjIntegralDataTable(Map<String, Object> argMap) {
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT T.ID,T.ORG_ID,T.ORG_NAME,T.CONTRIBUTION_INTEGRAL,T.USE_INTEGRAL,T.REJECT_INTEGRAL FROM INTEGRAL_MANAGE T WHERE 1 = 1 ");
		for(String key:argMap.keySet()){
			sql.append(" AND " + key +argMap.get(key));
		}

		
		List<WbjDataSubmitBean> results = new ArrayList<WbjDataSubmitBean>();
		List<Map<String, Object>> list = this.createJdbcTemplate().queryForList(sql.toString());
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				WbjDataSubmitBean bean = new WbjDataSubmitBean();
				bean.setId(StringUtils.objToString(list.get(i).get("ID")));
				bean.setOrgiId(StringUtils.objToString(list.get(i).get("ORG_ID")));
				bean.setOrgName(StringUtils.objToString(list.get(i).get("ORG_NAME")));
				bean.setContributionIntegral(StringUtils.objToString(list.get(i).get("CONTRIBUTION_INTEGRAL")));
				bean.setUseIntegral(StringUtils.objToString(list.get(i).get("USE_INTEGRAL")));
				bean.setRejectIntegral(StringUtils.objToString(list.get(i).get("REJECT_INTEGRAL")));
				results.add(bean);
			}
		}
		return results;
	}

}

