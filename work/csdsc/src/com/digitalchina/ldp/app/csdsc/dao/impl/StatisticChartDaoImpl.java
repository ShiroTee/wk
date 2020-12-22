package com.digitalchina.ldp.app.csdsc.dao.impl;

import com.digitalchina.ldp.app.csdsc.bean.ChartCatogaryBean;
import com.digitalchina.ldp.app.csdsc.comm.Pager;
import com.digitalchina.ldp.app.csdsc.comm.PagerUtil;
import com.digitalchina.ldp.app.csdsc.comm.StringUtils;
import com.digitalchina.ldp.app.csdsc.dao.StatisticChartDao;
import com.digitalchina.ldp.dao.BaseDao;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class StatisticChartDaoImpl extends BaseDao implements StatisticChartDao{

	public final static String QUERY_CONDITION  = "query_code";
	
	@Override
	public Pager getIndexChartsCatogary(Object object, String pageNo, String pageSize) {
		
		Pager pager = new Pager();
		
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM CHART_CATOGARY");

		//分页数据sql
		String topicsSql = PagerUtil.getPageDataSql(sql.toString(), pageNo, pageSize);
		//分页总页数和总条数sql
		String topicPageAndCountsSql = PagerUtil.getPageAndCountsSql(sql.toString(), pageSize);
		
		//分页数据
		List<ChartCatogaryBean> results = new ArrayList<ChartCatogaryBean>();
		List<Map<String, Object>> list = this.createJdbcTemplate().queryForList(topicsSql);
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				ChartCatogaryBean bean = new ChartCatogaryBean();
				bean.setId(StringUtils.objToString(list.get(i).get("ID")));
				bean.setChartName(StringUtils.objToString(list.get(i).get("CHART_NAME")));
				bean.setPageUrl(StringUtils.objToString(list.get(i).get("PAGE_URL")));
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
	public List<Map<String, Object>> getRktjCount(String starDate,String stopDate) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT RKXZQH, XB, QHMC, COUNT(*) NUM" +
				"  FROM (SELECT CASE" +
				"                 WHEN T2.PID IS NULL OR T2.PID = '532901000000' THEN" +
				"                  T2.RK_XZQHMB_ID" +
				"                 ELSE" +
				"                  T2.PID" +
				"               END AS RKXZQH," +
				"               T7.XB," +
				"               T7.GLZT" +
				"          FROM (SELECT T1.XB, T1.GLZT, T1.RK_XZQHMB_ID, T5.DM_VALUE" +
				"                  FROM RK_RKJCXXB T1" +
				"                  LEFT JOIN DM_KEY_VALUE T5" +
				"                    ON REPLACE(REPLACE(T1.PCS, '大理市公安局', ''), ' ', '') =" +
				"                       T5.DM_KEY" +
				"                   AND T5.DMLX_DM = '101') T7" +
				"          LEFT JOIN RK_XZQHMB T2" +
				"            ON T7.DM_VALUE = T2.RK_XZQHMB_ID" +
				"           AND T7.GLZT = '管理中') T8," +
				"       RK_XZQHMB T4" +
				"  WHERE T8.RKXZQH = T4.RK_XZQHMB_ID" +
				"  GROUP BY RKXZQH, XB, QHMC" +
				"  ORDER BY RKXZQH, XB");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString());	
	}
	
	@Override
	public List<Map<String, Object>> getFrxxCount(String xzqh) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT FRLXMC,COUNT(*) NUM FROM ( ");
		sql.append("SELECT CASE WHEN t2.PID IS NULL  OR t2.PID = '532901000000' THEN t2.RK_XZQHMB_ID ELSE t2.PID END AS FRXZQH,FRLXMC ");
		sql.append("FROM FR_FRJCB t1,RK_XZQHMB t2 ");
		sql.append("WHERE t1.RK_XZQHMB_ID	= t2.RK_XZQHMB_ID) t3,RK_XZQHMB t4 ");
		sql.append("WHERE t3.FRXZQH = t4.RK_XZQHMB_ID ");
		sql.append("AND t4.QHMC = ? ");
		sql.append("GROUP BY FRLXMC");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString(),new Object[]{xzqh});	
	}

	@Override
	public List<Map<String, Object>> getHgjjCount(String zblx,String zbnd) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ZBND,ZBQC,ZBDW,NVL(DQZ,0) DQZ,PZB ");
		sql.append("FROM hg_hgjjtjb t ");
		sql.append("WHERE PZB = ? AND ZBND = ? ");
		sql.append("ORDER BY ZBND ASC ");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString(),new Object[]{zblx,zbnd});
	}
	
	@Override
	public List<Map<String, Object>> getHgjjCount(String zblx) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ZBND,ZBQC,ZBDW,NVL(DQZ,0) DQZ,PZB ");
		sql.append("FROM hg_hgjjtjb t ");
		sql.append("WHERE PZB = ? ");
		sql.append("ORDER BY ZBND,ZBQC ");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString(),new Object[]{zblx});
	}
	
	@Override
	public List<Map<String, Object>> getRjsrzcCount() {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ZBND,ZBQC,ZBDW,NVL(DQZ,0) DQZ,PZB ");
		sql.append("FROM hg_hgjjtjb t ");
		sql.append("WHERE PZB = '收入支出'  ");
		sql.append("ORDER BY ZBND,ZBQC ");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString());
	}

	@Override
	public List<Map<String, Object>> getJjsjCountGroupbyYear(String zblx) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ZBND,ZBQC,ZBDW,NVL(DQZ,0) DQZ,PZB ");
		sql.append("FROM hg_hgjjtjb t ");
		sql.append("WHERE ZBQC = ? ");
		sql.append("ORDER BY ZBND,ZBQC ");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString(),new Object[]{zblx});
	}

	@Override
	public List<Map<String, Object>> getHgjjCount() {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ZBND,ZBQC,ZBDW,NVL(DQZ,0) DQZ ");
		sql.append("FROM hg_hgjjtjb t ");
		sql.append("WHERE ZBQC LIKE '%全年社会消费品零售总额%' ");
		sql.append("ORDER BY ZBND,ZBQC ");
		System.out.println(sql.toString());
		return this.createJdbcTemplate().queryForList(sql.toString());
	}
	
	@Override
	public List<Map<String, Object>> getXzqh() {
		String sql = "select t2.QHMC from rk_xzqhmb t2  WHERE t2.PID='532901000000'";
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> getZbnd() {
		String sql = "SELECT ZBND FROM hg_hgjjtjb GROUP BY ZBND ORDER BY ZBND ASC";
		return this.createJdbcTemplate().queryForList(sql);
	}

	@Override
	public List<Map<String, Object>> getLknd() {
		String sql = "SELECT ND FROM FR_LKZDLGXX GROUP BY ND ORDER BY ND DESC";
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> getRknltjCount() {
		StringBuilder sql = new StringBuilder();
		sql.append("select  case" );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>0 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<10 then '[1-9岁]' " );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>9 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<20 then '[10-19岁]' " );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>19 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<30 then '[20-29岁]'" );
	       sql.append("when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>29 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<40 then '[30-39岁]'" );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>39 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<50 then '[40-49岁]'" );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>49 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<60 then '[50-59岁]'" );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>59 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<70 then '[60-69岁]'" );
	      sql.append("  when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>69 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<80 then '[70-79岁]'" );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>79 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<90 then '[80-89岁]'" );
	       sql.append(" when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>89 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<=100 then '[90-100岁]'" );
	 sql.append(" Else '[超过100岁以上]' end as NLD ," );
	   sql.append("      count(case when xb='男' then '1' else null end ) as man," );
	     sql.append("    count(case when xb='女' then '2' else null end ) as woman ," );
	    sql.append("     count(case when xb in ('男','女') then '3' else null end ) as allcount  " );
	sql.append("from RK_RKJCXXB  group by " );
	    sql.append("     case " );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>0 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<10 then '[1-9岁]' " );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>9 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<20 then '[10-19岁]'" );
	    sql.append("    when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>19 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<30 then '[20-29岁]'" );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>29 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<40 then '[30-39岁]'" );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>39 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<50 then '[40-49岁]'" );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>49 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<60 then '[50-59岁]'" );
	      sql.append("  when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>59 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<70 then '[60-69岁]'" );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>69 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<80 then '[70-79岁]'" );
	      sql.append("  when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>79 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<90 then '[80-89岁]'" );
	     sql.append("   when  floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1>89 and floor(MONTHS_BETWEEN(sysdate,csrr)/12)+1<=100 then '[90-100岁]'" );
	 sql.append(" Else '[超过100岁以上]' end  order by NLD" );
	 return this.createJdbcTemplate().queryForList(sql.toString());
	}
	
	@Override
	public List<Map<String, Object>> getRkqrqc() {
		String sql = "SELECT * FROM (select * from olap_rkqrqcxx t ORDER BY ND DESC) WHERE ROWNUM < 6 ORDER BY ND";
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> getSletzxs() {
		String sql = "select * from olap_sletzxs";
		return this.createJdbcTemplate().queryForList(sql);
	}

	/*
	* 获得人口图谱的配置信息
	* 包括：sql,描述等
	* */
	public List<Map<String, Object>> getRKTPConfig(String type){
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* from RKTP_QUERY_CONFIG t where t.query_field = '"+type+"'");
		List<Map<String, Object>> config  = this.createJdbcTemplate().queryForList(sql.toString());

		return config;
	}

	/*
	* 获得人口图谱的查询字段的信息
	* 包括：sql,描述等
	* */
	public Map<String, Object> getRKTPType(String type){
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* from RKTP_QUERY_VALUE t where t.query_field = '"+type+"'");
		Map<String, Object> config  = this.createJdbcTemplate().queryForMap(sql.toString());

		return config;
	}

	/*
    * 获得人口图谱的查询字段的信息
    * 包括：sql,描述等
    * */
    @Override
	public Map<String, Object> getRKTPTableConfig(String tableName,String queryType){
		StringBuilder sql = new StringBuilder();
        Map<String, Object> config = new  HashMap<String, Object>();
        if(!"".equals(tableName)) {
            sql.append("select t.* from RKTP_QUERY_CONFIG t where t.table_name = '" + tableName + "' and t.query_field='"+queryType+"'");
            System.out.println(sql.toString());
            config = this.createJdbcTemplate().queryForMap(sql.toString());
        }

		return config;
	}

	/*
* 获得人口图谱的查询字段的信息
* 包括：sql,描述等
* */
	@Override
	public Map<String, Object> getRKTPTableLinkConfig(String tableName,String fatherTable,String firsttype){
		StringBuilder sql = new StringBuilder();
		Map<String, Object> config = new  HashMap<String, Object>();
		if(!"".equals(tableName)) {
			sql.append("select t.* from rktp_query_link t where t.table_name = '" + tableName + "' and t.father_table='"+fatherTable+"' and t.query_type='"+firsttype+"'");
			System.out.println(sql.toString());
			config = this.createJdbcTemplate().queryForMap(sql.toString());
		}

		return config;
	}

    /*
    * 获得人口图谱的查询字段的信息
    * 包括：sql,描述等
    * */

    @Override
    public List<Map<String, Object>> getRKTPByFatherTableConfig(String tableName,String queryType){
        StringBuilder sql = new StringBuilder();
        List<Map<String, Object>> config = new  ArrayList<Map<String, Object>>();
        if(!"".equals(tableName)) {
            sql.append("select t.* from RKTP_QUERY_LINK t where t.father_table = '" + tableName + "' and query_type ='" + queryType+"'");
            System.out.println(sql.toString());
            config = this.createJdbcTemplate().queryForList(sql.toString());
        }

        return config;
    }


	/*
	 * 人口图谱查询_查询第一层的主题数据
	 */
	@Override
	public Map<String, Object> getRelation(List<Map<String, Object>> configs,String queryType,String queryValue) {
		 Map<String, Object> result = new HashMap<String, Object>();
		for(Map<String, Object> config : configs ){
			String sql = config.get("SUBJECT_SQL").toString();
            //电话号码的时候：座机（没加区号的）则加0872
            if(queryType.equals("dhhm") && !queryValue.startsWith("0872") && !queryValue.startsWith("1")){
                String temp = sql.split("where")[1];
                temp = temp.replaceAll(QUERY_CONDITION,"0872-"+queryValue);
                sql = sql + " or " + temp;
            }
            sql = sql.replaceAll(QUERY_CONDITION,queryValue);
			String table_name =  config.get("TABLE_NAME").toString();
            System.out.println(sql.toString());
			List<Map<String, Object>> data = this.createJdbcTemplate().queryForList(sql.toString());
			result.put(table_name,data);
		}
	    
	    return result;
	}
	
	
	
	@Override
	public List<Map<String, Object>> getQyfbxx(String ys,String nf) {
		String sql = "select * from olap_qyflxx where dl = '" + ys + "' and nd = '" + nf + "'";
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> getqyfbxxnd() {
		String sql = "select nd from olap_qyflxx group by nd";
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> getqyfbdl() {
		String sql = "select dl from olap_qyflxx group by dl";
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Map<String, Object>> getlkzdlgxx(String type,String xzqh,String start,String end) {
		String sql = ""; 
		if("0".equals(type)){
			sql = "select nd hzb,sum(lksl) lksl,sum(lgsl) lgsl,sum(cwsl) cwsl from fr_lkzdlgxx where status = 1 and xzqh	= '"+xzqh+"' group by nd order by nd";	
		}else if("1".equals(type)){
			sql = "select xzqh hzb,sum(lksl) lksl,sum(lgsl) lgsl,sum(cwsl) cwsl from fr_lkzdlgxx where status = 1 and nd >= '"+start+"' and nd <= '"+end+"' group by xzqh";
		}else{
			sql = "select yf hzb,sum(lksl) lksl,sum(lgsl) lgsl,sum(cwsl) cwsl from fr_lkzdlgxx where status = 1 and nd = "+type+" and xzqh	= '"+xzqh+"' group by yf order by yf";
		}
		System.out.println(sql);
		return this.createJdbcTemplate().queryForList(sql);
	}
	
	@Override
	public List<Object> getPopulationMap(Map<String,Object> config,String name){
		String sql = StringUtils.objToString(config.get("DETAIL_SQL"));
		String detail_desc = StringUtils.objToString(config.get("DETAIL_FIELD_DESC"));

		List<Object> result = new ArrayList<Object>();
		if(!"".equals(sql)){
			sql = sql.replaceAll(QUERY_CONDITION,name);
            System.out.println(sql.toString());
            List<Map<String, Object>>  value= this.createJdbcTemplate().queryForList(sql);

			if(!value.isEmpty()){
                result.add(value);
                result.add(detail_desc);
			}
		}
	  
		return result;
	}
}
